'use client'

import { useEffect, useState } from 'react'

export function SurrenderCalculator() {
  const [mode, setMode] = useState('trad')

  useEffect(() => {
    const formatMoney = (val: number) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr'
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L'
      if (val >= 1000) return '₹' + (val / 1000).toFixed(1) + 'K'
      return '₹' + Math.round(val).toLocaleString()
    }

    const formatNum = (val: number) => new Intl.NumberFormat('en-IN').format(val)

    const root = document.getElementById('surrender-calc-root')
    if (!root) return

    const calculate = () => {
      const getVal = (id: string) => parseFloat((root.querySelector(`#${id}`) as HTMLInputElement)?.value) || 0

      const mfRate = getVal('mf-return')
      let surrenderValue = 0
      let stayCorpus = 0
      let switchCorpus = 0
      let remainingYears = 0
      let totalInvestedStay = 0

      if (mode === 'trad') {
        const P = getVal('t-premium')
        const Term = getVal('t-term')
        const PaidY = getVal('t-years')
        const TradRate = getVal('t-return')

        remainingYears = Math.max(0, Term - PaidY)
        let totalPremiumsPaid = P * PaidY
        let eligiblePremiums = P * (PaidY - 1)
        if (eligiblePremiums < 0) eligiblePremiums = 0

        let factor = 0
        if (PaidY < 2) factor = 0
        else if (PaidY === 2) factor = 0.3
        else if (PaidY === 3) factor = 0.35
        else if (PaidY <= 7) factor = 0.5
        else factor = Math.min(0.9, 0.6 + (PaidY - 7) * 0.02)

        surrenderValue = eligiblePremiums * factor
        if (PaidY > 5) surrenderValue *= 1.2

        const rT = TradRate / 100
        stayCorpus = P * ((Math.pow(1 + rT, Term) - 1) / rT) * (1 + rT)
        totalInvestedStay = P * Term

        const rM = mfRate / 100
        const lumpsumFuture = surrenderValue * Math.pow(1 + rM, remainingYears)
        let sipFuture = 0
        if (remainingYears > 0) {
          sipFuture = P * ((Math.pow(1 + rM, remainingYears) - 1) / rM) * (1 + rM)
        }
        switchCorpus = lumpsumFuture + sipFuture
      } else {
        const FundVal = getVal('u-fund')
        const P = getVal('u-premium')
        const Y = getVal('u-years')
        const Remain = getVal('u-remain')
        const URate = getVal('u-return')

        remainingYears = Remain
        let charges = Y < 5 ? 6000 : 0
        surrenderValue = FundVal - charges

        const rU = URate / 100
        const rM = mfRate / 100

        const stayLump = FundVal * Math.pow(1 + rU, remainingYears)
        let staySip = 0
        if (remainingYears > 0) {
          staySip = P * ((Math.pow(1 + rU, remainingYears) - 1) / rU) * (1 + rU)
        }
        stayCorpus = stayLump + staySip

        const switchLump = surrenderValue * Math.pow(1 + rM, remainingYears)
        let switchSip = 0
        if (remainingYears > 0) {
          switchSip = P * ((Math.pow(1 + rM, remainingYears) - 1) / rM) * (1 + rM)
        }
        switchCorpus = switchLump + switchSip
        totalInvestedStay = (getVal('u-premium') * Y) + (P * remainingYears)
      }

      const resArea = root.querySelector('#results-area') as HTMLElement
      if (resArea) {
        resArea.style.opacity = '1'
        resArea.style.pointerEvents = 'auto'
      }

      ;(root.querySelector('#out-sv') as HTMLElement).innerText = formatMoney(surrenderValue)
      ;(root.querySelector('#out-stay-corpus') as HTMLElement).innerText = formatMoney(stayCorpus)
      ;(root.querySelector('#out-switch-corpus') as HTMLElement).innerText = formatMoney(switchCorpus)

      const difference = switchCorpus - stayCorpus
      const verdictEl = root.querySelector('#verdict') as HTMLElement
      if (verdictEl) {
        if (difference > 0) {
          verdictEl.innerText = `Switching is Better by ${formatMoney(difference)}`
          verdictEl.style.borderColor = '#00C853'
          verdictEl.style.color = '#00C853'
        } else {
          verdictEl.innerText = `Staying is Better by ${formatMoney(Math.abs(difference))}`
          verdictEl.style.borderColor = '#FF6B6B'
          verdictEl.style.color = '#FF6B6B'
        }
      }

      ;(root.querySelector('#tbl-inv-stay') as HTMLElement).innerText = formatMoney(totalInvestedStay)
      ;(root.querySelector('#tbl-gain-stay') as HTMLElement).innerText = formatMoney(Math.max(0, stayCorpus - totalInvestedStay))
      ;(root.querySelector('#tbl-inv-switch') as HTMLElement).innerText = formatMoney(totalInvestedStay)
      ;(root.querySelector('#tbl-gain-switch') as HTMLElement).innerText = formatMoney(Math.max(0, switchCorpus - totalInvestedStay))
    }

    const inputs = root.querySelectorAll('input, select')
    inputs.forEach((input) => {
      input.addEventListener('input', calculate)
      input.addEventListener('change', calculate)
    })

    calculate()
  }, [mode])

  return (
    <div id="surrender-calc-root">
      <style jsx>{`
        #surrender-calc-root {
          --primary: #2f80ed;
          --primary-light: #e3f2fd;
          --success: #6fcf97;
          --text-dark: #333333;
          --text-light: #777777;
          --bg-color: #f8f9fa;
          --card-bg: #ffffff;
        }

        .calc-container {
          background: white;
          border-radius: 8px;
          padding: 40px;
        }

        .calc-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 30px;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 10px 20px;
          border: 2px solid #ddd;
          border-radius: 6px;
          background: transparent;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-light);
          font-size: 14px;
        }

        .tab-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-light);
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 30px;
        }

        @media (max-width: 1024px) {
          .calc-grid {
            grid-template-columns: 1fr;
          }
        }

        .input-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .help-text {
          font-size: 11px;
          color: #999;
        }

        input[type='number'],
        select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          width: 100%;
        }

        input:focus,
        select:focus {
          outline: none;
          border-color: var(--primary);
        }

        .calc-btn {
          background: var(--primary);
          color: #fff;
          border: none;
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          margin-top: 20px;
        }

        .calc-btn:hover {
          background: #4a32a8;
        }

        .result-card {
          background: #fafbfc;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #eee;
          opacity: 0.5;
          pointer-events: none;
        }

        .result-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          text-align: center;
        }

        .surrender-box {
          background: #fff3e0;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
          color: #e65100;
          margin-bottom: 15px;
        }

        .surrender-box strong {
          font-weight: 700;
        }

        .surrender-value {
          font-size: 16px;
          font-weight: 700;
        }

        .boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .boxes {
            grid-template-columns: 1fr;
          }
        }

        .box {
          padding: 20px;
          border-radius: 8px;
          color: #fff;
          text-align: center;
        }

        .box.traditional {
          background: linear-gradient(135deg, #ff9966, #ff5e62);
          box-shadow: 0 4px 10px rgba(255, 94, 98, 0.2);
        }

        .box.mutual {
          background: linear-gradient(135deg, #56ab2f, #a8e063);
          box-shadow: 0 4px 10px rgba(86, 171, 47, 0.2);
        }

        .box h3 {
          font-size: 16px;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .box .big-val {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .box p {
          font-size: 13px;
          opacity: 0.8;
        }

        .verdict {
          text-align: center;
          margin: 20px 0;
        }

        #verdict {
          font-size: 16px;
          font-weight: 700;
          padding: 8px 16px;
          border: 2px solid;
          border-radius: 20px;
          display: inline-block;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        .comparison-table th,
        .comparison-table td {
          text-align: center;
          padding: 10px;
          font-size: 13px;
          border-bottom: 1px solid #eee;
        }

        .comparison-table th {
          color: #666;
          font-size: 12px;
          font-weight: 600;
        }

        .hidden {
          display: none;
        }

        .section-divider {
          border-top: 1px solid #eee;
          margin: 20px 0;
          padding-top: 20px;
        }
      `}</style>

      <div className="calc-container">
        <h2 className="calc-title">Should I Surrender My Policy?</h2>

        <div className="tabs">
          <button
            className={`tab-btn ${mode === 'trad' ? 'active' : ''}`}
            onClick={() => setMode('trad')}
          >
            Traditional Plan (LIC/Endowment)
          </button>
          <button
            className={`tab-btn ${mode === 'ulip' ? 'active' : ''}`}
            onClick={() => setMode('ulip')}
          >
            ULIP (Unit Linked)
          </button>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div className="input-col">
            {/* Traditional Inputs */}
            <div id="inputs-trad" className={mode !== 'trad' ? 'hidden' : ''}>
              <div className="form-group">
                <label className="label">Annual Premium (₹)</label>
                <input type="number" id="t-premium" defaultValue="50000" />
              </div>
              <div className="form-group">
                <label className="label">Total Policy Term (Years)</label>
                <input type="number" id="t-term" defaultValue="20" />
              </div>
              <div className="form-group">
                <label className="label">Years Premium Paid</label>
                <input type="number" id="t-years" defaultValue="5" />
                <span className="help-text">Policy duration completed so far</span>
              </div>
              <div className="form-group">
                <label className="label">Sum Assured (₹)</label>
                <input type="number" id="t-sa" defaultValue="1000000" />
              </div>
              <div className="form-group">
                <label className="label">Traditional Plan Expected Return (%)</label>
                <input type="number" id="t-return" defaultValue="5" readOnly style={{ background: '#f9f9f9' }} />
                <span className="help-text">Endowment plans typically yield 4-6%</span>
              </div>
            </div>

            {/* ULIP Inputs */}
            <div id="inputs-ulip" className={mode !== 'ulip' ? 'hidden' : ''}>
              <div className="form-group">
                <label className="label">Current Fund Value (₹)</label>
                <input type="number" id="u-fund" defaultValue="380000" />
              </div>
              <div className="form-group">
                <label className="label">Annual Premium (₹)</label>
                <input type="number" id="u-premium" defaultValue="50000" />
              </div>
              <div className="form-group">
                <label className="label">Years Completed</label>
                <input type="number" id="u-years" defaultValue="3" />
              </div>
              <div className="form-group">
                <label className="label">Remaining Policy Term (Years)</label>
                <input type="number" id="u-remain" defaultValue="10" />
              </div>
              <div className="form-group">
                <label className="label">Expected Fund Return (%)</label>
                <input type="number" id="u-return" defaultValue="10" />
              </div>
            </div>

            <div className="section-divider">
              <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Reinvestment Assumptions</h4>
              <div className="form-group">
                <label className="label">Expected Mutual Fund Return (%)</label>
                <input type="number" id="mf-return" defaultValue="12" />
              </div>
            </div>

            <button className="calc-btn">Compare Outcomes</button>
          </div>

          {/* Results */}
          <div className="result-card" id="results-area">
            <h3>Surrender Analysis</h3>

            <div className="surrender-box">
              <strong>Surrender Value Today:</strong> <span className="surrender-value" id="out-sv">₹0</span>
              <br />
              <span style={{ fontSize: '11px' }}>Approx. Estimate</span>
            </div>

            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Projected Corpus at Maturity</p>

            <div className="boxes">
              <div className="box traditional">
                <h3>If You Continue</h3>
                <div className="big-val" id="out-stay-corpus">
                  ₹0L
                </div>
                <p>Projected Maturity Value</p>
              </div>
              <div className="box mutual">
                <h3>If You Switch</h3>
                <div className="big-val" id="out-switch-corpus">
                  ₹0L
                </div>
                <p>Surrender + Invest in MF</p>
              </div>
            </div>

            <div className="verdict">
              <span id="verdict" style={{ borderColor: '#00C853', color: '#00C853' }}>
                Switching is Better by ₹0
              </span>
            </div>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Stay in Policy</th>
                  <th>Surrender & Invest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Investment Made</td>
                  <td id="tbl-inv-stay">₹0</td>
                  <td id="tbl-inv-switch">₹0</td>
                </tr>
                <tr>
                  <td>Appreciation</td>
                  <td id="tbl-gain-stay">₹0</td>
                  <td id="tbl-gain-switch">₹0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
