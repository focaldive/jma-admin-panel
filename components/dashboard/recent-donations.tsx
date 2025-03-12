import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const recentDonations = [
  {
    id: "1",
    donor: "Alice Johnson",
    email: "alice@example.com",
    amount: "$350.00",
    campaign: "Clean Water Initiative",
    status: "completed",
    date: "2023-07-20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    donor: "Bob Smith",
    email: "bob@example.com",
    amount: "$120.50",
    campaign: "Education for All",
    status: "pending",
    date: "2023-07-19",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    donor: "Charlie Brown",
    email: "charlie@example.com",
    amount: "$1,000.00",
    campaign: "Emergency Relief Fund",
    status: "completed",
    date: "2023-07-18",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    donor: "Diana Martinez",
    email: "diana@example.com",
    amount: "$50.75",
    campaign: "Animal Shelter Support",
    status: "failed",
    date: "2023-07-17",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-200",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-200",
  failed: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300 hover:bg-rose-200",
}

export function RecentDonations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recent Donations</CardTitle>
        <Link href="/donations">
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={donation.avatar} alt={donation.donor} />
                  <AvatarFallback>{donation.donor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{donation.donor}</p>
                  <p className="text-xs text-muted-foreground">{donation.campaign}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-medium">{donation.amount}</p>
                <Badge variant="outline" className={statusStyles[donation.status]}>
                  {donation.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

