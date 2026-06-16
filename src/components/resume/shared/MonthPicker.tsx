"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface MonthPickerProps {
  /** Stored as "Jan 2023" or "" */
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** "light" for white backgrounds, "dark" for Template4 dark left column */
  variant?: "light" | "dark"
  className?: string
}

function parseMonthStr(str: string): Date | undefined {
  if (!str?.trim()) return undefined
  const d = parse(str.trim(), "MMM yyyy", new Date())
  return isValid(d) ? d : undefined
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "Month",
  variant = "light",
  className,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false)
  const date = parseMonthStr(value)

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return
    // normalise to 1st of month so display is always "MMM yyyy"
    const d = new Date(selected.getFullYear(), selected.getMonth(), 1)
    onChange(format(d, "MMM yyyy"))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-6 min-w-[88px] px-2 text-[9px] justify-between font-normal gap-1 rounded",
            !value && "text-muted-foreground",
            variant === "dark" && "border-white/20 bg-transparent text-[#f0ede8] hover:bg-white/10 hover:text-[#f0ede8]",
            className
          )}
        >
          <span>{value || placeholder}</span>
          <CalendarIcon className="h-2.5 w-2.5 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date ?? new Date()}
          captionLayout="dropdown"
          startMonth={new Date(1950, 0)}
          endMonth={new Date(new Date().getFullYear() + 5, 11)}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
