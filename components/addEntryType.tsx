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

export default function AddEntryType({
  className,
  type,
  title,
  callback,
}: {
  className: string;
  type: "income" | "expense";
  title: string;
  callback: Function;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [submitData, setSubmitData] = useState({
    success: false,
    message: "",
    status: 0,
    processing: false,
  });
  const [postRequest, setPostRequest] = useState({
    name: "",
    amount: 0.0,
    date: "",
    description: "",
    type: type,
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleChange = (e: any, idName: string) => {
    if (!e) { // to avoid error when no date is selected (pressing the same date twice)
      return;
    }
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

  const validateForm = () => {
    const newErrors = { name: "", amount: "", date: "" };
    let isValid = true;

    if (!postRequest.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!postRequest.amount || postRequest.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
      isValid = false;
    }
    if (!postRequest.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitData({ ...submitData, processing: true });
    const response = await fetch("/api/addFinancialEntry", {
      method: "POST",
      body: JSON.stringify(postRequest),
    });

    if (response.status != 200) {
      console.log("ERROR: Wtf happened bruh");
      setSubmitData({
        processing: false,
        message: "ERROR: Something went wrong.",
        status: 500,
        success: false,
      });
    } else {
      setSubmitData({
        processing: false,
        message: "Success: Entry added successfully.",
        status: 200,
        success: true,
      });

      setPostRequest({
        name: "",
        amount: 0.0,
        date: "",
        description: "",
        type: type,
      });

      const data = await response.json();
      callback();
      setIsDialogOpen(false);
    }
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      handleChange(e, "amount");
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default" color="#d4d4d4" className={className}>
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Add your {type} entry with the description. Click save changes
              when you are done.
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
                value={postRequest.name}
                onChange={(e) => handleChange(e, e.target.id)}
                required
              />
              {errors.name && (
                <p className="col-span-4 text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount($)
              </Label>
              <Input
                id="amount"
                placeholder="9.99"
                className="col-span-3"
                value={postRequest.amount === 0.0 ? "" : postRequest.amount}
                onChange={handleAmountInput}
                required
              />
              {errors.amount && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.amount}
                </p>
              )}
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
                    onSelect={(e) => {
                      handleChange(e, "date");
                    }}
                    id="date"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="col-span-4 text-red-500 text-xs">{errors.date}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Dining out"
                className="col-span-3"
                value={postRequest.description}
                onChange={(e) => handleChange(e, e.target.id)}
              />
            </div>
          </div>
          <DialogFooter>
            <p
              className={
                submitData.status === 200
                  ? `text-green-500`
                  : `text-red-500` + `ml-0 mr-auto text-xs`
              }></p>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={submitData.processing}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
