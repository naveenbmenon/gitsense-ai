from collections import Counter
from datetime import datetime, timedelta
from typing import List
import pytz  
IST = pytz.timezone('Asia/Kolkata')  


def calculate_streaks(commit_dates):
    if not commit_dates:
        return 0, 0

    unique_days = sorted(set(d.date() for d in commit_dates))
    longest = 1
    current = 1

    for i in range(1, len(unique_days)):
        if unique_days[i] == unique_days[i - 1] + timedelta(days=1):
            current += 1
        else:
            longest = max(longest, current)
            current = 1

    longest = max(longest, current)

    # Use IST for today
    today = datetime.now(IST).date()  # CHANGED
    current_streak = 0
    day_pointer = today

    while day_pointer in unique_days:
        current_streak += 1
        day_pointer -= timedelta(days=1)

    return longest, current_streak


def calculate_peak_hour(commit_dates):
    if not commit_dates:
        return None
    # Hours are already in IST if converted before calling
    hour_counts = Counter(d.hour for d in commit_dates)
    peak_hour = hour_counts.most_common(1)[0][0]
    return peak_hour


def calculate_favorite_day(commit_dates: List[datetime]):
    if not commit_dates:
        return None

    weekday_counts = Counter(d.weekday() for d in commit_dates)
    favorite_day = weekday_counts.most_common(1)[0][0]
    return favorite_day


def calculate_monthly_trend(commit_dates: List[datetime]):
    if not commit_dates:
        return 0

    month_counts = Counter((d.year, d.month) for d in commit_dates)
    sorted_months = sorted(month_counts.keys())

    if len(sorted_months) < 2:
        return 0

    last_month = month_counts[sorted_months[-1]]
    prev_month = month_counts[sorted_months[-2]]

    if prev_month == 0:
        return 100

    trend_percent = ((last_month - prev_month) / prev_month) * 100
    return round(trend_percent, 2)


def calculate_top_language(repos):
    # If repository model does not store language yet,
    # return None to avoid crashing.
    return None




def calculate_personality(stats: dict):

    consistency_score = 0
    momentum_score = 0
    depth_score = 0
    behavior_score = 0

    # 🔥 Consistency
    if stats["current_streak"] >= 14:
        consistency_score += 3
    elif stats["current_streak"] >= 7:
        consistency_score += 2
    elif stats["current_streak"] >= 3:
        consistency_score += 1

    if stats["longest_streak"] >= 30:
        consistency_score += 2
    elif stats["longest_streak"] >= 14:
        consistency_score += 1

    # 📈 Momentum
    if stats["trend_percent"] >= 25:
        momentum_score += 3
    elif stats["trend_percent"] >= 10:
        momentum_score += 2
    elif stats["trend_percent"] > 0:
        momentum_score += 1
    elif stats["trend_percent"] < -20:
        momentum_score -= 1

    # 🚀 Depth
    if stats["total_repos"] >= 25:
        depth_score += 2
    elif stats["total_repos"] >= 10:
        depth_score += 1

    if stats["total_commits"] >= 1000:
        depth_score += 2
    elif stats["total_commits"] >= 300:
        depth_score += 1

    # 🌙 Behavior
    peak_hour = stats.get("peak_hour")

    if peak_hour is not None:
        if peak_hour >= 22 or peak_hour <= 3:
            behavior_score += 1
        elif 6 <= peak_hour <= 9:
            behavior_score += 1

    total_score = (
        consistency_score
        + momentum_score
        + depth_score
        + behavior_score
    )

    if total_score >= 8:
        label = "Elite Consistency Architect"
    elif total_score >= 6:
        label = "Momentum-Driven Builder"
    elif total_score >= 4:
        label = "Focused Growth Developer"
    elif total_score >= 2:
        label = "Emerging Contributor"
    else:
        label = "Rebuilding Phase Explorer"

    return {
        "label": label,
        "score": total_score,
        "breakdown": {
            "consistency": consistency_score,
            "momentum": momentum_score,
            "depth": depth_score,
            "behavior": behavior_score
        }
    }
