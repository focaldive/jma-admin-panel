"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Heart, Calendar } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/donations/new" className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Add Donation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/campaigns/new" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/articles/new" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Write Article
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

