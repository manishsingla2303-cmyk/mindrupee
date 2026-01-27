import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
            <p className="text-gray-600 mb-8">Last updated: January 2025</p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">1. General Disclaimer</h2>
                <p>
                  Mindrupee and its affiliates, directors, officers, employees, and agents do not provide tax,
                  accounting, or legal advice. The information provided on this website is for educational and
                  informational purposes only and should not be construed as professional advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Investment Risk</h2>
                <p>
                  Mutual fund investments are subject to market risks. The value of units and returns may fluctuate
                  based on market conditions. Past performance is not indicative of future results. It is essential to
                  read the scheme documents carefully before investing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">3. No Guarantee of Returns</h2>
                <p>
                  Mindrupee does not guarantee any specific returns on investments. All investments in mutual funds
                  carry inherent market risks. The returns are dependent on various factors including market conditions,
                  fund performance, and investment tenure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">4. AMFI Registration</h2>
                <p>
                  Mindrupee is a registered Mutual Fund Distributor with the Association of Mutual Funds in India
                  (AMFI). ARN: 345186. We distribute mutual funds from various registered Asset Management Companies
                  (AMCs).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">5. No Liability</h2>
                <p>
                  Mindrupee shall not be liable for any direct, indirect, incidental, or consequential damages arising
                  from the use of information provided on this website. Users are advised to consult with qualified
                  financial advisors before making investment decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Third-Party Links</h2>
                <p>
                  This website may contain links to third-party websites. Mindrupee is not responsible for the content,
                  accuracy, or practices of third-party websites. Users access these links at their own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Regulatory Compliance</h2>
                <p>
                  Mindrupee operates under the regulations of the Securities and Exchange Board of India (SEBI) and
                  follows all applicable laws and regulations. We are committed to maintaining the highest standards of
                  ethical conduct and compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Market Volatility</h2>
                <p>
                  Markets are subject to volatility and unforeseen events. Mindrupee recommends maintaining a long-term
                  investment perspective and regularly reviewing your portfolio with your advisor.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Changes to Disclaimer</h2>
                <p>
                  Mindrupee reserves the right to modify this disclaimer at any time. Changes will be effective
                  immediately upon posting to the website. Your continued use of the website constitutes acceptance of
                  the updated disclaimer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
                <p>
                  For any questions or concerns regarding this disclaimer, please contact us at support@mindrupee.com or
                  +91 8765 6376XX.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingChat />
    </main>
  )
}
