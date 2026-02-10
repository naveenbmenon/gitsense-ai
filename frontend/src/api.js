const BASE_URL = import.meta.env.VITE_API_URL;

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
