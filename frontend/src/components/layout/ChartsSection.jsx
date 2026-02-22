import ContributionHeatmap from "../ContributionHeatmap";
import Charts from "../Charts";

export default function ChartsSection({ analytics, summary }) {
  if (!analytics) return null;

  return (
    <section className="flex flex-col gap-24 w-full">
      
      {/* Heatmap Area: Borderless and wide */}
      {analytics?.commits?.length > 0 && (
        <div className="flex flex-col gap-8 group relative">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-lg font-medium tracking-tight text-zinc-100">Contribution Matrix</h3>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Activity Density</span>
          </div>
          
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            {/* The wrapper dims slightly until hovered, drawing focus to the data */}
            <div className="min-w-max opacity-80 hover:opacity-100 transition-opacity duration-700">
               <ContributionHeatmap commits={analytics.commits} />
            </div>
          </div>
        </div>
      )}

      {/* Analytics Charts Area */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-lg font-medium tracking-tight text-zinc-100">Analytics Engine</h3>
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Language & Volume</span>
        </div>
        
        <div className="w-full relative py-4">
          {/* Subtle ambient light source behind the charts to create depth without borders */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <Charts
              analytics={analytics}
              languages={summary?.language_distribution}
            />
          </div>
        </div>
      </div>

    </section>
  );
}