"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AddEntryType from "./addEntryType";

export const description = "A pie chart with a label";

export function IncomeExpensePieChart({
  name,
  incomeAmount,
  expenseAmount,
  callback,
}: {
  name: string;
  incomeAmount: number;
  expenseAmount: number;
  callback: Function;
}) {
  const chartData = [
    { entryType: "income", amount: incomeAmount, fill: "#4CAF50" },
    { entryType: "expense", amount: expenseAmount, fill: "#F44336" },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    income: {
      label: "Income",
      color: "var(--color-income)",
    },
    expense: {
      label: "Expense",
      color: "var(--color-expense)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Hi, {name}</CardTitle>
        <CardDescription>Expense & Income</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] pb-0">
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="entryType"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#F5F5F5"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}>
                    ${value}
                  </text>
                );
              }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Balance: ${(incomeAmount - expenseAmount).toFixed(2)}
          {incomeAmount - expenseAmount >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total income and expense of all time
        </div>
      </CardFooter>
      <div className="mx-auto flex gap-3 my-4">
        <AddEntryType
          title="Add Income"
          type="income"
          className="bg-green-500"
          callback={callback}
        />
        <AddEntryType
          title="Add Expense"
          type="expense"
          className="bg-red-500"
          callback={callback}
        />
      </div>
    </Card>
  );
}
