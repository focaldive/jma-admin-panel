"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, InfoIcon, Settings2Icon, FileTextIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function CampaignForm({ campaign = null, onSubmit }) {
  const [formData, setFormData] = useState({
    title: campaign?.title || "",
    description: campaign?.description || "",
    category: campaign?.category || "",
    targetAmount: campaign?.targetAmount || "",
    startDate: campaign?.startDate || new Date(),
    endDate: campaign?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isLiveAppeal: campaign?.isLiveAppeal || false,
    featuredImage: campaign?.featuredImage || null,
    status: campaign?.status || "draft",
    beneficiaries: campaign?.beneficiaries || "",
    location: campaign?.location || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title) {
      newErrors.title = "Title is required"
    }

    if (!formData.description) {
      newErrors.description = "Description is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.targetAmount) {
      newErrors.targetAmount = "Target amount is required"
    } else if (isNaN(Number(formData.targetAmount)) || Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount = "Target amount must be a positive number"
    }

    if (formData.endDate < formData.startDate) {
      newErrors.endDate = "End date must be after start date"
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

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            {/* Mobile-optimized tabs */}
            <TabsList className="hidden sm:grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="details">Campaign Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Mobile tabs with icons */}
            <TabsList className="grid sm:hidden w-full grid-cols-3 mb-6">
              <TabsTrigger value="basic" className="flex flex-col items-center gap-1 h-auto py-2">
                <InfoIcon className="h-4 w-4" />
                <span className="text-xs">Basic</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex flex-col items-center gap-1 h-auto py-2">
                <FileTextIcon className="h-4 w-4" />
                <span className="text-xs">Details</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col items-center gap-1 h-auto py-2">
                <Settings2Icon className="h-4 w-4" />
                <span className="text-xs">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Campaign Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Campaign Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="disaster_relief">Disaster Relief</SelectItem>
                      <SelectItem value="animal_welfare">Animal Welfare</SelectItem>
                      <SelectItem value="hunger">Hunger Relief</SelectItem>
                      <SelectItem value="water">Clean Water</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">
                    Target Amount <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="targetAmount"
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) => handleChange("targetAmount", e.target.value)}
                      className={cn("pl-7", errors.targetAmount ? "border-destructive" : "")}
                    />
                  </div>
                  {errors.targetAmount && <p className="text-sm text-destructive">{errors.targetAmount}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="startDate"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => handleChange("startDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="endDate"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground",
                          errors.endDate ? "border-destructive" : "",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => handleChange("endDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="beneficiaries">Beneficiaries</Label>
                <Textarea
                  id="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={(e) => handleChange("beneficiaries", e.target.value)}
                  placeholder="Describe who will benefit from this campaign"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Where will this campaign take place?"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Campaign Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isLiveAppeal"
                  checked={formData.isLiveAppeal}
                  onCheckedChange={(checked) => handleChange("isLiveAppeal", checked)}
                />
                <Label htmlFor="isLiveAppeal">Mark as Live Appeal (Urgent Campaign)</Label>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">
                  Featured image upload functionality will be available soon. You'll be able to upload campaign images
                  here.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            <Button variant="outline" type="button" onClick={() => window.history.back()} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {campaign ? "Update Campaign" : "Create Campaign"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

