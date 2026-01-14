import { useEffect, useState } from "react";
import { fetchSummary, fetchAnalytics, fetchInsights } from "./api";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import Insights from "./components/Insights";

export default function App() {
  const username = "naveenbmenon";

  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchSummary(username).then(setSummary);
    fetchAnalytics(username).then(setAnalytics);
    fetchInsights(username).then(res => setInsights(res.insights || []));
  }, []);

  if (!summary || !analytics) {
    return <p style={{ padding: "20px" }}>Loading dashboard…</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>GitSense AI Dashboard</h1>

      <Summary data={summary} />
      <Charts
  analytics={analytics}
  languages={summary.language_distribution}
/>

      <Insights insights={insights} />
    </div>
  );
}
