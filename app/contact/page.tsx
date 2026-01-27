"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    date: "",
    hours: "",
    minutes: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine date and time
      const preferredDateTime = formData.date && formData.hours && formData.minutes
        ? `${formData.date}T${formData.hours}:${formData.minutes}:00`
        : null

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.contactNumber || null,
          preferredDateTime,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSuccessMessage("Thank you! We will contact you!!")
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setSuccessMessage("Error submitting form. Please try again.")
      setTimeout(() => setSuccessMessage(""), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-[#1a365d] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Talk to our Experts</h1>
            <p className="text-gray-100 text-lg max-w-2xl mx-auto">
              Fill out the form below and our financial experts will get in touch with you shortly to help you achieve
              your investment goals.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Thank You!</h2>
                  <p className="text-lg text-gray-600">We will contact you!!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email and Contact Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 py-3 border-2 border-gray-300 rounded-md bg-gray-50">
                        <span className="text-gray-600 font-medium">🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Hours</label>
                      <select
                        name="hours"
                        value={formData.hours}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Minutes</label>
                      <select
                        name="minutes"
                        value={formData.minutes}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    maxLength={180}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    placeholder="Enter your message..."
                  />
                  <div className="text-right mt-2">
                    <span className="text-sm text-gray-500">{formData.message.length} / 180</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md w-full md:w-auto transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Now"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </main>
  )
}
