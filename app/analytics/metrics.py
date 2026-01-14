from datetime import datetime, timedelta
from collections import defaultdict
from sqlalchemy.orm import Session

from app.models.commit import Commit
from app.models.repository import Repository
from app.models.language import RepoLanguage

def total_commits(db: Session, user_id: int) -> int:
    return (
        db.query(Commit)
        .join(Repository)
        .filter(Repository.user_id == user_id)
        .count()
    )

def commits_per_day(db: Session, user_id: int):
    data = defaultdict(int)

    commits = (
        db.query(Commit)
        .join(Repository)
        .filter(Repository.user_id == user_id)
        .all()
    )

    for c in commits:
        day = c.commit_time.date().isoformat()
        data[day] += 1

    return dict(sorted(data.items()))

def weekend_vs_weekday_commits(db: Session, user_id: int):
    weekend = 0
    weekday = 0

    commits = (
        db.query(Commit)
        .join(Repository)
        .filter(Repository.user_id == user_id)
        .all()
    )

    for c in commits:
        if c.commit_time.weekday() >= 5:
            weekend += 1
        else:
            weekday += 1

    return {
        "weekday": weekday,
        "weekend": weekend
    }

def repository_activity(db: Session, user_id: int, inactive_days: int = 60):
    active = []
    inactive = []

    threshold = datetime.utcnow() - timedelta(days=inactive_days)

    repos = (
        db.query(Repository)
        .filter(Repository.user_id == user_id)
        .all()
    )

    for repo in repos:
        if repo.last_pushed_at and repo.last_pushed_at >= threshold:
            active.append(repo.repo_name)
        else:
            inactive.append(repo.repo_name)

    return {
        "active_repos": active,
        "inactive_repos": inactive
    }
def language_distribution(db: Session, user_id: int):
    totals = defaultdict(int)

    rows = (
        db.query(RepoLanguage)
        .join(Repository)
        .filter(Repository.user_id == user_id)
        .all()
    )

    for row in rows:
        totals[row.language] += row.bytes

    total_bytes = sum(totals.values())

    distribution = {}
    for lang, bytes_used in totals.items():
        distribution[lang] = round((bytes_used / total_bytes) * 100, 2)

    return dict(sorted(distribution.items(), key=lambda x: x[1], reverse=True))

