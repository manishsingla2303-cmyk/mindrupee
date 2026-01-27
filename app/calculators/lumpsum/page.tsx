import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LumsumCalculator } from '@/components/lumpsum-calculator'
import { ExpertTestimonial } from '@/components/expert-testimonial'

export const metadata = {
  title: 'Lumpsum Calculator | Mindrupee',
  description: 'Calculate your lumpsum investment returns with compound interest.'
}

export default function LumsumPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LumsumCalculator />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ExpertTestimonial />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
