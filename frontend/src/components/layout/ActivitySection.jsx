export default function ActivitySection({ stats }) {
  if (!stats) return null;

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Weekly Activity */}
        <div className="flex flex-col p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
          <h3 className="text-sm font-medium text-zinc-400 mb-6">
            This Week
          </h3>

          <p className="text-4xl font-semibold tracking-tight text-zinc-100">
            {stats.weekly?.commits || 0}
          </p>

          <div className="mt-auto pt-6 flex items-end justify-between">
            <p className="text-sm text-zinc-400">
              <span className="text-zinc-300 font-medium">{stats.weekly?.active_days || 0}</span> active days
            </p>

            <p className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-800/40 border border-zinc-700/30 text-zinc-300">
              {stats.weekly?.delta_percent > 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.weekly?.delta_percent || 0)}%
            </p>
          </div>
        </div>

        {/* Momentum */}
        <div className="flex flex-col p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-sm font-medium text-zinc-400 mb-6">
            Momentum
          </h3>
          
          <div className="flex-1 flex items-center">
            <p className="text-3xl font-semibold tracking-tight text-zinc-100">
              {stats.momentum?.label || "Neutral"}
            </p>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="flex flex-col p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
          <h3 className="text-sm font-medium text-zinc-400 mb-6">
            Top Repositories (30 days)
          </h3>

          <div className="flex flex-col gap-3">
            {stats.top_repos?.length === 0 ? (
              <p className="text-sm text-zinc-500 italic px-1">No recent activity</p>
            ) : (
              stats.top_repos?.map((repo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-indigo-300 transition-colors duration-200 truncate pr-4">
                    {repo.name}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800/40 px-2.5 py-1 rounded-full border border-zinc-700/30 whitespace-nowrap">
                    {repo.commits} commits
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}