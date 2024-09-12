"use client";

import { FinancialData } from "@/lib/getData";
import { useEffect, useState } from "react";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Table } from "./ui/table";
import AddIncome from "./addIncome";
import AddEntryType from "./addEntryType";
import { DataTable } from "./tables/table-data";
import { columns } from "./tables/columns";

export default function Balance() {
  const [incomeExpense, getIncomeExpense] = useState<{
    totalExpense: number;
    totalIncome: number;
  }>({ totalExpense: 0, totalIncome: 0 });
  const [data, getData] = useState<FinancialData>({
    name: "",
    balance: 0,
    log: [],
  });

  useEffect(() => {
    fetch("/api/getAllData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => getData(data));

    fetch("/api/calculateTotal", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => getIncomeExpense(data));

    console.log(incomeExpense);
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <h1 className="">Name: {data.name}</h1>
        <h2>Balance: ${data.balance}</h2>
        <div className="fixed bottom-2 z-[1000]">
          <AddEntryType title="Add Income" type="income" />
        </div>
        <AddEntryType title="Add Expense" type="expense" />
      </div>

      <DataTable columns={columns} data={data.log} />
    </>
  );
}
