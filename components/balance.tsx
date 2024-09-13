"use client";

import { FinancialData } from "@/lib/getData";
import { useEffect, useState } from "react";
import AddEntryType from "./addEntryType";
import { DataTable } from "./tables/table-data";
import { columns } from "./tables/columns";
import { IncomeExpensePieChart } from "./incomeExpensePieChart";

export default function Balance() {
  const [incomeExpense, getIncomeExpense] = useState<{
    totalExpense: number;
    totalIncome: number;
    balance: number;
  }>({ totalExpense: 0, totalIncome: 0, balance: 0 });
  const [data, getData] = useState<FinancialData>({
    name: "",
    log: [],
  });

  async function getAllData() {
    fetch("/api/getAllData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.log.reverse();
        getData(data);
        console.log(data);
      });
  }
  useEffect(() => {
    getAllData();
    console.log(data);

    fetch("/api/calculateTotal", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => getIncomeExpense(data));

    console.log(incomeExpense);
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto border bg-green-500">
        <IncomeExpensePieChart
          name={data.name}
          expenseAmount={incomeExpense.totalExpense}
          incomeAmount={incomeExpense.totalIncome}
          callback={getAllData}
        />
      </div>

      <DataTable columns={columns} data={data.log} />
    </>
  );
}
