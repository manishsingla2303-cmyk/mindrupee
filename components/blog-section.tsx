import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/mdx"

export async function BlogSection() {
  const allPosts = getAllPosts()
  // Take the most recent 4 posts
  const blogs = allPosts.slice(0, 4)

  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-teal-600 mb-2">EDUCATION</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights & Articles</h3>
          <p className="text-lg text-gray-600">Stay informed with our expert financial education and investment tips</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`}>
              <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500">{blog.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
