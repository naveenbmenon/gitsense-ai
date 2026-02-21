import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Global default color for dark mode charts
ChartJS.defaults.color = "#a1a1aa";
ChartJS.defaults.font.family = "'Inter', sans-serif";

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "#f4f4f5" } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#a1a1aa" } },
    y: { grid: { color: "#27272a" }, ticks: { color: "#a1a1aa" } }
  }
};

export default function Charts({ analytics, languages }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#fff" }}>📊 Analytics</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
        <CommitsPerDayChart data={analytics.commits_per_day} />
        <WeekendWeekdayChart data={analytics.weekend_vs_weekday} />
        <LanguageChart data={languages} />
      </div>
    </div>
  );
}

function CommitsPerDayChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="card-enhanced" style={{ height: "350px", display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "20px" }}>Commits per Day</h3>
      <div style={{ flex: 1 }}>
        <Line
          options={{ ...commonOptions, tension: 0.4 }}
          data={{
            labels,
            datasets: [{
              label: "Commits",
              data: values,
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.5)",
              borderWidth: 3,
              pointBackgroundColor: "#09090b",
              pointBorderColor: "#8b5cf6",
              pointBorderWidth: 2,
              pointRadius: 4,
            }]
          }}
        />
      </div>
    </div>
  );
}

function WeekendWeekdayChart({ data }) {
  const labels = ["Weekday", "Weekend"];
  const values = [data.weekday, data.weekend];

  return (
    <div className="card-enhanced" style={{ height: "350px", display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "20px" }}>Weekday vs Weekend</h3>
      <div style={{ flex: 1 }}>
        <Bar
          options={{
            ...commonOptions,
            scales: {
              ...commonOptions.scales,
              x: { grid: { display: false } }
            }
          }}
          data={{
            labels,
            datasets: [{
              label: "Commits",
              data: values,
              backgroundColor: ["#3b82f6", "#10b981"],
              borderRadius: 8,
            }]
          }}
        />
      </div>
    </div>
  );
}

function LanguageChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="card-enhanced" style={{ height: "350px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ marginBottom: "20px", alignSelf: "flex-start" }}>Language Distribution</h3>
      <div style={{ flex: 1, width: "100%", maxWidth: "300px" }}>
        <Pie
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: "#f4f4f5", padding: 20 } } }
          }}
          data={{
            labels,
            datasets: [{
              data: values,
              backgroundColor: ["#6366f1", "#ec4899", "#8b5cf6", "#14b8a6", "#f59e0b"],
              borderColor: "#18181b",
              borderWidth: 3,
            }]
          }}
        />
      </div>
    </div>
  );
}