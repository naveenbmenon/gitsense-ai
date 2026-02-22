import ContributionHeatmap from "../ContributionHeatmap";
import Charts from "../Charts";

export default function ChartsSection({ analytics, summary }) {
  if (!analytics) return null;

  return (
    <section className="flex flex-col gap-12 w-full relative z-10">
      
      {/* Heatmap Area: Bento styled */}
      {analytics?.commits?.length > 0 && (
        <div className="flex flex-col group/matrix relative rounded-3xl border border-white/5 bg-[#09090b]/40 backdrop-blur-sm p-6 sm:p-8 hover:border-white/10 hover:bg-[#09090b]/60 transition-all duration-500">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover/matrix:bg-indigo-500 transition-colors duration-500" />
              <h3 className="text-lg font-medium tracking-tight text-zinc-100">Contribution Matrix</h3>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/5">
              Activity Density
            </span>
          </div>
          
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="min-w-max opacity-80 group-hover/matrix:opacity-100 transition-opacity duration-700">
               <ContributionHeatmap commits={analytics.commits} />
            </div>
          </div>
        </div>
      )}

      {/* Analytics Charts Area */}
      <div className="flex flex-col group/analytics relative rounded-3xl border border-white/5 bg-[#09090b]/40 backdrop-blur-sm p-6 sm:p-8 hover:border-white/10 hover:bg-[#09090b]/60 transition-all duration-500">
        
        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover/analytics:bg-fuchsia-500 transition-colors duration-500" />
            <h3 className="text-lg font-medium tracking-tight text-zinc-100">Analytics Engine</h3>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/5">
            Language & Volume
          </span>
        </div>
        
        <div className="w-full relative py-4">
          {/* Dynamic ambient light source that wakes up on hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/0 group-hover/analytics:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000" />
          
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