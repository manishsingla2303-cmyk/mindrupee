const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://blog.mindrupee.com/wp-json/wp/v2"

export interface WordPressPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  date: string
  categories: number[]
  _embedded?: {
    author?: Array<{
      name: string
    }>
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text: string
    }>
    "wp:term"?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

export interface WordPressMedia {
  source_url: string
  alt_text: string
}

// Cache for category mappings
const categoryCache: Record<number, string> = {}

async function getCategoryName(categoryId: number): Promise<string> {
  if (categoryCache[categoryId]) {
    return categoryCache[categoryId]
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories/${categoryId}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })
    if (response.ok) {
      const category = await response.json()
      categoryCache[categoryId] = category.name
      return category.name
    }
  } catch (error) {
    console.error(`[v0] Failed to fetch category ${categoryId}:`, error)
  }
  return "Blog"
}

export async function getWordPressPosts(limit = 10) {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error("Failed to fetch WordPress posts")
    }

    const posts: WordPressPost[] = await response.json()
    return await Promise.all(posts.map(formatWordPressPost))
  } catch (error) {
    console.error("[v0] WordPress API Error:", error)
    return []
  }
}

export async function getWordPressPostBySlug(slug: string) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, { cache: 'no-store' })

    if (!response.ok) {
      throw new Error("Failed to fetch WordPress post")
    }

    const posts: WordPressPost[] = await response.json()
    if (posts.length === 0) return null

    return await formatWordPressPost(posts[0])
  } catch (error) {
    console.error("[v0] WordPress API Error:", error)
    return null
  }
}

async function formatWordPressPost(post: WordPressPost) {
  // Extract featured image URL
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"

  // Strip HTML tags from excerpt and content
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "")
  }

  // Get category name from embedded data or fetch it
  let categoryName = "Blog"
  if (post._embedded?.["wp:term"]?.[0]?.[0]) {
    categoryName = post._embedded["wp:term"][0][0].name
  } else if (post.categories && post.categories.length > 0) {
    categoryName = await getCategoryName(post.categories[0])
  }

  const author = post._embedded?.author?.[0]?.name || "MindRupee Team"

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    author,
    excerpt: stripHtml(post.excerpt.rendered).slice(0, 160) + "...",
    content: post.content.rendered,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    category: categoryName,
    image: featuredImage,
  }
}
