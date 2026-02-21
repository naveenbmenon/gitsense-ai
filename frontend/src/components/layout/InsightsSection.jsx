import Insights from "../Insights";

export default function InsightsSection({ insights }) {
  if (!insights) return null;

  return (
    <section className="mb-20">
      <Insights insights={insights} />
    </section>
  );
}