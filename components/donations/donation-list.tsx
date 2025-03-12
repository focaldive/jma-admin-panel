"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Download } from "lucide-react"
import Link from "next/link"

const donations = [
  {
    id: "1",
    donor: "Alice Johnson",
    email: "alice@example.com",
    amount: "$350.00",
    campaign: "Clean Water Initiative",
    status: "completed",
    date: "2023-07-20",
  },
  {
    id: "2",
    donor: "Bob Smith",
    email: "bob@example.com",
    amount: "$120.50",
    campaign: "Education for All",
    status: "pending",
    date: "2023-07-19",
  },
  {
    id: "3",
    donor: "Charlie Brown",
    email: "charlie@example.com",
    amount: "$1,000.00",
    campaign: "Emergency Relief Fund",
    status: "completed",
    date: "2023-07-18",
  },
  {
    id: "4",
    donor: "Diana Martinez",
    email: "diana@example.com",
    amount: "$50.75",
    campaign: "Animal Shelter Support",
    status: "failed",
    date: "2023-07-17",
  },
  {
    id: "5",
    donor: "Ethan Williams",
    email: "ethan@example.com",
    amount: "$720.00",
    campaign: "Hunger Relief Program",
    status: "completed",
    date: "2023-07-16",
  },
  {
    id: "6",
    donor: "Fiona Garcia",
    email: "fiona@example.com",
    amount: "$250.00",
    campaign: "Clean Water Initiative",
    status: "completed",
    date: "2023-07-15",
  },
  {
    id: "7",
    donor: "George Lee",
    email: "george@example.com",
    amount: "$175.25",
    campaign: "Education for All",
    status: "pending",
    date: "2023-07-14",
  },
  {
    id: "8",
    donor: "Hannah Kim",
    email: "hannah@example.com",
    amount: "$500.00",
    campaign: "Emergency Relief Fund",
    status: "completed",
    date: "2023-07-13",
  },
  {
    id: "9",
    donor: "Ian Foster",
    email: "ian@example.com",
    amount: "$85.50",
    campaign: "Animal Shelter Support",
    status: "completed",
    date: "2023-07-12",
  },
  {
    id: "10",
    donor: "Julia Chen",
    email: "julia@example.com",
    amount: "$300.00",
    campaign: "Hunger Relief Program",
    status: "pending",
    date: "2023-07-11",
  },
]

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  failed: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  refunded: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
}

export function DonationList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [campaignFilter, setCampaignFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter donations based on search term and filters
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.campaign.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || donation.status === statusFilter
    const matchesCampaign = campaignFilter === "all" || donation.campaign === campaignFilter

    return matchesSearch && matchesStatus && matchesCampaign
  })

  // Paginate donations
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage)
  const paginatedDonations = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get unique campaigns for filter
  const campaigns = [...new Set(donations.map((d) => d.campaign))]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donations..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign} value={campaign}>
                    {campaign}
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
                  <TableHead>Donor</TableHead>
                  <TableHead className="hidden md:table-cell">Campaign</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      <div className="font-medium">{donation.donor}</div>
                      <div className="text-sm text-muted-foreground md:hidden">{donation.campaign}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{donation.campaign}</TableCell>
                    <TableCell>{donation.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">{donation.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[donation.status]}>
                        {donation.status}
                      </Badge>
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
                            <Link href={`/donations/${donation.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/donations/${donation.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedDonations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No donations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredDonations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(filteredDonations.length, currentPage * itemsPerPage)} of {filteredDonations.length} donations
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

