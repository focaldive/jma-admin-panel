"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Calendar as HeroUICalendar } from "@heroui/react"
import { parseDate } from "@internationalized/date"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <HeroUICalendar
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-popover text-popover-foreground shadow-md rounded-lg", className)}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

export default function App() {
  return (
    <div className="flex gap-x-4">
      <HeroUICalendar aria-label="Date (No Selection)" />
      <HeroUICalendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")} />
    </div>
  );
}
