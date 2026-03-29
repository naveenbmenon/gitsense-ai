export default function Insights({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <p className="text-zinc-500 font-light text-lg sm:text-xl italic animate-pulse">
        Gathering signals to generate intelligence...
      </p>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {insights.map((i, idx) => (
        <div key={idx} className="flex flex-col items-center w-full">

          {/* ─── AI HEALTH SCORE CARD ─── */}
          {i.type === "ai_health" && i.data && (
            <div className="flex flex-col items-center gap-6 group w-full max-w-2xl mx-auto">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-500">
                {i.title}
              </h4>

              {/* Score Circle */}
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-2 border-indigo-500/30 bg-indigo-500/5">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-white">
                    {i.data.health_score}
                  </span>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">
                    / 100
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full border ${
                i.data.status === "Excellent"
                  ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : i.data.status === "Good"
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                  : i.data.status === "Fair"
                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}>
                {i.data.status}
              </span>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 gap-4 w-full text-left">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-indigo-400 uppercase tracking-widest mb-1">
                    Primary Concern
                  </p>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {i.data.primary_concern}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-indigo-400 uppercase tracking-widest mb-1">
                    Recommendation
                  </p>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {i.data.recommendation}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-indigo-400 uppercase tracking-widest mb-1">
                    Pattern Insight
                  </p>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {i.data.pattern_insight}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── COMMIT STORY CARD ─── */}
          {i.type === "ai_story" && i.data && (
            <div className="flex flex-col items-center gap-6 group w-full max-w-2xl mx-auto">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-500">
                {i.title}
              </h4>

              {/* Story Text */}
              <p className="text-xl sm:text-2xl font-light text-zinc-200 leading-relaxed tracking-tight text-center italic">
                "{i.data.story}"
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">
                    {i.data.total_commits}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">
                    Tracked Commits
                  </span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">
                    {i.data.repos_active}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">
                    Active Repos
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ─── ANOMALY ALERT ─── */}
          {i.type === "anomaly" && i.data?.anomaly && (
            <div className="flex flex-col items-center gap-3 group w-full max-w-2xl mx-auto">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-yellow-400/70">
                Activity Anomaly Detected
              </h4>
              <p className="text-xl sm:text-2xl font-light text-zinc-200 leading-relaxed">
                {i.data.message}
              </p>
            </div>
          )}

          {/* ─── DEFAULT INSIGHTS (existing ones) ─── */}
          {i.type !== "ai_health" &&
            i.type !== "ai_story" &&
            i.type !== "anomaly" && (
            <div className="flex flex-col items-center gap-3 sm:gap-4 group">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-500">
                {i.title}
              </h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 leading-relaxed tracking-tight max-w-4xl mx-auto">
                {i.description}
              </p>
            </div>
          )}

          {/* Separator */}
          {idx < insights.length - 1 && (
            <div className="my-12 sm:my-16 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          )}

        </div>
      ))}
    </div>
  );
}