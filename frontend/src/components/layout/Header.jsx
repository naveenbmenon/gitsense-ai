// ⚠️ DESIGN-ONLY COMPONENT
// Do not modify props or logic structure.
// Visual changes only.

export default function Header({ user, onRefresh, onLogout }) {
  return (
    <header className="flex justify-between items-center mb-14">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          GitSense
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          AI-powered developer intelligence
        </p>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <span className="text-zinc-400">@{user.login}</span>

        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-lg border border-zinc-800 
                     hover:bg-zinc-900 transition"
        >
          Refresh
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 
                     hover:bg-zinc-300 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}