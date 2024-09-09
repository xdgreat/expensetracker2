import getData from "@/lib/getData";
import { NextResponse } from "next/server";

type response = {
  success: boolean;
  balance: number;
  status: number;
};

export async function GET() {
  try {
    const data = await getData();

    const balance = data.balance;

    const response: response = {
      balance: balance,
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
