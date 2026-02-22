export default function ActivitySection({ stats }) {
  if (!stats) return null;

  return (
    <section className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
      
      {/* LEFT: Typographic Hero Metrics */}
      <div className="flex-1 space-y-12">
        <div>
          <h2 className="text-zinc-500 text-sm font-medium tracking-wide uppercase mb-3">
            Weekly Velocity
          </h2>
          <div className="flex items-baseline gap-4">
            <span className="text-7xl sm:text-8xl font-medium tracking-tighter text-zinc-50">
              {stats.weekly?.commits || 0}
            </span>
            <span className="text-xl text-zinc-500 font-light tracking-tight">
              commits
            </span>
          </div>
          
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              stats.weekly?.delta_percent > 0 
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
            }`}>
              {stats.weekly?.delta_percent > 0 ? "↗" : "↘"} 
              {Math.abs(stats.weekly?.delta_percent || 0)}%
            </div>
            <span className="text-zinc-500">
              vs last week across <span className="text-zinc-300">{stats.weekly?.active_days || 0} active days</span>
            </span>
          </div>
        </div>

        {/* Momentum Indicator - replacing a box with a glowing text element */}
        <div className="inline-flex flex-col">
          <span className="text-zinc-600 text-xs font-medium uppercase tracking-widest mb-1">
            Current Momentum
          </span>
          <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent">
            {stats.momentum?.label || "Steady Output"}
          </span>
        </div>
      </div>

      {/* RIGHT: Top Repositories List (Borderless, sleek) */}
      <div className="w-full lg:w-80 flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <h3 className="text-zinc-100 font-medium">Top Repositories</h3>
          <span className="text-zinc-600 text-xs uppercase tracking-wider">30 Days</span>
        </div>

        <div className="flex flex-col gap-1">
          {stats.top_repos?.length === 0 ? (
            <p className="text-sm text-zinc-600 py-4">No recent signals detected.</p>
          ) : (
            stats.top_repos?.map((repo, index) => (
              <div 
                key={index}
                className="group flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-default"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Subtle rank indicator or icon placeholder */}
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors" />
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-50 transition-colors truncate">
                    {repo.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 font-mono">
                    {repo.commits}
                  </span>
                  {/* Mini-sparkline visual hack using raw CSS widths based on math, totally optional but feels premium */}
                  <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-zinc-500 group-hover:bg-indigo-400 transition-colors" 
                      style={{ width: `${Math.min((repo.commits / 50) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </section>
  );
}