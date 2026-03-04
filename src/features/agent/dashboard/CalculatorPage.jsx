import { useState } from 'react'
import { Calculator, IndianRupee, Info, RefreshCw } from 'lucide-react'
import styles from './CalculatorPage.module.css'

const STAMP_RATES = {
  'Maharashtra':  { male: 5, female: 4, joint: 4, reg: 1, maxReg: 30000 },
  'Karnataka':    { male: 5, female: 5, joint: 5, reg: 1, maxReg: null },
  'Delhi':        { male: 6, female: 4, joint: 5, reg: 1, maxReg: null },
  'Tamil Nadu':   { male: 7, female: 7, joint: 7, reg: 1, maxReg: null },
  'Telangana':    { male: 5, female: 5, joint: 5, reg: 0.5, maxReg: null },
  'Gujarat':      { male: 4.9, female: 4.9, joint: 4.9, reg: 1, maxReg: null },
  'West Bengal':  { male: 5, female: 4, joint: 4.5, reg: 1, maxReg: null },
  'Rajasthan':    { male: 5, female: 4, joint: 4.5, reg: 1, maxReg: null },
  'Uttar Pradesh':{ male: 7, female: 6, joint: 6.5, reg: 1, maxReg: null },
  'Madhya Pradesh':{ male: 7.5, female: 7.5, joint: 7.5, reg: 1, maxReg: null },
  'Punjab':       { male: 7, female: 5, joint: 6, reg: 1, maxReg: null },
  'Haryana':      { male: 5, female: 4, joint: 4.5, reg: 1, maxReg: null },
}

const RR_DATA = {
  'Mumbai - Bandra West':   { rate: 195000, unit: 'sq ft' },
  'Mumbai - Andheri East':  { rate: 115000, unit: 'sq ft' },
  'Mumbai - Juhu':          { rate: 230000, unit: 'sq ft' },
  'Pune - Kothrud':         { rate: 82000,  unit: 'sq ft' },
  'Pune - Baner':           { rate: 95000,  unit: 'sq ft' },
  'Pune - Hinjewadi':       { rate: 75000,  unit: 'sq ft' },
  'Bangalore - Whitefield': { rate: 88000,  unit: 'sq ft' },
  'Delhi - South Delhi':    { rate: 145000, unit: 'sq ft' },
  'Hyderabad - Banjara Hills': { rate: 92000, unit: 'sq ft' },
  'Chennai - Adyar':        { rate: 78000,  unit: 'sq ft' },
}

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

