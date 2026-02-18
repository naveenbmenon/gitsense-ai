from collections import Counter
from datetime import datetime, timedelta
from typing import List


def calculate_streaks(commit_dates: List[datetime]):
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

    # Current streak (count backwards from today)
    today = datetime.utcnow().date()
    current_streak = 0

    day_pointer = today

    while day_pointer in unique_days:
        current_streak += 1
        day_pointer -= timedelta(days=1)

    return longest, current_streak


def calculate_peak_hour(commit_dates: List[datetime]):
    if not commit_dates:
        return None

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
    languages = [repo.language for repo in repos if repo.language]

    if not languages:
        return None

    counter = Counter(languages)
    return counter.most_common(1)[0][0]

def build_stats(user, commits, repos):
    commit_dates = [c.commit_time for c in commits if c.commit_time]


    longest_streak, current_streak = calculate_streaks(commit_dates)
    peak_hour = calculate_peak_hour(commit_dates)
    favorite_day = calculate_favorite_day(commit_dates)
    trend_percent = calculate_monthly_trend(commit_dates)
    top_language = calculate_top_language(repos)

    return {
        "total_commits": len(commits),
        "total_repos": len(repos),
        "top_language": top_language,
        "longest_streak": longest_streak,
        "current_streak": current_streak,
        "peak_hour": peak_hour,
        "favorite_day": favorite_day,
        "trend_percent": trend_percent
    }


