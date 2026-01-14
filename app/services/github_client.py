import requests
from app.config import GITHUB_TOKEN, GITHUB_API_BASE

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def get_user(username: str):
    url = f"{GITHUB_API_BASE}/users/{username}"
    return requests.get(url, headers=headers).json()

def get_repositories(username: str):
    url = f"{GITHUB_API_BASE}/users/{username}/repos"
    return requests.get(url, headers=headers).json()

def get_commits(username: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/commits"
    return requests.get(url, headers=headers).json()

def get_languages(username: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/languages"
    return requests.get(url, headers=headers).json()
