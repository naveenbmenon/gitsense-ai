import { useEffect, useState } from "react";
import { fetchSummary, fetchAnalytics, fetchInsights } from "./api";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import Insights from "./components/Insights";

const BACKEND_URL = "https://gitsense-ai-2-vercel.onrender.com";

export default function App() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);

  // 🔐 Check login status
  useEffect(() => {
    fetch(`${BACKEND_URL}/user/me`, {
      credentials: "include", // IMPORTANT for cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // 📊 Fetch dashboard data once user is authenticated
  useEffect(() => {
    if (!user) return;

    const username = user.login;

    fetchSummary(username).then(setSummary);
    fetchAnalytics(username).then(setAnalytics);
    fetchInsights(username).then((res) =>
      setInsights(res.insights || [])
    );
  }, [user]);

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  const handleLogout = () => {
    // Optional improvement later: create backend logout route
    setUser(null);
    setSummary(null);
    setAnalytics(null);
    setInsights([]);
  };

  // 🚪 If not logged in
  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

  // ⏳ Loading dashboard
  if (!summary || !analytics) {
    return <p style={{ padding: "20px" }}>Loading dashboard…</p>;
  }

  // ✅ Dashboard
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>GitSense AI Dashboard</h1>
        <div>
          <span style={{ marginRight: "15px" }}>
            Logged in as <strong>{user.login}</strong>
          </span>
          <button onClick={handleLogout}>Logout</button>
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
