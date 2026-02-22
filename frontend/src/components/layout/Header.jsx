export default function Header({ user, onRefresh, onLogout }) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-8 mb-12 relative z-10">
      
      {/* Left Section: Brand & User Context */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Pulsing AI active indicator */}
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] animate-pulse" />
          <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
            GitSense
          </h1>
        </div>
        <p className="text-zinc-500 text-sm font-light tracking-wide">
          Intelligence for <span className="text-zinc-300 font-medium">@{user?.login || "developer"}</span>
        </p>
      </div>

      {/* Right Section: Minimalist Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-100 px-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors duration-300"
        >
          Sync Data
        </button>
        
        {/* Subtle vertical separator */}
        <div className="w-px h-4 bg-white/10" />
        
        <button
          onClick={onLogout}
          className="text-xs font-medium tracking-wide text-zinc-400 hover:text-rose-400 px-4 py-2 rounded-full hover:bg-rose-500/[0.05] transition-colors duration-300"
        >
          Disconnect
        </button>
      </div>
      
    </header>
  );
}