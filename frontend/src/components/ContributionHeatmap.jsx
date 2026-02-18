import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function ContributionHeatmap({ commits }) {
  if (!commits || commits.length === 0) {
    return <p>No commit data available</p>;
  }

  const heatmapData = commits.reduce((acc, commit) => {
    const date = new Date(commit.date).toISOString().split("T")[0];

    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }

    return acc;
  }, []);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>Contribution Activity</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
      />
    </div>
  );
}
