'use client'

import { useEffect, useRef, useState } from 'react'

export function ChildEducationCalculator() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [currentAge, setCurrentAge] = useState<number>(0)
  const [collegeAge, setCollegeAge] = useState<number>(18)
  const [milestones, setMilestones] = useState<Milestone[]>([])

  interface Milestone {
    title: string
    age: number
    desc: string
    eq: number
    dt: number
  }

  const generateTimeline = () => {
    // Placeholder for generateTimeline function implementation
    console.log('Generate Timeline function called');
  }

  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const formatNum = (val: number) => new Intl.NumberFormat('en-IN').format(val)

    const root = rootRef.current
    if (!root) return

    const inputs = root.querySelectorAll('input[type="range"]')
    
    const update = () => {
      const amount = parseFloat((root.querySelector('#amount') as HTMLInputElement).value)
      const age = parseFloat((root.querySelector('#age') as HTMLInputElement).value)
      const uniAge = parseFloat((root.querySelector('#uni-age') as HTMLInputElement).value)
      const savings = parseFloat((root.querySelector('#savings') as HTMLInputElement).value)
      const inflation = parseFloat((root.querySelector('#inflation') as HTMLInputElement).value)
      const rate = parseFloat((root.querySelector('#return') as HTMLInputElement).value)

      const years = Math.max(1, uniAge - age)

      const dispAmount = root.querySelector('#disp-amount') as HTMLElement
      const dispAge = root.querySelector('#disp-age') as HTMLElement
      const dispUniAge = root.querySelector('#disp-uni-age') as HTMLElement
      const dispSavings = root.querySelector('#disp-savings') as HTMLElement
      const dispInflation = root.querySelector('#disp-inflation') as HTMLElement
      const dispReturn = root.querySelector('#disp-return') as HTMLElement

      if (dispAmount) dispAmount.innerText = '₹ ' + formatNum(amount)
      if (dispAge) dispAge.innerText = age + ' Yrs'
      if (dispUniAge) dispUniAge.innerText = uniAge + ' Yrs'
      if (dispSavings) dispSavings.innerText = '₹ ' + formatNum(savings)
      if (dispInflation) dispInflation.innerText = inflation + ' %'
      if (dispReturn) dispReturn.innerText = rate + ' %'

      const target = amount * Math.pow(1 + inflation / 100, years)
      const savingsFV = savings * Math.pow(1 + rate / 100, years)
      let shortfall = target - savingsFV
      if (shortfall < 0) shortfall = 0

      let sip = 0
      if (shortfall > 0) {
        const i = rate / 100 / 12
        const n = years * 12
        if (i === 0) sip = shortfall / n
        else sip = (shortfall * i) / (Math.pow(1 + i, n) - 1)
      }

      const chartTotal = root.querySelector('#chart-total') as HTMLElement
      const resTarget = root.querySelector('#res-target') as HTMLElement
      const resShortfall = root.querySelector('#res-shortfall') as HTMLElement
      const resSip = root.querySelector('#res-sip') as HTMLElement

      if (chartTotal) chartTotal.innerText = formatMoney(target)
      if (resTarget) resTarget.innerText = formatMoney(target)
      if (resShortfall) resShortfall.innerText = formatMoney(shortfall)
      if (resSip) resSip.innerText = formatMoney(sip)

      const circ = 251.3
      const total = savingsFV + shortfall
      let pSavings = total > 0 ? savingsFV / total : 0
      let pShortfall = total > 0 ? shortfall / total : 0

      if (savingsFV >= target) {
        pSavings = 1
        pShortfall = 0
      } else {
        pSavings = savingsFV / target
        pShortfall = shortfall / target
      }

      const dashSavings = pSavings * circ
      const dashShortfall = pShortfall * circ

      const segSav = root.querySelector('#seg-savings') as SVGCircleElement
      const segShort = root.querySelector('#seg-shortfall') as SVGCircleElement

      if (segSav) segSav.style.strokeDasharray = dashSavings + ' ' + circ
      if (segShort) {
        segShort.style.strokeDasharray = dashShortfall + ' ' + circ
        segShort.style.strokeDashoffset = String(-dashSavings)
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('input', update)
    })

    update()

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', update)
      })
    }
  }, [])

  return (
    <div id="edu-calc-v2-root" ref={rootRef}>
      <style>{`
        #edu-calc-v2-root {
          --primary-color: #2F80ED;
          --success-color: #6FCF97;
          --text-color: #333333;
          --label-color: #555555;
          --bg-color: #F8F9FA;
          --card-bg: #FFFFFF;
          --slider-track: #E0E0E0;
          --font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          --input-bg: #E3F2FD;
          box-sizing: border-box;
          font-family: var(--font-family);
          background-color: var(--bg-color);
          color: var(--text-color);
          width: 100%;
          padding: 20px;
          display: block;
        }

        #edu-calc-v2-root *, #edu-calc-v2-root *::before, #edu-calc-v2-root *::after {
          box-sizing: inherit;
        }

        #edu-calc-v2-root .container {
          width: 100%;
          max-width: 1100px;
          background: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          padding: 40px;
          margin: 0 auto;
        }

        #edu-calc-v2-root h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1a2b4b;
          margin-bottom: 40px;
          margin-top: 0;
          line-height: 1.2;
        }

        #edu-calc-v2-root .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        @media (max-width: 900px) {
          #edu-calc-v2-root .main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        #edu-calc-v2-root .input-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        #edu-calc-v2-root .input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        #edu-calc-v2-root .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #edu-calc-v2-root .label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--label-color);
          letter-spacing: 0.5px;
        }

        #edu-calc-v2-root .value-display {
          background-color: var(--input-bg);
          padding: 6px 16px;
          border-radius: 6px;
          font-weight: 700;
          color: #2C3E50;
          font-size: 15px;
          min-width: 80px;
          text-align: right;
          border: 1px solid transparent;
          transition: border-color 0.2s;
        }

        #edu-calc-v2-root input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
          margin: 0;
          padding: 0;
          min-height: 20px;
        }

        #edu-calc-v2-root input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2F80ED;
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 2px 6px rgba(47, 128, 237, 0.4);
          border: 2px solid #fff;
        }

        #edu-calc-v2-root input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2F80ED;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(47, 128, 237, 0.4);
          border: 2px solid #fff;
        }

        #edu-calc-v2-root input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #E0E0E0;
          border-radius: 2px;
        }

        #edu-calc-v2-root .output-section {
          background: #FAFBFC;
          border-radius: 12px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        #edu-calc-v2-root .legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 12px;
          color: #666;
          margin-bottom: 30px;
          width: 100%;
          flex-wrap: wrap;
        }

        #edu-calc-v2-root .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        #edu-calc-v2-root .legend-color {
          width: 16px;
          height: 10px;
          border-radius: 2px;
        }

        #edu-calc-v2-root .chart-container {
          position: relative;
          width: 250px;
          height: 250px;
          margin-bottom: 30px;
        }

        #edu-calc-v2-root .chart-svg {
          transform: rotate(-90deg);
          max-width: 100%;
          height: auto;
        }

        #edu-calc-v2-root .chart-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
        }

        #edu-calc-v2-root .chart-label {
          font-size: 24px;
          font-weight: 800;
          color: #333;
        }

        #edu-calc-v2-root .result-details {
          width: 100%;
          text-align: center;
        }

        #edu-calc-v2-root .result-group {
          margin-bottom: 20px;
        }

        #edu-calc-v2-root .result-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
        }

        #edu-calc-v2-root .result-value {
          font-size: 20px;
          font-weight: 800;
          color: #333;
        }

        #edu-calc-v2-root .result-value.highlight {
          color: #663399;
          font-size: 24px;
        }

        #edu-calc-v2-root .disclaimer {
          font-size: 11px;
          color: #999;
          margin-top: 40px;
          line-height: 1.4;
        }
      `}</style>

      <div className="container">
        <h1>Calculate SIP Required For Your Child's Education</h1>

        <div className="main-grid">
          <div className="input-section">
            <div className="input-group">
              <div className="input-header">
                <label className="label">Amount Required for Education</label>
                <div className="value-display" id="disp-amount">₹ 20,00,000</div>
              </div>
              <input type="range" id="amount" min="100000" max="10000000" step="100000" defaultValue="2000000" />
            </div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Current Age of Child</label>
                <div className="value-display" id="disp-age">5 Yrs</div>
              </div>
              <input type="range" id="age" min="0" max="20" step="1" defaultValue="5" />
            </div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Child Age for Higher Education</label>
                <div className="value-display" id="disp-uni-age">18 Yrs</div>
              </div>
              <input type="range" id="uni-age" min="15" max="25" step="1" defaultValue="18" />
            </div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Current Savings</label>
                <div className="value-display" id="disp-savings">₹ 5,00,000</div>
              </div>
              <input type="range" id="savings" min="0" max="5000000" step="10000" defaultValue="500000" />
            </div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Inflation Rate</label>
                <div className="value-display" id="disp-inflation">7 %</div>
              </div>
              <input type="range" id="inflation" min="1" max="15" step="0.5" defaultValue="7" />
            </div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Expected Return Rate</label>
                <div className="value-display" id="disp-return">12 %</div>
              </div>
              <input type="range" id="return" min="1" max="20" step="0.5" defaultValue="12" />
            </div>
          </div>

          <div className="output-section">
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#6FCF97' }}></div>
                <span>Current Savings (Future Value)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#2F80ED' }}></div>
                <span>Additional Savings Required</span>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-text">
                <div className="chart-label" id="chart-total">₹ 0L</div>
              </div>
              <svg width="250" height="250" viewBox="0 0 100 100" className="chart-svg">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EAEAEA" strokeWidth="12" />
                <circle id="seg-savings" cx="50" cy="50" r="40" fill="transparent"
                  stroke="#6FCF97" strokeWidth="12" strokeDasharray="0 251"
                  strokeLinecap="round" />
                <circle id="seg-shortfall" cx="50" cy="50" r="40" fill="transparent"
                  stroke="#2F80ED" strokeWidth="12" strokeDasharray="0 251"
                  strokeDashoffset="0" strokeLinecap="round" />
              </svg>
            </div>
            <div className="result-details">
              <div className="result-group">
                <div className="result-label">Amount Required for Education adjusted for inflation</div>
                <div className="result-value" id="res-target">₹ 0L</div>
              </div>
              <div className="result-group">
                <div className="result-label">Additional Saving Required</div>
                <div className="result-value" id="res-shortfall">₹ 0L</div>
              </div>
              <div className="result-group">
                <div className="result-label">Achievable by a monthly SIP of</div>
                <div className="result-value highlight" id="res-sip">₹ 0K</div>
              </div>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          Calculators are for illustrations only and do not represent actual returns.<br />
          Mutual Fund investments are subject to market risks; read all scheme-related documents carefully.
        </div>
      </div>
    </div>
  )
}
