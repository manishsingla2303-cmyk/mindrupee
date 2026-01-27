'use client'

import { useEffect } from 'react'

export function EMICalculator() {
  useEffect(() => {
    const formatMoney = (val: number): string => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const formatNum = (val: number): string => new Intl.NumberFormat('en-IN').format(val)

    const root = document.getElementById('emi-calc-root')
    if (!root) return

    const update = () => {
      const loanAmount = parseFloat((root.querySelector('#loan-amount') as HTMLInputElement).value)
      const duration = parseFloat((root.querySelector('#duration') as HTMLInputElement).value)
      const rate = parseFloat((root.querySelector('#rate') as HTMLInputElement).value)

      ;(root.querySelector('#disp-loan') as HTMLElement).innerText = formatNum(loanAmount)
      ;(root.querySelector('#disp-duration') as HTMLElement).innerText = Math.round(duration).toString()
      ;(root.querySelector('#disp-rate') as HTMLElement).innerText = rate.toString()

      const r = rate / 12 / 100
      const n = duration * 12

      let emi = 0
      if (r === 0) {
        emi = loanAmount / n
      } else {
        emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      }

      const totalPayable = emi * n
      const totalInterest = totalPayable - loanAmount

      ;(root.querySelector('#res-total') as HTMLElement).innerText = formatMoney(totalPayable)
      ;(root.querySelector('#res-loan') as HTMLElement).innerText = formatMoney(loanAmount)
      ;(root.querySelector('#res-interest') as HTMLElement).innerText = formatMoney(totalInterest)
      ;(root.querySelector('#res-emi') as HTMLElement).innerText = formatMoney(emi)

      const loanPercent = (loanAmount / totalPayable) * 100
      const interestPercent = 100 - loanPercent

      ;(root.querySelector('#bar-loan') as HTMLElement).style.width = loanPercent + '%'
      ;(root.querySelector('#bar-interest') as HTMLElement).style.width = interestPercent + '%'
    }

    const inputs = root.querySelectorAll('input[type="range"]')
    inputs.forEach((input) => {
      input.addEventListener('input', update)
    })

    update()
  }, [])

  return (
    <div id="emi-calc-root">
      <style jsx>{`
        #emi-calc-root {
          --primary-blue: #2f80ed;
          --accent-orange: #ffb74d;
          --text-primary: #1a202c;
          --text-secondary: #718096;
          --bg-light: #f7fafc;
        }

        .calc-container {
          background: white;
          border-radius: 8px;
          padding: 40px;
        }

        .calc-title {
          font-size: 28px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 30px;
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        @media (max-width: 1024px) {
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .input-group {
          margin-bottom: 30px;
        }

        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .value-display {
          background: #e8f0ff;
          color: var(--primary-blue);
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
        }

        input[type='range'] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-blue);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-blue);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .output-section {
          background: var(--bg-light);
          border-radius: 8px;
          padding: 30px;
        }

        .output-header {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .bar-container {
          width: 100%;
          height: 24px;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          margin-bottom: 15px;
        }

        .bar-segment {
          height: 100%;
        }

        .bar-loan {
          background-color: var(--primary-blue);
          opacity: 0.8;
        }

        .bar-interest {
          background-color: var(--accent-orange);
          opacity: 0.8;
        }

        .legend {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 30px;
          background: white;
          border-radius: 8px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }

        .result-item {
          text-align: center;
        }

        .result-label {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .result-value {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .result-value.blue {
          color: var(--primary-blue);
        }

        .result-value.orange {
          color: var(--accent-orange);
        }

        .emi-section {
          text-align: center;
          padding: 30px;
          background: white;
          border-radius: 8px;
          margin-top: 20px;
        }

        .emi-label {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .emi-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
        }
      `}</style>

      <div className="calc-container">
        <h2 className="calc-title">Home Loan EMI Calculator</h2>

        <div className="calc-grid">
          {/* Left Column - Inputs */}
          <div>
            <div className="input-group">
              <div className="input-header">
                <label className="label">Loan Amount</label>
                <div className="value-display" id="disp-loan-box">
                  ₹ <span id="disp-loan">200000</span>
                </div>
              </div>
              <input type="range" id="loan-amount" min="100000" max="100000000" step="100000" defaultValue="200000" />
            </div>

            <div className="input-group">
              <div className="input-header">
                <label className="label">Duration</label>
                <div className="value-display" id="disp-duration-box">
                  <span id="disp-duration">5</span> Yrs
                </div>
              </div>
              <input type="range" id="duration" min="1" max="30" step="1" defaultValue="5" />
            </div>

            <div className="input-group">
              <div className="input-header">
                <label className="label">Interest Rate</label>
                <div className="value-display" id="disp-rate-box">
                  <span id="disp-rate">12</span> %
                </div>
              </div>
              <input type="range" id="rate" min="1" max="25" step="0.1" defaultValue="12" />
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="output-section">
            <div className="output-header" id="res-total">
              ₹2.67L
            </div>

            <div className="bar-container">
              <div className="bar-segment bar-loan" id="bar-loan" style={{ width: '75%' }}></div>
              <div className="bar-segment bar-interest" id="bar-interest" style={{ width: '25%' }}></div>
            </div>

            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: 'var(--primary-blue)', opacity: 0.8 }}></div>
                <span>
                  Loan Amount (<span id="res-loan">₹2.00L</span>)
                </span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: 'var(--accent-orange)', opacity: 0.8 }}></div>
                <span>
                  Interest Payable (<span id="res-interest">₹66.9K</span>)
                </span>
              </div>
            </div>

            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Loan Amount</div>
                <div className="result-value blue" id="disp-loan-res">
                  ₹2.00L
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">Total Amount Payable</div>
                <div className="result-value" id="res-total-display">
                  ₹2.67L
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">Interest Payable</div>
                <div className="result-value orange" id="res-interest-display">
                  ₹66.9K
                </div>
              </div>
            </div>

            <div className="emi-section">
              <div className="emi-label">Monthly EMI</div>
              <div className="emi-value" id="res-emi">
                ₹4.45K
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
