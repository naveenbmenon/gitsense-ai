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
    <div className="flex flex-col gap-6 w-full">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-medium tracking-tight text-zinc-100">Developer DNA</h3>
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Core Traits</span>
      </div>

      {/* 🎭 The AI Archetype Centerpiece */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-500/[0.05] to-transparent border border-indigo-500/20 overflow-hidden group">
        {/* Ambient glow effect inside the archetype box */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-colors duration-500" />
        
        <h4 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
          Identified Archetype
        </h4>
        <p className="text-2xl font-light text-zinc-100 tracking-tight relative z-10">
          {personality?.label ?? "Unknown Developer"}
        </p>
        
        {personality && (
          <p className="mt-3 text-xs font-mono text-indigo-300/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
            Confidence Score: {personality.score}
          </p>
        )}
      </div>

      {/* 🧬 DNA Stats Ledger (Borderless List) */}
      <div className="flex flex-col">
        
        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Current Streak</span>
          <span className="text-sm font-medium text-zinc-100 flex items-center gap-2">
            {stats.current_streak > 0 && <span className="text-orange-400">🔥</span>}
            {stats.current_streak ?? 0} days
          </span>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Longest Streak</span>
          <span className="text-sm font-medium text-zinc-100">{stats.longest_streak ?? 0} days</span>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Peak Coding Hour</span>
          <div className="text-right flex flex-col items-end">
             <span className="text-sm font-medium text-zinc-100">{formatHour(stats.peak_hour)}</span>
             <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{getTimeStyle(stats.peak_hour)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Prime Day</span>
          <span className="text-sm font-medium text-zinc-100">{getDayName(stats.favorite_day)}</span>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Momentum</span>
          <span className="text-sm font-medium text-zinc-100">{getTrendMessage(stats.trend_percent)}</span>
        </div>

        <div className="flex items-center justify-between py-4 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
          <span className="text-sm text-zinc-400">Output Level</span>
          <span className="text-sm font-medium text-zinc-100">{getProductivityLevel(stats.total_commits)}</span>
        </div>

      </div>
    </div>
  );
}



