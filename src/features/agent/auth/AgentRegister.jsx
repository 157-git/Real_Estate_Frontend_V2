import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Mail, BadgeCheck, MapPin, Upload, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import BrandLogo from '../../../components/common/BrandLogo.jsx'
import { KolamDots, MangoLeafGarland, OmSymbol, MarigoldFlower } from '../../../components/desi/DesiMotifs.jsx'
import styles from './AgentRegister.module.css'

const STEPS = [
  { num: 1, label: 'Personal Info',    icon: User },
  { num: 2, label: 'RERA & Location',  icon: BadgeCheck },
  { num: 3, label: 'Documents',        icon: Upload },
  { num: 4, label: 'Set Password',     icon: Lock },
]

const AREAS = ['Bandra West','Bandra East','Andheri West','Andheri East','Juhu','Versova','Lokhandwala','Khar','Santacruz','Vile Parle','Goregaon','Malad','Borivali','Kandivali','Dahisar','Kothrud','Baner','Wakad','Hinjewadi','Koregaon Park','Aundh','Viman Nagar','Whitefield','Koramangala','HSR Layout','Indiranagar']
const LANGUAGES = ['English','Hindi','Marathi','Gujarati','Kannada','Tamil','Telugu','Malayalam','Punjabi','Bengali']

const INIT = {
  name: '', agency: '', phone: '', altPhone: '', email: '',
  experience: '', languages: [],
  reraNo: '', reraExpiry: '', city: '', areas: [],
  pan: null, aadhaar: null, reraCert: null, photo: null,
  password: '', confirm: '',
}

