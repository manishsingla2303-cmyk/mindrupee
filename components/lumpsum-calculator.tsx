'use client'

import { useEffect } from 'react'

export function LumsumCalculator() {
  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const formatNum = (val: number) => new Intl.NumberFormat('en-IN').format(val)

    const root = document.getElementById('lumpsum-calc-root')
    if (!root) return

    const update = () => {
      const investment = parseFloat((root.querySelector('#investment') as HTMLInputElement).value)
      const duration = parseFloat((root.querySelector('#duration') as HTMLInputElement).value)
      const rate = parseFloat((root.querySelector('#returns') as HTMLInputElement).value)

      ;(root.querySelector('#disp-investment') as HTMLElement).innerText = formatNum(investment)
      ;(root.querySelector('#disp-duration') as HTMLElement).innerText = Math.round(duration).toString()
      ;(root.querySelector('#disp-returns') as HTMLElement).innerText = rate.toString()

      const yearlyData = []
      let currentVal = investment

      for (let year = 1; year <= duration; year++) {
        currentVal = investment * Math.pow(1 + rate / 100, year)
        yearlyData.push({
          year: year,
          invested: investment,
          corpus: currentVal,
          gain: currentVal - investment
        })
      }

      const totalInvested = investment
      const totalCorpus = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].corpus : investment
      const totalGains = totalCorpus - totalInvested

      ;(root.querySelector('#res-invested') as HTMLElement).innerText = formatMoney(totalInvested)
      ;(root.querySelector('#res-maturity') as HTMLElement).innerText = formatMoney(totalCorpus)
      ;(root.querySelector('#res-gains') as HTMLElement).innerText = formatMoney(totalGains)

      // Update chart
      const maxValue = totalCorpus * 1.1
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
        const gainsHeight = data.gain * scale
        const investedY = chartHeight - investedHeight - 20

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

        const investedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        investedRect.setAttribute('x', String(x - barWidth / 3))
        investedRect.setAttribute('y', String(investedY))
        investedRect.setAttribute('width', String(barWidth * 0.6))
        investedRect.setAttribute('height', String(investedHeight))
        investedRect.setAttribute('fill', '#2F80ED')

        const gainsRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        gainsRect.setAttribute('x', String(x - barWidth / 3))
        gainsRect.setAttribute('y', String(investedY - gainsHeight))
        gainsRect.setAttribute('width', String(barWidth * 0.6))
        gainsRect.setAttribute('height', String(gainsHeight))
        gainsRect.setAttribute('fill', '#6FCF97')

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
    <div id="lumpsum-calc-root">
      <style jsx>{`
        #lumpsum-calc-root {
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

        .input-section {
          max-width: 500px;
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

        .result-value.blue {
          color: var(--primary-color);
        }

        .result-value.green {
          color: var(--success-color);
        }
      `}</style>

      <div className="calc-container">
        <h2 className="calc-title">Lumpsum Calculator</h2>

        {/* Inputs Section */}
        <div className="input-section">
          <div className="input-group">
            <div className="input-header">
              <label className="label">Investment Amount</label>
              <div className="value-display">
                ₹ <span id="disp-investment">500000</span>
              </div>
            </div>
            <input type="range" id="investment" min="1000" max="10000000" step="1000" defaultValue="500000" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Duration</label>
              <div className="value-display">
                <span id="disp-duration">5</span> Yrs
              </div>
            </div>
            <input type="range" id="duration" min="1" max="30" step="1" defaultValue="5" />
          </div>

          <div className="input-group">
            <div className="input-header">
              <label className="label">Expected Returns</label>
              <div className="value-display">
                <span id="disp-returns">12</span> %
              </div>
            </div>
            <input type="range" id="returns" min="1" max="30" step="0.5" defaultValue="12" />
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#2F80ED' }}></div>
              <span>Total Investment</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#6FCF97' }}></div>
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
            <div className="result-label">Total Invested</div>
            <div className="result-value blue" id="res-invested">
              ₹5.00L
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Maturity Value</div>
            <div className="result-value" id="res-maturity">
              ₹8.81L
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Total Gains</div>
            <div className="result-value green" id="res-gains">
              ₹3.81L
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
