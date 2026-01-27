"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      // If element not found on current page, navigate to home with hash
      // Browser will handle the scroll after page loads
      window.location.href = `/#${targetId}`
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image 
              src="/images/mindrupee-logo.png" 
              alt="Mindrupee" 
              width={200} 
              height={50} 
              className="h-10 w-auto" 
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={handleNavClick}
            >
              Home
            </Link>
            <a
              href="#services"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={(e) => handleSmoothScroll(e, "services")}
            >
              Services
            </a>
            <a
              href="#process"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={(e) => handleSmoothScroll(e, "process")}
            >
              Process
            </a>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={handleNavClick}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={handleNavClick}
            >
              Blog
            </Link>
            <Link
              href="/calculators"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              onClick={handleNavClick}
            >
              Calculators
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" onClick={handleNavClick}>
              <Button className="bg-[#1a365d] hover:bg-[#1a365d]/90 text-white rounded-full px-6">Contact</Button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-[#1a365d] font-medium" onClick={handleNavClick}>
                Home
              </Link>
              <a
                href="#services"
                className="text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={(e) => handleSmoothScroll(e, "services")}
              >
                Services
              </a>
              <a
                href="#process"
                className="text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={(e) => handleSmoothScroll(e, "process")}
              >
                Process
              </a>
              <Link href="/about" className="text-gray-700 hover:text-[#1a365d] font-medium" onClick={handleNavClick}>
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#1a365d] font-medium" onClick={handleNavClick}>
                Blog
              </Link>
              <Link href="/calculators" className="text-gray-700 hover:text-[#1a365d] font-medium" onClick={handleNavClick}>
                Calculators
              </Link>
              <Link href="/contact" onClick={handleNavClick}>
                <Button className="bg-[#1a365d] hover:bg-[#1a365d]/90 text-white rounded-full w-fit">Contact</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
