from unittest import result

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from fastapi import HTTPException
from app.services.github_client import get_rate_limit_remaining
from app.services.analytics import build_stats
from app.models import Commit, Repository
from sqlalchemy.orm import Session
from fastapi import Depends

from app.cache.redis_client import redis_client
import json

from app.database import get_db
from app.models.user import User
from app.services.ingest_github import ingest_user
from app.services.refresh import should_refresh
from app.api.auth import get_current_user
from app.models.commit import Commit
from app.models.repository import Repository
from sqlalchemy.orm import Session

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

    cache_key = f"analytics:{username}"

    cached_data = redis_client.get(cache_key)

    if cached_data:
        print("CACHE HIT")
        return json.loads(cached_data)
    print("CACHE MISS - computing analytics")

    user = get_user_or_404(db, username)

    # 🔹 Fetch commits
    commits = (
        db.query(Commit)
        .join(Repository)
        .filter(Repository.user_id == user.id)
        .all()
    )

    # 🔹 Fetch repos
    repos = (
        db.query(Repository)
        .filter(Repository.user_id == user.id)
        .all()
    )

    # 🔥 Build advanced stats
    stats = build_stats(user, commits, repos)

    result = {
        "stats": stats,
        "commits_per_day": commits_per_day(db, user.id),
        "weekend_vs_weekday": weekend_vs_weekday_commits(db, user.id),
        "repository_activity": repository_activity(db, user.id),
        "commits": [
            {"date": c.commit_time.isoformat()}
            for c in commits
        ]
    }

    # 🔥 Store in Redis for 5 minutes
    redis_client.setex(cache_key, 300, json.dumps(result))

    return result


@router.get("/insights/{username}")
def insights(username: str, db: Session = Depends(get_db)):
    cache_key = f"insights:{username}"

    cached_data = redis_client.get(cache_key)

    if cached_data:
        print("CACHE HIT")
        return json.loads(cached_data)
    print("CACHE MISS - computing analytics")
    user = get_user_or_404(db, username)

    result = {
    "username": user.github_username,
    "insights": generate_insights(db, user.id)
    }

    redis_client.setex(cache_key, 300, json.dumps(result))

    return result

SAFE_THRESHOLD = 100


@router.get("/analyze/{username}")
def analyze_user(
    username: str,
    force_refresh: bool = False,
    github_token: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    rate_info = None

    # 🔒 Pre-check GitHub rate limit BEFORE ingestion
    remaining = get_rate_limit_remaining(github_token)

    if remaining < SAFE_THRESHOLD:
        raise HTTPException(
            status_code=429,
            detail=f"GitHub rate limit too low ({remaining}). Try later."
        )

    user = db.query(User).filter_by(
        github_username=username
    ).first()

    if force_refresh or not user or should_refresh(user):
        rate_info = ingest_user(username, github_token)

    return {
        "status": "Data ready",
        "rate_limit": rate_info
    }

@router.get("/heatmap/{username}")
def heatmap(username: str, db: Session = Depends(get_db)):

    user = get_user_or_404(db, username)

    one_year_ago = datetime.utcnow() - timedelta(days=365)

    results = (
        db.query(
            func.date(Commit.commit_time).label("date"),
            func.count(Commit.id).label("count")
        )
        .join(Repository, Repository.id == Commit.repo_id)
        .filter(
            Repository.user_id == user.id,
            Commit.commit_time >= one_year_ago
        )
        .group_by(func.date(Commit.commit_time))
        .all()
    )

    return [
        {"date": str(r.date), "count": r.count}
        for r in results
    ]