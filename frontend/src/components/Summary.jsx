export default function Summary({ data }) {
  const languages = data.language_distribution || {};
  const topLanguage = Object.keys(languages)[0] || "N/A";

  return (
    <div className="card-enhanced" style={{ display: "flex", gap: "40px", alignItems: "center", marginBottom: "40px" }}>
      <div>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#fff" }}>Profile Summary</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px" }}>Analyzing data for <strong>@{data.username}</strong></p>
      </div>
      <div style={{ display: "flex", gap: "24px", marginLeft: "auto" }}>
        <div style={{ textAlign: "right" }}>
          <small style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px" }}>Total Commits</small>
          <p style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#fff" }}>{data.total_commits}</p>
        </div>
        <div style={{ width: "1px", background: "var(--border-color)" }}></div>
        <div style={{ textAlign: "right" }}>
          <small style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px" }}>Top Language</small>
          <p style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#a855f7" }}>{topLanguage}</p>
        </div>
      </div>
    </div>
  );
}