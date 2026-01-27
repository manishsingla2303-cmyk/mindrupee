'use client'

import { useEffect } from 'react'

export function XIRRCalculator() {
  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K'
      return '₹' + Math.round(val)
    }

    const root = document.getElementById('xirr-calc-root')
    if (!root) return

    const solveXIRR = (cfs: Array<{ date: Date; amount: number }>) => {
      const calcNPV = (r: number, data: Array<{ val: number; t: number }>) => {
        let npv = 0
        for (let i = 0; i < data.length; i++) {
          const { val, t } = data[i]
          npv += val / Math.pow(1 + r, t)
        }
        return npv
      }

      const t0 = cfs[0].date
      const data = cfs.map((c) => {
        const diffTime = c.date.getTime() - t0.getTime()
        const years = diffTime / (1000 * 60 * 60 * 24 * 365)
        return { val: c.amount, t: years }
      })

      let totalInv = 0
      let totalRet = 0
      let maxTime = 0
      data.forEach((d) => {
        if (d.val < 0) totalInv += Math.abs(d.val)
        else totalRet += d.val
        maxTime = Math.max(maxTime, d.t)
      })

      let guess = maxTime > 0 ? (totalRet - totalInv) / totalInv / maxTime : 0.1

      // Newton-Raphson
      for (let iter = 0; iter < 100; iter++) {
        const npv = calcNPV(guess, data)
        if (Math.abs(npv) < 0.01) break

        let npvDeriv = 0
        for (let i = 0; i < data.length; i++) {
          const { val, t } = data[i]
          npvDeriv -= (t * val) / Math.pow(1 + guess, t + 1)
        }

        if (Math.abs(npvDeriv) < 1e-10) break
        guess -= npv / npvDeriv
      }

      return Math.max(-0.99, guess)
    }

    const calculate = () => {
      const amt = parseFloat((root.querySelector('#amt') as HTMLInputElement).value)
      const freq = parseInt((root.querySelector('#freq') as HTMLInputElement).value)
      const startStr = (root.querySelector('#start-date') as HTMLInputElement).value
      const endStr = (root.querySelector('#end-date') as HTMLInputElement).value
      const finalVal = parseFloat((root.querySelector('#maturity') as HTMLInputElement).value)
      const bmRate = parseFloat((root.querySelector('#bm-rate') as HTMLInputElement).value)

      const errDiv = root.querySelector('#error-msg') as HTMLElement
      errDiv.innerText = ''

      if (!amt || !finalVal || !startStr || !endStr) {
        errDiv.innerText = 'Please fill all fields.'
        return
      }

      const startDate = new Date(startStr)
      const endDate = new Date(endStr)

      if (endDate <= startDate) {
        errDiv.innerText = 'End date must be after Start date.'
        return
      }

      // Generate cash flows
      let cashFlows: Array<{ date: Date; amount: number }> = []

      let curr = new Date(startDate)

      if (freq === 0) {
        // Lumpsum
        cashFlows.push({ date: new Date(startDate), amount: -amt })
      } else {
        // Recurring
        while (curr < endDate) {
          cashFlows.push({ date: new Date(curr), amount: -amt })
          curr.setMonth(curr.getMonth() + freq)
        }
      }

      // Maturity Entry
      cashFlows.push({ date: new Date(endDate), amount: finalVal })

      // Solve XIRR
      let xirr = solveXIRR(cashFlows)

      // Calc Benchmark (MF)
      let mfValue = 0
      let totalInvested = 0

      cashFlows.forEach((cf) => {
        if (cf.amount < 0) {
          const inv = Math.abs(cf.amount)
          totalInvested += inv

          const t_days = (endDate.getTime() - cf.date.getTime()) / (1000 * 60 * 60 * 24)
          const t_years = t_days / 365

          mfValue += inv * Math.pow(1 + bmRate / 100, t_years)
        }
      })

      // Display
      const resBox = root.querySelector('#res-box') as HTMLElement
      resBox.style.opacity = '1'
      resBox.style.pointerEvents = 'all'

      // XIRR
      const xirrEl = root.querySelector('#out-xirr') as HTMLElement
      const xirrVal = (xirr * 100).toFixed(2)
      xirrEl.innerText = `${xirrVal}%`

      xirrEl.className = 'xirr-value'
      if (xirr >= 0.1) xirrEl.classList.add('pos')
      else if (xirr < 0) xirrEl.classList.add('neg')
      else xirrEl.classList.add('neu')

      if (xirr < 0) xirrEl.style.color = '#FF5252'
      else if (xirr < 0.08) xirrEl.style.color = '#F2C94C'
      else xirrEl.style.color = '#27AE60'

      // Msg
      const msgEl = root.querySelector('#xirr-msg') as HTMLElement
      if (xirr < 0.06) msgEl.innerText = 'Below Inflation Rate (Wealth Erosion)'
      else if (xirr > 0.12) msgEl.innerText = 'Excellent Returns!'
      else msgEl.innerText = 'Moderate Returns'

      // Totals
      ;(root.querySelector('#out-invested') as HTMLElement).innerText = formatMoney(totalInvested)
      ;(root.querySelector('#out-received') as HTMLElement).innerText = formatMoney(finalVal)

      const pnl = finalVal - totalInvested
      const pnlEl = root.querySelector('#out-pnl') as HTMLElement
      pnlEl.innerText = formatMoney(pnl)

      const pnlRow = root.querySelector('#pnl-row') as HTMLElement
      if (pnl >= 0) {
        pnlRow.style.background = '#FFF8E1'
        pnlRow.style.borderColor = '#FFECB3'
        pnlEl.style.color = '#27AE60'
      } else {
        pnlRow.style.background = '#FFEBEE'
        pnlRow.style.borderColor = '#FFCDD2'
        pnlEl.style.color = '#D32F2F'
      }

      // MF Comparison
      ;(root.querySelector('#out-bm-rate') as HTMLElement).innerText = String(bmRate)
      ;(root.querySelector('#out-mf-val') as HTMLElement).innerText = formatMoney(mfValue)

      const mfDiff = mfValue - finalVal
      const diffEl = root.querySelector('#out-mf-diff') as HTMLElement
      diffEl.innerText = `${formatMoney(mfDiff)} ${mfDiff > 0 ? 'more' : 'less'} vs Policy`
    }

    // Init Dates
    const today = new Date()
    const past = new Date()
    past.setFullYear(today.getFullYear() - 20)

    const endDateInput = root.querySelector('#end-date') as HTMLInputElement
    const startDateInput = root.querySelector('#start-date') as HTMLInputElement
    const calcBtn = root.querySelector('.calc-btn') as HTMLButtonElement

    endDateInput.valueAsDate = today
    startDateInput.valueAsDate = past

    if (calcBtn) {
      calcBtn.addEventListener('click', calculate)
    }

    // Auto-calculate on load
    calculate()
  }, [])

  return (
    <div id="xirr-calc-root">
      <style jsx>{`
        #xirr-calc-root {
          --primary: #2f80ed;
          --primary-light: #e3f2fd;
          --success: #6fcf97;
          --success-dark: #27ae60;
          --danger: #ff5252;
          --warning: #f2c94c;
          --text-dark: #333333;
          --text-light: #777777;
          --bg-color: #f8f9fa;
          --card-bg: #ffffff;
          --font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

          font-family: var(--font-family);
          color: var(--text-dark);
          background: transparent;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }

        #xirr-calc-root *,
        #xirr-calc-root *::before,
        #xirr-calc-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        #xirr-calc-root .container {
          max-width: 1000px;
          margin: 0 auto;
          background: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          padding: 30px;
          border: 1px solid #eaeaea;
        }

        #xirr-calc-root h1 {
          text-align: left;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #1a2b4b;
        }

        #xirr-calc-root .grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }

        @media (max-width: 800px) {
          #xirr-calc-root .grid {
            grid-template-columns: 1fr;
          }
        }

        #xirr-calc-root .form-group {
          margin-bottom: 20px;
        }

        #xirr-calc-root label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-light);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        #xirr-calc-root .input-wrapper {
          position: relative;
        }

        #xirr-calc-root input,
        #xirr-calc-root select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          color: var(--text-dark);
          transition: border-color 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }

        #xirr-calc-root select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }

        #xirr-calc-root input:focus,
        #xirr-calc-root select:focus {
          outline: none;
          border-color: var(--primary);
        }

        #xirr-calc-root .calc-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 14px;
          width: 100%;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s;
        }

        #xirr-calc-root .calc-btn:hover {
          background: #2364d1;
        }

        #xirr-calc-root .result-card {
          background: #fafbfc;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        #xirr-calc-root .xirr-box {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        #xirr-calc-root .xirr-value {
          font-size: 56px;
          font-weight: 800;
          margin: 10px 0 5px 0;
          line-height: 1;
        }

        #xirr-calc-root .xirr-value.pos {
          color: var(--success-dark);
        }

        #xirr-calc-root .xirr-value.neg {
          color: var(--danger);
        }

        #xirr-calc-root .xirr-value.neu {
          color: var(--warning);
        }

        #xirr-calc-root .xirr-label {
          font-size: 14px;
          color: var(--text-light);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        #xirr-calc-root .metrics-grid {
          display: grid;
          gap: 10px;
        }

        #xirr-calc-root .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 16px 20px;
          border-radius: 6px;
          border: 1px solid #eee;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        #xirr-calc-root .metric-label {
          font-weight: 600;
          color: #555;
          font-size: 14px;
        }

        #xirr-calc-root .metric-val {
          font-weight: 700;
          color: var(--text-dark);
          font-size: 16px;
        }

        #xirr-calc-root .metric-row.highlight {
          background: #fff8e1;
          border-color: #ffecb3;
        }

        #xirr-calc-root .metric-row.highlight .metric-val {
          color: var(--success-dark);
        }

        #xirr-calc-root .mf-comp-box {
          background: #e3f2fd;
          border: 1px solid #90caf9;
          border-radius: 8px;
          padding: 20px;
          margin-top: 10px;
        }

        #xirr-calc-root .mf-comp-header {
          font-size: 13px;
          font-weight: 700;
          color: #1976d2;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        #xirr-calc-root .mf-comp-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        #xirr-calc-root .mf-val {
          font-size: 20px;
          font-weight: 800;
          color: #1565c0;
        }

        #xirr-calc-root .mf-diff {
          font-size: 13px;
          font-weight: 600;
          color: #2e7d32;
        }

        #xirr-calc-root .disclaimer {
          font-size: 11px;
          color: #aaa;
          margin-top: 15px;
          line-height: 1.4;
          text-align: center;
        }

        #xirr-calc-root .hidden {
          display: none;
        }
      `}</style>

      <div className="container">
        <h1>XIRR Calculator</h1>

        <div className="grid">
          {/* Inputs */}
          <div className="input-section">
            <div className="form-group">
              <label>Recurring Investment Amount (₹)</label>
              <input type="number" id="amt" defaultValue="20000" />
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <select id="freq" defaultValue="1">
                <option value="1">Monthly</option>
                <option value="3">Quarterly</option>
                <option value="6">Half Yearly</option>
                <option value="12">Yearly</option>
                <option value="0">Lumpsum (One-time)</option>
              </select>
            </div>

            <div className="form-group" id="dur-group">
              <label>Date Range</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', color: '#555' }}>Start</span>
                  <input type="date" id="start-date" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', color: '#555' }}>End (Maturity)</span>
                  <input type="date" id="end-date" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Maturity / Surrender Value (₹)</label>
              <input type="number" id="maturity" defaultValue="5000000" />
            </div>

            {/* Comparison Config */}
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <label style={{ color: '#2F80ED' }}>Benchmark Comparison</label>
              <div className="form-group" style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  Compare against MF Return (%):
                </div>
                <input type="number" id="bm-rate" defaultValue="12" />
              </div>
            </div>

            <button className="calc-btn">Calculate XIRR</button>
            <div id="error-msg" style={{ color: 'red', fontSize: '13px', marginTop: '10px' }}></div>
          </div>

          {/* Results */}
          <div className="result-card" id="res-box" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            <div className="xirr-box">
              <div className="xirr-label">Your Personal XIRR</div>
              <div className="xirr-value neg" id="out-xirr">
                0.0%
              </div>
              <div id="xirr-msg" style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>
                Excellent Returns!
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-row">
                <span className="metric-label">Total Invested</span>
                <span className="metric-val" id="out-invested">
                  ₹0
                </span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Total Received</span>
                <span className="metric-val" id="out-received">
                  ₹0
                </span>
              </div>
              <div className="metric-row highlight" id="pnl-row">
                <span className="metric-label">Net P&L</span>
                <span className="metric-val" id="out-pnl">
                  ₹0
                </span>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={{ color: '#2F80ED', marginBottom: '10px', display: 'block', fontSize: '13px', fontWeight: '700' }}>
                WHAT IF YOU CHOSE A MUTUAL FUND?
              </label>

              <div className="mf-comp-box">
                <div className="mf-comp-flex">
                  <div>
                    <div className="mf-comp-header" style={{ margin: 0, color: '#1565C0' }}>
                      Potential MF Value
                    </div>
                    <div style={{ fontSize: '11px', color: '#1E88E5' }}>
                      @ <span id="out-bm-rate">12</span>% Returns
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mf-val" id="out-mf-val">
                      ₹0
                    </div>
                    <div className="mf-diff" id="out-mf-diff">
                      +₹0 vs Policy
                    </div>
                  </div>
                </div>
              </div>

              <div className="disclaimer">This comparison simulates investing the SAME cash flows into a Mutual Fund instead.</div>
            </div>
          </div>
        </div>

        <div className="disclaimer" style={{ textAlign: 'center', marginTop: '30px' }}>
          XIRR assumes reinvestment at the same rate. It reflects realised performance, not guaranteed future returns.
        </div>
      </div>
    </div>
  )
}
