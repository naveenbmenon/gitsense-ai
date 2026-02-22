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
          
          <div className="flex flex-col items-center gap-3 sm:gap-4 group">
            {/* 🏷️ Insight Title (Overline format) */}
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-500">
              {i.title}
            </h4>
            
            {/* 📝 Insight Description (Hero Typography) */}
            {/* Note: It inherits some sizing from the parent, but we enforce the premium light styling here */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 leading-relaxed tracking-tight max-w-4xl mx-auto">
              {i.description}
            </p>
          </div>

          {/* ✨ Elegant separator between insights (but not after the last one) */}
          {idx < insights.length - 1 && (
            <div className="my-12 sm:my-16 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          )}
          
        </div>
      ))}
    </div>
  );
}