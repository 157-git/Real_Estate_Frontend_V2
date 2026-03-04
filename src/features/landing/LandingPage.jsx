import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, MapPin, Building2, Users, BadgeCheck,
  ChevronRight, Home, TrendingUp, Shield, Phone,
  Instagram, Youtube, Twitter, ArrowRight
} from 'lucide-react'
import BrandLogo from '../../components/common/BrandLogo.jsx'
import { MarigoldFlower, MangoLeafGarland, KolamDots, LotusIcon, OmSymbol } from '../../components/desi/DesiMotifs.jsx'
import styles from './LandingPage.module.css'

const LOCALITIES = ['Bandra West','Andheri','Juhu','Kothrud','Baner','Wakad','Koregaon Park','Hinjewadi','Whitefield','Koramangala','South Delhi','Noida Sector 18']

const STATS = [
  { num: '14,000+', label: 'Verified Listings' },
  { num: '9,200+',  label: 'Families Served' },
  { num: '₹0',      label: 'Broker Fees' },
  { num: '220+',    label: 'Cities' },
]

const ENTRY_CARDS = [
  {
    role: 'Buyer / Tenant',
    icon: Home,
    desc: 'Browse verified properties. Connect directly with owners.',
    cta: 'Start Searching',
    link: '/buyer/search',
    color: 'var(--marigold)',
    bg: 'var(--marigold-pale)',
    emoji: '🏠',
  },
  {
    role: 'Owner / Seller',
    icon: Building2,
    desc: 'List your property for free. Reach lakhs of buyers.',
    cta: 'List My Property',
    link: '/seller/register',
    color: 'var(--tulsi)',
    bg: 'var(--tulsi-light)',
    emoji: '🏗️',
  },
  {
    role: 'Licensed Agent',
    icon: BadgeCheck,
    desc: 'Manage listings, leads & deals on one RERA-verified platform.',
    cta: 'Agent Login',
    link: '/agent/login',
    color: 'var(--kumkum)',
    bg: 'var(--kumkum-pale)',
    emoji: '📋',
  },
]

