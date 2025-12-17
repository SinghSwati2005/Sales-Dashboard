import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const salesData = [
    { year: 2022, sales: 120000 },
    { year: 2023, sales: 150000 },
    { year: 2024, sales: 180000 },
  ];

  return NextResponse.json(salesData);
};
