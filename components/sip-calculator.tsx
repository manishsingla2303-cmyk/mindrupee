'use client'

import { useEffect } from 'react'

export function SIPCalculator() {
  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const formatNum = (val: number) => new Intl.NumberFormat('en-IN').format(val)

    const root = document.getElementById('sip-calc-root')
    if (!root) return

    const update = () => {
      const monthly = parseFloat((root.querySelector('#monthly') as HTMLInputElement).value)
      const years = parseFloat((root.querySelector('#years') as HTMLInputElement).value)
      const rate = parseFloat((root.querySelector('#rate') as HTMLInputElement).value)
      const topupPercent = parseFloat((root.querySelector('#topup-percent') as HTMLInputElement).value)
      const topupFrequency = (root.querySelector('input[name="frequency"]:checked') as HTMLInputElement)?.value || '6months'

      ;(root.querySelector('#disp-monthly') as HTMLElement).innerText = '₹ ' + formatNum(monthly)
      ;(root.querySelector('#disp-years') as HTMLElement).innerText = Math.round(years) + ' Yrs'
      ;(root.querySelector('#disp-rate') as HTMLElement).innerText = rate + ' %'
      ;(root.querySelector('#disp-topup') as HTMLElement).innerText = topupPercent + ' %'

      const months = years * 12
      const monthlyRate = rate / 100 / 12
      const frequencyMonths = topupFrequency === '6months' ? 6 : 12
      let totalInvested = 0
      let totalValue = 0
      let currentSip = monthly
      const yearlyData = []

      for (let month = 1; month <= months; month++) {
        totalInvested += currentSip
        totalValue += currentSip
        totalValue *= 1 + monthlyRate

        if (month % 12 === 0) {
          yearlyData.push({
            year: Math.round(month / 12),
            invested: totalInvested,
            gains: Math.max(0, totalValue - totalInvested),
            value: totalValue
          })
        }

        if (month % frequencyMonths === 0) {
          currentSip *= 1 + topupPercent / 100
        }
      }

      ;(root.querySelector('#res-invested') as HTMLElement).innerText = formatMoney(totalInvested)
      ;(root.querySelector('#res-value') as HTMLElement).innerText = formatMoney(totalValue)
      ;(root.querySelector('#res-gains') as HTMLElement).innerText = formatMoney(Math.max(0, totalValue - totalInvested))

      // Update chart
      const maxValue = totalValue * 1.1
      const chartSvg = root.querySelector('#chart-svg') as SVGElement
      const barGroup = chartSvg.querySelector('#bars') as SVGElement
      barGroup.innerHTML = ''

      const chartWidth = 600
      const chartHeight = 200
      const barWidth = chartWidth / (yearlyData.length + 1)
      const scale = (chartHeight - 40) / maxValue

      yearlyData.forEach((data, idx) => {
        const x = idx * barWidth + barWidth / 2
        const investedHeight = data.invested * scale
        const gainsHeight = data.gains * scale
        const investedY = chartHeight - investedHeight - 20

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

        const investedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        investedRect.setAttribute('x', String(x - barWidth / 3))
        investedRect.setAttribute('y', String(investedY))
        investedRect.setAttribute('width', String(barWidth * 0.6))
        investedRect.setAttribute('height', String(investedHeight))
        investedRect.setAttribute('fill', '#6FCF97')

        const gainsRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        gainsRect.setAttribute('x', String(x - barWidth / 3))
        gainsRect.setAttribute('y', String(investedY - gainsHeight))
        gainsRect.setAttribute('width', String(barWidth * 0.6))
        gainsRect.setAttribute('height', String(gainsHeight))
        gainsRect.setAttribute('fill', '#2F80ED')

        g.appendChild(investedRect)
        g.appendChild(gainsRect)

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        label.setAttribute('x', String(x))
        label.setAttribute('y', String(chartHeight - 5))
        label.setAttribute('text-anchor', 'middle')
        label.setAttribute('fill', '#666')
        label.setAttribute('font-size', '12')
        label.textContent = 'Y' + data.year

        g.appendChild(label)
        barGroup.appendChild(g)
      })
    }

    const inputs = root.querySelectorAll('input')
    inputs.forEach((input) => {
      input.addEventListener('input', update)
    })

    update()
  }, [])

  return (
    <div id="sip-calc-root">
      <style jsx>{`
        #sip-calc-root {
          --primary-color: #2f80ed;
          --success-color: #6fcf97;
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
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 40px;
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
          color: var(--primary-color);
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
          background: var(--primary-color);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .toggle-group {
          display: flex;
          gap: 30px;
          margin-top: 10px;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .toggle-item input[type='radio'] {
          cursor: pointer;
          width: 18px;
          height: 18px;
          accent-color: var(--primary-color);
        }

        .toggle-item label {
          cursor: pointer;
          font-size: 14px;
          color: var(--text-primary);
        }

        .input-section {
          max-width: 500px;
          margin-bottom: 40px;
        }

        .chart-section {
          width: 100%;
          margin-bottom: 40px;
        }

        .chart-legend {
          display: flex;
          gap: 30px;
          margin-bottom: 20px;
          justify-content: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .chart-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 280px;
          background: var(--bg-light);
          border-radius: 8px;
          padding: 20px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 30px;
          background: var(--bg-light);
          border-radius: 8px;
          margin-top: 30px;
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
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .result-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .result-value.gain {
          color: var(--primary-color);
        }
      `}</style>

      <div className="calc-container">
        <h2 className="calc-title">SIP Returns Calculator</h2>

        {/* Inputs Section */}
        <div className="input-section">
          <div className="input-group">
            <div className="input-header">
              <label className="label">Monthly Investment</label>
              <div className="value-display" id="disp-monthly">
                ₹ 30,000
              </div>
            </div>
            <input type="range" id="monthly" min="1000" max="100000" step="1000" defaultValue="30000" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Duration</label>
              <div className="value-display" id="disp-years">
                13 Yrs
              </div>
            </div>
            <input type="range" id="years" min="1" max="40" step="1" defaultValue="13" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Expected Returns</label>
              <div className="value-display" id="disp-rate">
                12 %
              </div>
            </div>
            <input type="range" id="rate" min="1" max="30" step="0.5" defaultValue="12" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Top Up As %</label>
              <div className="value-display" id="disp-topup">
                20 %
              </div>
            </div>
            <input type="range" id="topup-percent" min="0" max="50" step="1" defaultValue="20" />
          </div>

          <div className="input-group">
            <label className="label">Top Up Frequency</label>
            <div className="toggle-group">
              <div className="toggle-item">
                <input type="radio" id="freq-6m" name="frequency" value="6months" defaultChecked />
                <label htmlFor="freq-6m">6 months</label>
              </div>
              <div className="toggle-item">
                <input type="radio" id="freq-1y" name="frequency" value="1year" />
                <label htmlFor="freq-1y">1 year</label>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#6FCF97' }}></div>
              <span>Total Investment</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#2F80ED' }}></div>
              <span>Gains</span>
            </div>
          </div>

          <div className="chart-container">
            <svg id="chart-svg" width="100%" height="250" style={{ maxWidth: '600px' }} preserveAspectRatio="xMidYMid meet">
              <g id="bars"></g>
            </svg>
          </div>
        </div>

        {/* Results */}
        <div className="results-grid">
          <div className="result-item">
            <div className="result-label">Total Amount Invested</div>
            <div className="result-value" id="res-invested">
              ₹10.21Cr
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Value at Maturity</div>
            <div className="result-value" id="res-value">
              ₹14.77Cr
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Total Gains</div>
            <div className="result-value gain" id="res-gains">
              ₹4.56Cr
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
