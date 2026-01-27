"use client"

interface CircularProgressProps {
  percentage: number
  color: string
  size?: number
}

function CircularProgress({ percentage, color, size = 80 }: CircularProgressProps) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

export function ValueSection() {
  const values = [
    {
      title: "Strategy",
      percentage: 20,
      description: "We help you define clear financial goals.",
      color: "#1a365d",
      highlight: false,
    },
    {
      title: "Behavioural Coaching",
      percentage: 80,
      description: "Sticking to the plan is the real challenge.",
      color: "#1a365d",
      highlight: true,
    },
    {
      title: "Market Timing",
      percentage: 0,
      description: "We don't chase tops and bottoms.",
      color: "#9ca3af",
      highlight: false,
    },
    {
      title: "Portfolio Churning",
      percentage: 0,
      description: "No unnecessary reshuffling.",
      color: "#9ca3af",
      highlight: false,
    },
    {
      title: "Get-Rich-Quick",
      percentage: 0,
      description: "Compounding takes time.",
      color: "#9ca3af",
      highlight: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#1a365d]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Our Value to You</h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {values.slice(0, 3).map((value, index) => (
              <div key={index} className={`rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${value.highlight ? "bg-white shadow-lg border-2 border-[#1a365d]" : "bg-white shadow-md"}`}>
                <h3 className="font-bold text-lg text-[#1a365d] mb-6 min-h-[56px] flex items-center">{value.title}</h3>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex justify-center">
                    <CircularProgress percentage={value.percentage} color={value.color === "#1a365d" ? "#1a365d" : value.color} size={100} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {values.slice(3).map((value, index) => (
              <div key={index} className="rounded-2xl p-8 bg-white shadow-md transition-all duration-300 hover:shadow-2xl">
                <h3 className="font-bold text-lg text-[#1a365d] mb-6 min-h-[56px] flex items-center">{value.title}</h3>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex justify-center">
                    <CircularProgress percentage={value.percentage} color={value.color} size={100} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
