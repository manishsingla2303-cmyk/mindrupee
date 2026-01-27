"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getWordPressPosts } from "@/lib/wordpress"
import { ExpertCard } from "@/components/expert-card"

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await getWordPressPosts(20)
      setBlogs(fetchedBlogs as BlogPost[])

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(fetchedBlogs.map((blog) => blog.category)))
      setCategories(uniqueCategories as string[])
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="bg-[#1a365d] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Financial Insights & Articles</h1>
            <p className="text-xl text-gray-200">
              Learn from our experts and stay informed about investing and financial planning
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === null
                      ? "bg-[#1a365d] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-[#1a365d] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Grid with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Loading articles...</p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found. Please check back soon.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {filteredBlogs.map((blog) => (
                    <Link key={blog.id} href={`/blog/${blog.slug}`}>
                      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-[#2a9d8f] bg-teal-50 px-3 py-1 rounded-full">
                              {blog.category}
                            </span>
                            <span className="text-xs text-gray-500">{blog.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ExpertCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
