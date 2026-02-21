export default function Header({ user, onRefresh, onLogout }) {
  return (
    <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        GitSense AI
      </h1>

      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <span>
          @{user.login}
        </span>

        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Refresh
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}