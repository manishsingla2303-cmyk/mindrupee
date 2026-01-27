'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Goal {
  id: string
  title: string
  icon: string
  description: string
}

const goals: Goal[] = [
  { id: 'education', title: "Child's Education", icon: '🎓', description: "Plan for your child's future education with goal-based investing strategies." },
  { id: 'retirement', title: 'Retirement', icon: '🏖️', description: 'Secure your retirement with a comprehensive investment plan for long-term wealth.' },
  { id: 'home', title: 'Buy Home', icon: '🏠', description: 'Achieve your dream home through disciplined saving and smart investment strategies.' },
  { id: 'emergency', title: 'Emergency Fund', icon: '🛡️', description: 'Build a financial safety net with liquid funds and emergency investment solutions.' },
  { id: 'taxes', title: 'Save on Taxes', icon: '📊', description: 'Optimize your tax savings through tax-efficient mutual fund investments.' },
  { id: 'travel', title: 'Travel Fund', icon: '✈️', description: 'Plan and fund your dream vacations with goal-based travel investment plans.' },
]

export function HeroSection() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>(goals[0])
  const [currentFrame, setCurrentFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev === 0 ? 1 : 0))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Carousel Section */}
        <div className="mb-12 md:mb-16 overflow-hidden">
          <div className="relative">
            {/* Frame 1 - Goals Based */}
            <div
              className={`transition-all duration-1000 ${
                currentFrame === 0 ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a365d] mb-6 text-balance">
                  Invest for Your Life Goals
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Whether it's education, retirement, or a dream home, we have tailored investment solutions for every life goal.
                </p>
              </div>
            </div>

            {/* Frame 2 - Goal Based and Data Driven */}
            <div
              className={`transition-all duration-1000 ${
                currentFrame === 1 ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a365d] mb-6 text-balance">
                  Data Driven Mutual Fund Investing!
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                  Helping investors build long-term wealth through disciplined, goal-based mutual fund investing.
                </p>
                <a href="/contact" className="inline-block">
                  <button className="bg-[#1a365d] hover:bg-[#0f1f3c] text-white px-8 py-3 rounded-full font-semibold transition-colors">
                    Start your Journey
                  </button>
                </a>
              </div>
            </div>

            {/* Frame Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFrame(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentFrame === index ? 'bg-[#1a365d] w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to frame ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`px-6 py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
                  selectedGoal.id === goal.id
                    ? 'bg-[#2a9d8f] text-white shadow-md'
                    : 'bg-white text-[#1a365d] border border-gray-300 hover:border-[#2a9d8f]'
                }`}
              >
                {goal.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Goal Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="text-6xl md:text-7xl">{selectedGoal.icon}</div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-3">
                {selectedGoal.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedGoal.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <button className="bg-[#2a9d8f] hover:bg-[#1f7d6a] text-white px-8 py-3 rounded-full font-semibold transition-colors">
                    Let's Talk
                  </button>
                </Link>
                <Link href="/blog">
                  <button className="bg-white border border-[#2a9d8f] text-[#2a9d8f] hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-colors">
                    Learn Before You Invest
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
