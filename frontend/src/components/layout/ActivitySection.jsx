export default function ActivitySection({ stats }) {
  if (!stats) return null;

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Weekly Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">This Week</h3>

          <p className="text-3xl font-semibold">
            {stats.weekly?.commits || 0}
          </p>

          <p className="text-zinc-400 text-sm mt-2">
            {stats.weekly?.active_days || 0} active days
          </p>

          <p className="mt-3 text-sm">
            {stats.weekly?.delta_percent > 0 ? "↑" : "↓"}{" "}
            {Math.abs(stats.weekly?.delta_percent || 0)}%
          </p>
        </div>

        {/* Momentum */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Momentum</h3>
          <p className="text-2xl font-semibold">
            {stats.momentum?.label || "Neutral"}
          </p>
        </div>

        {/* Top Repositories */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">
            Top Repositories (30 days)
          </h3>

          {stats.top_repos?.length === 0 ? (
            <p className="text-zinc-400 text-sm">No recent activity</p>
          ) : (
            stats.top_repos?.map((repo, index) => (
              <div
                key={index}
                className="flex justify-between text-sm mb-2"
              >
                <span>{repo.name}</span>
                <span className="text-zinc-400">
                  {repo.commits} commits
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}