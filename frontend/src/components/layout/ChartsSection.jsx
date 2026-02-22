import ContributionHeatmap from "../ContributionHeatmap";
import Charts from "../Charts";

export default function ChartsSection({ analytics, summary }) {
  if (!analytics) return null;

  return (
    <section className="flex flex-col gap-6 mb-16 w-full">

      {/* Contribution Heatmap */}
      {analytics?.commits?.length > 0 && (
        <div className="relative w-full p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-300 group">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/10 group-hover:via-indigo-500/20 to-transparent transition-all duration-500" />
          
          <ContributionHeatmap commits={analytics.commits} />
        </div>
      )}

      {/* Charts */}
      <div className="relative w-full p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-300 group">
        <Charts
          analytics={analytics}
          languages={summary?.language_distribution}
        />
      </div>

    </section>
  );
}