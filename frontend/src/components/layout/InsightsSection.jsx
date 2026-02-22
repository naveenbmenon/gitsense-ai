import Insights from "../Insights";

export default function InsightsSection({ insights }) {
  if (!insights) return null;

  return (
    <section className="relative w-full mb-20 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-indigo-500/[0.02] to-transparent border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 overflow-hidden">
      {/* Subtle AI accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <Insights insights={insights} />
      </div>
    </section>
  );
}