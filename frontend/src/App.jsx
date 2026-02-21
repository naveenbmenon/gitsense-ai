import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { fetchSummary, fetchAnalytics, fetchInsights } from "./api";
import ActivitySection from "./components/layout/ActivitySection";
import Summary from "./components/Summary";

import Charts from "./components/Charts";

import Insights from "./components/Insights";

import ContributionHeatmap from "./components/ContributionHeatmap";

import StatsBar from "./components/StatsBar";

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

      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
  <button
    onClick={handleLogin}
    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
               text-white font-semibold text-lg shadow-lg 
               hover:scale-105 hover:shadow-xl transition-all duration-200"
  >
    Login with GitHub
  </button>
</div>

    );

  }



  if (loading || !summary || !analytics) {

    return <p>Loading dashboard…</p>;

  }



  const stats = analytics.stats;



  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <Header
  user={user}
  onRefresh={handleRefresh}
  onLogout={handleLogout}
/>



      {stats && <StatsBar stats={stats} />}

      {stats && <CodingDNA stats={stats} />}



      {/* 🔥 NEW SECTION */}

      <ActivitySection stats={stats} />


      <Summary data={summary} />



      {analytics?.commits?.length > 0 && (

        <ContributionHeatmap commits={analytics.commits} />

      )}



      <Charts

        analytics={analytics}

        languages={summary.language_distribution}

      />



      <Insights insights={insights} />

    </div>

  );

}