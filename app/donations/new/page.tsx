"use client"

import { DonationForm } from "@/components/donations/donation-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewDonationPage() {
  const router = useRouter()

  const handleSubmit = (formData) => {
    // In a real app, you would send this data to your API
    console.log("Submitting donation:", formData)

    // Show success message
    toast("Success", {
      description: "Donation created successfully",
    })

    // Redirect to donations list
    router.push("/donations")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Add New Donation</h1>
      <DonationForm onSubmit={handleSubmit} />
    </div>
  )
}

