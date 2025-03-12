"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Education", value: 35000 },
  { name: "Health", value: 45000 },
  { name: "Environment", value: 25000 },
  { name: "Disaster Relief", value: 60000 },
  { name: "Animal Welfare", value: 15000 },
]

const COLORS = ["#f43f5e", "#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b"]

export function DonationByCategory() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-primary">${payload[0].value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {Math.round((payload[0].value / data.reduce((sum, entry) => sum + entry.value, 0)) * 100)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 gridd grid-cols-2 gap-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <div className="flex flex-1 justify-between text-sm">
                <span>{entry.name}</span>
                <span className="font-medium">${entry.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

