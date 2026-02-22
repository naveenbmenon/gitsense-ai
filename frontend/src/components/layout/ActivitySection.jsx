export default function ActivitySection({ stats }) {
  if (!stats) return null;

  return (
    <section className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
      
      {/* LEFT: Typographic Hero Metrics */}
      <div className="flex-1 space-y-16 group/hero">
        
        <div className="relative">
          {/* Ambient hover glow behind the main number */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-indigo-500/0 group-hover/hero:bg-indigo-500/10 blur-3xl rounded-full transition-colors duration-700 pointer-events-none" />
          
          <h2 className="text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/hero:bg-indigo-500 transition-colors duration-500" />
            Weekly Velocity
          </h2>
          
          <div className="flex items-baseline gap-4 relative z-10">
            <span className="text-7xl sm:text-8xl md:text-9xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 group-hover/hero:to-zinc-200 transition-all duration-500">
              {stats.weekly?.commits || 0}
            </span>
            <span className="text-xl text-zinc-500 font-light tracking-tight">
              commits
            </span>
          </div>
          
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-lg ${
              stats.weekly?.delta_percent > 0 
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/5'
                : 'border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-rose-500/5'
            }`}>
              {stats.weekly?.delta_percent > 0 ? "↗" : "↘"} 
              {Math.abs(stats.weekly?.delta_percent || 0)}%
            </div>
            <span className="text-zinc-500 font-light tracking-wide">
              vs last week across <span className="text-zinc-200 font-medium">{stats.weekly?.active_days || 0} active days</span>
            </span>
          </div>
        </div>

        {/* Momentum Indicator */}
        <div className="inline-flex flex-col relative">
          <span className="text-zinc-600 text-[10px] font-semibold uppercase tracking-widest mb-2">
            Current Momentum
          </span>
          <span className="text-2xl sm:text-3xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-zinc-400 group-hover/hero:from-indigo-400 group-hover/hero:via-fuchsia-300 transition-all duration-700">
            {stats.momentum?.label || "Steady Output"}
          </span>
        </div>
      </div>

      {/* RIGHT: Top Repositories List */}
      <div className="w-full lg:w-96 flex flex-col relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
          <h3 className="text-zinc-100 font-medium tracking-tight">Top Repositories</h3>
          <span className="text-zinc-600 text-[10px] font-semibold uppercase tracking-widest bg-white/[0.02] px-2 py-1 rounded-md border border-white/5">30 Days</span>
        </div>

        <div className="flex flex-col">
          {stats.top_repos?.length === 0 ? (
            <p className="text-sm text-zinc-600 py-6 text-center font-light italic">No recent signals detected.</p>
          ) : (
            stats.top_repos?.map((repo, index) => (
              <div 
                key={index}
                className="group/repo flex items-center justify-between py-3.5 px-3 -mx-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover/repo:bg-indigo-400 group-hover/repo:scale-150 transition-all duration-300" />
                  <span className="text-sm font-medium text-zinc-400 group-hover/repo:text-zinc-50 group-hover/repo:translate-x-1 transition-all duration-300 truncate">
                    {repo.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500 font-mono group-hover/repo:text-zinc-300 transition-colors">
                    {repo.commits}
                  </span>
                  
                  {/* Premium Sparkline */}
                  <div className="w-16 h-1 bg-zinc-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-zinc-600 group-hover/repo:bg-gradient-to-r group-hover/repo:from-indigo-500 group-hover/repo:to-fuchsia-400 transition-all duration-500 relative" 
                      style={{ width: `${Math.min((repo.commits / 50) * 100, 100)}%` }} 
                    >
                      {/* Glowing tip */}
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px] opacity-0 group-hover/repo:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Vercel style arrow reveal */}
                  <svg className="w-4 h-4 text-zinc-600 opacity-0 -ml-4 group-hover/repo:opacity-100 group-hover/repo:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </section>
  );
}