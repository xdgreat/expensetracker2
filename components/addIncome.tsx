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
import { useState } from "react";

export default function AddIncome() {
  const [date, setDate] = useState<Date>();
  const [postRequest, setPostRequest] = useState({
    name: "",
    amount: 0,
    date: date,
    description: "",
  });

  const handleChange = (e: any, idName: string) => {
    idName = e.target.id;
    setPostRequest({ ...postRequest, [idName]: e.target.value });
    console.log(postRequest);
  };

  const handleDateChange = (e: any) => {
    setPostRequest({ ...postRequest, date: date });
    console.log(postRequest);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Income</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Income</DialogTitle>
            <DialogDescription>
              Add your income entry with the description. Click save changes
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
                defaultValue="Food"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount($)
              </Label>
              <Input
                id="amount"
                defaultValue="79.99"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
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
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    id="date"
                    onSelect={(e) => handleDateChange(e)}
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
                defaultValue="Dining out"
                className="col-span-3"
                onChange={(e) => handleChange(e, e.target.id)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
