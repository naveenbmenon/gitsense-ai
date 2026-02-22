import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { fetchSummary, fetchAnalytics, fetchInsights } from "./api";
import ActivitySection from "./components/layout/ActivitySection";
import Summary from "./components/Summary";
import ChartsSection from "./components/layout/ChartsSection";
import InsightsSection from "./components/layout/InsightsSection";
import CodingDNA from "./components/CodingDNA";
import "./index.css";

const BACKEND_URL = "https://gitsense-ai-2.onrender.com";



export default function App() {

  const [user, setUser] = useState(null);

  const [summary, setSummary] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  const [insights, setInsights] = useState([]);

  const [loading, setLoading] = useState(false);




  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const tokenFromUrl = params.get("token");



    if (tokenFromUrl) {

      localStorage.setItem("jwt", tokenFromUrl);

      window.history.replaceState({}, document.title, "/");

    }



    const token = localStorage.getItem("jwt");



    if (!token) {

      setUser(null);

      return;

    }



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

        setUser(null);

      });

  }, []);



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



  const handleLogin = () => {

    window.location.href = `${BACKEND_URL}/auth/login`;

  };



  const handleLogout = () => {

    localStorage.removeItem("jwt");

    setUser(null);

    setSummary(null);

    setAnalytics(null);

    setInsights([]);

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



  if (!user) {

    return (
    // Deep charcoal canvas with a subtle, ambient AI glow at the top center
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans relative overflow-x-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto px-6 pb-24 pt-8 relative z-10">
        
        <Header 
          user={user} 
          onRefresh={handleRefresh} 
          onLogout={handleLogout} 
        />

        {/* Instead of stacked boxes, we use an asymmetric hero section */}
        <div className="mt-16 sm:mt-24 mb-20">
          <ActivitySection stats={stats} />
        </div>

        {/* AI Insights break the layout as a full-width typographic quote */}
        <div className="my-20 py-12 border-y border-white/5 bg-gradient-to-r from-transparent via-zinc-900/20 to-transparent">
          <InsightsSection insights={insights} />
        </div>

        {/* Charts and DNA sit on a continuous plain, no boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
          <div className="lg:col-span-8">
            <ChartsSection analytics={analytics} summary={summary} />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-12">
             {/* We weave smaller modules into the right column */}
            <CodingDNA stats={stats} />
            <Summary data={summary} />
          </div>
        </div>

      </div>
    </div>
  );
  }}
