"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserIcon, PhoneIcon, Settings2Icon } from "lucide-react"

export function DonorForm({ donor = null, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: donor?.firstName || "",
    lastName: donor?.lastName || "",
    email: donor?.email || "",
    phone: donor?.phone || "",
    address: donor?.address || "",
    city: donor?.city || "",
    state: donor?.state || "",
    postalCode: donor?.postalCode || "",
    country: donor?.country || "",
    donorType: donor?.donorType || "individual",
    organization: donor?.organization || "",
    notes: donor?.notes || "",
    isAnonymous: donor?.isAnonymous || false,
    receiveUpdates: donor?.receiveUpdates || true,
    taxReceiptRequired: donor?.taxReceiptRequired || false,
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">{donor ? "Edit Donor" : "Add New Donor"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          {/* Desktop tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Mobile tabs with icons */}
          <TabsList className="grid sm:hidden w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex flex-col items-center gap-1 h-auto py-2">
              <UserIcon className="h-4 w-4" />
              <span className="text-xs">Basic</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex flex-col items-center gap-1 h-auto py-2">
              <PhoneIcon className="h-4 w-4" />
              <span className="text-xs">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col items-center gap-1 h-auto py-2">
              <Settings2Icon className="h-4 w-4" />
              <span className="text-xs">Prefs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="donorType">Donor Type</Label>
              <Select value={formData.donorType} onValueChange={(value) => handleChange("donorType", value)}>
                <SelectTrigger id="donorType">
                  <SelectValue placeholder="Select donor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="foundation">Foundation</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.donorType === "individual" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Additional information about this donor"
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isAnonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => handleChange("isAnonymous", checked)}
              />
              <Label htmlFor="isAnonymous">Anonymous Donor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="receiveUpdates"
                checked={formData.receiveUpdates}
                onCheckedChange={(checked) => handleChange("receiveUpdates", checked)}
              />
              <Label htmlFor="receiveUpdates">Receive Campaign Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="taxReceiptRequired"
                checked={formData.taxReceiptRequired}
                onCheckedChange={(checked) => handleChange("taxReceiptRequired", checked)}
              />
              <Label htmlFor="taxReceiptRequired">Tax Receipt Required</Label>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <Button variant="outline" type="button" className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto">
            {donor ? "Update Donor" : "Add Donor"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

