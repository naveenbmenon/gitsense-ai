const BASE_URL = "http://127.0.0.1:8000";

export async function fetchSummary(username) {
  const res = await fetch(`${BASE_URL}/summary/${username}`);
  return res.json();
}

export async function fetchAnalytics(username) {
  const res = await fetch(`${BASE_URL}/analytics/${username}`);
  return res.json();
}

export async function fetchInsights(username) {
  const res = await fetch(`${BASE_URL}/insights/${username}`);
  return res.json();
}
