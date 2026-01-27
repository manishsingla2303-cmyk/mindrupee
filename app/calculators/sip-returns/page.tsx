import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SIPCalculator } from '@/components/sip-calculator';
import { ExpertTestimonial } from '@/components/expert-testimonial';

export const metadata = {
  title: 'SIP Returns Calculator | Mindrupee',
  description: 'Calculate your SIP returns with step-up investment options.'
};

export default function SIPPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SIPCalculator />
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
  );
}
