import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"

export default function AboutPage() {
  const team = [
    {
      name: "Manish Singla",
      role: "Investment Expert",
      bio: "15+ years of experience in mutual fund advisory and wealth management.",
    },
    {
      name: "Priya Singh",
      role: "Head of Financial Planning",
      bio: "Certified financial planner with expertise in goal-based investing strategies.",
    },
    {
      name: "Amit Patel",
      role: "Senior Investment Advisor",
      bio: "Specializes in portfolio management and risk assessment for individual investors.",
    },
    {
      name: "Neha Sharma",
      role: "Client Success Manager",
      bio: "Dedicated to ensuring exceptional client experience and long-term satisfaction.",
    },
  ]

  const achievements = [
    { number: "20+", label: "Happy Clients" },
    { number: "₹3Cr+", label: "Assets Managed" },
    { number: "2+", label: "Years of Experience" },
    { number: "+2.9%", label: "Alpha from Market" },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-teal-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl font-bold mb-4">About Mindrupee</h1>
              <p className="text-xl text-blue-100">
                Transforming Financial Lives Through Goal-Based, Data-Driven Investing
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Mindrupee was founded with a simple yet powerful mission: to make world-class financial advisory
                  services accessible to every investor in India.
                </p>
                <p>
                  We realized that most investors struggle not because they lack financial knowledge, but because they
                  lack a clear roadmap aligned with their life goals. Our team of seasoned investment professionals came
                  together to create a platform that combines data-driven investment strategies with personalized
                  guidance.
                </p>
                <p>
                  Today, Mindrupee is trusted by over 20 clients who have successfully built wealth through
                  disciplined, goal-based mutual fund investing. We manage over 3 crores in assets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">{achievement.number}</div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
                <p className="text-gray-700">
                  We believe in complete honesty and clarity. No hidden charges, no complex jargon, just straightforward
                  advice.
                </p>
              </div>

              <div className="bg-teal-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-teal-600 mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Goal-Focused</h3>
                <p className="text-gray-700">
                  Every investment decision is tied to your specific life goals, whether it's retirement, education, or
                  wealth creation.
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Data-Driven</h3>
                <p className="text-gray-700">
                  Our investment strategies are backed by rigorous analysis and proven methodologies, not emotions or
                  market hype.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Mindrupee?</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {[
                  "AMFI Registered Mutual Fund Distributor",
                  "Personalized financial planning tailored to your goals",
                  "Continuous portfolio monitoring and rebalancing",
                  "Educational content and regular market insights",
                  "Transparent fee structure with no hidden charges",
                  "24/7 customer support via WhatsApp and email",
                  "Proven track record with high client retention",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="text-teal-600 font-bold text-xl">✓</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <FloatingChat />
    </main>
  )
}
