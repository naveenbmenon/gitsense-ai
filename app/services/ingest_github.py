from datetime import datetime
from app.database import SessionLocal
from app.models.user import User
from app.models.repository import Repository
from app.models.commit import Commit
from app.models.language import RepoLanguage
from app.services.github_client import (
    get_user,
    get_repositories,
    get_commits,
    get_languages
)


def parse_github_datetime(dt: str):
    """
    Converts GitHub ISO timestamp to Python datetime
    """
    return datetime.fromisoformat(dt.replace("Z", ""))


def ingest_user(username: str):
    db = SessionLocal()

    try:
        # -----------------------------
        # 1️⃣ USER INGESTION (IDEMPOTENT)
        # -----------------------------
        user_data = get_user(username)

        if "login" not in user_data:
            raise Exception(f"GitHub API error: {user_data}")

        user = db.query(User).filter_by(
            github_username=user_data["login"]
        ).first()

        if not user:
            user = User(github_username=user_data["login"])
            db.add(user)
            db.commit()
            db.refresh(user)

        # -----------------------------
        # 2️⃣ REPOSITORY INGESTION
        # -----------------------------
        repos = get_repositories(username)

        for repo in repos:
            repo_obj = db.query(Repository).filter_by(
                user_id=user.id,
                repo_name=repo["name"]
            ).first()

            if not repo_obj:
                repo_obj = Repository(
                    user_id=user.id,
                    repo_name=repo["name"],
                    is_fork=repo["fork"],
                    stars=repo["stargazers_count"],
                    forks=repo["forks_count"],
                    created_at=parse_github_datetime(repo["created_at"]),
                    last_pushed_at=parse_github_datetime(repo["pushed_at"])
                )
                db.add(repo_obj)
                db.commit()
                db.refresh(repo_obj)
            else:
                # Update mutable fields (important for future syncs)
                repo_obj.stars = repo["stargazers_count"]
                repo_obj.forks = repo["forks_count"]
                repo_obj.last_pushed_at = parse_github_datetime(repo["pushed_at"])
                db.commit()

            # -----------------------------
            # 3️⃣ COMMIT INGESTION
            # -----------------------------
            commits = get_commits(username, repo["name"])

            for c in commits:
                exists = db.query(Commit).filter_by(
                    commit_sha=c["sha"]
                ).first()

                if exists:
                    continue

                commit = Commit(
                    repo_id=repo_obj.id,
                    commit_sha=c["sha"],
                    commit_time=parse_github_datetime(
                        c["commit"]["author"]["date"]
                    ),
                    commit_message_length=len(c["commit"]["message"])
                )
                db.add(commit)

            # -----------------------------
            # 4️⃣ LANGUAGE INGESTION
            # -----------------------------
            # Clear old language data (GitHub returns full snapshot)
            db.query(RepoLanguage).filter_by(
                repo_id=repo_obj.id
            ).delete()

            languages = get_languages(username, repo["name"])
            for lang, bytes_used in languages.items():
                lang_obj = RepoLanguage(
                    repo_id=repo_obj.id,
                    language=lang,
                    bytes=bytes_used
                )
                db.add(lang_obj)

            db.commit()

    finally:
        db.close()