export default function AgentRegisterPage() {
  const [step, setStep]   = useState(1)
  const [form, setForm]   = useState(INIT)
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd]   = useState(false)
  const [showCon, setShowCon]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toggleLang = l => set('languages', form.languages.includes(l) ? form.languages.filter(x => x !== l) : [...form.languages, l])
  const toggleArea = a => set('areas', form.areas.includes(a) ? form.areas.filter(x => x !== a) : [...form.areas, a])

  const validate = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Full name is required'
      if (!/^\d{10}$/.test(form.phone)) e.phone = 'Valid 10-digit mobile required'
      if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    }
    if (s === 2) {
      if (!form.reraNo.trim()) e.reraNo = 'RERA number is required'
      if (!form.city) e.city = 'Select operating city'
    }
    if (s === 4) {
      if (form.password.length < 8) e.password = 'Minimum 8 characters'
      if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    }
    setErrors(e)
    return !Object.keys(e).length
  }

  const next = () => { if (validate(step)) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const submit = async () => {
    if (!validate(4)) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  if (done) return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successTop}><KolamDots count={9} /></div>
        <OmSymbol size={32} />
        <CheckCircle size={56} color="var(--tulsi)" />
        <h2>Registration Submitted!</h2>
        <p>Welcome, <strong>{form.name}</strong>! Your agent profile is under review.<br/>We'll verify your RERA certificate and documents within <strong>24–48 hours</strong>.</p>
        <div className={styles.successMeta}>
          {[
            ['Name',        form.name],
            ['Mobile',      form.phone],
            ['RERA No.',    form.reraNo],
            ['City',        form.city],
            ['Areas',       form.areas.length + ' areas selected'],
          ].map(([k, v]) => v && (
            <div key={k} className={styles.metaRow}><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <MangoLeafGarland count={10} />
        <div className={styles.successBtns}>
          <Link to="/agent/login" className="btn btn-primary btn-lg">Login to Dashboard</Link>
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      {/* Left */}
      <div className={styles.left}>
        <div className={styles.leftBg}>
          <div className={styles.lbF1}><MarigoldFlower size={160} opacity={0.09} /></div>
          <div className={styles.lbDots} />
        </div>
        <div className={styles.leftContent}>
          <BrandLogo size="lg" onClick={() => navigate('/')} />
          <div className={styles.stepsList}>
            {STEPS.map(s => (
              <div key={s.num} className={`${styles.stepItem} ${step === s.num ? styles.stepActive : ''} ${step > s.num ? styles.stepDone : ''}`}>
                <div className={styles.stepCircle}>
                  {step > s.num ? <CheckCircle size={16}/> : <s.icon size={16}/>}
                </div>
                <div>
                  <div className={styles.stepNum}>Step {s.num}</div>
                  <div className={styles.stepLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <MangoLeafGarland count={10} />
        </div>
      </div>

      {/* Right */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          {/* Progress bar */}
          <div className={styles.progress}>
            <div className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }} />
          </div>

          <div className={styles.formTop}><KolamDots count={5} /></div>
          <div className={styles.formHeader}>
            <h3>Step {step} of 4 — {STEPS[step - 1].label}</h3>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className={styles.fields}>
              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <div className="form-input-icon">
                  <User size={15} className="input-icon"/>
                  <input className={`form-input ${errors.name ? 'error' : ''}`} placeholder="As per RERA registration"
                    value={form.name} onChange={e => set('name', e.target.value)}/>
                </div>
                {errors.name && <span className="form-error"><AlertCircle size={12}/>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Agency / Firm Name</label>
                <input className="form-input" placeholder="Optional — leave blank if independent"
                  value={form.agency} onChange={e => set('agency', e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number <span className="required">*</span></label>
                <div className="form-input-icon">
                  <Phone size={15} className="input-icon"/>
                  <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" maxLength={10} placeholder="10-digit mobile"
                    value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}/>
                </div>
                {errors.phone && <span className="form-error"><AlertCircle size={12}/>{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-icon">
                  <Mail size={15} className="input-icon"/>
                  <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)}/>
                </div>
                {errors.email && <span className="form-error"><AlertCircle size={12}/>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <select className="form-input form-select" value={form.experience} onChange={e => set('experience', e.target.value)}>
                  <option value="">Select</option>
                  {['Less than 1 year','1–3 years','3–5 years','5–10 years','10+ years'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Languages Spoken</label>
                <div className={styles.chipGrid}>
                  {LANGUAGES.map(l => (
                    <button key={l} type="button"
                      className={`${styles.chip} ${form.languages.includes(l) ? styles.chipOn : ''}`}
                      onClick={() => toggleLang(l)}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className={styles.fields}>
              <div className="form-group">
                <label className="form-label">RERA Agent Number <span className="required">*</span></label>
                <div className="form-input-icon">
                  <BadgeCheck size={15} className="input-icon"/>
                  <input className={`form-input ${errors.reraNo ? 'error' : ''}`} placeholder="e.g. A51900012345"
                    value={form.reraNo} onChange={e => set('reraNo', e.target.value.toUpperCase())}/>
                </div>
                {errors.reraNo && <span className="form-error"><AlertCircle size={12}/>{errors.reraNo}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">RERA Expiry Date</label>
                <input type="date" className="form-input" value={form.reraExpiry} onChange={e => set('reraExpiry', e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Operating City <span className="required">*</span></label>
                <div className="form-input-icon">
                  <MapPin size={15} className="input-icon"/>
                  <select className={`form-input form-select ${errors.city ? 'error' : ''}`} value={form.city} onChange={e => set('city', e.target.value)}>
                    <option value="">Select city</option>
                    {['Mumbai','Pune','Bangalore','Delhi NCR','Hyderabad','Chennai','Ahmedabad','Kolkata','Jaipur','Surat','Nagpur','Nashik','Indore','Bhopal'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {errors.city && <span className="form-error"><AlertCircle size={12}/>{errors.city}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Areas / Localities Covered</label>
                <div className={styles.chipGrid}>
                  {AREAS.map(a => (
                    <button key={a} type="button"
                      className={`${styles.chip} ${styles.chipSm} ${form.areas.includes(a) ? styles.chipOn : ''}`}
                      onClick={() => toggleArea(a)}>{a}</button>
                  ))}
                </div>
                {form.areas.length > 0 && (
                  <span className="form-hint">{form.areas.length} areas selected</span>
                )}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className={styles.fields}>
              <p className={styles.docNote}>Upload clear scanned copies or photos. Accepted: JPG, PNG, PDF (max 5MB each)</p>
              {[
                { key: 'pan',     label: 'PAN Card',         req: true  },
                { key: 'aadhaar', label: 'Aadhaar Card',     req: true  },
                { key: 'reraCert',label: 'RERA Certificate', req: true  },
                { key: 'photo',   label: 'Profile Photo',    req: false },
              ].map(d => (
                <div key={d.key} className="form-group">
                  <label className="form-label">
                    {d.label} {d.req && <span className="required">*</span>}
                  </label>
                  <label className={`${styles.fileBox} ${form[d.key] ? styles.fileBoxDone : ''}`}>
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" hidden
                      onChange={e => set(d.key, e.target.files[0])} />
                    {form[d.key] ? (
                      <><CheckCircle size={16} color="var(--tulsi)"/>{form[d.key].name}</>
                    ) : (
                      <><Upload size={16}/> Click to upload {d.label}</>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className={styles.fields}>
              <div className={styles.reviewBox}>
                <h4>Review Your Details</h4>
                {[
                  ['Name',    form.name],
                  ['Mobile',  form.phone],
                  ['Email',   form.email || '—'],
                  ['RERA No.',form.reraNo],
                  ['City',    form.city],
                  ['Areas',   form.areas.length + ' selected'],
                ].map(([k, v]) => (
                  <div key={k} className={styles.reviewRow}>
                    <span>{k}</span><strong>{v}</strong>
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Create Password <span className="required">*</span></label>
                <div className="form-input-icon">
                  <Lock size={15} className="input-icon"/>
                  <input className={`form-input ${errors.password ? 'error' : ''}`}
                    type={showPwd ? 'text' : 'password'} placeholder="Minimum 8 characters"
                    value={form.password} onChange={e => set('password', e.target.value)}/>
                  <span className="input-icon-right" onClick={() => setShowPwd(s => !s)}>
                    {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </span>
                </div>
                {errors.password && <span className="form-error"><AlertCircle size={12}/>{errors.password}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password <span className="required">*</span></label>
                <div className="form-input-icon">
                  <Lock size={15} className="input-icon"/>
                  <input className={`form-input ${errors.confirm ? 'error' : ''}`}
                    type={showCon ? 'text' : 'password'} placeholder="Re-enter password"
                    value={form.confirm} onChange={e => set('confirm', e.target.value)}/>
                  <span className="input-icon-right" onClick={() => setShowCon(s => !s)}>
                    {showCon ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </span>
                </div>
                {errors.confirm && <span className="form-error"><AlertCircle size={12}/>{errors.confirm}</span>}
              </div>
              <p className={styles.terms}>
                By registering you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>. Your RERA details will be verified before activation.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className={styles.formNav}>
            {step > 1
              ? <button className="btn btn-outline" onClick={back}>← Back</button>
              : <Link to="/agent/login" className="btn btn-ghost">Already registered?</Link>
            }
            {step < 4
              ? <button className="btn btn-primary" onClick={next}>Continue →</button>
              : <button className="btn btn-primary btn-lg" onClick={submit} disabled={loading}>
                  {loading ? <span className="spinner"/> : '🙏 Submit Registration'}
                </button>
            }
          </div>

          <div className={styles.formBottom}><KolamDots count={5} /></div>
        </div>
      </div>
    </div>
  )
}
