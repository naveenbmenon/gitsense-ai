from typing import List, Dict
from sqlalchemy.orm import Session

from app.analytics.metrics import (
    total_commits,
    commits_per_day,
    weekend_vs_weekday_commits,
    repository_activity,
    language_distribution
)

def weekend_activity_insight(db: Session, user_id: int):
    stats = weekend_vs_weekday_commits(db, user_id)

    total = stats["weekday"] + stats["weekend"]
    if total == 0:
        return None

    weekend_pct = round((stats["weekend"] / total) * 100, 2)

    if weekend_pct < 30:
        return None

    return {
        "type": "activity",
        "title": "High Weekend Activity",
        "description": f"{weekend_pct}% of your commits happened on weekends.",
        "data": {
            "weekend_percentage": weekend_pct
        }
    }

def inactive_repositories_insight(db: Session, user_id: int):
    activity = repository_activity(db, user_id)
    inactive_count = len(activity["inactive_repos"])

    if inactive_count == 0:
        return None

    return {
        "type": "repository",
        "title": "Inactive Repositories Detected",
        "description": f"{inactive_count} repositories have not been updated recently.",
        "data": {
            "inactive_repos": activity["inactive_repos"]
        }
    }


def language_concentration_insight(db: Session, user_id: int):
    dist = language_distribution(db, user_id)

    if not dist:
        return None

    top_lang, pct = next(iter(dist.items()))

    if pct < 50:
        return None

    return {
        "type": "skill",
        "title": "Strong Language Concentration",
        "description": f"{pct}% of your code is written in {top_lang}.",
        "data": {
            "language": top_lang,
            "percentage": pct
        }
    }


def generate_insights(db: Session, user_id: int) -> List[Dict]:
    insights = []

    for insight_fn in [
        weekend_activity_insight,
        inactive_repositories_insight,
        language_concentration_insight
    ]:
        result = insight_fn(db, user_id)
        if result:
            insights.append(result)

    return insights


