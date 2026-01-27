import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/mdx"
import { BlogList } from "@/components/blog-list"

// Define the interface here again or import shared type if available
interface BlogPost {
  id?: number | string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image: string
}

export const metadata = {
  title: 'Blog - Financial Insights & Articles | Mindrupee',
  description: 'Learn from our experts and stay informed about investing and financial planning with Mindrupee blog.',
}

export default async function BlogPage() {
  // Fetch data from local MDX files
  const blogs = getAllPosts().map(post => ({
    ...post,
    id: post.slug // Use slug as ID for list keys
  }))

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

        {/* Client Component for searching/filtering */}
        <BlogList initialBlogs={blogs} />
      </main>
      <Footer />
    </>
  )
}
