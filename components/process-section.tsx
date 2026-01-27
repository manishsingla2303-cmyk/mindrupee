import { Mic, FileText, Rocket, Search } from "lucide-react"

export function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: Mic,
      title: "Discovery Call",
      description: "Initial consultation to understand your financial goals, risk tolerance, and current situation.",
      color: "#2a9d8f",
    },
    {
      number: 2,
      icon: FileText,
      title: "Portfolio Blueprint",
      description: "We create a customized investment strategy and financial plan tailored to your needs.",
      color: "#3BADE5",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Implementation",
      description: "Seamless execution of your investment plan with our secure and efficient platform.",
      color: "#2a9d8f",
    },
    {
      number: 4,
      icon: Search,
      title: "Periodic Review",
      description: "Continuous monitoring and regular reviews to ensure your portfolio stays on track.",
      color: "#1a365d",
    },
  ]

  return (
    <section id="process" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d]">Our Simple 4-Step Process</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Dotted connector line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#3BADE5]" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative text-center">
                  {/* Icon with colored background */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: step.color }} />
                  </div>
                  <h3 className="font-bold text-[#1a365d] mb-2">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
