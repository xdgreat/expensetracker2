import { FinancialEntry } from "@/lib/addData";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<FinancialEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    sortingFn: 'alphanumeric', // default sorting function for numeric and alphanumeric
  },
  {
    accessorKey: "entryName",
    header: "Entry Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    enableSorting: true,
    sortingFn: 'datetime', // ensure proper date sorting
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    enableSorting: true,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "FJD",
        unitDisplay: "long",
        currencyDisplay: "narrowSymbol",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    sortingFn: 'basic', // default sorting function for numeric values
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entry = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(entry.entryName)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
