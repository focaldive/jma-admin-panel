import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const upcomingEvents = [
  {
    id: "1",
    title: "Annual Charity Gala",
    date: "2023-08-15",
    time: "7:00 PM",
    location: "Grand Hotel, New York",
    description: "Our biggest fundraising event of the year with special guests and performances.",
  },
  {
    id: "2",
    title: "Volunteer Training Workshop",
    date: "2023-08-10",
    time: "10:00 AM",
    location: "Community Center",
    description: "Training session for new volunteers joining our organization.",
  },
  {
    id: "3",
    title: "Donor Appreciation Lunch",
    date: "2023-08-20",
    time: "12:30 PM",
    location: "Riverside Restaurant",
    description: "Special lunch to thank our major donors for their continued support.",
  },
]

export function UpcomingEvents() {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <Link href="/events">
          <Button variant="ghost" size="sm" className="gap-1">
            View Calendar <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDate(event.date)} at {event.time}
                </p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
                <p className="text-xs">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

