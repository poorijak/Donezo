"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: DateRange | undefined ;
  setDate: (range: DateRange | undefined) => void;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="dates" className="px-1">
        Task duration
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal"
          >
            {date?.from && date?.to
              ? `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
              : "Select task duration"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            captionLayout="dropdown"
            onSelect={(range) => {
              setDate(range);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
