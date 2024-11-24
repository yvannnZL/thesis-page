import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(req) {
  const historicalDataByYear = await prisma.davao_predicted_data.findMany();

  // Convert BigInt values to number
  const processedData = JSON.parse(
    JSON.stringify(historicalDataByYear, (_key, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(processedData);
}
