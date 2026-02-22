export default function Summary({ data }) {

  const languages = data.language_distribution || {};

  const topLanguage = Object.keys(languages)[0] || "N/A";



  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-medium tracking-tight text-zinc-100">Global Lifetime</h3>
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">All Time</span>
      </div>

      {/* Massive Data Blocks instead of standard text */}
      <div className="grid grid-cols-2 gap-8 py-2">
        
        <div className="flex flex-col gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Total Commits
          </span>
          <span className="text-4xl sm:text-5xl font-light text-zinc-100 tracking-tighter">
            {data.total_commits?.toLocaleString() || 0}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Primary DNA
          </span>
          <span className="text-4xl sm:text-5xl font-light text-indigo-400 tracking-tighter truncate">
            {topLanguage || "N/A"}
          </span>
        </div>

      </div>

    </div>
  );
}