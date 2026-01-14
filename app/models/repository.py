from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    repo_name = Column(String, index=True)
    is_fork = Column(Boolean)
    stars = Column(Integer)
    forks = Column(Integer)
    created_at = Column(DateTime)
    last_pushed_at = Column(DateTime)
