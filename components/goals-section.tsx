"use client"

import { useState } from "react"
import { Home, Gift, TrendingUp, Umbrella, Plane, DollarSign } from "lucide-react"
import Link from "next/link"

const goals = [
  {
    id: "education",
    label: "Child's Education",
    icon: Gift,
    description: "Plan for your child's future education with goal-based investing strategies.",
  },
  {
    id: "retirement",
    label: "Retirement",
    icon: TrendingUp,
    description: "Build a secure retirement corpus through disciplined long-term investing.",
  },
  {
    id: "home",
    label: "Buy Home",
    icon: Home,
    description: "Achieve your dream of homeownership with strategic financial planning.",
  },
  {
    id: "emergency",
    label: "Emergency Fund",
    icon: Umbrella,
    description: "Build a safety net with an emergency fund for unexpected expenses.",
  },
  {
    id: "taxes",
    label: "Save on Taxes",
    icon: DollarSign,
    description: "Optimize your investments and reduce tax liability legally.",
  },
  {
    id: "travel",
    label: "Travel Fund",
    icon: Plane,
    description: "Save and invest for your dream vacations and travel adventures.",
  },
]

export function GoalsSection() {
  const [activeGoal, setActiveGoal] = useState("education")
  const currentGoal = goals.find((g) => g.id === activeGoal)
  const Icon = currentGoal?.icon || Gift

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-4 text-balance">
            Invest for Your Life Goals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether it's education, retirement, or a dream home, we have tailored investment solutions for every life
            goal.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-16 bg-gray-50 p-6 rounded-2xl">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setActiveGoal(goal.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                activeGoal === goal.id
                  ? "bg-[#2a9d8f] text-white shadow-lg"
                  : "bg-white text-[#1a365d] hover:bg-[#f0f9ff] border border-gray-200"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>

        {currentGoal && (
          <div className="bg-gradient-to-br from-white to-[#f8fbff] rounded-3xl p-8 md:p-12 shadow-xl border border-[#e0f2ff]">
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-gradient-to-br from-[#3BADE5] to-[#2a9d8f] rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon className="w-14 h-14 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">{currentGoal.label}</h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">{currentGoal.description}</p>
                <div className="flex gap-4">
                  <a href="/contact" className="inline-block">
                    <button className="bg-[#2a9d8f] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#1f7d6a] transition-colors shadow-md hover:shadow-lg">
                      Let's Talk
                    </button>
                  </a>
                  <Link href="/blog">
                    <button className="bg-white text-[#2a9d8f] px-10 py-3 rounded-lg font-semibold border-2 border-[#2a9d8f] hover:bg-[#f0f9ff] transition-colors shadow-md hover:shadow-lg">
                      Learn Before You Invest
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
