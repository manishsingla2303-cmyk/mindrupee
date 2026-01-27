'use client'

import { useEffect } from 'react'

export function SWPCalculator() {
  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const formatNum = (val: number) => new Intl.NumberFormat('en-IN').format(val)

    const root = document.getElementById('swp-calc-root')
    if (!root) return

    const update = () => {
      const investment = parseFloat((root.querySelector('#investment') as HTMLInputElement).value)
      const withdraw = parseFloat((root.querySelector('#withdraw') as HTMLInputElement).value)
      const returns_rate = parseFloat((root.querySelector('#returns') as HTMLInputElement).value)
      const duration = parseFloat((root.querySelector('#duration') as HTMLInputElement).value)
      const wait = parseFloat((root.querySelector('#wait') as HTMLInputElement).value)
      const increase = parseFloat((root.querySelector('#increase') as HTMLInputElement).value)

      ;(root.querySelector('#disp-investment') as HTMLElement).innerText = formatNum(investment)
      ;(root.querySelector('#disp-withdraw') as HTMLElement).innerText = formatNum(withdraw)
      ;(root.querySelector('#disp-returns') as HTMLElement).innerText = returns_rate.toString()
      ;(root.querySelector('#disp-duration') as HTMLElement).innerText = Math.round(duration).toString()
      ;(root.querySelector('#disp-wait') as HTMLElement).innerText = Math.round(wait).toString()
      ;(root.querySelector('#disp-increase') as HTMLElement).innerText = Math.round(increase).toString()

      const monthlyRate = returns_rate / 100 / 12
      let corpus = investment
      let totalWithdrawn = 0
      const chartData = []

      // Initial data point
      chartData.push({ year: 0, balance: corpus })

      // Waiting period - corpus grows
      const waitMonths = wait * 12
      for (let m = 1; m <= waitMonths; m++) {
        corpus = corpus * (1 + monthlyRate)
        if (m % 12 === 0) {
          chartData.push({ year: Math.round(m / 12), balance: corpus })
        }
      }

      // Withdrawal period
      let currentWithdraw = withdraw
      const durationMonths = duration * 12
      for (let m = 1; m <= durationMonths; m++) {
        corpus = corpus * (1 + monthlyRate)
        corpus -= currentWithdraw
        totalWithdrawn += currentWithdraw

        if (corpus < 0) corpus = 0

        if (m % 12 === 0) {
          currentWithdraw = currentWithdraw * (1 + increase / 100)
          chartData.push({ year: Math.round(wait + m / 12), balance: Math.max(0, corpus) })
        }
      }

      ;(root.querySelector('#val-invested') as HTMLElement).innerText = formatMoney(investment)
      ;(root.querySelector('#val-withdrawn') as HTMLElement).innerText = formatMoney(totalWithdrawn)
      ;(root.querySelector('#val-balance') as HTMLElement).innerText = formatMoney(Math.max(0, corpus))

      // Update chart
      const chartSvg = root.querySelector('#chart-svg') as SVGElement
      const barGroup = chartSvg.querySelector('#bars') as SVGElement
      barGroup.innerHTML = ''

      if (chartData.length === 0) return

      const maxBalance = Math.max(...chartData.map((d) => d.balance), investment)
      const chartWidth = 600
      const chartHeight = 200
      const barWidth = chartWidth / (chartData.length + 1)
      const scale = (chartHeight - 40) / maxBalance

      chartData.forEach((data, idx) => {
        const x = idx * barWidth + barWidth / 2
        const barHeight = data.balance * scale

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('x', String(x - barWidth / 3))
        rect.setAttribute('y', String(chartHeight - barHeight - 20))
        rect.setAttribute('width', String(barWidth * 0.6))
        rect.setAttribute('height', String(barHeight))
        rect.setAttribute('fill', '#1E90FF')

        g.appendChild(rect)

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
    <div id="swp-calc-root">
      <style jsx>{`
        #swp-calc-root {
          --primary-color: #2f80ed;
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
          background: #1E90FF;
        }

        .chart-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 280px;
          background: var(--bg-light);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
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
      `}</style>

      <div className="calc-container">
        <h2 className="calc-title">SWP Calculator</h2>

        {/* Inputs Section */}
        <div className="calc-grid">
          <div className="input-group">
            <div className="input-header">
              <label className="label">Total Investment</label>
              <div className="value-display">
                ₹ <span id="disp-investment">5000000</span>
              </div>
            </div>
            <input type="range" id="investment" min="100000" max="50000000" step="50000" defaultValue="5000000" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Withdrawal Per Month</label>
              <div className="value-display">
                ₹ <span id="disp-withdraw">25000</span>
              </div>
            </div>
            <input type="range" id="withdraw" min="500" max="500000" step="500" defaultValue="25000" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Expected Rate of Returns</label>
              <div className="value-display">
                <span id="disp-returns">12</span> %
              </div>
            </div>
            <input type="range" id="returns" min="1" max="25" step="0.5" defaultValue="12" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">How Long You Want to Withdraw</label>
              <div className="value-display">
                <span id="disp-duration">10</span> Yrs
              </div>
            </div>
            <input type="range" id="duration" min="1" max="50" step="1" defaultValue="10" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Waiting Period Before Withdrawal</label>
              <div className="value-display">
                <span id="disp-wait">1</span> Yrs
              </div>
            </div>
            <input type="range" id="wait" min="0" max="20" step="1" defaultValue="1" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Increase Rate of Withdrawal Amount</label>
              <div className="value-display">
                <span id="disp-increase">5</span> %
              </div>
            </div>
            <input type="range" id="increase" min="0" max="20" step="1" defaultValue="5" />
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot"></div>
            <span>Portfolio Balance Left</span>
          </div>
        </div>

        <div className="chart-container">
          <svg id="chart-svg" width="100%" height="250" style={{ maxWidth: '600px' }} preserveAspectRatio="xMidYMid meet">
            <g id="bars"></g>
          </svg>
        </div>

        {/* Results */}
        <div className="results-grid">
          <div className="result-item">
            <div className="result-label">Total Invested</div>
            <div className="result-value" id="val-invested">
              ₹50.00L
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Total Withdrawal</div>
            <div className="result-value" id="val-withdrawn">
              ₹37.73L
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Final Portfolio Balance</div>
            <div className="result-value" id="val-balance">
              ₹1.15Cr
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
