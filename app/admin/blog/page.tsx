'use client'

import React from "react"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface BlogFormData {
  title: string
  slug: string
  category: string
  content: string
  image: string
  author: string
  published: boolean
}

export default function AdminBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    category: '',
    content: '',
    image: '',
    author: 'Mindrupee Team',
    published: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create blog post')
      }

      setSuccessMessage('Blog post created successfully!')
      setFormData({
        title: '',
        slug: '',
        category: '',
        content: '',
        image: '',
        author: 'Mindrupee Team',
        published: false,
      })

      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      console.error('Error:', error)
      setSuccessMessage('Error creating blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-[#1a365d] mb-8">Add New Blog Post</h1>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Blog post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <Input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Auto-generated from title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Mutual Funds">Mutual Funds</option>
                  <option value="Investment Tips">Investment Tips</option>
                  <option value="Financial Planning">Financial Planning</option>
                  <option value="Market Insights">Market Insights</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <Input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Blog post content (supports HTML)"
                rows={10}
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 text-[#1a365d]"
              />
              <label className="text-sm font-medium text-gray-700">Publish immediately</label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a365d] hover:bg-[#0f1f3c] text-white py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? 'Creating...' : 'Create Blog Post'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
