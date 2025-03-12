"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, User, DollarSign, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"

export function DonationForm({ donation = null, onSubmit }) {
  const [activeTab, setActiveTab] = useState("donor")
  const isMobile = useMediaQuery("(max-width: 640px)")

  const [formData, setFormData] = useState({
    donorName: donation?.donorName || "",
    donorEmail: donation?.donorEmail || "",
    donorPhone: donation?.donorPhone || "",
    amount: donation?.amount || "",
    campaign: donation?.campaign || "",
    paymentMethod: donation?.paymentMethod || "credit_card",
    date: donation?.date || new Date(),
    isAnonymous: donation?.isAnonymous || false,
    notes: donation?.notes || "",
    status: donation?.status || "pending",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.donorName && !formData.isAnonymous) {
      newErrors.donorName = "Donor name is required unless anonymous"
    }

    if (!formData.donorEmail && !formData.isAnonymous) {
      newErrors.donorEmail = "Email is required unless anonymous"
    } else if (formData.donorEmail && !/\S+@\S+\.\S+/.test(formData.donorEmail)) {
      newErrors.donorEmail = "Email is invalid"
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number"
    }

    if (!formData.campaign) {
      newErrors.campaign = "Campaign is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const tabs = [
    { id: "donor", label: "Donor Information", icon: <User className="h-4 w-4" />, shortLabel: "Donor" },
    { id: "donation", label: "Donation Details", icon: <DollarSign className="h-4 w-4" />, shortLabel: "Details" },
    { id: "payment", label: "Payment Information", icon: <CreditCard className="h-4 w-4" />, shortLabel: "Payment" },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Mobile-optimized tabs */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md transition-colors",
                    "text-sm font-medium",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isMobile ? (
                    <>
                      {tab.icon}
                      <span className="mt-1 text-xs">{tab.shortLabel}</span>
                    </>
                  ) : (
                    <span>{tab.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="space-y-6">
            {activeTab === "donor" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => handleChange("isAnonymous", checked)}
                  />
                  <Label htmlFor="isAnonymous">Anonymous Donation</Label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">
                      Donor Name {!formData.isAnonymous && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id="donorName"
                      value={formData.donorName}
                      onChange={(e) => handleChange("donorName", e.target.value)}
                      disabled={formData.isAnonymous}
                      className={errors.donorName ? "border-destructive" : ""}
                    />
                    {errors.donorName && <p className="text-sm text-destructive">{errors.donorName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">
                      Email {!formData.isAnonymous && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      value={formData.donorEmail}
                      onChange={(e) => handleChange("donorEmail", e.target.value)}
                      disabled={formData.isAnonymous}
                      className={errors.donorEmail ? "border-destructive" : ""}
                    />
                    {errors.donorEmail && <p className="text-sm text-destructive">{errors.donorEmail}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorPhone">Phone Number</Label>
                    <Input
                      id="donorPhone"
                      value={formData.donorPhone}
                      onChange={(e) => handleChange("donorPhone", e.target.value)}
                      disabled={formData.isAnonymous}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "donation" && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      Donation Amount <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        className={cn("pl-7", errors.amount ? "border-destructive" : "")}
                      />
                    </div>
                    {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign">
                      Campaign <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.campaign} onValueChange={(value) => handleChange("campaign", value)}>
                      <SelectTrigger id="campaign" className={errors.campaign ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clean_water">Clean Water Initiative</SelectItem>
                        <SelectItem value="education">Education for All</SelectItem>
                        <SelectItem value="emergency">Emergency Relief Fund</SelectItem>
                        <SelectItem value="animal">Animal Shelter Support</SelectItem>
                        <SelectItem value="hunger">Hunger Relief Program</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.campaign && <p className="text-sm text-destructive">{errors.campaign}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Donation Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => handleChange("date", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Additional information about this donation"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleChange("paymentMethod", value)}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => window.history.back()} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {donation ? "Update Donation" : "Add Donation"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

