"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export function ImageUpload({ value, onChange }) {
  const [preview, setPreview] = useState(value)

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload the file to your server or cloud storage
    // For this demo, we'll just create a local preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 rounded-full z-10"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative aspect-video w-full">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Drag and drop an image or click to browse</p>
            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
            <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleUpload} />
            <Button variant="outline" className="mt-4" onClick={() => document.getElementById("image-upload").click()}>
              Select Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

