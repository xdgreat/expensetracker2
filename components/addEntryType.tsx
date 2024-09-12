import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export default function AddEntryType({
  type,
  title,
}: {
  type: "income" | "expense";
  title: string;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [postRequest, setPostRequest] = useState({
    name: "",
    amount: 0,
    date: "",
    description: "",
    type: type,
  });

  const handleChange = (e: any, idName: string) => {
    idName = idName ? idName : e.target.id;
    if (idName === "date") {
      setDate(e);
      setPostRequest({
        ...postRequest,
        [idName]: e.toLocaleDateString(),
      });
    } else {
      setPostRequest({ ...postRequest, [idName]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    console.log(postRequest);
    const response = await fetch("/api/addFinancialEntry", {
      method: "POST",
      body: JSON.stringify(postRequest),
    });

    if (response.status != 200) {
      console.log("ERROR: Wtf happened bruh");
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">{title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Add your {type} entry with the description. Click save changes
              when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Food"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount($)
              </Label>
              <Input
                id="amount"
                placeholder="9.99"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                      handleChange(e, "date");
                    }}
                    id="date"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Dining out"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
