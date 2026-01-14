from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class RepoLanguage(Base):
    __tablename__ = "repo_languages"

    id = Column(Integer, primary_key=True, index=True)
    repo_id = Column(Integer, ForeignKey("repositories.id"))
    language = Column(String)
    bytes = Column(Integer)
