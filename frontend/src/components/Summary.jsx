export default function Summary({ data }) {
  const languages = data.language_distribution || {};
  const topLanguage = Object.keys(languages)[0] || "N/A";

  return (
    <div>
      <h2>Profile Summary</h2>
      <p><strong>User:</strong> {data.username}</p>
      <p><strong>Total Commits:</strong> {data.total_commits}</p>
      <p><strong>Top Language:</strong> {topLanguage}</p>
    </div>
  );
}
