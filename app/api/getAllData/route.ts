import getData, { FinancialData, FinancialEntry } from "@/lib/getData";
import { NextResponse } from "next/server";

type response = {
  success: boolean;
  data: FinancialData;
  status: number;
};

export async function GET() {
  try {
    const data = await getData();
    const response = data;
    return NextResponse.json(response);
  } catch (error) {
    const response = {
      status: 500,
      error: error,
    };
    return NextResponse.json(response);
  }
}
