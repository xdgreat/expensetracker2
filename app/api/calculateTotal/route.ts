import { NextResponse } from "next/server";
import getData from "../../../lib/getData";

export async function GET() {
  const logs = (await getData()).log;

  const { totalExpense, totalIncome } = logs.reduce(
    (acc, { entryType, amount }) => {
      if (entryType === "expense") (acc.totalExpense += amount).toFixed(2);
      if (entryType === "income") (acc.totalIncome += amount).toFixed(2);
      return acc;
    },
    { totalExpense: 0, totalIncome: 0 }
  );

  const balance = totalIncome - totalExpense;

  console.log(totalIncome, totalExpense, balance);
  return NextResponse.json({
    totalExpense: Math.round(totalExpense * 100) / 100,
    totalIncome: Math.round(totalIncome * 100) / 100,
    balance: Math.round(balance * 100) / 100,
  });
}
