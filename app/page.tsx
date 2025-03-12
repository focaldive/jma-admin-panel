import { DonationOverview } from "@/components/dashboard/donation-overview"
import { DonationChart } from "@/components/dashboard/donation-chart"
import { RecentDonations } from "@/components/dashboard/recent-donations"
import { CampaignProgress } from "@/components/dashboard/campaign-progress"
import { DonationByCategory } from "@/components/dashboard/donation-by-category"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <QuickActions />
      </div>

      <DonationOverview />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DonationChart />
        </div>
        <div className="lg:col-span-1">
          <DonationByCategory />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentDonations />
        <CampaignProgress />
      </div>
    </div>
  )
}

