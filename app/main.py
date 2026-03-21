from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.api.auth import router as auth_router
from app.database import Base, engine
from contextlib import asynccontextmanager

# Import ALL your models here so create_all knows about them yey
from app.models import User, Repository , Commit  # replace with your actual model names

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)  # only one app instance is created

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gitsense-ai-dashboard.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)