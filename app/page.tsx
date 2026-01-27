import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { ValueSection } from "@/components/value-section"
import { BlogSection } from "@/components/blog-section"
import { YoutubeSection } from "@/components/youtube-section"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ValueSection />
      <BlogSection />
      <YoutubeSection />
      <Footer />
      <FloatingChat />
    </main>
  )
}
