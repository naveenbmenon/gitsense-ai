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
  return days[index] || "N/A";
}

function getPersonality(stats) {
  if (!stats) return "Unknown";

  if (stats.current_streak >= 7)
    return "🔥 Consistency Machine";

  if (stats.peak_hour >= 22 || stats.peak_hour <= 3)
    return "🌙 Midnight Hacker";

  if (stats.favorite_day === 5 || stats.favorite_day === 6)
    return "🏖 Weekend Warrior";

  if (stats.total_repos > 15)
    return "🚀 Explorer";

  return "💻 Focused Builder";
}

export default function CodingDNA({ stats }) {
  if (!stats) return null;

  return (
    <div className="dna-container">
      <h2>🧬 Coding DNA</h2>

      <div className="dna-grid">
        <div className="dna-card">
          <h4>🔥 Current Streak</h4>
          <p>{stats.current_streak} days</p>
        </div>

        <div className="dna-card">
          <h4>⏰ Peak Coding Hour</h4>
          <p>{formatHour(stats.peak_hour)}</p>
        </div>

        <div className="dna-card">
          <h4>📅 Favorite Coding Day</h4>
          <p>{getDayName(stats.favorite_day)}</p>
        </div>

        <div className="dna-card">
          <h4>📈 Monthly Trend</h4>
          <p>
            {stats.trend_percent > 0
              ? `+${stats.trend_percent}% growth`
              : `${stats.trend_percent}% change`}
          </p>
        </div>

        <div className="dna-card personality">
          <h4>🎭 Personality</h4>
          <p>{getPersonality(stats)}</p>
        </div>
      </div>
    </div>
  );
}