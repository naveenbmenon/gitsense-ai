import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { fetchSummary, fetchAnalytics, fetchInsights } from "../api";
import ActivitySection from "../components/layout/ActivitySection";
import Summary from "../components/Summary";
import ChartsSection from "../components/layout/ChartsSection";
import InsightsSection from "../components/layout/InsightsSection";
import CodingDNA from "../components/CodingDNA";

const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function Dashboard() {
  const navigate = useNavigate();

  // Data States
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI & Animation States
  const dashboardRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    // Save token if coming from OAuth
    if (tokenFromUrl) {
      localStorage.setItem("jwt", tokenFromUrl);
      window.history.replaceState({}, document.title, "/dashboard");
    }

    const token = localStorage.getItem("jwt");

    // If no token → go to landing page
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch current user
    fetch(`${BACKEND_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("jwt");
        navigate("/");
      });
  }, [navigate]);

  // 📊 LOAD DASHBOARD DATA
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setLoading(true);

        const username = user.login;
        const token = localStorage.getItem("jwt");

        await fetch(`${BACKEND_URL}/analyze/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const s = await fetchSummary(username);
        const a = await fetchAnalytics(username);
        const i = await fetchInsights(username);

        setSummary(s);
        setAnalytics(a);
        setInsights(i.insights || []);
      } catch (error) {
        console.error("❌ Data load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // 🖱️ HIGH-PERFORMANCE GLOBAL MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dashboardRef.current) return;
      dashboardRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      dashboardRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✨ TRIGGER ENTRANCE ANIMATIONS AFTER LOADING IS COMPLETE
  useEffect(() => {
    if (!loading && summary && analytics) {
      const timer = setTimeout(() => setMounted(true), 150);
      return () => clearTimeout(timer);
    } else {
      setMounted(false); // Reset animation if reloading
    }
  }, [loading, summary, analytics]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setSummary(null);
    setAnalytics(null);
    setInsights([]);
    navigate("/");
  };

  const handleRefresh = async () => {
    setLoading(true);
    const token = localStorage.getItem("jwt");

    await fetch(
      `${BACKEND_URL}/analyze/${user.login}?force_refresh=true`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const s = await fetchSummary(user.login);
    const a = await fetchAnalytics(user.login);
    const i = await fetchInsights(user.login);

    setSummary(s);
    setAnalytics(a);
    setInsights(i.insights || []);
    setLoading(false);
  };

  // 🔄 LOADING SCREEN (Premium AI Theme)
  if (loading || !summary || !analytics) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/10 via-fuchsia-600/5 to-transparent blur-[120px] rounded-full animate-pulse duration-[4000ms] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-12">
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-indigo-500/20 border-dashed animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full border border-transparent border-t-indigo-400 border-r-fuchsia-400 animate-[spin_1.5s_cubic-bezier(0.68,-0.55,0.265,1.55)_infinite] opacity-80 shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse" />
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-xl sm:text-2xl font-light text-zinc-100 tracking-tight flex items-center gap-3">
              Synthesizing Intelligence
              <span className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-zinc-500 animate-[bounce_1s_infinite_0ms]" />
                <span className="w-1 h-1 rounded-full bg-zinc-500 animate-[bounce_1s_infinite_150ms]" />
                <span className="w-1 h-1 rounded-full bg-zinc-500 animate-[bounce_1s_infinite_300ms]" />
              </span>
            </h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                Analyzing repository history
              </p>
              <p className="text-[10px] sm:text-xs font-mono text-zinc-600 uppercase tracking-widest">
                Mapping developer archetype...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = analytics?.stats || {};

  // 🟢 MAIN DASHBOARD UI
  return (
    <div 
      ref={dashboardRef}
      className="min-h-screen bg-[#09090b] text-zinc-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative"
    >
      {/* 🔦 THE GLOBAL SPOTLIGHT */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 opacity-0 lg:opacity-100 transition duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.03), transparent 40%)`
        }}
      />

      {/* 🌌 STATIC AMBIENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/10 via-fuchsia-600/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* 🎛️ DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-32 pt-8 relative z-10">
        
        <div className={`transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <Header user={user} onRefresh={handleRefresh} onLogout={handleLogout} />
        </div>

        <div className={`mt-16 sm:mt-24 mb-20 transition-all duration-1000 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <ActivitySection stats={stats} />
        </div>

        <div className={`my-24 py-16 border-y border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transition-all duration-1000 ease-out delay-300 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"}`}>
          <InsightsSection insights={insights} />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 mt-24 transition-all duration-1000 ease-out delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="lg:col-span-8">
            <ChartsSection analytics={analytics} summary={summary} />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-16 relative">
            <div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <CodingDNA stats={stats} />
            <Summary data={summary} />
          </div>
        </div>

      </div>
    </div>
  );
}