"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ExpertCard } from "@/components/expert-card"

interface BlogPost {
    id: number | string
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    category: string
    image: string
}

interface BlogListProps {
    initialBlogs: BlogPost[]
}

export function BlogList({ initialBlogs }: BlogListProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Extract unique categories
    const categories = Array.from(new Set(initialBlogs.map((blog) => blog.category)))

    // Filter blogs based on selected category
    const filteredBlogs = selectedCategory
        ? initialBlogs.filter((blog) => blog.category === selectedCategory)
        : initialBlogs

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === null
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
                                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category
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
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No articles found. Please check back soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {filteredBlogs.map((blog) => (
                                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                                    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                                        <div className="aspect-video bg-gray-200 overflow-hidden relative">
                                            <Image
                                                src={blog.image || "/placeholder.svg"}
                                                alt={blog.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" // Optimization hint
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
                                            <div
                                                className="text-gray-600 text-sm line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                                            />
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
    )
}