def detect_anomaly(commit_dates):
    if not commit_dates:
        return {"anomaly": False}

    now = datetime.now(IST).replace(tzinfo=None)
    seven_days_ago = now - timedelta(days=7)
    thirty_days_ago = now - timedelta(days=30)

    recent = [d for d in commit_dates if d >= seven_days_ago]
    monthly = [d for d in commit_dates if d >= thirty_days_ago]

    weekly_avg = len(monthly) / 4
    this_week = len(recent)

    if weekly_avg > 0 and this_week < weekly_avg * 0.6:
        drop = int((1 - this_week / weekly_avg) * 100)
        return {
            "anomaly": True,
            "type": "activity_drop",
            "message": f"Commit frequency dropped {drop}% below your 4-week average"
        }

    if weekly_avg > 0 and this_week > weekly_avg * 1.5:
        spike = int((this_week / weekly_avg - 1) * 100)
        return {
            "anomaly": True,
            "type": "activity_spike",
            "message": f"Commit frequency spiked {spike}% above your 4-week average"
        }

    return {"anomaly": False}

def build_stats(user, commits, repos):
    # Convert all commit times to IST before any calculation
    commit_dates = []
    for c in commits:
        if c.commit_time:
            if c.commit_time.tzinfo is None:
                ist_time = pytz.utc.localize(c.commit_time).astimezone(IST)
            else:
                ist_time = c.commit_time.astimezone(IST)
            # Strip tzinfo for naive datetime operations
            commit_dates.append(ist_time.replace(tzinfo=None))

    # Rest of your build_stats stays exactly the same
    longest_streak, current_streak = calculate_streaks(commit_dates)
    peak_hour = calculate_peak_hour(commit_dates)
    favorite_day = calculate_favorite_day(commit_dates)
    trend_percent = calculate_monthly_trend(commit_dates)
    top_language = calculate_top_language(repos)
    weekly = calculate_weekly_activity(commit_dates)
    top_repos = calculate_top_repos_last_30_days(commits, repos)
    momentum = calculate_momentum(trend_percent, current_streak)

    stats = {
        "total_commits": len(commits),
        "total_repos": len(repos),
        "top_language": top_language,
        "longest_streak": longest_streak,
        "current_streak": current_streak,
        "peak_hour": peak_hour,
        "favorite_day": favorite_day,
        "trend_percent": trend_percent,
        "weekly": weekly,
        "top_repos": top_repos,
        "momentum": momentum,
    }

    # 🧬 Add personality classification
    stats["personality"] = calculate_personality(stats)
    stats["anomaly"] = detect_anomaly(commit_dates)

    return stats


def calculate_weekly_activity(commit_dates):
    if not commit_dates:
        return {"commits": 0, "active_days": 0, "delta_percent": 0}

    now = datetime.now(IST).replace(tzinfo=None)  # CHANGED
    seven_days_ago = now - timedelta(days=7)
    fourteen_days_ago = now - timedelta(days=14)

    this_week = []
    last_week = []

    for dt in commit_dates:
        if dt >= seven_days_ago:
            this_week.append(dt)
        elif fourteen_days_ago <= dt < seven_days_ago:
            last_week.append(dt)

    this_week_count = len(this_week)
    last_week_count = len(last_week)
    active_days = len(set(d.date() for d in this_week))

    if last_week_count == 0:
        delta_percent = 100 if this_week_count > 0 else 0
    else:
        delta_percent = ((this_week_count - last_week_count) / last_week_count) * 100

    return {
        "commits": this_week_count,
        "active_days": active_days,
        "delta_percent": round(delta_percent, 2)
    }

def calculate_top_repos_last_30_days(commits, repos):
    from collections import Counter
    from datetime import datetime, timedelta

    now = datetime.utcnow()
    thirty_days_ago = now - timedelta(days=30)

    repo_counter = Counter()

    for c in commits:
        if c.commit_time and c.commit_time >= thirty_days_ago:
            repo_counter[c.repo_id] += 1

    # ✅ Map repo_id -> repo_name (correct field)
    repo_map = {r.id: r.repo_name for r in repos}

    top_three = repo_counter.most_common(3)

    return [
        {
            "name": repo_map.get(repo_id, "Unknown"),
            "commits": count
        }
        for repo_id, count in top_three
    ]
def calculate_momentum(trend_percent: float, current_streak: int):

    if trend_percent >= 20 and current_streak >= 3:
        return {
            "label": "On Fire",
            "category": "high"
        }

    elif trend_percent >= 5:
        return {
            "label": "Rising",
            "category": "medium"
        }

    elif -5 <= trend_percent < 5:
        return {
            "label": "Stable",
            "category": "neutral"
        }

    else:
        return {
            "label": "Cooling Down",
            "category": "low"
        }
    
