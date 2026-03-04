import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, PlusSquare, Users,
  Calendar, MessageSquare, Calculator,
  ChevronLeft, ChevronRight, Bell, Search,
  LogOut, Settings, BadgeCheck, Star, Menu, X
} from 'lucide-react'
import BrandLogo from '../../../components/common/BrandLogo.jsx'
import { KolamDots, MangoLeaf } from '../../../components/desi/DesiMotifs.jsx'
import { agentProfile } from '../../../data/mockData.js'
import styles from './DashboardLayout.module.css'

const NAV = [
  { to: '/agent/dashboard',              icon: LayoutDashboard, label: 'Overview',          end: true },
  { to: '/agent/dashboard/listings',     icon: Building2,       label: 'My Listings' },
  { to: '/agent/dashboard/listings/add', icon: PlusSquare,      label: 'Add Listing' },
  { to: '/agent/dashboard/leads',        icon: Users,           label: 'Leads & Inquiries', badge: 3 },
  { to: '/agent/dashboard/visits',       icon: Calendar,        label: 'Site Visits' },
  { to: '/agent/dashboard/messages',     icon: MessageSquare,   label: 'Messages',           badge: 2 },
  { to: '/agent/dashboard/calculator',   icon: Calculator,      label: 'Stamp Duty / RR' },
]

function Avatar({ name, size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className={styles.avatar} style={{ width: size, height: size, fontSize: size * 0.33 }}>
      {initials}
    </div>
  )
}

export default function AgentDashboardLayout() {
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ''}`}>

      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>

        {/* Brand */}
        <div className={styles.sideHead}>
          {!collapsed && <BrandLogo size="sm" onClick={() => navigate('/')} />}
          {collapsed && <div className={styles.collapsedBrand} onClick={() => navigate('/')}>N</div>}
          <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)}>
            {collapsed ? <ChevronRight size={14}/> : <ChevronLeft size={14}/>}
          </button>
        </div>

        {/* Desi divider */}
        <div className={styles.sideDivider}>
          {!collapsed && <KolamDots count={5} />}
        </div>

        {/* Agent card */}
        <div className={styles.agentCard}>
          <Avatar name={agentProfile.name} size={collapsed ? 32 : 38} />
          {!collapsed && (
            <div className={styles.agentInfo}>
              <div className={styles.agentName}>
                {agentProfile.name.split(' ')[0]}
                {agentProfile.verified && <BadgeCheck size={13} color="var(--tulsi)" />}
              </div>
              <div className={styles.agentMeta}>
                <Star size={10} fill="var(--marigold)" color="var(--marigold)" />
                {agentProfile.rating} · {agentProfile.city}
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {!collapsed && <span className={styles.navSection}>MENU</span>}
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
              title={collapsed ? item.label : undefined}>
              <span className={styles.navIcon}><item.icon size={17} strokeWidth={1.8}/></span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              {!collapsed && item.badge && <span className={styles.badge}>{item.badge}</span>}
              {collapsed && item.badge && <span className={styles.badgeDot}/>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom mango leaf decoration */}
        {!collapsed && (
          <div className={styles.sideLeaf}>
            <MangoLeaf size={30} color="var(--tulsi-mid)" />
            <MangoLeaf size={30} color="var(--tulsi-mid)" flipped={true} />
          </div>
        )}

        {/* Foot */}
        <div className={styles.sideFoot}>
          <button className={styles.footBtn} title="Settings">
            <Settings size={16} strokeWidth={1.8}/>
            {!collapsed && <span>Settings</span>}
          </button>
          <button className={styles.footBtn} onClick={() => navigate('/agent/login')} title="Logout">
            <LogOut size={16} strokeWidth={1.8}/>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topLeft}>
            <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={19}/> : <Menu size={19}/>}
            </button>
            <div className="form-input-icon" style={{ maxWidth: 380, flex: 1 }}>
              <Search size={14} className="input-icon"/>
              <input className="form-input" style={{ padding: '8px 12px 8px 38px', fontSize: '0.875rem' }}
                placeholder="Search listings, leads, clients…"/>
            </div>
          </div>
          <div className={styles.topRight}>
            <button className={styles.topBtn}>
              <Bell size={17} strokeWidth={1.8}/>
              <span className={styles.notifDot}/>
            </button>
            <div className={styles.topProfile}>
              <Avatar name={agentProfile.name} size={30}/>
              <span>{agentProfile.name.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
