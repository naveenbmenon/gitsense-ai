from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import RedirectResponse
import httpx
import os
from jose import jwt, JWTError
from datetime import datetime, timedelta


router = APIRouter()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
FRONTEND_URL=os.getenv("FRONTEND_URL")

JWT_SECRET = os.getenv("JWT_SECRET")

JWT_ALGORITHM = "HS256"


@router.get("/auth/login")
async def github_login():
    github_auth_url = (
        f"https://github.com/login/oauth/authorize?"
        f"client_id={GITHUB_CLIENT_ID}&"
        f"scope=read:user,repo"
    )
    return RedirectResponse(github_auth_url)


@router.get("/auth/callback")
async def github_callback(code: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )

        token_data = response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="OAuth failed")

    # Create JWT containing GitHub token
    payload = {
        "github_token": access_token,
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    jwt_token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    # 🔥 Redirect to frontend WITH token
    return RedirectResponse(
        url=f"{FRONTEND_URL}?token={jwt_token}"
    )


from fastapi import Header

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["github_token"]

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")



@router.get("/user/me")
async def get_user(github_token: str = Depends(get_current_user)):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.github.com/user",
            headers={"Authorization": f"Bearer {github_token}"}
        )
        return response.json()
