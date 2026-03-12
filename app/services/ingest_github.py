from datetime import datetime
from app.database import SessionLocal
from app.models.user import User
from app.models.repository import Repository
from app.models.commit import Commit
from app.models.language import RepoLanguage
from app.cache.redis_client import redis_client
from app.services.github_client import (
    get_user,
    get_repositories,
    get_commits,
    get_languages
)


def parse_github_datetime(dt: str):
    return datetime.fromisoformat(dt.replace("Z", ""))


def ingest_user(username: str, github_token: str):

    db = SessionLocal()
    latest_rate_info = None

    try:
        # -----------------------------
        # 1️⃣ USER INGESTION
        # -----------------------------
        user_data = get_user(username, github_token)

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

        print(f"👤 User: {user.github_username} | last_fetched_at: {user.last_fetched_at}")

        # -----------------------------
        # 🔹 Load existing commit SHAs once
        # -----------------------------
        existing_shas = {
            sha for (sha,) in db.query(Commit.commit_sha).all()
        }
        print(f"🗄️ Total existing commit SHAs in DB: {len(existing_shas)}")

        # -----------------------------
        # 2️⃣ REPOSITORY INGESTION
        # -----------------------------
        repos, rate_info = get_repositories(username, github_token)
        latest_rate_info = rate_info
        print(f"📦 Total repos fetched from GitHub: {len(repos)}")

        for repo in repos:

            print(f"\n🔍 Processing repo: {repo['name']}")

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
                print(f"  ✅ Created new repo_obj (id={repo_obj.id})")
            else:
                repo_obj.stars = repo["stargazers_count"]
                repo_obj.forks = repo["forks_count"]
                repo_obj.last_pushed_at = parse_github_datetime(repo["pushed_at"])
                db.commit()
                print(f"  ♻️ Updated existing repo_obj (id={repo_obj.id})")

            # -----------------------------
            # 3️⃣ COMMIT INGESTION
            # -----------------------------
            existing_commit_count = db.query(Commit).filter_by(repo_id=repo_obj.id).count()
            print(f"  📊 Existing commits in DB for this repo: {existing_commit_count}")

            since_value = user.last_fetched_at if existing_commit_count > 0 else None
            print(f"  🕐 Using since={since_value}")

            commits, rate_info = get_commits(
                username,
                repo["name"],
                github_token,
                since=since_value
            )
            latest_rate_info = rate_info
            print(f"  📥 Commits fetched from GitHub: {len(commits)}")

            new_commits = []

            for c in commits:
                if c["sha"] in existing_shas:
                    continue

                commit = Commit(
                    repo_id=repo_obj.id,
                    commit_sha=c["sha"],
                    commit_time=parse_github_datetime(
                        c["commit"]["author"]["date"]
                    ),
                    commit_message_length=len(c["commit"]["message"])
                )

                new_commits.append(commit)
                existing_shas.add(c["sha"])

            print(f"  💾 New commits to insert: {len(new_commits)}")

            if new_commits:
                db.add_all(new_commits)

            # -----------------------------
            # 4️⃣ LANGUAGE INGESTION
            # -----------------------------
            db.query(RepoLanguage).filter_by(
                repo_id=repo_obj.id
            ).delete()

            languages = get_languages(username, repo["name"], github_token)

            new_languages = []

            for lang, bytes_used in languages.items():
                lang_obj = RepoLanguage(
                    repo_id=repo_obj.id,
                    language=lang,
                    bytes=bytes_used
                )
                new_languages.append(lang_obj)

            db.add_all(new_languages)
            db.commit()

        # -----------------------------
        # 5️⃣ UPDATE LAST FETCH TIME
        # -----------------------------
        user.last_fetched_at = datetime.utcnow()
        db.commit()

        print(f"\n✅ Ingestion complete for {username}")

        # -----------------------------
        # 🔥 Invalidate Redis cache
        # -----------------------------
        redis_client.delete(f"analytics:{username}")
        redis_client.delete(f"insights:{username}")

        return latest_rate_info

    except Exception as e:
        print(f"❌ Ingestion error: {e}")
        raise

    finally:
        db.close()