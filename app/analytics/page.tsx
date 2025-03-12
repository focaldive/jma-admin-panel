"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { Download, TrendingUp, TrendingDown, Users, DollarSign, Calendar, Target } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import chart components with no SSR to avoid hydration issues
const ChartComponents = dynamic(() => import("@/components/analytics/chart-components"), {
  ssr: false,
  loading: () => <div className="h-80 flex items-center justify-center">Loading charts...</div>,
})

export default function AnalyticsPage() {
  // Sample data for charts
  const donationData = [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 5000 },
    { month: "Apr", amount: 7000 },
    { month: "May", amount: 6000 },
    { month: "Jun", amount: 8000 },
    { month: "Jul", amount: 10000 },
    { month: "Aug", amount: 9000 },
    { month: "Sep", amount: 11000 },
    { month: "Oct", amount: 12000 },
    { month: "Nov", amount: 14000 },
    { month: "Dec", amount: 18000 },
  ]

  const donorData = [
    { month: "Jan", donors: 120 },
    { month: "Feb", donors: 140 },
    { month: "Mar", donors: 160 },
    { month: "Apr", donors: 180 },
    { month: "May", donors: 200 },
    { month: "Jun", donors: 220 },
    { month: "Jul", donors: 240 },
    { month: "Aug", donors: 260 },
    { month: "Sep", donors: 280 },
    { month: "Oct", donors: 300 },
    { month: "Nov", donors: 320 },
    { month: "Dec", donors: 350 },
  ]

  const categoryData = [
    { name: "Education", value: 35 },
    { name: "Health", value: 25 },
    { name: "Emergency Relief", value: 20 },
    { name: "Community", value: 15 },
    { name: "Other", value: 5 },
  ]

  // Stats
  const stats = [
    {
      title: "Total Donations",
      value: "$107,000",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Donors",
      value: "2,350",
      change: "+4.6%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Avg. Donation",
      value: "$45.53",
      change: "-2.3%",
      trend: "down",
      icon: Target,
    },
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last period
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ChartComponents donationData={donationData} donorData={donorData} categoryData={categoryData} />
        </TabsContent>
        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Donation Analytics</CardTitle>
              <CardDescription>Comprehensive analysis of donation patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <p className="text-muted-foreground">Detailed donation analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donor Analytics</CardTitle>
              <CardDescription>Detailed donor behavior and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <p className="text-muted-foreground">Donor analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Analysis of campaign effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12">
                <p className="text-muted-foreground">Campaign performance analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

