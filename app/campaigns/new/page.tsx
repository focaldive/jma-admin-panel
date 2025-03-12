"use client"

import { CampaignForm } from "@/components/campaigns/campaign-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewCampaignPage() {
  const router = useRouter()

  const handleSubmit = (formData) => {
    // In a real app, you would send this data to your API
    console.log("Submitting campaign:", formData)

    // Show success message
    toast("Success", {
      description: "Campaign created successfully",
    })

    // Redirect to campaigns list
    router.push("/campaigns")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create New Campaign</h1>
      <CampaignForm onSubmit={handleSubmit} />
    </div>
  )
}

