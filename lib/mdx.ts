import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'posts')

export interface BlogPost {
    slug: string
    title: string
    date: string
    category: string
    author: string
    image: string
    excerpt: string
    content: string
}

export function getPostSlugs() {
    return fs.readdirSync(POSTS_PATH)
}

export function getPostBySlug(slug: string): BlogPost | null {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`)

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            title: data.title,
            date: data.date,
            category: data.category,
            author: data.author,
            image: data.image,
            excerpt: data.excerpt,
            content: content,
        }
    } catch (e) {
        return null
    }
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is BlogPost => post !== null)
        // Sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}
