const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 🟢 GLOBAL AMBIENT LIGHTING */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* 🔴 NAVIGATION */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#09090b]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse" />
            <span className="text-lg font-medium tracking-tight text-zinc-100">GitSense AI</span>
          </div>
          <button 
            onClick={handleLogin}
            className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24">
        
        {/* 🟡 1. HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            GitSense Engine 1.0 Live
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-zinc-50 leading-[1.1] max-w-5xl">
            Turn your GitHub activity into <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              developer intelligence.
            </span>
          </h1>
          
          <p className="mt-8 text-xl text-zinc-400 font-light max-w-2xl leading-relaxed tracking-tight">
            GitSense uses AI to analyze your repositories, coding behavior, and momentum patterns — transforming raw commits into meaningful career insights.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleLogin}
              className="px-8 py-4 rounded-full bg-zinc-100 text-zinc-900 font-medium tracking-wide hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Analyze My GitHub
            </button>
            <button
              className="px-8 py-4 rounded-full bg-transparent border border-zinc-800 text-zinc-300 font-medium tracking-wide hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-200"
            >
              View Live Demo
            </button>
          </div>
        </section>

        {/* 🟣 4. PRODUCT SHOWCASE (Abstract CSS Mockup) */}
        <section className="max-w-5xl mx-auto px-6 mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl" />
          <div className="relative rounded-2xl border border-white/10 bg-[#09090b]/80 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Mockup Chrome */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
            {/* Mockup Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-80">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="w-32 h-4 bg-zinc-800 rounded" />
                <div className="w-full h-32 border border-white/5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent flex items-end p-4">
                   <div className="w-full h-1/2 border-t border-indigo-500/30 border-dashed" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-24 h-4 bg-zinc-800 rounded" />
                <div className="w-full h-12 border border-white/5 rounded-lg bg-white/[0.02]" />
                <div className="w-full h-12 border border-white/5 rounded-lg bg-white/[0.02]" />
              </div>
            </div>
          </div>
        </section>

        {/* 🟠 2. PROBLEM SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-32 border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter">
            <span className="text-zinc-600">Your GitHub shows what you did.</span>
            <br />
            <span className="text-zinc-100">Not who you are.</span>
          </h2>
          <p className="mt-8 text-lg text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Standard metrics count lines of code. We measure consistency, velocity, architectural preferences, and engineering momentum to reveal your true developer DNA.
          </p>
        </section>

        {/* 🔵 3. FEATURES SECTION (Asymmetric Layout) */}
        <section className="max-w-6xl mx-auto px-6 py-40 flex flex-col gap-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-zinc-100">AI Developer Profile</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-lg">
                We read between the commits. GitSense identifies your developer archetype, scoring your confidence across backend architecture, AI integration, and full-stack development.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative h-64 border border-white/10 bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8">
                 <div className="text-xs text-indigo-400 uppercase tracking-widest mb-2">Identified Archetype</div>
                 <div className="text-3xl font-light text-zinc-100">Architect / Full-Stack</div>
                 <div className="mt-8 flex gap-2">
                   <div className="h-1 flex-1 bg-indigo-500 rounded-full" />
                   <div className="h-1 flex-1 bg-zinc-800 rounded-full" />
                   <div className="h-1 flex-1 bg-zinc-800 rounded-full" />
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-zinc-100">Momentum Analytics</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-lg">
                Stop looking at flat contribution graphs. Understand your peak productivity hours, longest streaks, and the days you actually write your best code.
              </p>
            </div>
            <div className="flex-1 w-full h-64 border border-white/10 bg-zinc-900/50 backdrop-blur-sm rounded-2xl flex flex-col justify-end p-6 gap-2">
               {/* Abstract bar chart */}
               <div className="flex items-end justify-between h-32 gap-2 opacity-50">
                 {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
                   <div key={i} className="w-full bg-zinc-700 rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
               </div>
            </div>
          </div>

        </section>

        {/* 🟢 5. HOW IT WORKS */}
        <section className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-zinc-100 mb-16">Intelligence in three steps.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Hidden on mobile) */}
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800" />
            
            {[
              { step: "01", title: "Connect", desc: "Securely link your GitHub account in seconds." },
              { step: "02", title: "Analyze", desc: "Our AI processes your historical commits and behavior." },
              { step: "03", title: "Discover", desc: "Unlock your personalized developer intelligence dashboard." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center text-sm font-medium text-zinc-400 mb-6 z-10 shadow-[0_0_20px_rgba(0,0,0,1)]">
                  {item.step}
                </div>
                <h4 className="text-lg font-medium text-zinc-200 mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-500 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔵 6. FINAL CTA */}
        <section className="max-w-4xl mx-auto px-6 py-32 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl sm:text-6xl font-medium tracking-tighter text-zinc-50">
              Stop counting commits.<br />
              <span className="text-zinc-500">Start understanding them.</span>
            </h2>
            
            <button
              onClick={handleLogin}
              className="mt-8 px-10 py-5 rounded-full bg-white text-black font-medium text-lg tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Analyze My GitHub — Free
            </button>
          </div>
        </section>

      </main>

      {/* 🏁 FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-zinc-600 text-sm tracking-wide">
          © {new Date().getFullYear()} GitSense AI. Built for ambitious developers.
        </p>
      </footer>
    </div>
  );
}