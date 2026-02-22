import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";



export default function ContributionHeatmap({ commits }) {

  if (!commits || commits.length === 0) {

    return <p>No commit data available</p>;

  }



  const heatmapData = commits.reduce((acc, commit) => {

    const date = new Date(commit.date).toISOString().split("T")[0];



    const existing = acc.find((d) => d.date === date);

    if (existing) {

      existing.count += 1;

    } else {

      acc.push({ date, count: 1 });

    }



    return acc;

  }, []);



  const endDate = new Date();

  const startDate = new Date();

  startDate.setFullYear(startDate.getFullYear() - 1);



  return (
    <div className="
      w-full pb-2
      /* Target the month/day labels */
      [&_.react-calendar-heatmap-text]:fill-zinc-500
      [&_.react-calendar-heatmap-text]:text-[10px]
      [&_.react-calendar-heatmap-text]:font-medium
      [&_.react-calendar-heatmap-text]:tracking-widest
      
      /* Target the blocks (rectangles) */
      [&_rect]:rx-[3px] /* slightly rounded corners */
      [&_rect]:stroke-[0.5px]
      [&_rect]:transition-all [&_rect]:duration-300 [&_rect]:ease-in-out
      hover:[&_rect]:stroke-white hover:[&_rect]:stroke-1
      
      /* The Custom AI Color Palette */
      [&_.color-empty]:fill-zinc-900/40 [&_.color-empty]:stroke-zinc-800/20
      [&_.color-scale-1]:fill-indigo-950 [&_.color-scale-1]:stroke-indigo-900/30
      [&_.color-scale-2]:fill-indigo-800 [&_.color-scale-2]:stroke-indigo-700/50
      [&_.color-scale-3]:fill-indigo-500 [&_.color-scale-3]:stroke-indigo-400
      
      /* Max level glow: Pure white fill with a drop shadow filter */
      [&_.color-scale-4]:fill-white [&_.color-scale-4]:stroke-white
      [&_.color-scale-4]:drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]
    ">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count === 1 || value.count === 2) return "color-scale-1";
          if (value.count >= 3 && value.count <= 5) return "color-scale-2";
          if (value.count >= 6 && value.count <= 9) return "color-scale-3";
          return "color-scale-4"; // 10+ commits
        }}
        titleForValue={(value) => {
          if (!value || !value.date) return "No commits";
          return `${value.count} commits on ${new Date(value.date).toLocaleDateString()}`;
        }}
      />
      
      {/* Sleek Legend underneath */}
      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-zinc-500 tracking-widest uppercase font-medium">
        <span>Less</span>
        <div className="flex gap-[3px]">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900/40 border-[0.5px] border-zinc-800/20" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-950 border-[0.5px] border-indigo-900/30" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-800 border-[0.5px] border-indigo-700/50" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-500 border-[0.5px] border-indigo-400" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-white border-[0.5px] border-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}