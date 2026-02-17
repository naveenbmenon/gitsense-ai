import requests
from app.config import GITHUB_API_BASE

def build_headers(github_token: str):
    return {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }

def get_user(username: str, github_token: str):
    url = f"{GITHUB_API_BASE}/users/{username}"
    return requests.get(url, headers=build_headers(github_token)).json()

def get_repositories(username: str, github_token: str):
    url = f"{GITHUB_API_BASE}/users/{username}/repos"
    return requests.get(url, headers=build_headers(github_token)).json()

def get_commits(username: str, repo: str, github_token: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/commits"
    return requests.get(url, headers=build_headers(github_token)).json()

def get_languages(username: str, repo: str, github_token: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/languages"
    return requests.get(url, headers=build_headers(github_token)).json()
