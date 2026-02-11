const BASE_URL = "https://gitsense-ai-2-vercel.onrender.com";

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined in production build");
}

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
