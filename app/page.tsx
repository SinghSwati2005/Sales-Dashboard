// "use client";

// import { useEffect, useState } from "react";
// import ChartCard from "../components/molecules/ChartCard";
// import Button from "../components/atoms/Button";
// import Input from "../components/atoms/Input";
// import DarkModeToggle from "@/components/atoms/DarkModeToggle";
// import KpiCard from "@/components/molecules/KpiCard";

// interface SalesData {
//   year: number;
//   sales: number;
// }

// export default function Home() {
//   const [data, setData] = useState<SalesData[]>([]);
//   const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
//   const [manualYear, setManualYear] = useState("");
//   const [manualSales, setManualSales] = useState("");
//   const [threshold, setThreshold] = useState("");

//   useEffect(() => {
//     fetch("/api/sales")
//       .then((res) => res.json())
//       .then((data: SalesData[]) => setData(data));
//   }, []);

//   const handleAddData = () => {
//     if (!manualYear || !manualSales) return;

//     const year = parseInt(manualYear);
//     const sales = parseInt(manualSales);

//     const index = data.findIndex((d) => d.year === year);

//     if (index >= 0) {
//       const updated = [...data];
//       updated[index].sales = sales;
//       setData(updated);
//     } else {
//       setData([...data, { year, sales }]);
//     }

//     setManualYear("");
//     setManualSales("");
//   };

//   const filteredData = threshold
//     ? data.filter((d) => d.sales >= parseInt(threshold))
//     : data;

//   return (
//     <div className="min-h-screen p-6 flex flex-col items-center">
//       {/* HEADER */}
//       <header className="w-full max-w-5xl flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold">
//           Sales Dashboard
//         </h1>

//         <div className="flex items-center gap-4">
//           <span className="opacity-70">
//             2022 – 2024
//           </span>
//           <DarkModeToggle />
//         </div>
//       </header>

//       {/* KPI CARDS */}
//       <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <KpiCard title="Total Sales" value="₹4,50,000" />
//         <KpiCard title="Best Year" value="2024" />
//         <KpiCard title="Average Growth" value="+18%" />
//       </div>

//       {/* CONTROLS */}
//       <div className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between gap-4 mb-6">
//         {/* TABS */}
//         <div
//           className="flex rounded-lg p-1"
//           style={{ backgroundColor: "var(--card)" }}
//         >
//           {["bar", "line", "pie"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setChartType(type as any)}
//               className={`px-4 py-2 rounded-md capitalize transition ${
//                 chartType === type
//                   ? "font-semibold shadow"
//                   : "opacity-70 hover:opacity-100"
//               }`}
//               style={{
//                 backgroundColor:
//                   chartType === type ? "var(--bg)" : "transparent",
//               }}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {/* FILTER */}
//         <div className="flex items-center gap-3">
//           <Input
//             value={threshold}
//             onChange={setThreshold}
//             placeholder="Min Sales"
//           />
//           <span className="text-sm opacity-70">
//             Showing {filteredData.length} / {data.length}
//           </span>
//         </div>
//       </div>

//       {/* CHART CARD */}
//       <div
//         className="w-full max-w-5xl shadow-lg rounded-2xl p-6 mb-8 transition-colors"
//         style={{ backgroundColor: "var(--card)" }}
//       >
//         <ChartCard data={filteredData} chartType={chartType} />
//       </div>

//       {/* MANUAL ENTRY */}
//       <div className="w-full max-w-5xl flex flex-col md:flex-row gap-3 items-center">
//         <Input value={manualYear} onChange={setManualYear} placeholder="Year" />
//         <Input value={manualSales} onChange={setManualSales} placeholder="Sales" />
//         <Button onClick={handleAddData}>
//           Add / Update Data
//         </Button>
//       </div>
//     </div>
//   );
// }
 
"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  Filter,
  PlusCircle,
} from "lucide-react";

import ChartCard from "@/components/molecules/ChartCard";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import DarkModeToggle from "@/components/atoms/DarkModeToggle";
import KpiCard from "@/components/molecules/KpiCard";

interface SalesData {
  year: number;
  sales: number;
}

export default function Page() {
  const [data, setData] = useState<SalesData[]>([]);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [manualYear, setManualYear] = useState("");
  const [manualSales, setManualSales] = useState("");
  const [threshold, setThreshold] = useState("");

  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data: SalesData[]) => setData(data));
  }, []);

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

  const filteredData = threshold
    ? data.filter((d) => d.sales >= parseInt(threshold))
    : data;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* HEADER */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            📊 Sales Dashboard
          </h1>
          <p className="text-sm opacity-70">
            Track growth • Analyze trends • Decide smarter
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 opacity-70 text-sm">
            <Calendar size={16} />
            2022 – 2024
          </span>
          <DarkModeToggle />
        </div>
      </header>

      {/* KPI */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard title="💰 Total Sales" value="₹4,50,000" />
        <KpiCard title="🏆 Best Year" value="2024" />
        <KpiCard title="📈 Avg Growth" value="+18%" />
      </div>

      {/* CONTROLS */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div
          className="flex rounded-xl p-1"
          style={{ backgroundColor: "var(--card)" }}
        >
          {[
            { type: "bar", icon: BarChart3 },
            { type: "line", icon: TrendingUp },
            { type: "pie", icon: PieChart },
          ].map(({ type, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setChartType(type as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                chartType === type
                  ? "font-semibold text-green-600 shadow"
                  : "opacity-70"
              }`}
              style={{
                backgroundColor:
                  chartType === type ? "var(--bg)" : "transparent",
              }}
            >
              <Icon size={16} />
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Filter size={16} className="opacity-70" />
          <Input
            value={threshold}
            onChange={setThreshold}
            placeholder="Min Sales"
          />
          <span className="text-sm opacity-70">
            {filteredData.length}/{data.length}
          </span>
        </div>
      </div>

      {/* CHART */}
      <div
        className="w-full max-w-5xl p-6 rounded-2xl shadow mb-8"
        style={{ backgroundColor: "var(--card)" }}
      >
        <ChartCard data={filteredData} chartType={chartType} />
      </div>

      {/* ENTRY */}
      <div
        className="w-full max-w-5xl flex gap-3 p-4 rounded-xl"
        style={{ backgroundColor: "var(--card)" }}
      >
        <Input value={manualYear} onChange={setManualYear} placeholder="Year" />
        <Input
          value={manualSales}
          onChange={setManualSales}
          placeholder="Sales"
        />
        <Button onClick={handleAddData}>
          <PlusCircle size={16} /> Add / Update
        </Button>
      </div>
    </div>
  );
}
