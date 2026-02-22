export default function Header({ user, onRefresh, onLogout }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 pb-8 border-b border-zinc-800">
      
      {/* Left Section */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
  GitSense
</h1>
        <p className="text-zinc-500 mt-2 text-sm">
          Developer intelligence powered by AI
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Username Badge */}
        <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-sm font-medium text-indigo-300">
            @{user?.login || "developer"}
          </span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="px-5 py-2 rounded-xl border border-zinc-700 
                     text-zinc-300 hover:text-white 
                     hover:bg-zinc-800 transition"
        >
          Refresh
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="px-5 py-2 rounded-xl bg-white text-black 
                     font-medium hover:bg-zinc-200 transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}