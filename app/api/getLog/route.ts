import getData, { FinancialEntry } from "@/lib/getData";
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";

type response = {
  success: boolean;
  log: FinancialEntry[];
  status: number;
};

export async function GET() {
  try {
    const data = await getData();
    const logArr = data.log;

    const response: response = {
      log: logArr,
      success: true,
      status: 200,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response = {
      status: 500,
      error: error,
    };
    return NextResponse.json(response);
  }
}
