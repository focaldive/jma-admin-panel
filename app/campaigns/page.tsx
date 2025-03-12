import { CampaignList } from "@/components/campaigns/campaign-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Campaigns</h1>
        <Link href="/campaigns/new">
          <Button className="w-full sm:w-auto gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            <span className="inline-block">Create Campaign</span>
          </Button>
        </Link>
      </div>
      <CampaignList />
    </div>
  )
}

