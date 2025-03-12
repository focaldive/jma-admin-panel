import { DonationList } from "@/components/donations/donation-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DonationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Donations</h1>
        <Link href="/donations/new">
          <Button className="w-full sm:w-auto gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            <span className="inline-block">Add Donation</span>
          </Button>
        </Link>
      </div>
      <DonationList />
    </div>
  )
}

