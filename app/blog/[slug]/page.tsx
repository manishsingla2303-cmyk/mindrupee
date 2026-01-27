import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { getWordPressPostBySlug } from "@/lib/wordpress"
import { BlogPostClient } from "@/components/blog-post-client"
import { ExpertTestimonial } from "@/components/expert-testimonial"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getWordPressPostBySlug(params.slug)

  if (!blog) {
    return (
      <>
        <Header />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Link href="/blog" className="text-[#1a365d] hover:text-[#2a9d8f]">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-12 bg-gray-50">
        {/* Hero Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Link href="/blog" className="hover:text-gray-900 transition-colors" style={{ color: '#001a4d' }}>Blog</Link>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-balance" style={{ color: '#001a4d' }}>
              {blog.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-500 rounded-full" />
              <div>
                <p className="font-semibold text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-600">Financial Advisor at Mindrupee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <article className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Main Content */}
              {/* Featured Image */}
              <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Table of Contents - Moved to Top */}
              <BlogPostClient 
                blogSlug={params.slug}
                blogTitle={blog.title}
                content={blog.content}
                tocOnly={true}
              />

              {/* Article Content */}
              <div className="bg-white rounded-lg p-8 mb-12">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: blog.content
                      .replace(/<iframe/g, '<div class="iframe-wrapper"><iframe')
                      .replace(/<\/iframe>/g, '</iframe></div>')
                  }}
                />
              </div>

              {/* Engagement Section at Bottom */}
              <BlogPostClient 
                blogSlug={params.slug}
                blogTitle={blog.title}
                content={blog.content}
                tocOnly={false}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ExpertTestimonial />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
