'use client'

import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export function ExpertTestimonial() {
  return (
    <div className="sticky top-32 bg-white rounded-2xl shadow-lg overflow-hidden border-l-4" style={{ borderLeftColor: '#1a365d' }}>
      {/* Header */}
      <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)' }}>
        <h3 className="text-2xl font-bold mb-1">Mindrupee's Top Experts</h3>
        <p className="text-blue-100">Help you decide on the best plan</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-2xl">⭐</span>
          ))}
        </div>

        {/* Testimonial */}
        <p className="text-gray-700 italic leading-relaxed mb-6 text-sm">
          "We provide data-driven investment solutions that help you build long-term wealth with confidence. Our expert team is here to guide you through every step of your investment journey."
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200">
          <div className="w-14 h-14 rounded-full flex-shrink-0" style={{ backgroundColor: '#1a365d' }} />
          <div>
            <p className="font-bold text-gray-900">Mindrupee Team</p>
            <p className="text-sm text-gray-600">Investment Experts</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/contact" className="block">
            <button className="w-full text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg" style={{ backgroundColor: '#1a365d' }}>
              <Phone className="w-5 h-5" />
              Book Call with Expert
            </button>
          </Link>
          <a 
            href="https://wa.me/?text=Hi%20Mindrupee%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <button className="w-full border-2 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-gray-50" style={{ borderColor: '#1a365d', color: '#1a365d' }}>
              <MessageCircle className="w-5 h-5" />
              Chat with Us
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
