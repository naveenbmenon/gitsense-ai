from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="GitSense AI",
    description="AI-powered GitHub analytics and developer intelligence platform",
    version="0.1.0"
)

# ✅ ADD CORS IMMEDIATELY AFTER app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gitsense-ai-dashboard.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
