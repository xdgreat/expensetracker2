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
    <span>
      <h1>Name: {data.name}</h1>
      <h2>Balance: ${data.balance}</h2>
      <AddIncome />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            {/* <TableHead>Entry Type</TableHead> */}
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.log.map((invoice) => (
            <TableRow
              key={invoice.entryName}
              style={{
                background:
                  invoice.entryType === "income"
                    ? "rgba(98, 247, 87, 0.8)"
                    : "rgba(204, 0, 0, 0.5)",
              }}>
              <TableCell className="font-medium">{invoice.date}</TableCell>
              <TableCell className="font-medium">{invoice.entryName}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              {/* <TableCell>{invoice.entryType}</TableCell> */}
              <TableCell className="font-medium">${invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>
              Income: ${incomeExpense.totalIncome}
              <br />
              Expense: ${incomeExpense.totalExpense}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </span>
  );
}
