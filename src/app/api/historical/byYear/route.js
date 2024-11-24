import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");

  const historicalDataByYear = await prisma.davao_historical_data.findMany({
    where: {
      date: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${Number(year) + 1}-01-01`),
      },
    },
  });

  // Convert BigInt values to number
  const processedData = JSON.parse(
    JSON.stringify(historicalDataByYear, (key, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(processedData);
}
