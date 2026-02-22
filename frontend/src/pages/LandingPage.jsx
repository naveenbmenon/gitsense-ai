const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute top-0 w-[900px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />

      <div className="max-w-3xl text-center space-y-8 relative z-10">
        <h1 className="text-6xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          GitSense
        </h1>

        <p className="text-xl text-zinc-400 leading-relaxed">
          AI-powered developer intelligence platform.
          Understand your velocity, coding DNA, and productivity signals.
        </p>

        <button
          onClick={handleLogin}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
                     text-white font-semibold text-lg shadow-xl 
                     hover:scale-105 transition-all duration-200"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}