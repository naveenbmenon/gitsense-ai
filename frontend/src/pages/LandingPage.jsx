import { useEffect, useRef } from "react";

const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function LandingPage() {
  const bentoRef = useRef(null);

  // High-performance mouse tracking for the "Linear-style" hover spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bentoRef.current) return;
      const rect = bentoRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bentoRef.current.style.setProperty("--mouse-x", `${x}px`);
      bentoRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = bentoRef.current;
    if (element) element.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (element) element.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* 🌐 ARCHITECTURAL BACKGROUND */}
      {/* Subtle IDE-like grid that fades out towards the bottom */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 🔮 LIVING AMBIENT AURORA */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse duration-[10000ms]" />

      {/* 🚀 NAVIGATION */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] group-hover:scale-150 group-hover:bg-fuchsia-400 transition-all duration-500" />
            <span className="text-lg font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              GitSense AI
            </span>
          </div>
          <button 
            onClick={handleLogin}
            className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24">
        
        {/* 🟡 1. HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
          
          {/* Micro-interactive Badge */}
          <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300 text-xs font-medium uppercase tracking-widest mb-10 cursor-default overflow-hidden hover:border-indigo-500/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Engine 2.0 Online
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.05] max-w-5xl mb-8">
            Commit to code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">
              We decode the developer.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-3xl leading-relaxed tracking-tight mb-12">
            GitSense is an AI intelligence layer that sits above your repositories. We don't just count lines—we analyze velocity, archetype, and engineering momentum.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={handleLogin}
              className="group relative px-8 py-4 rounded-full bg-white text-black font-medium tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Analyze My Profile
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </button>
          </div>
        </section>

        {/* 💻 ABSTRACT HERO DASHBOARD MOCKUP */}
        {/* Hovering over this triggers individual components to "wake up" */}
        <section className="max-w-5xl mx-auto px-6 mb-40">
          <div className="relative rounded-2xl border border-white/10 bg-[#09090b]/40 backdrop-blur-xl shadow-2xl p-2 group overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="rounded-xl border border-white/5 bg-black/40 p-6 flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="w-32 h-5 bg-white/5 rounded-md" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5" />
                  <div className="w-24 h-8 rounded-md bg-white/5" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Interactive Chart Block */}
                <div className="col-span-2 h-48 border border-white/5 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent p-4 flex items-end gap-2 group/chart cursor-crosshair">
                   {[40, 70, 45, 90, 60, 100, 30, 80, 50, 85].map((h, i) => (
                     <div 
                       key={i} 
                       className="flex-1 bg-zinc-800 rounded-t-sm group-hover/chart:bg-indigo-500/50 transition-colors duration-500" 
                       style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }} 
                     />
                   ))}
                </div>
                {/* Interactive Data Stack */}
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[3.7rem] border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.04] transition-colors p-4 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                        <div className="w-16 h-3 bg-white/10 rounded-full" />
                      </div>
                      <div className="w-8 h-3 bg-white/5 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🍱 2. THE BENTO GRID (Spotlight Features) */}
        <section className="max-w-6xl mx-auto px-6 py-20 relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tighter text-zinc-100">
              Intelligence at every layer.
            </h2>
          </div>

          {/* This wrapper holds the custom CSS variables for the mouse tracker */}
          <div 
            ref={bentoRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative group/bento"
          >
            {/* The actual Spotlight effect layered behind the cards */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/bento:opacity-100 z-0"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15), transparent 40%)`
              }}
            />

            {/* BENTO ITEM 1: Archetype (Large) */}
            <div className="md:col-span-2 relative h-[350px] rounded-3xl border border-white/10 bg-[#09090b]/80 backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden group/card hover:border-white/20 transition-colors z-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full group-hover/card:bg-fuchsia-500/20 transition-colors duration-700" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-zinc-100 tracking-tight">AI Archetype Mapping</h3>
                <p className="mt-2 text-zinc-400 font-light max-w-sm">We analyze your commits to identify your coding persona. Are you a Full-Stack Architect or an AI Specialist?</p>
              </div>
              {/* Decorative Visual */}
              <div className="absolute right-8 bottom-8 flex gap-3 opacity-60 group-hover/card:opacity-100 transition-opacity">
                 <div className="w-16 h-16 rounded-full border border-indigo-500/30 flex items-center justify-center animate-[spin_10s_linear_infinite]"><div className="w-12 h-12 rounded-full border border-fuchsia-500/30 border-dashed" /></div>
                 <div className="w-24 h-24 rounded-full border border-indigo-500/10 -ml-10 flex items-center justify-center backdrop-blur-sm"><div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" /></div>
              </div>
            </div>

            {/* BENTO ITEM 2: Momentum (Tall) */}
            <div className="md:col-span-1 relative h-[350px] rounded-3xl border border-white/10 bg-[#09090b]/80 backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden group/card hover:border-white/20 transition-colors z-10">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-zinc-100 tracking-tight">Momentum Engine</h3>
                <p className="mt-2 text-zinc-400 font-light">Track velocity, pinpoint peak coding hours, and visualize your true output capacity.</p>
              </div>
              <div className="w-full flex items-end gap-1.5 h-24 opacity-40 group-hover/card:opacity-100 transition-opacity">
                {[2,4,3,6,5,8,4,9,7,10].map((h, i) => (
                  <div key={i} className="flex-1 bg-white rounded-t-sm" style={{ height: `${h * 10}%` }} />
                ))}
              </div>
            </div>

            {/* BENTO ITEM 3: Actionable Insights (Wide Footer) */}
            <div className="md:col-span-3 relative h-[200px] rounded-3xl border border-white/10 bg-[#09090b]/80 backdrop-blur-md p-8 flex items-center justify-between overflow-hidden group/card hover:border-white/20 transition-colors z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover/card:animate-[shimmer_2s_infinite]" />
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-green-400 font-medium">Live Neural Analysis</span>
                </div>
                <h3 className="text-2xl font-medium text-zinc-100 tracking-tight">Deep Actionable Insights</h3>
                <p className="mt-2 text-zinc-400 font-light">GitSense reads your code history like a mentor, providing personalized growth trajectories.</p>
              </div>
              {/* A subtle glowing quote box to the right */}
              <div className="hidden lg:flex items-center justify-center w-72 h-full border border-white/5 bg-white/[0.02] rounded-2xl relative overflow-hidden group-hover/card:bg-white/[0.04] transition-colors">
                 <p className="text-sm font-mono text-zinc-500">"Shifted focus to backend rust over last 30 days. Architecture patterns improving."</p>
              </div>
            </div>

          </div>
        </section>

        {/* 🔵 6. FINAL CTA (The "Drop-off") */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center relative mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-8 flex flex-col items-center">
            <h2 className="text-5xl sm:text-7xl font-medium tracking-tighter text-zinc-50">
              Ready to meet<br />
              <span className="text-zinc-600">the real you?</span>
            </h2>
            
            <button
              onClick={handleLogin}
              className="mt-8 group relative px-10 py-5 rounded-full bg-white text-black font-medium text-lg tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Connect GitHub Account</span>
            </button>
            <p className="text-sm text-zinc-500 font-light">Requires zero configuration. Free forever for individuals.</p>
          </div>
        </section>

      </main>

      {/* 🏁 FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 text-center relative z-10">
        <p className="text-zinc-600 text-sm tracking-wide font-light">
          © {new Date().getFullYear()} GitSense AI. Built for the top 1%.
        </p>
      </footer>
    </div>
  );
}