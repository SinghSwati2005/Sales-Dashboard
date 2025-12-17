import { useState } from "react";
import { salesData, SalesData } from "../../data/salesData";
import ChartCard from "../molecules/ChartCard";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SalesDashboard = () => {
  const [data, setData] = useState<SalesData[]>(salesData);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [manualYear, setManualYear] = useState("");
  const [manualSales, setManualSales] = useState("");
  const [threshold, setThreshold] = useState("");

  const handleAddData = () => {
    if (!manualYear || !manualSales) return;

    const year = parseInt(manualYear);
    const sales = parseInt(manualSales);

    // Check if year exists -> update
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

  const filteredData = threshold
    ? data.filter((d) => d.sales >= parseInt(threshold))
    : data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>

      {/* Chart Type Buttons */}
      <div className="flex gap-4 mb-4">
        <Button onClick={() => setChartType("bar")}>Bar</Button>
        <Button onClick={() => setChartType("line")}>Line</Button>
        <Button onClick={() => setChartType("pie")}>Pie</Button>
      </div>

      {/* Filter Input */}
      <div className="flex gap-2 mb-4 items-center">
        <Input
          value={threshold}
          onChange={setThreshold}
          placeholder="Minimum Sales Filter"
        />
        <span className="text-gray-600">Only show data {">="} threshold</span>
      </div>

      {/* Chart */}
      <ChartCard data={filteredData} chartType={chartType} />

      {/* Manual Data Entry */}
      <div className="mt-6 flex gap-2">
        <Input value={manualYear} onChange={setManualYear} placeholder="Year" />
        <Input value={manualSales} onChange={setManualSales} placeholder="Sales" />
        <Button onClick={handleAddData}>Add / Update Data</Button>
      </div>
    </div>
  );
};

export default SalesDashboard;
