import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const activeCampaigns = [
  {
    id: "1",
    name: "Clean Water Initiative",
    current: 45000,
    target: 75000,
    daysLeft: 15,
    category: "Environment",
  },
  {
    id: "2",
    name: "Education for All",
    current: 28000,
    target: 50000,
    daysLeft: 30,
    category: "Education",
  },
  {
    id: "3",
    name: "Emergency Relief Fund",
    current: 120000,
    target: 150000,
    daysLeft: 5,
    category: "Disaster Relief",
  },
  {
    id: "4",
    name: "Animal Shelter Support",
    current: 12000,
    target: 25000,
    daysLeft: 45,
    category: "Animal Welfare",
  },
]

export function CampaignProgress() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Active Campaigns</CardTitle>
        <Link href="/campaigns">
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activeCampaigns.map((campaign) => {
            const percentage = Math.round((campaign.current / campaign.target) * 100)
            return (
              <div key={campaign.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{campaign.daysLeft} days left</p>
                    <p className="text-xs text-muted-foreground">
                      ${campaign.current.toLocaleString()} of ${campaign.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">{percentage}% funded</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

