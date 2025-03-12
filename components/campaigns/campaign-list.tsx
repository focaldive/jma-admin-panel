"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Download } from "lucide-react"
import Link from "next/link"

const campaigns = [
  {
    id: "1",
    title: "Clean Water Initiative",
    category: "Environment",
    current: 45000,
    target: 75000,
    daysLeft: 15,
    status: "active",
    startDate: "2023-07-01",
    endDate: "2023-08-15",
    isLiveAppeal: false,
  },
  {
    id: "2",
    title: "Education for All",
    category: "Education",
    current: 28000,
    target: 50000,
    daysLeft: 30,
    status: "active",
    startDate: "2023-07-10",
    endDate: "2023-09-10",
    isLiveAppeal: false,
  },
  {
    id: "3",
    title: "Emergency Relief Fund",
    category: "Disaster Relief",
    current: 120000,
    target: 150000,
    daysLeft: 5,
    status: "active",
    startDate: "2023-07-15",
    endDate: "2023-07-30",
    isLiveAppeal: true,
  },
  {
    id: "4",
    title: "Animal Shelter Support",
    category: "Animal Welfare",
    current: 12000,
    target: 25000,
    daysLeft: 45,
    status: "active",
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    isLiveAppeal: false,
  },
  {
    id: "5",
    title: "Hunger Relief Program",
    category: "Hunger",
    current: 35000,
    target: 40000,
    daysLeft: 10,
    status: "active",
    startDate: "2023-07-05",
    endDate: "2023-08-05",
    isLiveAppeal: false,
  },
  {
    id: "6",
    title: "Medical Supplies for Children's Hospital",
    category: "Health",
    current: 75000,
    target: 100000,
    daysLeft: 20,
    status: "active",
    startDate: "2023-06-20",
    endDate: "2023-08-20",
    isLiveAppeal: false,
  },
  {
    id: "7",
    title: "Flood Victims Support",
    category: "Disaster Relief",
    current: 85000,
    target: 85000,
    daysLeft: 0,
    status: "completed",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    isLiveAppeal: false,
  },
  {
    id: "8",
    title: "School Building Project",
    category: "Education",
    current: 5000,
    target: 200000,
    daysLeft: 90,
    status: "active",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    isLiveAppeal: false,
  },
]

const statusStyles = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  draft: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
  paused: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
}

export function CampaignList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter campaigns based on search term and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Paginate campaigns
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage)
  const paginatedCampaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get unique categories for filter
  const categories = [...new Set(campaigns.map((c) => c.category))]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="hidden md:table-cell">Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Timeline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.map((campaign) => {
                  const percentage = Math.round((campaign.current / campaign.target) * 100)
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">
                          {campaign.title}
                          {campaign.isLiveAppeal && (
                            <Badge variant="destructive" className="ml-2">
                              Live Appeal
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{campaign.category}</div>
                        <div className="md:hidden mt-2">
                          <Progress value={percentage} className="h-2 w-full" />
                          <div className="flex justify-between text-xs mt-1">
                            <span>${campaign.current.toLocaleString()}</span>
                            <span>${campaign.target.toLocaleString()}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-xs">
                            <span>${campaign.current.toLocaleString()}</span>
                            <span>${campaign.target.toLocaleString()}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <span className="text-xs text-muted-foreground">{percentage}% funded</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[campaign.status]}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {campaign.startDate} to {campaign.endDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/campaigns/${campaign.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/campaigns/${campaign.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Donations</DropdownMenuItem>
                            <DropdownMenuItem>Send Update</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {paginatedCampaigns.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredCampaigns.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(filteredCampaigns.length, currentPage * itemsPerPage)} of {filteredCampaigns.length} campaigns
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

