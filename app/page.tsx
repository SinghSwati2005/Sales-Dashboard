"use client"; // required for hooks

import { useEffect, useState } from "react";
import ChartCard from "../components/molecules/ChartCard";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";

interface SalesData {
  year: number;
  sales: number;
}

export default function Home() {
  const [data, setData] = useState<SalesData[]>([]);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [manualYear, setManualYear] = useState("");
  const [manualSales, setManualSales] = useState("");
  const [threshold, setThreshold] = useState("");

  // Fetch API data from app/api/sales/route.ts
  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data: SalesData[]) => setData(data));
  }, []);

  // Add / Update data manually
  const handleAddData = () => {
    if (!manualYear || !manualSales) return;
    const year = parseInt(manualYear);
    const sales = parseInt(manualSales);

    const existingIndex = data.findIndex((d) => d.year === year);
    if (existingIndex >= 0) {
      const updatedData = [...data];
      updatedData[existingIndex].sales = sales;
      setData(updatedData);
    } else {
      setData([...data, { year, sales }]);
    }

    setManualYear("");
    setManualSales("");
  };

  // Filtered data based on threshold input
  const filteredData = threshold
    ? data.filter((d) => d.sales >= parseInt(threshold))
    : data;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Sales Dashboard</h1>
        <span className="text-gray-500">2022 - 2024</span>
      </header>

      {/* Controls */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        {/* Chart Type Buttons */}
        <div className="flex gap-3">
          {["bar", "line", "pie"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-md shadow-md transition ${
                chartType === type
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setChartType(type as any)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Threshold Filter */}
        <div className="flex items-center gap-3">
          <Input
            value={threshold}
            onChange={setThreshold}
            placeholder="Min Sales"
          />
          <span className="text-gray-500">
            Showing {filteredData.length} / {data.length} years
          </span>
        </div>
      </div>

      {/* Chart Card */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 mb-6">
        <ChartCard data={filteredData} chartType={chartType} />
      </div>

      {/* Manual Data Entry */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-3 items-center">
        <Input value={manualYear} onChange={setManualYear} placeholder="Year" />
        <Input value={manualSales} onChange={setManualSales} placeholder="Sales" />
        <Button onClick={handleAddData}>Add / Update Data</Button>
      </div>
    </div>
  );
}
