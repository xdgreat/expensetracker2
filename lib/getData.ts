import { promises as fs } from "node:fs";

export type FinancialEntry = {
  date: string;
  entryType: "income" | "expense";
  entryName: string;
  amount: number;
  description?: string;
};

export type FinancialData = {
  name: string;
  balance: number;
  log: FinancialEntry[];
};

export default async function getData() {
  const path = process.cwd() + "/app/api/(data)/main.json";
  const file = await fs.readFile(path, "utf8");
  const data: FinancialData = JSON.parse(file);
  return data;
}
