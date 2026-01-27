'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
import { ExpertTestimonial } from "@/components/expert-testimonial"

export default function RetirementCalculator() {
  useEffect(() => {
    const formatMoney = (val) => {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + 'Cr';
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + 'L';
      if (val >= 1000) return '₹' + (val / 1000).toFixed(2) + 'K';
      return '₹' + Math.round(val);
    };
    const formatNum = (val) => new Intl.NumberFormat('en-IN').format(val);

    const update = () => {
      const expense = parseFloat((document.getElementById('expense') as HTMLInputElement).value);
      const age = parseFloat((document.getElementById('age') as HTMLInputElement).value);
      let retAge = parseFloat((document.getElementById('ret-age') as HTMLInputElement).value);
      let life = parseFloat((document.getElementById('life') as HTMLInputElement).value);
      const savings = parseFloat((document.getElementById('savings') as HTMLInputElement).value);
      const inflation = parseFloat((document.getElementById('inflation') as HTMLInputElement).value);
      const rate = parseFloat((document.getElementById('return') as HTMLInputElement).value);

      const yearsToRet = Math.max(1, retAge - age);
      const yearsInRet = Math.max(1, life - retAge);

      document.getElementById('disp-expense').innerText = '₹ ' + formatNum(expense);
      document.getElementById('disp-age').innerText = age + ' Yrs';
      document.getElementById('disp-ret-age').innerText = retAge + ' Yrs';
      document.getElementById('disp-life').innerText = life + ' Yrs';
      document.getElementById('disp-savings').innerText = '₹ ' + formatNum(savings);
      document.getElementById('disp-inflation').innerText = inflation + ' %';
      document.getElementById('disp-return').innerText = rate + ' %';

      const annualExp = expense * 12;
      const fvAnnualExp = annualExp * Math.pow((1 + inflation / 100), yearsToRet);
      const targetCorpus = fvAnnualExp * yearsInRet;
      const fvSavings = savings * Math.pow((1 + rate / 100), yearsToRet);
      let shortfall = targetCorpus - fvSavings;
      if (shortfall < 0) shortfall = 0;

      let sip = 0;
      if (shortfall > 0) {
        const i = rate / 100 / 12;
        const n = yearsToRet * 12;
        if (i === 0) sip = shortfall / n;
        else sip = (shortfall * i) / (Math.pow(1 + i, n) - 1);
      }

      document.getElementById('chart-total').innerText = formatMoney(targetCorpus);
      document.getElementById('res-target').innerText = formatMoney(targetCorpus);
      document.getElementById('res-shortfall').innerText = formatMoney(shortfall);
      document.getElementById('res-sip').innerText = formatMoney(sip);
      document.getElementById('lbl-savings').innerText = formatMoney(fvSavings);
      document.getElementById('lbl-shortfall').innerText = formatMoney(shortfall);

      const circ = 239;
      let pSavings = 0, pShortfall = 0;
      if (targetCorpus > 0) {
        if (fvSavings >= targetCorpus) {
          pSavings = 1;
        } else {
          pSavings = fvSavings / targetCorpus;
          pShortfall = shortfall / targetCorpus;
        }
      }
      const dashSavings = pSavings * circ;
      const dashShortfall = pShortfall * circ;

      const segSav = document.getElementById('seg-savings');
      segSav.style.strokeDasharray = `${dashSavings} ${circ}`;

      const segShort = document.getElementById('seg-shortfall');
      segShort.style.strokeDasharray = `${dashShortfall} ${circ}`;
      segShort.style.strokeDashoffset = String(-dashSavings);
    };

    const inputs = document.querySelectorAll('input[type="range"]');
    inputs.forEach(input => {
      input.addEventListener('input', update);
    });

    update();
  }, []);

  return (
    <div>
      <Header />
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div id="retirement-calc-root">
                <style jsx>{`
                  #retirement-calc-root {
                    --primary-color: #2F80ED;
                    --success-color: #6FCF97;
                    --text-color: #333333;
                    --label-color: #555555;
                    --bg-color: #F8F9FA;
                    --card-bg: #FFFFFF;
                    --slider-track: #E0E0E0;
                    --font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    --input-bg: #E3F2FD;
                  }

                  #retirement-calc-root * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }

                  #retirement-calc-root {
                    font-family: var(--font-family);
                    color: var(--text-color);
                  }

                  #retirement-calc-root .container {
                    width: 100%;
                    background: var(--card-bg);
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                    padding: 40px;
                  }

                  #retirement-calc-root .header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                  }

                  #retirement-calc-root h1 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1a2b4b;
                  }

                  #retirement-calc-root .main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                  }

                  @media (max-width: 900px) {
                    #retirement-calc-root .main-grid {
                      grid-template-columns: 1fr;
                    }
                  }

                  #retirement-calc-root .input-section {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                  }

                  #retirement-calc-root .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                  }

                  #retirement-calc-root .input-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }

                  #retirement-calc-root .label {
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: var(--label-color);
                    letter-spacing: 0.5px;
                  }

                  #retirement-calc-root .value-display {
                    background-color: var(--input-bg);
                    padding: 6px 16px;
                    border-radius: 6px;
                    font-weight: 700;
                    color: #2C3E50;
                    font-size: 15px;
                    min-width: 90px;
                    text-align: right;
                    border: 1px solid transparent;
                  }

                  #retirement-calc-root input[type=range] {
                    -webkit-appearance: none;
                    width: 100%;
                    background: transparent;
                  }

                  #retirement-calc-root input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #2364BC;
                    cursor: pointer;
                    margin-top: -8px;
                    box-shadow: 0 2px 6px rgba(35, 100, 188, 0.4);
                    border: 2px solid #fff;
                  }

                  #retirement-calc-root input[type=range]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #2364BC;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(35, 100, 188, 0.4);
                    border: 2px solid #fff;
                  }

                  #retirement-calc-root input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: #E0E0E0;
                    border-radius: 2px;
                  }

                  #retirement-calc-root input[type=range]:focus {
                    outline: none;
                  }

                  #retirement-calc-root .output-section {
                    background: #FAFBFC;
                    border-radius: 12px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }

                  #retirement-calc-root .legend {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                  }

                  #retirement-calc-root .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  }

                  #retirement-calc-root .legend-color {
                    width: 16px;
                    height: 10px;
                    border-radius: 2px;
                  }

                  #retirement-calc-root .chart-container {
                    position: relative;
                    width: 260px;
                    height: 260px;
                    margin-bottom: 30px;
                  }

                  #retirement-calc-root .chart-svg {
                    transform: rotate(-90deg);
                  }

                  #retirement-calc-root .chart-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                  }

                  #retirement-calc-root .chart-label {
                    font-size: 26px;
                    font-weight: 800;
                    color: #333;
                  }

                  #retirement-calc-root .float-label {
                    position: absolute;
                    font-size: 12px;
                    color: #555;
                    white-space: nowrap;
                  }

                  #retirement-calc-root .label-savings {
                    top: 50%;
                    left: -60px;
                    text-align: right;
                  }

                  #retirement-calc-root .label-shortfall {
                    top: 20%;
                    right: -60px;
                  }

                  #retirement-calc-root .result-details {
                    width: 100%;
                    text-align: center;
                  }

                  #retirement-calc-root .result-group {
                    margin-bottom: 20px;
                  }

                  #retirement-calc-root .result-label {
                    font-size: 13px;
                    color: #666;
                    margin-bottom: 6px;
                  }

                  #retirement-calc-root .result-value {
                    font-size: 20px;
                    font-weight: 800;
                    color: #333;
                  }

                  #retirement-calc-root .result-value.highlight {
                    color: #564CCF;
                    font-size: 24px;
                  }

                  #retirement-calc-root .disclaimer {
                    font-size: 11px;
                    color: #999;
                    margin-top: 40px;
                    line-height: 1.4;
                  }
                `}</style>
                <div className="container">
                  <div className="header-row">
                    <h1>Retirement Calculator</h1>
                  </div>
                  <div className="main-grid">
                    <div className="input-section">
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Current Monthly Expenses</label>
                          <div className="value-display" id="disp-expense">₹ 50000</div>
                        </div>
                        <input type="range" id="expense" min="5000" max="500000" step="1000" defaultValue="50000" />
                      </div>
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Current Age</label>
                          <div className="value-display" id="disp-age">25 Yrs</div>
                        </div>
                        <input type="range" id="age" min="18" max="60" step="1" defaultValue="25" />
                      </div>
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Expected Retirement Age</label>
                          <div className="value-display" id="disp-ret-age">60 Yrs</div>
                        </div>
                        <input type="range" id="ret-age" min="40" max="75" step="1" defaultValue="60" />
                      </div>
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Life Expectancy</label>
                          <div className="value-display" id="disp-life">100 Yrs</div>
                        </div>
                        <input type="range" id="life" min="60" max="100" step="1" defaultValue="100" />
                      </div>
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Current Savings</label>
                          <div className="value-display" id="disp-savings">₹ 500000</div>
                        </div>
                        <input type="range" id="savings" min="0" max="20000000" step="100000" defaultValue="500000" />
                      </div>
                      <div className="input-group">
                        <div className="input-header">
                          <label className="label">Inflation Rate</label>
                          <div className="value-display" id="disp-inflation">6 %</div>
                        </div>
                        <input type="range" id="inflation" min="1" max="12" step="0.5" defaultValue="6" />
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
                          <div className="legend-color" style={{ background: 'var(--success-color)' }}></div>
                          <span>Current Savings Value on Retirement</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color" style={{ background: 'var(--primary-color)' }}></div>
                          <span>Additional Savings Required</span>
                        </div>
                      </div>
                      <div className="chart-container">
                        <div className="chart-text">
                          <div className="chart-label" id="chart-total">₹ 18.45Cr</div>
                        </div>
                        <div className="float-label label-savings" id="lbl-savings">₹2.64Cr</div>
                        <div className="float-label label-shortfall" id="lbl-shortfall">₹15.81Cr</div>
                        <svg width="260" height="260" viewBox="0 0 100 100" className="chart-svg">
                          <circle cx="50" cy="50" r="38" fill="transparent" stroke="#EAEAEA" strokeWidth="14" />
                          <circle id="seg-savings" cx="50" cy="50" r="38" fill="transparent" stroke="var(--success-color)" strokeWidth="14" strokeDasharray="0 239" strokeLinecap="butt" />
                          <circle id="seg-shortfall" cx="50" cy="50" r="38" fill="transparent" stroke="var(--primary-color)" strokeWidth="14" strokeDasharray="0 239" strokeDashoffset="0" strokeLinecap="butt" />
                        </svg>
                      </div>
                      <div className="result-details">
                        <div className="result-group">
                          <div className="result-label">Retirement amount required as per current expenses</div>
                          <div className="result-value" id="res-target">₹ 18.45Cr</div>
                        </div>
                        <div className="result-group">
                          <div className="result-label">Additional Saving Required</div>
                          <div className="result-value" id="res-shortfall">₹ 15.81Cr</div>
                        </div>
                        <div className="result-group">
                          <div className="result-label">Achievable by a monthly SIP of</div>
                          <div className="result-value highlight" id="res-sip">₹ 24.34K</div>
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
            </div>
            <div className="lg:col-span-1">
              <ExpertTestimonial />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
