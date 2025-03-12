"use client"

import { forwardRef } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function DatePickerComponent({ date, setDate }) {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      variant={"outline"}
      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
      onClick={onClick}
      ref={ref}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  ))

  CustomInput.displayName = "CustomInput"

  return (
    <div className="react-datepicker-wrapper">
      <style jsx global>{`
        .react-datepicker {
          font-family: inherit;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background-color: hsl(var(--background));
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .react-datepicker__header {
          background-color: hsl(var(--muted));
          border-bottom: 1px solid hsl(var(--border));
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          padding-top: 0.5rem;
        }
        .react-datepicker__day-name {
          color: hsl(var(--muted-foreground));
          width: 2rem;
          margin: 0.2rem;
        }
        .react-datepicker__day {
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          margin: 0.2rem;
          border-radius: 0.25rem;
        }
        .react-datepicker__day:hover {
          background-color: hsl(var(--accent));
        }
        .react-datepicker__day--selected {
          background-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: hsl(var(--accent));
        }
        .react-datepicker__day--today {
          font-weight: bold;
        }
        .react-datepicker__navigation {
          top: 0.5rem;
        }
        .react-datepicker__navigation--previous {
          left: 1rem;
        }
        .react-datepicker__navigation--next {
          right: 1rem;
        }
        .react-datepicker__month-container {
          padding: 0.5rem;
        }
        .react-datepicker__current-month {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .react-datepicker__triangle {
          display: none;
        }
        @media (max-width: 640px) {
          .react-datepicker__day-name, .react-datepicker__day {
            width: 1.7rem;
            margin: 0.1rem;
          }
          .react-datepicker__current-month {
            font-size: 0.875rem;
          }
        }
      `}</style>
      <DatePicker
        selected={date}
        onChange={setDate}
        customInput={<CustomInput />}
        dateFormat="MMMM d, yyyy"
        calendarClassName="shadow-lg"
        popperClassName="z-50"
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              padding: 8,
            },
          },
        ]}
      />
    </div>
  )
}

// For backward compatibility
export { DatePickerComponent as DatePicker }

