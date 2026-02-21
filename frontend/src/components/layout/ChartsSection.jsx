import ContributionHeatmap from "../ContributionHeatmap";
import Charts from "../Charts";

export default function ChartsSection({ analytics, summary }) {
  if (!analytics) return null;

  return (
    <section className="mb-16">

      {/* Contribution Heatmap */}
      {analytics?.commits?.length > 0 && (
        <div className="mb-12">
          <ContributionHeatmap commits={analytics.commits} />
        </div>
      )}

      {/* Charts */}
      <Charts
        analytics={analytics}
        languages={summary?.language_distribution}
      />

    </section>
  );
}