import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler // Required for the gradient area fill
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// 🎨 Shared Premium Tooltip Styling
const premiumTooltip = {
  backgroundColor: 'rgba(24, 24, 27, 0.9)', // zinc-900
  titleColor: '#a1a1aa', // zinc-400
  bodyColor: '#f4f4f5', // zinc-50
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  padding: 12,
  cornerRadius: 8,
  displayColors: true,
  boxPadding: 4
};

export default function Charts({ analytics, languages }) {
  // Defensive checks to ensure data exists before rendering
  if (!analytics || !languages) return null;

  return (
    <div className="flex flex-col gap-16 w-full h-full min-h-[350px]">
      
      {/* 📈 Top Row: The main velocity chart spans full width */}
      <div className="w-full h-[300px] xl:h-[350px]">
        <CommitsPerDayChart data={analytics.commits_per_day} />
      </div>

      {/* 📊 Bottom Row: Split layout for secondary metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full h-[300px]">
        <WeekendWeekdayChart data={analytics.weekend_vs_weekday} />
        <LanguageChart data={languages} />
      </div>

    </div>
  );
}

// ------------------------------------------------------------------
// 1. Line Chart (Commits per Day) - Flowing Area Gradient
// ------------------------------------------------------------------
function CommitsPerDayChart({ data }) {
  if (!data) return null;
  const labels = Object.keys(data);
  const values = Object.values(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: { 
        tension: 0.4, // Makes the line smooth and flowing instead of sharp
        borderWidth: 2 
      }, 
      point: { 
        radius: 0, // Hides dots by default for a cleaner look
        hitRadius: 20, 
        hoverRadius: 6,
        hoverBackgroundColor: '#fff',
        hoverBorderColor: '#6366f1',
        hoverBorderWidth: 2
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: premiumTooltip
    },
    scales: {
      x: { 
        grid: { display: false }, // No vertical grid lines
        border: { display: false }, // Hide the thick axis line
        ticks: { color: "#71717a", font: { size: 11 }, maxTicksLimit: 8 } 
      },
      y: { 
        grid: { color: "rgba(255,255,255,0.03)" }, // Extremely faint horizontal grid
        border: { display: false },
        ticks: { color: "#71717a", font: { size: 11 } },
        beginAtZero: true
      }
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Commits",
        data: values,
        borderColor: "#6366f1", // indigo-500
        fill: true,
        // Scriptable option to create the beautiful ambient gradient underneath the line
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)"); // Soft indigo
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)"); // Fades to transparent
          return gradient;
        }
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h4 className="text-sm text-zinc-500 font-medium tracking-wide mb-6 uppercase">Commit Velocity</h4>
      <div className="flex-1 relative">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. Bar Chart (Weekend vs Weekday) - Sleek, border-radius bars
// ------------------------------------------------------------------
function WeekendWeekdayChart({ data }) {
  if (!data) return null;
  const labels = ["Weekday", "Weekend"];
  const values = [data.weekday || 0, data.weekend || 0];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    borderRadius: 6, // Rounds the top of the bars
    plugins: {
      legend: { display: false },
      tooltip: premiumTooltip
    },
    scales: {
      x: { 
        grid: { display: false }, 
        border: { display: false }, 
        ticks: { color: "#a1a1aa", font: { size: 12 } } 
      },
      y: { display: false } // Hide the Y axis entirely for a cleaner bar look
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Commits",
        data: values,
        // Dark metallic indigo for the bars
        backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(82, 82, 91, 0.5)"],
        hoverBackgroundColor: ["#6366f1", "#71717a"],
        borderWidth: 0,
        barThickness: 40 // Keep bars thin and elegant
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h4 className="text-sm text-zinc-500 font-medium tracking-wide mb-6 uppercase">Work Rhythm</h4>
      <div className="flex-1 relative">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. Doughnut Chart (Language DNA) - Replaces Pie Chart
// ------------------------------------------------------------------
function LanguageChart({ data }) {
  if (!data) return null;
  const labels = Object.keys(data);
  const values = Object.values(data);

  // Modern AI SaaS palette
  const AI_PALETTE = ["#6366f1", "#8b5cf6", "#a855f7", "#52525b", "#3f3f46"];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%", // Turns the Pie into a thin, elegant Doughnut
    plugins: {
      legend: { 
        position: 'right',
        labels: {
          color: '#a1a1aa',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 }
        }
      },
      tooltip: premiumTooltip
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#09090b', // Zinc-950 (matches your dark app background to separate slices cleanly)
        hoverBorderColor: '#09090b',
        hoverOffset: 4
      }
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: AI_PALETTE,
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h4 className="text-sm text-zinc-500 font-medium tracking-wide mb-6 uppercase">Language Distribution</h4>
      <div className="flex-1 relative flex items-center justify-center">
        <Doughnut options={options} data={chartData} />
        
        {/* Typographic center for the Doughnut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pr-32">
          <span className="text-2xl font-light text-zinc-100 tracking-tighter">
             {labels[0] || "N/A"}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
             Primary
          </span>
        </div>
      </div>
    </div>
  );
}