from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.services.ingest_github import ingest_user
from app.services.refresh import should_refresh
from app.api.auth import get_current_user

from app.analytics.metrics import (
    total_commits,
    commits_per_day,
    weekend_vs_weekday_commits,
    repository_activity,
    language_distribution
)
from app.analytics.insights import generate_insights

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "GitSense AI is running"}


def get_user_or_404(db: Session, username: str) -> User:
    user = db.query(User).filter_by(
        github_username=username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found. Run ingestion first."
        )

    return user


@router.get("/summary/{username}")
def summary(username: str, db: Session = Depends(get_db)):
    user = get_user_or_404(db, username)

    return {
        "username": user.github_username,
        "total_commits": total_commits(db, user.id),
        "language_distribution": language_distribution(db, user.id)
    }


@router.get("/analytics/{username}")
def analytics(username: str, db: Session = Depends(get_db)):
    user = get_user_or_404(db, username)

    return {
        "commits_per_day": commits_per_day(db, user.id),
        "weekend_vs_weekday": weekend_vs_weekday_commits(db, user.id),
        "repository_activity": repository_activity(db, user.id)
    }


@router.get("/insights/{username}")
def insights(username: str, db: Session = Depends(get_db)):
    user = get_user_or_404(db, username)

    return {
        "username": user.github_username,
        "insights": generate_insights(db, user.id)
    }


@router.get("/analyze/{username}")
def analyze_user(
    username: str,
    force_refresh: bool = False,
    github_token: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter_by(
        github_username=username
    ).first()

    if force_refresh or should_refresh(user):
        ingest_user(username, github_token)

    return {"status": "Data ready"}
