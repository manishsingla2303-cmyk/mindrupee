import { TrendingUp, Target, Shield, RefreshCw } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: TrendingUp,
      title: "Mutual Fund Distribution",
      description: "Tailored mutual fund portfolios to align with your specific financial goals and risk appetite.",
      color: "#3BADE5",
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Tailored financial plans to help you achieve your life's milestones.",
      color: "#1a365d",
    },
    {
      icon: Shield,
      title: "Risk & Insurance",
      description: "Comprehensive risk assessment and insurance solutions to protect your future.",
      color: "#2a9d8f",
    },
    {
      icon: RefreshCw,
      title: "Portfolio Review",
      description: "Regular review and rebalancing of your investment portfolio for optimal performance.",
      color: "#3BADE5",
    },
  ]

  return (
    <section id="services" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d]">Comprehensive Financial Solutions</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: service.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#1a365d] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
