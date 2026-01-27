"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingChat() {
  const whatsappNumber = "918826025557"
  const whatsappMessage = encodeURIComponent("Hi! I have a question about mutual fund investing.")
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50">
      <Button size="lg" className="rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg gap-2 px-5">
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Chat with us</span>
      </Button>
    </a>
  )
}