export default function LandingPage() {
  const [search, setSearch]   = useState('')
  const [txn, setTxn]         = useState('Buy')
  const [mobileMenu, setMobileMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={styles.app}>

      {/* ══ TOPBAR ══ */}
      <header className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <BrandLogo onClick={() => navigate('/')} />
          <nav className={styles.nav}>
            <button className={styles.navBtn} onClick={() => setTxn('Buy')}>Buy</button>
            <button className={styles.navBtn} onClick={() => setTxn('Rent')}>Rent</button>
            <button className={styles.navBtn} onClick={() => setTxn('Sell')}>Sell</button>
          </nav>
          <div className={styles.topbarActions}>
            <Link to="/agent/login" className="btn btn-ghost btn-sm">Agent Login</Link>
            <Link to="/agent/register" className="btn btn-primary btn-sm">List Free</Link>
          </div>
        </div>
      </header>

      {/* ══ HERO — App Entry ══ */}
      <section className={styles.hero}>
        {/* Desi background decorations */}
        <div className={styles.heroBg}>
          <div className={styles.bgFlower1}><MarigoldFlower size={120} opacity={0.07} /></div>
          <div className={styles.bgFlower2}><MarigoldFlower size={80} opacity={0.06} /></div>
          <div className={styles.bgFlower3}><MarigoldFlower size={160} opacity={0.05} /></div>
          <div className={styles.bgLotus1}><LotusIcon size={90} color="#E8900A" /></div>
          <div className={styles.bgDots}/>
        </div>

        <div className={`container ${styles.heroContent}`}>
          {/* Top blessing line */}
          <div className={styles.blessing}>
            <OmSymbol size={14} color="#E8900A" />
            <span>शुभ गृह प्रवेश</span>
            <KolamDots count={7} />
          </div>

          <h1 className={styles.heroTitle}>
            Find Your Dream Home<br/>
            <span className={styles.heroAccent}>Across India</span>
          </h1>
          <p className={styles.heroSub}>
            Verified properties. Zero broker fees. Direct connections with owners and agents.
          </p>

          {/* Search Widget */}
          <div className={styles.searchWidget}>
            {/* Txn tabs */}
            <div className={styles.txnTabs}>
              {['Buy','Rent','Commercial','Plot'].map(t => (
                <button key={t}
                  className={`${styles.txnTab} ${txn === t ? styles.txnTabActive : ''}`}
                  onClick={() => setTxn(t)}>{t}</button>
              ))}
            </div>

            {/* Search row */}
            <div className={styles.searchRow}>
              <div className={`form-input-icon ${styles.searchInput}`}>
                <MapPin size={16} className="input-icon" />
                <input
                  list="localities"
                  className="form-input"
                  placeholder="City, area, locality or pincode..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <datalist id="localities">
                  {LOCALITIES.map(l => <option key={l} value={l} />)}
                </datalist>
              </div>
              <select className={`form-input form-select ${styles.typeSelect}`}>
                <option value="">Property Type</option>
                <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option>
                <option>4 BHK+</option><option>Villa</option><option>Plot</option>
                <option>Shop / Office</option>
              </select>
              <button className={`btn btn-primary btn-lg ${styles.searchBtn}`}>
                <Search size={18}/> Search
              </button>
            </div>

            {/* Quick pills */}
            <div className={styles.quickPills}>
              <span className={styles.pillLabel}>Popular:</span>
              {['Bandra West','Kothrud','Baner','Whitefield','South Delhi','Koramangala'].map(a => (
                <button key={a} className={styles.pill}>{a}</button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom garland */}
        <div className={styles.garlandBar}>
          <MangoLeafGarland count={16} />
        </div>
      </section>

      {/* ══ ROLE ENTRY CARDS ══ */}
      <section className={styles.roleSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <KolamDots count={5} />
            <h2>Who are you?</h2>
            <p>Choose your role to get started with the right experience</p>
          </div>

          <div className={styles.roleGrid}>
            {ENTRY_CARDS.map(c => (
              <Link key={c.role} to={c.link} className={styles.roleCard}
                style={{ '--card-color': c.color, '--card-bg': c.bg }}>
                <div className={styles.roleEmoji}>{c.emoji}</div>
                <div className={styles.roleIcon} style={{ background: c.bg, color: c.color }}>
                  <c.icon size={24} strokeWidth={1.8}/>
                </div>
                <h3 className={styles.roleTitle}>{c.role}</h3>
                <p className={styles.roleDesc}>{c.desc}</p>
                <div className={styles.roleCta} style={{ color: c.color }}>
                  {c.cta} <ArrowRight size={14}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST STRIP ══ */}
      <div className={styles.trustStrip}>
        <div className={`container ${styles.trustInner}`}>
          <div className={styles.trustItem}><Shield size={16}/> RERA Verified Listings</div>
          <div className={styles.trustDivider}><KolamDots count={3}/></div>
          <div className={styles.trustItem}><BadgeCheck size={16}/> Verified Agent Profiles</div>
          <div className={styles.trustDivider}><KolamDots count={3}/></div>
          <div className={styles.trustItem}><Users size={16}/> Direct Owner Connect</div>
          <div className={styles.trustDivider}><KolamDots count={3}/></div>
          <div className={styles.trustItem}><TrendingUp size={16}/> Pan India Coverage</div>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerTop}`}>
          <div className={styles.footBrand}>
            <BrandLogo />
            <p>India's trusted property platform. Buy, Sell, Rent — without broker hassle.</p>
            <div className={styles.footSocial}>
              <a href="#"><Instagram size={16}/></a>
              <a href="#"><Youtube size={16}/></a>
              <a href="#"><Twitter size={16}/></a>
            </div>
          </div>
          <div className={styles.footLinks}>
            <div>
              <h5>Platform</h5>
              <a href="#">Buy Property</a>
              <a href="#">Rent Property</a>
              <a href="#">Sell Property</a>
              <a href="#">New Projects</a>
            </div>
            <div>
              <h5>Tools</h5>
              <a href="#">Stamp Duty Calc</a>
              <a href="#">Ready Reckoner</a>
              <a href="#">EMI Calculator</a>
              <a href="#">Auspicious Dates</a>
            </div>
            <div>
              <h5>For Agents</h5>
              <Link to="/agent/register">Join as Agent</Link>
              <Link to="/agent/login">Agent Login</Link>
              <a href="#">RERA Guidelines</a>
            </div>
            <div>
              <h5>Contact</h5>
              <a href="tel:+918000000000"><Phone size={12}/> 1800-XXX-XXXX</a>
              <a href="#">hello@narayanirealtors.in</a>
            </div>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <div className={styles.footerKolam}>
            <KolamDots count={9} />
          </div>
          <p>© {new Date().getFullYear()} Narayani Realtors · All rights reserved</p>
          <div className={styles.footLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">RERA Info</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
