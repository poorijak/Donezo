"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Calendar23() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

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
            className="w-full justify-between font-normal"
          >
            {range?.from && range?.to
              ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : "Select task duration"}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(range) => {
              setRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
