export default function Insights({ insights }) {
  return (
    <div>
      <h2>Insights</h2>

      {insights.length === 0 && <p>No insights available.</p>}

      {insights.map((i, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h4>{i.title}</h4>
          <p>{i.description}</p>
        </div>
      ))}
    </div>
  );
}