export default function CalculatorPage() {
  const [tab, setTab] = useState('stamp')

  // Stamp Duty
  const [state, setState]     = useState('Maharashtra')
  const [propVal, setPropVal] = useState('')
  const [gender, setGender]   = useState('male')
  const [propType, setPropType] = useState('Residential')
  const [result, setResult]   = useState(null)

  // RR
  const [rrArea, setRrArea]       = useState('')
  const [rrSqft, setRrSqft]       = useState('')
  const [rrResult, setRrResult]   = useState(null)

  const calcStamp = () => {
    const val = parseFloat(propVal.replace(/,/g, ''))
    if (!val || val <= 0) return
    const rates = STAMP_RATES[state]
    const sdPct = rates[gender] / 100
    const stampDuty = Math.round(val * sdPct)
    let regCharges = Math.round(val * rates.reg / 100)
    if (rates.maxReg) regCharges = Math.min(regCharges, rates.maxReg)
    const gst = propType !== 'Resale' ? Math.round(val * 0.05) : 0
    setResult({ stampDuty, regCharges, gst, total: stampDuty + regCharges + gst, sdPct: rates[gender] })
  }

  const calcRR = () => {
    const loc = RR_DATA[rrArea]
    const sqft = parseFloat(rrSqft)
    if (!loc || !sqft) return
    const mktVal = Math.round(loc.rate * sqft)
    setRrResult({ rate: loc.rate, sqft, mktVal })
  }

  const resetStamp = () => { setPropVal(''); setResult(null) }
  const resetRR    = () => { setRrSqft(''); setRrResult(null) }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Stamp Duty & Ready Reckoner</h2>
          <p>Quick reference tools for your clients — calculate before negotiating</p>
        </div>
      </div>

      {/* Tab switch */}
      <div className={styles.tabSwitch}>
        <button
          className={`${styles.tabBtn} ${tab === 'stamp' ? styles.tabBtnActive : ''}`}
          onClick={() => setTab('stamp')}>
          <Calculator size={16} /> Stamp Duty Calculator
        </button>
        <button
          className={`${styles.tabBtn} ${tab === 'rr' ? styles.tabBtnActive : ''}`}
          onClick={() => setTab('rr')}>
          <IndianRupee size={16} /> Ready Reckoner Rate
        </button>
      </div>

      {/* Stamp Duty */}
      {tab === 'stamp' && (
        <div className={styles.calcLayout}>
          <div className={styles.calcForm}>
            <h3 className={styles.calcTitle}>Stamp Duty Calculator</h3>
            <p className={styles.calcNote}>
              <Info size={13} /> Rates are indicative and based on current state government guidelines. Always verify with the Sub-Registrar office.
            </p>

            <div className={styles.fields}>
              <div className="form-group">
                <label className="form-label">State <span className="required">*</span></label>
                <select className="form-input form-select" value={state} onChange={e => setState(e.target.value)}>
                  {Object.keys(STAMP_RATES).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Property Value (₹) <span className="required">*</span></label>
                <div className="form-input-icon">
                  <IndianRupee size={15} className="input-icon" />
                  <input className="form-input" placeholder="e.g. 8500000"
                    value={propVal}
                    onChange={e => setPropVal(e.target.value.replace(/[^0-9.]/g, ''))} />
                </div>
                {propVal && (
                  <span className="form-hint">
                    {parseFloat(propVal) >= 10000000
                      ? `₹${(parseFloat(propVal)/10000000).toFixed(2)} Cr`
                      : parseFloat(propVal) >= 100000
                      ? `₹${(parseFloat(propVal)/100000).toFixed(2)} L`
                      : ''}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Buyer Type</label>
                <div className={styles.genderBtns}>
                  {[['male','Male'],['female','Female'],['joint','Joint']].map(([k,l]) => (
                    <button key={k}
                      className={`${styles.genderBtn} ${gender === k ? styles.genderBtnActive : ''}`}
                      onClick={() => setGender(k)}>{l}</button>
                  ))}
                </div>
                {gender === 'female' && (
                  <span className="form-hint" style={{ color: 'var(--tulsi)' }}>
                    ✓ Female buyer concession applicable in {state}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Property Transaction Type</label>
                <div className={styles.genderBtns}>
                  {['Residential','Commercial','Resale'].map(t => (
                    <button key={t}
                      className={`${styles.genderBtn} ${propType === t ? styles.genderBtnActive : ''}`}
                      onClick={() => setPropType(t)}>{t}</button>
                  ))}
                </div>
              </div>

              <div className={styles.calcActions}>
                <button className="btn btn-primary" onClick={calcStamp}>Calculate</button>
                <button className="btn btn-outline" onClick={resetStamp}><RefreshCw size={14} /> Reset</button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className={styles.resultPanel}>
            {result ? (
              <>
                <h3 className={styles.calcTitle}>Calculation Result</h3>
                <div className={styles.resultState}>{state} · {propType} · {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Joint'} buyer</div>
                <div className={styles.resultCards}>
                  <div className={styles.resultRow}>
                    <span>Property Value</span>
                    <strong>{fmt(parseFloat(propVal))}</strong>
                  </div>
                  <div className={styles.resultRow}>
                    <span>Stamp Duty ({result.sdPct}%)</span>
                    <strong className={styles.stamp}>{fmt(result.stampDuty)}</strong>
                  </div>
                  <div className={styles.resultRow}>
                    <span>Registration Charges</span>
                    <strong>{fmt(result.regCharges)}</strong>
                  </div>
                  {result.gst > 0 && (
                    <div className={styles.resultRow}>
                      <span>GST (5% — Under Construction)</span>
                      <strong>{fmt(result.gst)}</strong>
                    </div>
                  )}
                  <div className={`${styles.resultRow} ${styles.resultTotal}`}>
                    <span>Total Payable</span>
                    <strong>{fmt(result.total)}</strong>
                  </div>
                  <div className={`${styles.resultRow} ${styles.resultGrand}`}>
                    <span>Grand Total (Property + Costs)</span>
                    <strong>{fmt(parseFloat(propVal) + result.total)}</strong>
                  </div>
                </div>
                <p className={styles.disclaimer}>* Indicative only. Verify with Sub-Registrar / SRO office before transaction.</p>
              </>
            ) : (
              <div className={styles.emptyResult}>
                <Calculator size={40} strokeWidth={1.2} />
                <p>Fill in the details and click Calculate</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ready Reckoner */}
      {tab === 'rr' && (
        <div className={styles.calcLayout}>
          <div className={styles.calcForm}>
            <h3 className={styles.calcTitle}>Ready Reckoner Rate</h3>
            <p className={styles.calcNote}>
              <Info size={13} /> Government circle rates (ASR) for selected areas. Used as base value for stamp duty.
            </p>
            <div className={styles.fields}>
              <div className="form-group">
                <label className="form-label">Area / Locality <span className="required">*</span></label>
                <select className="form-input form-select" value={rrArea} onChange={e => setRrArea(e.target.value)}>
                  <option value="">Select area</option>
                  {Object.keys(RR_DATA).map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Carpet Area (sq ft) <span className="required">*</span></label>
                <input className="form-input" type="number" placeholder="e.g. 1200"
                  value={rrSqft} onChange={e => setRrSqft(e.target.value)} />
              </div>
              <div className={styles.calcActions}>
                <button className="btn btn-primary" onClick={calcRR}>Calculate</button>
                <button className="btn btn-outline" onClick={resetRR}><RefreshCw size={14} /> Reset</button>
              </div>
            </div>
          </div>

          <div className={styles.resultPanel}>
            {rrResult ? (
              <>
                <h3 className={styles.calcTitle}>Ready Reckoner Result</h3>
                <div className={styles.resultState}>{rrArea}</div>
                <div className={styles.resultCards}>
                  <div className={styles.resultRow}>
                    <span>Govt. Circle Rate</span>
                    <strong>{fmt(rrResult.rate)} / sq ft</strong>
                  </div>
                  <div className={styles.resultRow}>
                    <span>Carpet Area</span>
                    <strong>{rrResult.sqft} sq ft</strong>
                  </div>
                  <div className={`${styles.resultRow} ${styles.resultTotal}`}>
                    <span>Minimum Property Value</span>
                    <strong>{fmt(rrResult.mktVal)}</strong>
                  </div>
                </div>
                <div className={styles.rrNote}>
                  <strong>How to use:</strong> If the actual sale price is lower than ₹{fmt(rrResult.mktVal)}, stamp duty will still be calculated on this government circle rate value.
                </div>
              </>
            ) : (
              <div className={styles.emptyResult}>
                <IndianRupee size={40} strokeWidth={1.2} />
                <p>Select an area and enter sq footage</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
