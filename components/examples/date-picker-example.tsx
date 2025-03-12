"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DatePickerExample() {
  const [date, setDate] = useState(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Picker Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="date" className="text-sm font-medium">
              Select a date
            </label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div>
            <p className="text-sm">Selected date: {date ? date.toLocaleDateString() : "None"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

