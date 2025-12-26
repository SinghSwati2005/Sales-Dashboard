import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface SalesData {
  year: number;
  sales: number;
  [key: string]: any;
}

interface ChartCardProps {
  data: SalesData[];
  chartType: "bar" | "line" | "pie";
}

const LIGHT_GRADIENTS = [
  ["#1E3A8A", "#3B82F6"], // Indigo
  ["#065F46", "#10B981"], // Teal
  ["#78350F", "#F59E0B"], // Amber
  ["#7C2D12", "#FB923C"], // Orange
];

const DARK_GRADIENTS = [
  ["#00E5FF", "#2979FF"], // Neon blue
  ["#00E676", "#00C853"], // Neon green
  ["#D500F9", "#7C4DFF"], // Purple
  ["#FFD600", "#FF9100"], // Yellow
];

const ChartCard = ({ data, chartType }: ChartCardProps) => {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const GRADIENTS = isDark ? DARK_GRADIENTS : LIGHT_GRADIENTS;

  return (
   <div
  className="
    w-full h-115 rounded-3xl p-6
    bg-linear-to-br
    from-slate-50 via-white to-slate-100

    dark:from-[#020617]
    dark:via-[#020617]
    dark:to-[#020617]

    border border-slate-200 dark:border-slate-800
    transition-colors duration-500
  "
>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-cyan-100">
          Sales Analytics
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Performance overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <>
          {/* BAR CHART */}
          {chartType === "bar" && (
            <BarChart data={data} barGap={28}>
              <defs>
                {data.map((_, i) => (
                  <linearGradient
                    key={i}
                    id={`barGrad${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={GRADIENTS[i % GRADIENTS.length][0]} />
                    <stop offset="100%" stopColor={GRADIENTS[i % GRADIENTS.length][1]} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 6" strokeOpacity={0.15} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
              />
              <YAxis
                axisLine={false}
                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#020617" : "#FFFFFF",
                  borderRadius: "12px",
                  border: "none",
                  color: isDark ? "#E0F2FE" : "#0F172A",
                }}
              />

              <Bar
                dataKey="sales"
                radius={[14, 14, 0, 0]}
                animationDuration={1200}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={`url(#barGrad${i})`} />
                ))}
              </Bar>
            </BarChart>
          )}

          {/* LINE CHART */}
          {chartType === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 6" strokeOpacity={0.15} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
              />
              <YAxis
                axisLine={false}
                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#020617" : "#FFFFFF",
                  borderRadius: "12px",
                  border: "none",
                  color: isDark ? "#E0F2FE" : "#0F172A",
                }}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke={GRADIENTS[0][0]}
                strokeWidth={4}
                dot={{ r: 6, fill: GRADIENTS[0][1] }}
                activeDot={{ r: 10 }}
                animationDuration={1200}
              />
            </LineChart>
          )}

          {/* PIE CHART (ARROWS KEPT) */}
          {chartType === "pie" && (
            <PieChart>
              <Pie
                data={data}
                dataKey="sales"
                nameKey="year"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={70}
                paddingAngle={6}
                labelLine
                label={({ percent }) =>
                  `${((percent ?? 0) * 100).toFixed(0)}%`
                }
                animationDuration={1200}
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={GRADIENTS[i % GRADIENTS.length][0]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#020617" : "#FFFFFF",
                  borderRadius: "12px",
                  border: "none",
                  color: isDark ? "#E0F2FE" : "#0F172A",
                }}
              />

              <Legend
                iconType="circle"
                wrapperStyle={{
                  color: isDark ? "#CBD5E1" : "#334155",
                }}
              />
            </PieChart>
          )}
        </>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
