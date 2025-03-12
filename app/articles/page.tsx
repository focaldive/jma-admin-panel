import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ArticlesPage() {
  // Sample article data
  const articles = [
    {
      id: 1,
      title: "Supporting Children's Education in Rural Areas",
      excerpt: "Our latest initiative to bring quality education to underserved communities.",
      author: "Jane Smith",
      date: "2023-03-15",
      status: "published",
      category: "Education",
    },
    {
      id: 2,
      title: "Clean Water Project: 6-Month Progress Report",
      excerpt: "See how your donations have helped provide clean water to over 10,000 people.",
      author: "Michael Johnson",
      date: "2023-02-28",
      status: "published",
      category: "Health",
    },
    {
      id: 3,
      title: "Upcoming Charity Gala: Save the Date",
      excerpt: "Join us for our annual fundraising gala to support our global initiatives.",
      author: "Sarah Williams",
      date: "2023-04-10",
      status: "draft",
      category: "Events",
    },
    {
      id: 4,
      title: "How Your Donations Make a Difference",
      excerpt: "A breakdown of how we allocate funds and the impact of your generosity.",
      author: "David Chen",
      date: "2023-03-05",
      status: "review",
      category: "Impact",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <Button asChild>
          <Link href="/articles/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search articles..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Sort</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>
                      By {article.author} • {new Date(article.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Category: {article.category}</span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      article.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : article.status === "draft"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="published" className="space-y-4 mt-4">
          {articles
            .filter((a) => a.status === "published")
            .map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        By {article.author} • {new Date(article.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{article.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Category: {article.category}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Published
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="draft" className="space-y-4 mt-4">
          {articles
            .filter((a) => a.status === "draft")
            .map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        By {article.author} • {new Date(article.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{article.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Category: {article.category}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Draft
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="review" className="space-y-4 mt-4">
          {articles
            .filter((a) => a.status === "review")
            .map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        By {article.author} • {new Date(article.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{article.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Category: {article.category}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Under Review
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

