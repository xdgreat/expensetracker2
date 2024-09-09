import { NextResponse } from "next/server";
import getData from "../../../lib/getData";

export async function GET() {
  const logs = (await getData()).log;

  const { totalExpense, totalIncome } = logs.reduce(
    (acc, { entryType, amount }) => {
      if (entryType === "expense") acc.totalExpense += amount;
      if (entryType === "income") acc.totalIncome += amount;
      return acc;
    },
    { totalExpense: 0, totalIncome: 0 }
  );

  return NextResponse.json({
    totalExpense: Math.round(totalExpense * 100) / 100,
    totalIncome: Math.round(totalIncome * 100) / 100,
  });
}
