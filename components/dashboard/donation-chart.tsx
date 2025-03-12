"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const monthlyData = [
  { month: "Jan", donations: 12000 },
  { month: "Feb", donations: 15000 },
  { month: "Mar", donations: 18000 },
  { month: "Apr", donations: 16000 },
  { month: "May", donations: 21000 },
  { month: "Jun", donations: 25000 },
  { month: "Jul", donations: 23000 },
  { month: "Aug", donations: 28000 },
  { month: "Sep", donations: 30000 },
  { month: "Oct", donations: 32000 },
  { month: "Nov", donations: 35000 },
  { month: "Dec", donations: 42000 },
]

const weeklyData = [
  { week: "Week 1", donations: 5000 },
  { week: "Week 2", donations: 7500 },
  { week: "Week 3", donations: 6800 },
  { week: "Week 4", donations: 9200 },
  { week: "Week 5", donations: 8500 },
  { week: "Week 6", donations: 10500 },
  { week: "Week 7", donations: 9800 },
  { week: "Week 8", donations: 11200 },
]

export function DonationChart() {
  const { theme } = useTheme()
  const [timeframe, setTimeframe] = useState("monthly")

  const data = timeframe === "monthly" ? monthlyData : weeklyData
  const dataKey = timeframe === "monthly" ? "month" : "week"

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-primary">${payload[0].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle>Donation Trends</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey={dataKey}
                stroke={theme === "dark" ? "#888888" : "#333333"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={theme === "dark" ? "#888888" : "#333333"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

