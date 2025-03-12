import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DonorsPage() {
  // Sample donor data
  const donors = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      totalDonated: 2500,
      lastDonation: "2023-03-15",
      status: "active",
      type: "individual",
    },
    {
      id: 2,
      name: "ABC Corporation",
      email: "donations@abccorp.com",
      phone: "+1 (555) 987-6543",
      totalDonated: 10000,
      lastDonation: "2023-02-28",
      status: "active",
      type: "corporate",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      totalDonated: 1200,
      lastDonation: "2023-01-10",
      status: "inactive",
      type: "individual",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 345-6789",
      totalDonated: 3500,
      lastDonation: "2023-03-05",
      status: "active",
      type: "individual",
    },
    {
      id: 5,
      name: "XYZ Foundation",
      email: "grants@xyzfoundation.org",
      phone: "+1 (555) 456-7890",
      totalDonated: 25000,
      lastDonation: "2023-02-15",
      status: "active",
      type: "foundation",
    },
  ]

  // Stats
  const stats = [
    { title: "Total Donors", value: "1,284", change: "+12.3%" },
    { title: "New Donors (30d)", value: "128", change: "+4.6%" },
    { title: "Retention Rate", value: "86%", change: "+2.2%" },
    { title: "Avg. Donation", value: "$142", change: "+12.1%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Donors</h1>
        <div className="flex space-x-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Add Donor
          </Button>
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
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search donors..." className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Type</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Donation Amount</DropdownMenuItem>
            <DropdownMenuItem>Date Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Donated</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${donor.name.charAt(0)}`} />
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{donor.name}</div>
                        <div className="text-sm text-muted-foreground">{donor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {donor.type}
                    </Badge>
                  </TableCell>
                  <TableCell>${donor.totalDonated.toLocaleString()}</TableCell>
                  <TableCell>{new Date(donor.lastDonation).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        donor.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }
                    >
                      {donor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit donor</DropdownMenuItem>
                        <DropdownMenuItem>View donations</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete donor</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

