"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Grid, List, Plus, Search, Upload } from "lucide-react"
import Image from "next/image"

export default function MediaPage() {
  // Sample media data
  const mediaItems = [
    {
      id: 1,
      title: "Children's Education Program",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-03-15",
      size: "1.2 MB",
      dimensions: "1200x800",
      tags: ["education", "children"],
    },
    {
      id: 2,
      title: "Clean Water Project",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-02-28",
      size: "0.8 MB",
      dimensions: "1200x800",
      tags: ["water", "health"],
    },
    {
      id: 3,
      title: "Charity Gala Invitation",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-04-10",
      size: "1.5 MB",
      dimensions: "1200x800",
      tags: ["events", "gala"],
    },
    {
      id: 4,
      title: "Donation Impact Infographic",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-03-05",
      size: "2.1 MB",
      dimensions: "1200x800",
      tags: ["impact", "infographic"],
    },
    {
      id: 5,
      title: "Community Outreach",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-03-20",
      size: "1.7 MB",
      dimensions: "1200x800",
      tags: ["community", "outreach"],
    },
    {
      id: 6,
      title: "Volunteer Training",
      type: "image",
      url: "/placeholder.svg?height=200&width=300",
      date: "2023-03-25",
      size: "1.3 MB",
      dimensions: "1200x800",
      tags: ["volunteer", "training"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <div className="flex space-x-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search media..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Sort</Button>
        <Button variant="outline" size="icon">
          <Grid className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <List className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={item.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.date} • {item.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="images" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems
              .filter((item) => item.type === "image")
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={item.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.date} • {item.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-4">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No videos found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Upload videos to see them here.</p>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" /> Upload Videos
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No documents found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Upload documents to see them here.</p>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" /> Upload Documents
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

