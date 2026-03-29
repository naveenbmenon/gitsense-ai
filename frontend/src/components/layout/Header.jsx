export default function Header({ user, onRefresh, onLogout }) {
  const publicProfileUrl = `/u/${user?.login}`;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 mb-12 relative z-10 border-b border-white/5 bg-[#09090b]/40 backdrop-blur-xl -mx-6 px-6 sm:-mx-8 sm:px-8 rounded-b-2xl">
      
      {/* Left Section: Brand & User Context */}
      <div className="flex flex-col gap-1.5 group cursor-default">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 group-hover:opacity-100 transition-opacity" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            GitSense
          </h1>
        </div>
        <p className="text-zinc-500 text-sm font-light tracking-wide flex items-center gap-1.5">
          Intelligence for 
          <span className="text-zinc-300 font-medium px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] group-hover:border-indigo-500/30 transition-colors">
            @{user?.login || "developer"}
          </span>
        </p>
      </div>

      {/* Right Section: Minimalist Actions */}
      <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1">

        {/* Sync Data */}
        <button
          onClick={onRefresh}
          className="group flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-100 px-4 py-2 rounded-full hover:bg-white/[0.04] transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 group-hover:rotate-180 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Sync Data
        </button>

        {/* Separator */}
        <div className="w-px h-4 bg-white/10" />

        {/* Public Profile */}
        <a
          href={publicProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-400 hover:text-indigo-300 px-4 py-2 rounded-full hover:bg-indigo-500/[0.05] transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Public Profile
        </a>

        {/* Separator */}
        <div className="w-px h-4 bg-white/10" />

        {/* Disconnect */}
        <button
          onClick={onLogout}
          className="group flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-400 hover:text-rose-400 px-4 py-2 rounded-full hover:bg-rose-500/[0.05] transition-all duration-300"
        >
          Disconnect
          <svg className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

      </div>
    </header>
  );
}