import Insights from "../Insights";

export default function InsightsSection({ insights }) {
  if (!insights) return null;

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center rounded-3xl border border-transparent hover:border-white/5 bg-transparent hover:bg-white/[0.01] transition-all duration-700 group/ai cursor-default">
      
      {/* 🧠 Dynamic Neural Glow - Wakes up on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/0 group-hover/ai:bg-indigo-500/5 group-hover/ai:blur-[120px] rounded-full pointer-events-none transition-all duration-1000 scale-90 group-hover/ai:scale-100" />
      
      {/* Massive subtle quote mark in background - physically shifts and brightens on hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[250px] sm:text-[300px] text-white/[0.01] group-hover/ai:text-white/[0.03] group-hover/ai:-translate-y-4 font-serif leading-none select-none pointer-events-none transition-all duration-1000">
        "
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-10">
        
        {/* 🤖 Sleek Interactive AI Agent Badge */}
        <div className="group/badge relative flex items-center gap-3 border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 px-5 py-2 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.05)] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] hover:border-indigo-400/40 transition-all duration-500 overflow-hidden">
          
          {/* Shimmer sweep inside badge */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:animate-[shimmer_1.5s_infinite]" />
          
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 group-hover/badge:opacity-100 transition-opacity" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </div>
          <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest relative z-10 group-hover/badge:text-indigo-200 transition-colors">
            GitSense Neural Analysis
          </span>
        </div>

        {/* 📝 The Insights Typographic Container */}
        {/* Text transitions from a quiet gray to a bright white reading state */}
        <div className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-400 group-hover/ai:text-zinc-200 leading-relaxed tracking-tight transition-colors duration-700 px-4">
          <Insights insights={insights} />
        </div>
        
        {/* ✨ Sub-accent decorative footer - Fades in slowly after the section wakes up */}
        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover/ai:opacity-100 transition-opacity duration-1000 delay-300">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <div className="w-1 h-1 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
          <div className="w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>

      </div>
    </section>
  );
}