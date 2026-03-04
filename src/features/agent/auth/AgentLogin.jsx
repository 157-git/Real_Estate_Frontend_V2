import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff, BadgeCheck, AlertCircle } from 'lucide-react'
import BrandLogo from '../../../components/common/BrandLogo.jsx'
import { MarigoldFlower, KolamDots, MangoLeafGarland, OmSymbol } from '../../../components/desi/DesiMotifs.jsx'
import styles from './AgentLogin.module.css'

export default function AgentLoginPage() {
  const [phone, setPhone]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!/^\d{10}$/.test(phone))   e.phone    = 'Enter valid 10-digit mobile number'
    if (password.length < 6)        e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    navigate('/agent/dashboard')
  }

  return (
    <div className={styles.page}>

      {/* Left panel — desi welcome */}
      <div className={styles.left}>
        <div className={styles.leftBg}>
          <div className={styles.lbF1}><MarigoldFlower size={180} opacity={0.10} /></div>
          <div className={styles.lbF2}><MarigoldFlower size={120} opacity={0.08} /></div>
          <div className={styles.lbDots} />
        </div>

        <div className={styles.leftContent}>
          <BrandLogo size="lg" onClick={() => navigate('/')} />

          <div className={styles.leftMotto}>
            <OmSymbol size={28} color="#E8900A" />
            <h2>Welcome Back,<br/>NR Employee</h2>
            <p>Manage your listings, leads & deals — all from one place.</p>
          </div>

          <div className={styles.leftPerks}>
            {[
              { icon: '🏠', text: 'Unlimited property listings' },
              { icon: '📊', text: 'Full deal pipeline dashboard' },
              { icon: '🔔', text: 'Real-time lead notifications' },
              { icon: '📅', text: 'Site visit scheduler' },
              { icon: '💰', text: 'Commission tracker' },
            ].map(p => (
              <div key={p.text} className={styles.perk}>
                <span>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <div className={styles.leftGarland}>
            <MangoLeafGarland count={10} />
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className={styles.right}>
        <div className={styles.formCard}>

          {/* Top kolam dots */}
          <div className={styles.formTop}>
            <KolamDots count={7} />
          </div>

          <div className={styles.formHeader}>
            <div className={styles.reraBadge}>
              <BadgeCheck size={14} /> RERA Verified Platform
            </div>
            <h2>NR Employee Login</h2>
            <p>Sign in to your Narayani Realtors dashboard</p>
          </div>

          <div className={styles.fields}>
            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Mobile Number <span className="required">*</span></label>
              <div className="form-input-icon">
                <Phone size={15} className="input-icon" />
                <input
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  type="tel" maxLength={10} placeholder="10-digit mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              {errors.phone && (
                <span className="form-error"><AlertCircle size={12}/>{errors.phone}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <div className="form-input-icon">
                <Lock size={15} className="input-icon" />
                <input
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  type={showPwd ? 'text' : 'password'} placeholder="Your password"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                <span className="input-icon-right" onClick={() => setShowPwd(s => !s)}>
                  {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                </span>
              </div>
              {errors.password && (
                <span className="form-error"><AlertCircle size={12}/>{errors.password}</span>
              )}
            </div>

            <div className={styles.forgotRow}>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>

            <button
              className={`btn btn-primary btn-full btn-lg ${styles.loginBtn}`}
              onClick={handleLogin} disabled={loading}
            >
              {loading ? <span className="spinner"/> : 'Login to Dashboard'}
            </button>

            <div className="divider-text">or</div>

            <button className={`btn btn-outline btn-full ${styles.otpBtn}`}>
              <Phone size={15}/> Login with OTP
            </button>
          </div>

          <div className={styles.formFoot}>
            <p>New user? <Link to="/agent/register" className={styles.link}>Register here</Link></p>
            <p><Link to="/" className={styles.linkMuted}>← Back to Home</Link></p>
          </div>

          <div className={styles.formBottom}>
            <KolamDots count={5} />
          </div>
        </div>
      </div>
    </div>
  )
}
