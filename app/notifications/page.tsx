import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Clock, Heart, MessageSquare, Settings, Trash2, User } from "lucide-react"

export default function NotificationsPage() {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New Donation Received",
      message: "John Smith donated $250 to the Children's Education Fund.",
      time: "10 minutes ago",
      type: "donation",
      read: false,
    },
    {
      id: 2,
      title: "Campaign Goal Reached",
      message: "The Clean Water Project has reached its funding goal of $10,000!",
      time: "1 hour ago",
      type: "campaign",
      read: false,
    },
    {
      id: 3,
      title: "New Donor Registration",
      message: "Sarah Johnson has registered as a new donor.",
      time: "3 hours ago",
      type: "donor",
      read: true,
    },
    {
      id: 4,
      title: "Article Published",
      message: "Your article 'Making a Difference' has been published.",
      time: "5 hours ago",
      type: "article",
      read: true,
    },
    {
      id: 5,
      title: "Comment on Article",
      message: "Michael Brown commented on your article 'Making a Difference'.",
      time: "6 hours ago",
      type: "comment",
      read: true,
    },
    {
      id: 6,
      title: "System Update",
      message: "The donation system will be undergoing maintenance tonight at 2 AM.",
      time: "1 day ago",
      type: "system",
      read: true,
    },
    {
      id: 7,
      title: "New Campaign Suggestion",
      message: "A team member has suggested a new campaign: 'Winter Clothing Drive'.",
      time: "2 days ago",
      type: "campaign",
      read: true,
    },
  ]

  const getIcon = (type) => {
    switch (type) {
      case "donation":
        return <Heart className="h-4 w-4 text-red-500" />
      case "campaign":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "donor":
        return <User className="h-4 w-4 text-green-500" />
      case "article":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-yellow-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Check className="mr-2 h-4 w-4" /> Mark All as Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-primary"}>
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                  <div>
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{notification.message}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {notification.time}
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="unread" className="space-y-4 mt-4">
          {notifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Card key={notification.id} className="border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{notification.message}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="donations" className="space-y-4 mt-4">
          {notifications
            .filter((n) => n.type === "donation")
            .map((notification) => (
              <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-primary"}>
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{notification.message}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4 mt-4">
          {notifications
            .filter((n) => n.type === "campaign")
            .map((notification) => (
              <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-primary"}>
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{notification.message}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="system" className="space-y-4 mt-4">
          {notifications
            .filter((n) => n.type === "system")
            .map((notification) => (
              <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-primary"}>
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{notification.message}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

