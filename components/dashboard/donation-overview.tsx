import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Calendar, TrendingUp } from "lucide-react"

const cards = [
  {
    title: "Total Donations",
    icon: Heart,
    amount: "$245,678.90",
    description: "+20.1% from last month",
    trend: "up",
  },
  {
    title: "Active Donors",
    icon: Users,
    amount: "2,350",
    description: "+15.3% from last month",
    trend: "up",
  },
  {
    title: "Active Campaigns",
    icon: Calendar,
    amount: "12",
    description: "+2 from last month",
    trend: "up",
  },
  {
    title: "Donation Growth",
    icon: TrendingUp,
    amount: "18.6%",
    description: "+5.4% from last month",
    trend: "up",
  },
]

export function DonationOverview() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                <card.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div
                className={`flex items-center text-xs sm:text-sm ${card.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
              >
                {card.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4 transform rotate-180" />
                )}
                {card.description.split(" ")[0]}
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">{card.title}</h3>
              <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold">{card.amount}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

