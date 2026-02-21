export default function Insights({ insights }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#fff" }}>✨ AI Insights</h2>

      {insights.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No insights available.</p>}

      <div style={{ display: "grid", gap: "16px" }}>
        {insights.map((i, idx) => (
          <div
            key={idx}
            className="card-enhanced"
            style={{
              borderLeft: "4px solid #a855f7",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#f4f4f5", fontSize: "16px" }}>{i.title}</h4>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}