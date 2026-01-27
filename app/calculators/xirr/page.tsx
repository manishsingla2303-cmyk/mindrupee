import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { XIRRCalculator } from '@/components/xirr-calculator'
import { ExpertTestimonial } from '@/components/expert-testimonial'

export const metadata = {
  title: 'XIRR Calculator | Mindrupee',
  description: 'Calculate your extended internal rate of return for investments.'
}

export default function XIRRPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <XIRRCalculator />
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
