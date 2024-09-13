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
  log: FinancialEntry[];
};

export default async function addData(data: FinancialData) {
  const path = process.cwd() + "/app/api/(data)/main.json";
  fs.writeFile(path, JSON.stringify(data, null, 2));

  const file = await fs.readFile(path, "utf8");
  const updatedData: FinancialData = JSON.parse(file);
  return updatedData;
}
