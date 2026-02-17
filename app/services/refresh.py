from datetime import datetime, timedelta

REFRESH_INTERVAL = timedelta(hours=6)

def should_refresh(user):
    if not user:
        return True

    if not user.last_fetched_at:
        return True

    return datetime.utcnow() - user.last_fetched_at > REFRESH_INTERVAL
