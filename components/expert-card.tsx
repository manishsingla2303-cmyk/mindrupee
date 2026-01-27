import Link from "next/link"
import { Star, MessageCircle, Phone } from "lucide-react"

export function ExpertCard() {
  return (
    <div className="sticky top-24 bg-white rounded-xl shadow-lg overflow-hidden border-l-4" style={{ borderLeftColor: '#001a4d' }}>
      {/* Sidebar Header */}
      <div className="p-6 text-white" style={{ background: 'linear-gradient(to right, #001a4d, #0052cc)' }}>
        <h3 className="text-xl font-bold">
          Mindrupee's Top Experts
        </h3>
        <p className="text-sm opacity-90 mt-1">Help you decide on the best plan</p>
      </div>

      <div className="p-6">
        {/* Expert Testimonial */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
            "We provide data-driven investment solutions that help you build long-term wealth with confidence. Our expert team is here to guide you through every step of your investment journey."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #001a4d, #0052cc)' }} />
            <div>
              <p className="font-semibold text-sm text-gray-900">Mindrupee Team</p>
              <p className="text-xs text-gray-600">Investment Experts</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/contact" className="block">
            <button className="w-full text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:opacity-90" style={{ backgroundColor: '#001a4d' }}>
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
            <button className="w-full border-2 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all" style={{ borderColor: '#001a4d', color: '#001a4d' }}>
              <MessageCircle className="w-5 h-5" />
              Chat with Us
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
