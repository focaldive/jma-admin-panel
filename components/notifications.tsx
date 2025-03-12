"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function Notifications() {
  const [unreadCount, setUnreadCount] = useState(3)

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New Donation",
      message: "John Smith donated $250",
      time: "10 minutes ago",
      read: false,
      avatar: "/placeholder.svg?height=32&width=32&text=JS",
    },
    {
      id: 2,
      title: "Campaign Goal Reached",
      message: "Clean Water Project reached its goal",
      time: "1 hour ago",
      read: false,
      avatar: "/placeholder.svg?height=32&width=32&text=CW",
    },
    {
      id: 3,
      title: "New Donor",
      message: "Sarah Johnson registered as a donor",
      time: "3 hours ago",
      read: false,
      avatar: "/placeholder.svg?height=32&width=32&text=SJ",
    },
  ]

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs px-2">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
            <div className="flex w-full">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={notification.avatar} alt="" />
                <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {!notification.read && <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center text-center">
          <Link href="/notifications" className="w-full text-sm text-primary">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

