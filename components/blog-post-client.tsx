'use client'

import { useState, useEffect } from 'react'
import { Star, X, Linkedin, MessageCircle, Instagram, ChevronRight } from 'lucide-react'

interface BlogPostClientProps {
  blogSlug: string
  blogTitle: string
  content?: string
  tocOnly?: boolean
}

interface TOCItem {
  id: string
  title: string
  level: number
}

export function BlogPostClient({ blogSlug, blogTitle, content, tocOnly = false }: BlogPostClientProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [hasRated, setHasRated] = useState(false)
  const [tocItems, setTocItems] = useState<TOCItem[]>([])

  // Extract headings from content
  useEffect(() => {
    if (!content) return

    // Wait for DOM to be ready and all headings to be rendered
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('article h2, article h3')
      
      const items: TOCItem[] = []
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName[1])
        const title = heading.textContent || ''
        const id = `heading-${index}`

        // Set ID on actual rendered DOM elements
        heading.id = id

        items.push({
          id,
          title,
          level,
        })
      })

      setTocItems(items)
    }, 100)

    return () => clearTimeout(timer)
  }, [content])

  const handleRating = async (stars: number) => {
    setRating(stars)
    setHasRated(true)

    try {
      const response = await fetch('/api/blog-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: blogSlug,
          rating: stars,
          title: blogTitle,
        }),
      })

      if (!response.ok) {
        console.error('Failed to save rating')
      }
    } catch (error) {
      console.error('Error saving rating:', error)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${blogTitle} - ${typeof window !== 'undefined' ? window.location.href : ''}`)}`,
    instagram: `https://www.instagram.com/`,
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // If tocOnly is true, only render the table of contents
  if (tocOnly) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-gray-200 mb-10">
        {/* Table of Contents */}
        {tocItems.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#001a4d' }}>
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#001a4d' }} />
              In this article
            </h3>
            <nav className="space-y-0">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className="w-full text-left px-3 py-2 rounded-lg transition-all group hover:bg-white flex items-center justify-between"
                  style={{
                    marginLeft: `${(item.level - 2) * 16}px`,
                    color: '#001a4d',
                  }}
                >
                  <span className="text-sm font-medium group-hover:font-semibold transition-all truncate">
                    {item.title}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    )
  }

  // Full component with engagement section (for bottom placement)
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rating Section */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">How helpful was this article?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`transition-all transform hover:scale-110 ${
                    hasRated && rating === star ? 'scale-110' : ''
                  }`}
                  aria-label={`Rate ${star} stars`}
                  title={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-7 h-7 cursor-pointer transition-colors ${
                      rating && rating >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
            {hasRated && (
              <p className="text-sm text-green-600 mt-3">✓ Thanks for your feedback!</p>
            )}
          </div>

          {/* Share Section */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">Share this article</p>
            <div className="flex gap-3">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 flex items-center justify-center transition-colors"
                aria-label="Share on X"
                title="Share on X"
              >
                <X className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 flex items-center justify-center transition-colors"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 flex items-center justify-center transition-colors"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-100 hover:bg-pink-600 hover:text-white text-gray-700 flex items-center justify-center transition-colors"
                aria-label="Share on Instagram"
                title="Share on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
