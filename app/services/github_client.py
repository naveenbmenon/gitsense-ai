import requests
from app.config import GITHUB_API_BASE


def build_headers(github_token: str):
    return {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }


def _make_request(url: str, github_token: str, params=None):
    response = requests.get(
        url,
        headers=build_headers(github_token),
        params=params
    )

    if response.status_code != 200:
        raise Exception(
            f"GitHub API error {response.status_code}: {response.text}"
        )

    rate_limit = {
        "remaining": int(response.headers.get("X-RateLimit-Remaining", 0)),
        "reset": response.headers.get("X-RateLimit-Reset")
    }

    return response.json(), rate_limit


def _fetch_all_pages(url: str, github_token: str):
    results = []
    page = 1
    rate_limit_info = {}

    while True:
        data, rate_limit_info = _make_request(
            url,
            github_token,
            params={"per_page": 100, "page": page}
        )

        if not data:
            break

        results.extend(data)
        page += 1

    return results, rate_limit_info


def get_user(username: str, github_token: str):
    url = f"{GITHUB_API_BASE}/users/{username}"
    data, rate_limit = _make_request(url, github_token)
    return data


def get_repositories(username: str, github_token: str):
    url = f"{GITHUB_API_BASE}/users/{username}/repos"
    repos, rate_limit = _fetch_all_pages(url, github_token)
    return repos, rate_limit


def get_commits(username: str, repo: str, github_token: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/commits"
    commits, rate_limit = _fetch_all_pages(url, github_token)
    return commits, rate_limit

def get_languages(username: str, repo: str, github_token: str):
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo}/languages"
    data, rate_limit = _make_request(url, github_token)
    return data

def get_rate_limit_remaining(github_token: str):
    url = f"{GITHUB_API_BASE}/rate_limit"
    data, _ = _make_request(url, github_token)
    return data["rate"]["remaining"]

