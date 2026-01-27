import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExpertSidebarCard } from "@/components/expert-sidebar-card"
import Link from "next/link"

export const metadata = {
  title: "Financial Calculators | Mindrupee",
  description: "Use our financial calculators to plan your investments and achieve your goals."
}

export default function CalculatorsPage() {
  const calculators = [
    {
      id: "childs-education",
      title: "Child's Education Calculator",
      description: "Calculate the SIP required to secure your child's education costs",
      icon: "🎓"
    },
    {
      id: "education-timeline",
      title: "Education Timeline Calculator",
      description: "Plan your education investments with a dynamic glide path strategy",
      icon: "📚"
    },
    {
      id: "retirement",
      title: "Retirement Calculator",
      description: "Plan your retirement with our comprehensive calculator",
      icon: "🏦"
    },
    {
      id: "sip-returns",
      title: "SIP Returns Calculator",
      description: "Calculate your SIP returns with step-up investment options",
      icon: "📈"
    },
    {
      id: "home-loan-emi",
      title: "Home Loan EMI Calculator",
      description: "Calculate your monthly EMI for home loans",
      icon: "🏠"
    },
    {
      id: "lumpsum",
      title: "Lumpsum Calculator",
      description: "Calculate your lumpsum investment returns with compound interest",
      icon: "💰"
    },
    {
      id: "swp",
      title: "SWP Calculator",
      description: "Plan your systematic withdrawal from your investments",
      icon: "💳"
    },
    {
      id: "surrender-value",
      title: "Surrender Value Calculator",
      description: "Compare surrendering your insurance policy vs continuing it",
      icon: "📋"
    },
    {
      id: "xirr",
      title: "XIRR Calculator",
      description: "Calculate your extended internal rate of return for investments",
      icon: "📊"
    },
    {
      id: "mutual-fund",
      title: "Mutual Fund Calculator",
      description: "Calculate returns on your mutual fund investments",
      icon: "📈",
      comingSoon: true
    }
  ]

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="bg-[#1a365d] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Financial Calculators</h1>
            <p className="text-xl text-gray-200">
              Use our tools to plan your financial future and make informed decisions
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main calculators section */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {calculators.map((calc) => (
                  <div
                    key={calc.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="text-4xl mb-4">{calc.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{calc.title}</h3>
                      <p className="text-gray-600 text-sm mb-6">{calc.description}</p>
                      {calc.comingSoon ? (
                        <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                          Coming Soon
                        </div>
                      ) : (
                        <Link
                          href={`/calculators/${calc.id}`}
                          className="inline-block px-6 py-2 bg-[#1a365d] text-white rounded-lg font-medium hover:bg-[#1a365d]/90 transition-colors"
                        >
                          Open Calculator
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ExpertSidebarCard />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
