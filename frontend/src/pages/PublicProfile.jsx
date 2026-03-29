import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnalytics, fetchInsights, fetchSummary } from "../api";
import Insights from "../components/Insights";
import CodingDNA from "../components/CodingDNA";

const BACKEND_URL = "https://gitsense-ai-2.onrender.com";

export default function PublicProfile() {
  const { username } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const [a, i, s] = await Promise.all([
          fetchAnalytics(username),
          fetchInsights(username),
          fetchSummary(username)
        ]);
        setAnalytics(a);
        setInsights(i.insights || []);
        setSummary(s);
      } catch (err) {
        setError("Profile not found or not yet analyzed.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <p className="text-zinc-400 text-sm uppercase tracking-widest animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 text-sm">{error}</p>
        
          <a href="/"
          className="text-xs text-indigo-400 uppercase tracking-widest hover:text-indigo-300"
        >
          Go to GitSense
        </a>
      </div>
    );
  }

  const stats = analytics?.stats || {};

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/10 via-fuchsia-600/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <div className="flex items-center gap-3 border border-indigo-500/20 bg-indigo-500/5 px-5 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">
              GitSense Profile
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            @{username}
          </h1>

          {/* Quick stats */}
          {summary && (
            <div className="flex items-center gap-8 mt-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-white">
                  {summary.total_commits}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">
                  Tracked Commits
                </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-white">
                  {stats.total_repos}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">
                  Repositories
                </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-white">
                  {stats.current_streak}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">
                  Day Streak
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Coding DNA */}
        <div className="mb-16">
          <CodingDNA stats={stats} />
        </div>

        {/* Insights */}
        <div className="border-t border-white/5 pt-16">
          <Insights insights={insights} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/5 pt-12">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Powered by GitSense AI
          </p>
          
            <a href="/"
            className="text-xs text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors"
            >
            Analyze your own GitHub →
          </a>
        </div>

      </div>
    </div>
  );
}