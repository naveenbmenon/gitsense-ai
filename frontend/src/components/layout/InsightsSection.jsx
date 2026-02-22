import Insights from "../Insights";

export default function InsightsSection({ insights }) {
  if (!insights) return null;

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Massive subtle quote mark in background for typographic texture */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[250px] text-white/[0.02] font-serif leading-none select-none pointer-events-none">
        "
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
        
        {/* Sleek AI Agent Badge */}
        <div className="flex items-center gap-2 border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">
            GitSense Analysis
          </span>
        </div>

        {/* The Insights Typographic Container */}
        <div className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 leading-relaxed tracking-tight">
          <Insights insights={insights} />
        </div>
        
      </div>
    </section>
  );
}