'use client'

import { useEffect, useRef } from 'react'

export function EducationTimelineCalculator() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateTimeline = () => {
      const currentAge = parseInt((document.getElementById('currentAge') as HTMLInputElement).value) || 0
      const collegeAge = parseInt((document.getElementById('collegeAge') as HTMLInputElement).value) || 18
      const container = document.getElementById('timelineContent')

      if (!container) return

      // Validation
      if (currentAge >= collegeAge) {
        alert('Current Age must be less than College Start Age.')
        return
      }

      const yearsRemaining = collegeAge - currentAge
      container.innerHTML = '' // Clear previous

      interface Milestone {
        title: string
        age: number
        desc: string
        eq: number
        dt: number
      }

      let milestones: Milestone[] = []

      // Helper to add milestone
      const addMilestone = (title: string, age: number, desc: string, eq: number, dt: number) => {
        milestones.push({ title, age, desc, eq, dt })
      }

      // 1. Current Status (Start)
      const startDesc =
        yearsRemaining > 5
          ? 'Start aggressive. Maximize equity exposure for growth as time is on your side.'
          : 'Time is short. Review portfolio and balance risk immediately.'

      let startEq = 100
      if (yearsRemaining <= 3) startEq = 70
      if (yearsRemaining <= 2) startEq = 50
      if (yearsRemaining <= 1) startEq = 20

      addMilestone('Current Status', currentAge, startDesc, startEq, 100 - startEq)

      // 2. Midpoint / Review (Only if gap is > 5 years)
      const glideStartAge = collegeAge - 3
      if (currentAge < glideStartAge - 2) {
        const reviewAge = Math.floor((currentAge + glideStartAge) / 2)
        addMilestone(
          'Mid-Term Review',
          reviewAge,
          'Check portfolio performance. Rebalance if equity has grown too large, but stay growth-focused.',
          90,
          10,
        )
      }

      // 3. GLIDE PATH (36-24-12 Rule)
      // D-3 Years
      if (glideStartAge > currentAge) {
        addMilestone(
          '3 Years Before (Glide Start)',
          glideStartAge,
          '<strong>Start Moving to Safety.</strong> Begin systematic transfer to Debt.',
          70,
          30,
        )
      }

      // D-2 Years
      const d2Age = collegeAge - 2
      if (d2Age > currentAge) {
        addMilestone('2 Years Before', d2Age, '<strong>50/50 Balance.</strong> Reduce risk further. Protect the corpus.', 50, 50)
      }

      // D-1 Year
      const d1Age = collegeAge - 1
      if (d1Age > currentAge) {
        addMilestone(
          '1 Year Before (Final Leg)',
          d1Age,
          '<strong>Secure the Funds.</strong> Move nearly everything to liquid assets.',
          20,
          80,
        )
      }

      // 4. College Start
      addMilestone('College Admission (Goal Reached)', collegeAge, 'Funds ready for withdrawal. Risk is zero.', 0, 100)

      // RENDER
      milestones.forEach((m, index) => {
        const side = index % 2 === 0 ? 'left' : 'right'

        // Construct Bar HTML
        let barHtml = ''
        if (m.eq > 0) barHtml += `<div class="equity" style="width: ${m.eq}%">${m.eq}%</div>`
        if (m.dt > 0) barHtml += `<div class="debt" style="width: ${m.dt}%">${m.dt}%</div>`

        const html = `
          <div class="timeline-item ${side}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="phase-header">
                <span class="phase-title">${m.title}</span>
                <span class="phase-age">Child Age: ${m.age}</span>
              </div>
              <div class="phase-desc">${m.desc}</div>
              <div class="allocation-bar">
                ${barHtml}
              </div>
            </div>
          </div>
        `
        container.innerHTML += html
      })
    }

    const generateBtn = document.getElementById('generateBtn')
    if (generateBtn) {
      generateBtn.addEventListener('click', generateTimeline)
    }

    // Initialize on load
    generateTimeline()
  }, [])

  return (
    <div id="glide-path-root" ref={containerRef}>
      <style jsx>{`
        #glide-path-root {
          --primary-color: #009acd;
          --primary-hover: #0087b5;
          --equity-color: #009acd;
          --debt-color: #ffa500;
          --text-color: #0d2c40;
          --bg-color: #f4f7f9;
          --card-bg: #ffffff;
          --font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

          box-sizing: border-box;
          font-family: var(--font-family);
          color: var(--text-color);
          display: block;
          width: 100%;
        }

        #glide-path-root *,
        #glide-path-root *::before,
        #glide-path-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        #glide-path-root .container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        #glide-path-root .controls-card {
          background: var(--card-bg);
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 30px;
          border: 1px solid #eaeaea;
        }

        #glide-path-root .controls-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          color: var(--text-color);
          line-height: 1.2;
        }

        #glide-path-root .inputs-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-end;
        }

        #glide-path-root .input-group {
          display: flex;
          flex-direction: column;
          min-width: 150px;
        }

        #glide-path-root .label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }

        #glide-path-root .input-field {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        #glide-path-root .input-field:focus {
          border-color: var(--primary-color);
        }

        #glide-path-root .generate-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          height: 42px;
        }

        #glide-path-root .generate-btn:hover {
          background-color: var(--primary-hover);
        }

        #glide-path-root .timeline-container {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        #glide-path-root .timeline-container.hidden {
          display: none;
        }

        #glide-path-root .legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
          font-size: 14px;
        }

        #glide-path-root .legend span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        #glide-path-root .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        #glide-path-root .timeline {
          position: relative;
          padding: 20px 0;
        }

        #glide-path-root .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #e0e0e0;
          transform: translateX(-50%);
        }

        #glide-path-root .timeline-item {
          display: flex;
          position: relative;
          margin-bottom: 40px;
          width: 100%;
        }

        #glide-path-root .timeline-item:last-child {
          margin-bottom: 0;
        }

        #glide-path-root .timeline-item.left {
          justify-content: flex-end;
          padding-right: 50%;
        }

        #glide-path-root .timeline-item.right {
          justify-content: flex-start;
          padding-left: 50%;
        }

        #glide-path-root .timeline-content {
          width: 90%;
          max-width: 350px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #eee;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          margin: 0 20px;
          z-index: 1;
        }

        #glide-path-root .timeline-dot {
          position: absolute;
          left: 50%;
          top: 20px;
          width: 16px;
          height: 16px;
          background: #fff;
          border: 4px solid var(--primary-color);
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        #glide-path-root .phase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        #glide-path-root .phase-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--primary-color);
        }

        #glide-path-root .phase-age {
          font-size: 12px;
          background: #eee;
          padding: 2px 8px;
          border-radius: 12px;
          color: #666;
          font-weight: 600;
        }

        #glide-path-root .phase-desc {
          font-size: 13px;
          line-height: 1.4;
          color: #555;
          margin-bottom: 12px;
        }

        #glide-path-root .allocation-bar {
          display: flex;
          height: 20px;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          font-size: 11px;
          color: #fff;
          font-weight: 600;
          line-height: 20px;
        }

        #glide-path-root .equity {
          background-color: var(--equity-color);
          text-align: center;
        }

        #glide-path-root .debt {
          background-color: var(--debt-color);
          text-align: center;
        }

        @media (max-width: 768px) {
          #glide-path-root .timeline::before {
            left: 20px;
          }

          #glide-path-root .timeline-item.left,
          #glide-path-root .timeline-item.right {
            justify-content: flex-start;
            padding-right: 0;
            padding-left: 0;
          }

          #glide-path-root .timeline-content {
            width: 100%;
            max-width: none;
            margin-left: 45px;
            margin-right: 0;
          }

          #glide-path-root .timeline-dot {
            left: 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="controls-card">
          <h2 className="controls-title">Customize Your Timeline</h2>
          <div className="inputs-row">
            <div className="input-group">
              <label className="label">Current Age of Child</label>
              <input type="number" id="currentAge" className="input-field" defaultValue="5" min="0" max="25" />
            </div>
            <div className="input-group">
              <label className="label">College Start Age</label>
              <input type="number" id="collegeAge" className="input-field" defaultValue="18" min="10" max="30" />
            </div>
            <button id="generateBtn" className="generate-btn">
              Update Timeline
            </button>
          </div>
        </div>

        <div className="timeline-container" id="timelineView">
          <h2 className="controls-title">Investment Action Plan</h2>
          <div className="legend">
            <span>
              <div className="dot" style={{ background: 'var(--equity-color)' }}></div>
              Equity (High Growth)
            </span>
            <span>
              <div className="dot" style={{ background: 'var(--debt-color)' }}></div>
              Debt/Liquid (Safety)
            </span>
          </div>
          <div className="timeline" id="timelineContent">
            {/* JS will inject items here */}
          </div>
        </div>
      </div>
    </div>
  )
}
