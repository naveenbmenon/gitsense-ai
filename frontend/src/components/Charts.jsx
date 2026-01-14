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

export default function Charts({ analytics, languages }) {

  return (
    <div>
      <h2>Analytics</h2>

      <CommitsPerDayChart data={analytics.commits_per_day} />
      <WeekendWeekdayChart data={analytics.weekend_vs_weekday} />
      <LanguageChart data={languages} />

    </div>
  );
}

function CommitsPerDayChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div style={{ maxWidth: "700px", marginBottom: "40px" }}>
      <h3>Commits per Day</h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Commits",
              data: values,
              borderWidth: 2
            }
          ]
        }}
      />
    </div>
  );
}


function WeekendWeekdayChart({ data }) {
  const labels = ["Weekday", "Weekend"];
  const values = [data.weekday, data.weekend];

  return (
    <div style={{ maxWidth: "500px", marginBottom: "40px" }}>
      <h3>Weekday vs Weekend Activity</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Commits",
              data: values
            }
          ]
        }}
      />
    </div>
  );
}

function LanguageChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div style={{ maxWidth: "500px", marginBottom: "40px" }}>
      <h3>Language Distribution</h3>
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values
            }
          ]
        }}
      />
    </div>
  );
}

