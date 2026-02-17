const BASE_URL = "https://gitsense-ai-2.onrender.com";

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined in production build");
}

function getAuthHeaders() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchSummary(username) {
  const res = await fetch(`${BASE_URL}/summary/${username}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch summary");

  return res.json();
}

export async function fetchAnalytics(username) {
  const res = await fetch(`${BASE_URL}/analytics/${username}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch analytics");

  return res.json();
}

export async function fetchInsights(username) {
  const res = await fetch(`${BASE_URL}/insights/${username}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch insights");

  return res.json();
}
