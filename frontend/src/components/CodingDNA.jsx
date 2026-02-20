import React from "react";
import "./CodingDNA.css";

function formatHour(hour) {
  if (hour === null || hour === undefined) return "N/A";

  const ampm = hour >= 12 ? "PM" : "AM";
  const formatted = hour % 12 || 12;
  return `${formatted} ${ampm}`;
}

function getDayName(index) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[index] ?? "N/A";
}

function getTimeStyle(hour) {
  if (hour === null || hour === undefined) return "Unknown";

  if (hour >= 5 && hour < 11) return "🌅 Early Bird";
  if (hour >= 11 && hour < 17) return "☀️ Daytime Builder";
  if (hour >= 17 && hour < 22) return "🌇 Evening Coder";
  return "🌙 Night Owl";
}

function getProductivityLevel(totalCommits) {
  if (!totalCommits) return "Unknown";

  if (totalCommits > 1000) return "🚀 Intense";
  if (totalCommits > 500) return "🔥 High";
  if (totalCommits > 200) return "⚡ Moderate";
  return "🌱 Growing";
}

function getTrendMessage(trend) {
  if (trend === null || trend === undefined) return "No data";

  if (trend > 20) return `📈 Explosive growth (+${trend}%)`;
  if (trend > 0) return `📈 Improving (+${trend}%)`;
  if (trend < -20) return `📉 Major slowdown (${trend}%)`;
  if (trend < 0) return `📉 Slight dip (${trend}%)`;
  return "➖ Stable month";
}

export default function CodingDNA({ stats }) {
  if (!stats) return null;

  const personality = stats.personality;

  return (
    <div className="dna-container">
      <h2>🧬 Coding DNA</h2>

      <div className="dna-grid">
        <div className="dna-card">
          <h4>🔥 Current Streak</h4>
          <p>{stats.current_streak ?? 0} days</p>
        </div>

        <div className="dna-card">
          <h4>🏆 Longest Streak</h4>
          <p>{stats.longest_streak ?? 0} days</p>
        </div>

        <div className="dna-card">
          <h4>⏰ Peak Coding Hour</h4>
          <p>
            {formatHour(stats.peak_hour)} <br />
            <small>{getTimeStyle(stats.peak_hour)}</small>
          </p>
        </div>

        <div className="dna-card">
          <h4>📅 Favorite Coding Day</h4>
          <p>{getDayName(stats.favorite_day)}</p>
        </div>

        <div className="dna-card">
          <h4>📈 Monthly Momentum</h4>
          <p>{getTrendMessage(stats.trend_percent)}</p>
        </div>

        <div className="dna-card">
          <h4>⚡ Productivity Level</h4>
          <p>{getProductivityLevel(stats.total_commits)}</p>
        </div>

        <div className="dna-card personality">
          <h4>🎭 Developer Archetype</h4>
          <p>
            {personality?.label ?? "Unknown Developer"}
          </p>

          {personality && (
            <small style={{ opacity: 0.7 }}>
              Score: {personality.score}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
