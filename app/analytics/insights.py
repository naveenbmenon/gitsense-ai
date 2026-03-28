from typing import List, Dict
from sqlalchemy.orm import Session
from google import genai
import os
import json

from app.analytics.metrics import (
    total_commits,
    commits_per_day,
    weekend_vs_weekday_commits,
    repository_activity,
    language_distribution
)
from app.models.commit import Commit
from app.models.repository import Repository

# Configure Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


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
        "data": {"weekend_percentage": weekend_pct}
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
        "data": {"inactive_repos": activity["inactive_repos"]}
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
        "data": {"language": top_lang, "percentage": pct}
    }


def generate_health_score(db: Session, user_id: int):
    try:
        from datetime import datetime, timedelta
        import pytz
        IST = pytz.timezone('Asia/Kolkata')

        commits = (
            db.query(Commit)
            .join(Repository)
            .filter(Repository.user_id == user_id)
            .all()
        )

        if not commits:
            return None

        now = datetime.now(IST).replace(tzinfo=None)
        seven_days_ago = now - timedelta(days=7)
        thirty_days_ago = now - timedelta(days=30)

        recent_commits = [c for c in commits
                         if c.commit_time and c.commit_time >= seven_days_ago]
        monthly_commits = [c for c in commits
                          if c.commit_time and c.commit_time >= thirty_days_ago]

        late_night = [c for c in monthly_commits
                     if c.commit_time and c.commit_time.hour >= 22]
        late_night_pct = round(len(late_night) / max(len(monthly_commits), 1) * 100)

        weekend = [c for c in monthly_commits
                  if c.commit_time and c.commit_time.weekday() >= 5]
        weekend_pct = round(len(weekend) / max(len(monthly_commits), 1) * 100)

        weekly_avg = len(monthly_commits) / 4
        this_week = len(recent_commits)

        prompt = f"""
        Analyze this developer's GitHub activity and provide a health assessment.

        Stats:
        - Total commits: {len(commits)}
        - This week: {this_week} commits
        - Monthly average per week: {round(weekly_avg, 1)} commits
        - Late night commits (after 10 PM): {late_night_pct}%
        - Weekend commits: {weekend_pct}%

        Return ONLY a JSON object with exactly these fields:
        {{
            "health_score": <number 0-100>,
            "status": "<one of: Excellent, Good, Fair, Needs Attention>",
            "primary_concern": "<one sentence about biggest concern or positive>",
            "recommendation": "<one specific actionable recommendation>",
            "pattern_insight": "<one interesting observation about their coding pattern>"
        }}

        No markdown, no backticks, just raw JSON.
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        text = response.text.strip()

        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        text = text.strip()

        data = json.loads(text)

        return {
            "type": "ai_health",
            "title": "Developer Health Score",
            "data": data
        }

    except Exception as e:
        print(f"Health score generation failed: {e}")
        import traceback
        traceback.print_exc()
        return None


def generate_commit_story(db: Session, user_id: int):
    try:
        from datetime import datetime, timedelta
        from collections import defaultdict
        import pytz
        IST = pytz.timezone('Asia/Kolkata')

        now = datetime.now(IST).replace(tzinfo=None)
        thirty_days_ago = now - timedelta(days=30)

        commits = (
            db.query(Commit, Repository)
            .join(Repository, Repository.id == Commit.repo_id)
            .filter(
                Repository.user_id == user_id,
                Commit.commit_time >= thirty_days_ago
            )
            .order_by(Commit.commit_time.desc())
            .all()
        )

        if not commits:
            return None

        repo_commits = defaultdict(int)
        for commit, repo in commits:
            repo_commits[repo.repo_name] += 1

        summary = []
        for repo_name, count in repo_commits.items():
            summary.append({
                "repo": repo_name,
                "commit_count": count
            })

        prompt = f"""
        A developer made these GitHub commits in the last 30 days.
        Write a 3-4 sentence narrative story of what they built and how productive they were.

        Activity: {json.dumps(summary)}

        Rules:
        - Write in second person ("You spent this month...")
        - Be specific about which repositories they worked on
        - Mention their most active repository
        - Sound encouraging and insightful
        - Keep it under 100 words
        - Return ONLY the narrative text, no JSON, no formatting
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        story = response.text.strip()

        return {
            "type": "ai_story",
            "title": "Your Month in Code",
            "data": {
                "story": story,
                "repos_active": len(repo_commits),
                "total_commits": len(commits)
            }
        }

    except Exception as e:
        print(f"Commit story generation failed: {e}")
        import traceback
        traceback.print_exc()
        return None


def generate_insights(db: Session, user_id: int) -> List[Dict]:
    insights = []

    for insight_fn in [
        weekend_activity_insight,
        inactive_repositories_insight,
        language_concentration_insight,
        generate_health_score,
        generate_commit_story,
    ]:
        result = insight_fn(db, user_id)
        if result:
            insights.append(result)

    return insights