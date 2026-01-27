import { Star, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExpertSidebarCard() {
  return (
    <div className="bg-gradient-to-br from-[#003d99] to-[#0051cc] rounded-2xl overflow-hidden shadow-lg border border-blue-400/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003d99] to-[#0051cc] px-6 py-8">
        <h3 className="text-2xl font-bold text-white mb-2">Mindrupee's Top Experts</h3>
        <p className="text-blue-100">Help you decide on the best plan</p>
      </div>

      {/* Content */}
      <div className="bg-white p-6">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial */}
        <blockquote className="text-gray-800 italic mb-6 leading-relaxed">
          "We provide data-driven investment solutions that help you build long-term wealth with confidence. Our expert team is here to guide you through every step of your investment journey."
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#003d99] to-[#0051cc]" />
          <div>
            <p className="font-bold text-gray-900">Mindrupee Team</p>
            <p className="text-sm text-gray-600">Investment Experts</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-[#003d99] hover:bg-[#003d99]/90 text-white rounded-lg py-6 font-medium flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Book Call with Expert
          </Button>
          <Button className="w-full bg-white border-2 border-[#003d99] text-[#003d99] hover:bg-blue-50 rounded-lg py-6 font-medium flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Chat with Us
          </Button>
        </div>
      </div>
    </div>
  )
}
