from app.celery.celery_app import celery_app
from app.services.ingest_github import ingest_user
from app.cache.redis_client import redis_client


@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 3}
)
def run_ingestion(self, username, github_token):
    try:
        print(f"Starting ingestion for {username}")

        ingest_user(username, github_token)

        print(f"Completed ingestion for {username}")

        # Clear stale cache after ingestion completes
        redis_client.delete(f"analytics:{username}")
        redis_client.delete(f"insights:{username}")
        print(f"Cache cleared for {username}")

    except Exception as e:
        print(f"Error ingesting {username}: {str(e)}")
        raise e