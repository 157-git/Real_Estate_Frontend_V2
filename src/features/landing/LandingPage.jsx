import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandLogo from '../../components/common/BrandLogo.jsx'
import { MarigoldFlower, LotusIcon } from '../../components/desi/DesiMotifs.jsx'
import styles from './LandingPage.module.css'
import petal1 from '../../assets/petals/full-jhendu.png'
import petal2 from '../../assets/petals/jhendu-side-profile.png'
import petal3 from '../../assets/petals/jhendu-leaf.png'
import petal4 from '../../assets/petals/half-bloom-jhendu.png'
import petal5 from '../../assets/petals/jhendu-with-stem.png'
import petal6 from '../../assets/petals/jhendu-kali.png'
import { MangoLeafSVG, MarigoldSVG, SmallFlowerSVG } from './DesiSVG.jsx'
import logo from '../../assets/narayani.png'


/* ── toran unit config ──────────────────────────────────────── */
const TORAN_UNITS = Array.from({ length: 28 }, (_, i) => ({
  type: i % 4,
  height: [28, 44, 36, 52, 30, 48, 38, 54, 26, 46][i % 10],
  delay: (i * 0.13).toFixed(2),
  swayDur: (1.3 + i * 0.09).toFixed(2),
  leafColor: ['#2E6B3E', '#3D8A52', '#1e5c30', '#2a7a3e'][i % 4],
  marigoldOut: ['#E8900A', '#FF6B35', '#D4700A', '#E8900A'][i % 4],
  flowerColor: ['#FFB6C1', '#FF9EBC', '#ffaabb', '#ffc0d0'][i % 4],
}))

function ToranUnit({ u }) {
  return (
    <div className={styles.toranUnit}>
      <div className={styles.toranThread} style={{ height: u.height }} />
      <div className={styles.toranSvg}
        style={{ animationDuration: u.swayDur + 's', animationDelay: u.delay + 's' }}>
        {u.type === 0 && <MangoLeafSVG color={u.leafColor} />}
        {u.type === 1 && <MarigoldSVG outerColor={u.marigoldOut} innerColor="#FFD700" size={22} />}
        {u.type === 2 && <MangoLeafSVG color={u.leafColor} flip />}
        {u.type === 3 && <SmallFlowerSVG petalColor={u.flowerColor} size={18} />}
      </div>
    </div>
  )
}

const PETAL_POS = [
  { left: '7%', dur: 6.5, delay: 0, scale: 1.0 },
  { left: '18%', dur: 8.2, delay: 1.2, scale: 0.8 },
  { left: '33%', dur: 7.0, delay: 2.5, scale: 1.1 },
  { left: '52%', dur: 9.0, delay: 0.8, scale: 0.75 },
  { left: '68%', dur: 7.5, delay: 3.2, scale: 0.9 },
  { left: '80%', dur: 6.8, delay: 1.8, scale: 1.0 },
  { left: '91%', dur: 8.5, delay: 4.0, scale: 0.85 },
]
const PETAL_IMAGES = [petal1, petal2, petal3, petal4, petal5, petal6]


export default function LandingPage() {
  const [search, setSearch] = useState('')
  const [txn, setTxn] = useState('Buy')
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
            <Link to="/agent/login" className="btn btn-ghost btn-sm">NR User Login</Link>
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
          <div className={styles.bgDots} />
        </div>

        {/* ── TOP TORAN ── */}
        {/* <div className={styles.toran}> */}
          {/* <div className={styles.toranRope} /> */}
          {/* <div className={styles.toranItems}>
            {TORAN_UNITS.map((u, i) => <ToranUnit key={i} u={u} />)}
          </div>
        </div> */}

        {/* ── Falling SVG petals ── */}

        {PETAL_POS.map((p, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{
              left: p.left,
              animationDuration: p.dur + 's',
              animationDelay: p.delay + 's',
              transform: `scale(${p.scale})`
            }}
          >
            <img
              src={PETAL_IMAGES[i % PETAL_IMAGES.length]}
              alt=""
              className={styles.petalImg}
            />
          </div>
        ))}


        <div className={styles.content}>

          {/* Logo */}
          <div className={styles.logoBlock}>
            <div className={styles.logoWrap}>
              <img src={logo} alt="Narayani Realtors Logo" />
            </div>          <div className={styles.brandName}>Narayani<span> Realtors</span></div>
            {/* <div className={styles.brandSub}>Trusted · Verified · Pan India</div> */}
            <div className={styles.reraPill}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="rgba(49, 39, 11, 0.6)" strokeWidth="0.8" />
                <path d="M3.5 6l2 2 3.5-3.5" stroke="rgba(77, 61, 20, 0.9)"
                  strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              RERA Verified Platform
            </div>
          </div>

          {/* Tagline */}
          <p className={styles.tagline}>
            Your trusted home for <em>buying, selling & renting</em><br />
            property across India. Zero broker fees.
          </p>

          {/* Kolam dot divider */}
          <div className={styles.kolamDivider}>
            {[[4, 'rgba(255,200,50,0.42)'], [6, 'rgba(255,200,50,0.55)'], [9, 'rgba(255,215,0,0.65)'],
            [12, 'rgba(232,144,10,0.72)'], [9, 'rgba(100,180,80,0.55)'], [12, 'rgba(232,144,10,0.72)'],
            [9, 'rgba(255,215,0,0.65)'], [6, 'rgba(255,200,50,0.55)'], [4, 'rgba(255,200,50,0.42)'],
            ].map(([s, bg], i) => (
              <span key={i} className={styles.kd} style={{ width: s, height: s, background: bg }} />
            ))}
          </div>

          {/* Role buttons */}
          <div className={styles.buttons}>

            <button className={`${styles.btn} ${styles.btnBuy}`}
              onClick={() => navigate('/buyer/search')}>
              <span className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <strong>Buy or Rent Property</strong>
              </span>
              <svg className={styles.btnArrow} width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button className={`${styles.btn} ${styles.btnAgent}`}
              onClick={() => navigate('/agent/login')}>
              <span className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#704400" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" strokeWidth="2" />
                </svg>
                <strong>NR User Dashboard</strong>
              </span>
              <svg className={styles.btnArrow} width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="#704400" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button className={`${styles.btn} ${styles.btnSell}`}
              onClick={() => navigate('/seller/register')}>
              <span className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <strong>List My Property</strong>
              </span>
              <svg className={styles.btnArrow} width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      </section>
    </div>
  )
}
