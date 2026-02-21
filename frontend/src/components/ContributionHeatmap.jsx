import CalendarHeatmap from "react-calendar-heatmap";

// Helper function to assign CSS classes based on commit count intensity
const getScaleClass = (value) => {
  if (!value || value.count === 0) {
    return "color-empty";
  }
  // Adjust these thresholds based on how active your typical user is
  if (value.count <= 2) return "color-scale-1";
  if (value.count <= 5) return "color-scale-2";
  if (value.count <= 9) return "color-scale-3";
  return "color-scale-4"; // 10+ commits
};

export default function ContributionHeatmap({ commits }) {
  if (!commits || commits.length === 0) {
    return (
      <div className="card-enhanced" style={{ marginBottom: "40px" }}>
        <p style={{ color: "var(--text-secondary)" }}>No commit data available</p>
      </div>
    );
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
    <div className="card-enhanced" style={{ marginBottom: "40px" }}>
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>
        Contribution Activity (Past Year)
      </h3>
      <div style={{ overflowX: "auto" }}> {/* Ensures it doesn't break layout on small screens */}
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapData}
          classForValue={getScaleClass}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
}