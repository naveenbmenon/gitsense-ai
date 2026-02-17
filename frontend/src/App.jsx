import { useEffect, useState } from "react";
import { fetchSummary, fetchAnalytics, fetchInsights } from "./api";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import Insights from "./components/Insights";

const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function App() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Check login status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("jwt", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("jwt");

    if (!token) {
      setUser(null);
      return;
    }

    fetch(`${BACKEND_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser(null);
      });
  }, []);

  // 📊 Fetch dashboard data once authenticated
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);

      const username = user.login;
      const token = localStorage.getItem("jwt");

      // Trigger analyze (auto refresh if stale)
      await fetch(`${BACKEND_URL}/analyze/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const s = await fetchSummary(username);
      const a = await fetchAnalytics(username);
      const i = await fetchInsights(username);

      setSummary(s);
      setAnalytics(a);
      setInsights(i.insights || []);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setSummary(null);
    setAnalytics(null);
    setInsights([]);
  };

  // 🔄 Manual Force Refresh
  const handleRefresh = async () => {
    setLoading(true);

    const token = localStorage.getItem("jwt");

    await fetch(
      `${BACKEND_URL}/analyze/${user.login}?force_refresh=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Reload fresh data
    const s = await fetchSummary(user.login);
    const a = await fetchAnalytics(user.login);
    const i = await fetchInsights(user.login);

    setSummary(s);
    setAnalytics(a);
    setInsights(i.insights || []);
    setLoading(false);
  };

  // 🚪 Not logged in
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleLogin}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login with GitHub
        </button>
      </div>
    );
  }

  // ⏳ Loading
  if (loading || !summary || !analytics) {
    return <p style={{ padding: "20px" }}>Loading dashboard…</p>;
  }

  // ✅ Dashboard
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>GitSense AI Dashboard</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>
            Logged in as <strong>{user.login}</strong>
          </span>

          <button
            onClick={handleRefresh}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Summary data={summary} />

      <Charts
        analytics={analytics}
        languages={summary.language_distribution}
      />

      <Insights insights={insights} />
    </div>
  );
}
