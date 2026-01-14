from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base

class Commit(Base):
    __tablename__ = "commits"

    id = Column(Integer, primary_key=True, index=True)
    repo_id = Column(Integer, ForeignKey("repositories.id"))
    commit_sha = Column(String, unique=True)
    commit_time = Column(DateTime)
    commit_message_length = Column(Integer)
