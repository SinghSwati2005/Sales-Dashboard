"use client";

import { useState, useMemo } from "react";
import { salesData, SalesData } from "../../data/salesData";
import ChartCard from "../molecules/ChartCard";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import CountUp from "react-countup";
import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";

const SalesDashboard = () => {
  const [data, setData] = useState<SalesData[]>(salesData);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [manualYear, setManualYear] = useState("");
  const [manualSales, setManualSales] = useState("");
  const [threshold, setThreshold] = useState("");

  /* ------------------- DATA LOGIC ------------------- */

  const filteredData = useMemo(() => {
    return threshold
      ? data.filter((d) => d.sales >= parseInt(threshold))
      : data;
  }, [threshold, data]);

  const totalSales = useMemo(
    () => filteredData.reduce((acc, cur) => acc + cur.sales, 0),
    [filteredData]
  );

  const bestYear = useMemo(() => {
    return filteredData.reduce((prev, curr) =>
      curr.sales > prev.sales ? curr : prev
    );
  }, [filteredData]);

  const growth =
    filteredData.length > 1
      ? filteredData[filteredData.length - 1].sales -
        filteredData[filteredData.length - 2].sales
      : 0;

  const trend =
    growth > 0
      ? "📈 Positive Growth"
      : growth < 0
      ? "📉 Sales Decline"
      : "➖ Stable Performance";

  /* ------------------- ACTIONS ------------------- */

  const handleAddData = () => {
    if (!manualYear || !manualSales) return;

    const year = parseInt(manualYear);
    const sales = parseInt(manualSales);

    const index = data.findIndex((d) => d.year === year);
    if (index >= 0) {
      const updated = [...data];
      updated[index].sales = sales;
      setData(updated);
    } else {
      setData([...data, { year, sales }]);
    }

    setManualYear("");
    setManualSales("");
  };

  /* ------------------- UI ------------------- */

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Sales Analytics Dashboard
        </h1>

        <div className="flex items-center gap-2 text-sm opacity-70">
          <TrendingUp size={18} />
          Real-time Insights
        </div>
      </header>

      {/* KPI SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Sales" value={totalSales} />
        <KpiCard title="Best Performing Year" value={bestYear.year} />
        <KpiCard title="Growth Status" value={trend} />
      </section>

      {/* INSIGHTS */}
      <section className="rounded-3xl p-6 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-black/5 dark:border-white/10">
        <h3 className="font-semibold text-lg mb-3">Sales Insights</h3>
        <ul className="space-y-2 text-sm opacity-80">
          <li>• Overall trend: <b>{trend}</b></li>
          <li>• Highest sales year: <b>{bestYear.year}</b></li>
          <li>
            • Average sales: ₹
            {Math.round(totalSales / filteredData.length || 0)}
          </li>
        </ul>
      </section>

      {/* CHART CONTROLS */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        {/* SEGMENTED TABS */}
        <div className="flex bg-black/5 dark:bg-white/10 rounded-2xl p-1">
          <ChartTab
            active={chartType === "bar"}
            onClick={() => setChartType("bar")}
            icon={<BarChart3 size={18} />}
            label="Bar"
          />
          <ChartTab
            active={chartType === "line"}
            onClick={() => setChartType("line")}
            icon={<LineChart size={18} />}
            label="Line"
          />
          <ChartTab
            active={chartType === "pie"}
            onClick={() => setChartType("pie")}
            icon={<PieChart size={18} />}
            label="Pie"
          />
        </div>

        {/* FILTER */}
        <div className="flex gap-2 items-center">
          <Input
            value={threshold}
            onChange={setThreshold}
            placeholder="Min Sales Filter"
          />
          <span className="text-sm opacity-60">≥ threshold</span>
        </div>
      </section>

      {/* CHART */}
      <section className="rounded-3xl">
        {filteredData.length === 0 ? (
          <div className="h-64 flex items-center justify-center opacity-60">
            No data matches the filter
          </div>
        ) : (
          <ChartCard data={filteredData} chartType={chartType} />
        )}
      </section>

      {/* DATA ENTRY */}
      <section className="rounded-3xl p-6 bg-black/5 dark:bg-white/5 space-y-4">
        <h3 className="font-semibold">Add / Update Sales Data</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <Input value={manualYear} onChange={setManualYear} placeholder="Year" />
          <Input
            value={manualSales}
            onChange={setManualSales}
            placeholder="Sales Amount"
          />
          <Button onClick={handleAddData}>Save Data</Button>
        </div>
      </section>
    </div>
  );
};

export default SalesDashboard;

/* ------------------- COMPONENTS ------------------- */

const KpiCard = ({ title, value }: { title: string; value: any }) => (
  <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-lg hover:-translate-y-1 transition-all duration-300">
    <p className="text-sm opacity-60">{title}</p>
    <h2 className="text-4xl font-extrabold mt-2">
      {typeof value === "number" ? (
        <CountUp end={value} duration={1.2} separator="," />
      ) : (
        value
      )}
    </h2>
  </div>
);

const ChartTab = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm transition-all
      ${
        active
          ? "bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg"
          : "opacity-60 hover:opacity-100"
      }
    `}
  >
    {icon}
    {label}
  </button>
);
