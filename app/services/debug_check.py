from app.database import SessionLocal
from app.models.user import User
from app.models.repository import Repository
from app.models.commit import Commit
from app.models.language import RepoLanguage

db = SessionLocal()

print("Users:", db.query(User).count())
print("Repositories:", db.query(Repository).count())
print("Commits:", db.query(Commit).count())
print("Languages:", db.query(RepoLanguage).count())

db.close()
