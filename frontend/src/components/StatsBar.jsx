import React from "react";

import "./StatsBar.css";



function StatCard({ label, value }) {

  return (

    <div className="stat-card">

      <h4>{label}</h4>

      <p>{value ?? "—"}</p>

    </div>

  );

}



export default function StatsBar({ stats }) {

  if (!stats) return null;



  return (

    <div className="stats-container">

      <StatCard label="Total Commits" value={stats.total_commits} />

      <StatCard label="Repositories" value={stats.total_repos} />

      <StatCard label="Longest Streak 🔥" value={stats.longest_streak} />

      <StatCard label="Current Streak ⚡" value={stats.current_streak} />

    </div>

  );

}