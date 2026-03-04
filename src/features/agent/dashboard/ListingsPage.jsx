import { useState } from 'react'
import { MapPin, Eye, Users, Plus, Search, ToggleLeft, ToggleRight, Edit2, Building2 } from 'lucide-react'
import { listings as initialListings } from '../../../data/mockData.js'
import { Link } from "react-router-dom"
import styles from './ListingsPage.module.css'

const STATUS_COLORS = {
  'Active':        { bg: '#D8F0E4', color: '#2E7D52' },
  'On Hold':       { bg: '#FEF3D0', color: '#D4880A' },
  'Token Received':{ bg: '#EAD9F5', color: '#7030A0' },
  'Deactivated':   { bg: '#F3F4F6', color: '#6B7280' },
}

const TXN_COLORS = {
  'Sale': { bg: '#DEEAF1', color: '#2E75B6' },
  'Rent': { bg: '#FCE4D6', color: '#C55A11' },
}

export default function ListingsPage() {
  const [listings, setListings] = useState(initialListings)
  const [search, setSearch]     = useState('')
  const [filterTxn, setFilterTxn] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const toggleStatus = (id) => {
    setListings(prev => prev.map(l =>
      l.id === id
        ? { ...l, status: l.status === 'Active' ? 'Deactivated' : 'Active' }
        : l
    ))
  }

  const filtered = listings.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
                        l.area.toLowerCase().includes(search.toLowerCase())
    const matchTxn    = filterTxn === 'All' || l.txn === filterTxn
    const matchStatus = filterStatus === 'All' || l.status === filterStatus
    return matchSearch && matchTxn && matchStatus
  })

  const counts = {
    Active: listings.filter(l => l.status === 'Active').length,
    OnHold: listings.filter(l => l.status === 'On Hold').length,
    Token:  listings.filter(l => l.status === 'Token Received').length,
    Total:  listings.length,
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>My Listings</h2>
          <p>{counts.Active} active · {counts.OnHold} on hold · {counts.Token} token received</p>
        </div>
        <Link to="/agent/dashboard/listings/add" className="btn btn-primary">
          <Plus size={16} /> Add Listing
        </Link>
      </div>

      {/* Stat strip */}
      <div className={styles.statStrip}>
        {[
          { label: 'Total Listings', val: counts.Total,  color: 'var(--ink)' },
          { label: 'Active',         val: counts.Active,  color: 'var(--tulsi)' },
          { label: 'On Hold',        val: counts.OnHold,  color: 'var(--warning)' },
          { label: 'Token Received', val: counts.Token,   color: 'var(--purple, #7030A0)' },
        ].map(s => (
          <div key={s.label} className={styles.statBox}>
            <span className={styles.statVal} style={{ color: s.color }}>{s.val}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.filtersRow}>
        <div className="form-input-icon" style={{ flex: 1, maxWidth: 320 }}>
          <Search size={15} className="input-icon" />
          <input className="form-input" placeholder="Search by title or area…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.filterBtns}>
          {['All', 'Sale', 'Rent'].map(t => (
            <button key={t}
              className={`${styles.filterBtn} ${filterTxn === t ? styles.filterActive : ''}`}
              onClick={() => setFilterTxn(t)}>{t}</button>
          ))}
        </div>
        <div className={styles.filterBtns}>
          {['All', 'Active', 'On Hold', 'Deactivated'].map(s => (
            <button key={s}
              className={`${styles.filterBtn} ${filterStatus === s ? styles.filterActive : ''}`}
              onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className={styles.grid}>
        {filtered.map(p => {
          const sc = STATUS_COLORS[p.status] || STATUS_COLORS['Deactivated']
          const tc = TXN_COLORS[p.txn] || TXN_COLORS['Sale']
          return (
            <div key={p.id} className={`${styles.card} ${p.status === 'Deactivated' ? styles.cardDim : ''}`}>
              <div className={styles.imgWrap}>
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className={styles.txnBadge} style={{ background: tc.bg, color: tc.color }}>{p.txn}</span>
                <span className={styles.statusBadge} style={{ background: sc.bg, color: sc.color }}>{p.status}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{p.title}</div>
                <div className={styles.cardArea}><MapPin size={11} /> {p.area}</div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardPrice}>{p.price}</span>
                  <span className={styles.cardSqft}>{p.sqft} sq ft</span>
                </div>
                <div className={styles.cardStats}>
                  <span><Eye size={12} /> {p.views} views</span>
                  <span><Users size={12} /> {p.leads} leads</span>
                  <span>Posted {p.postedDays}d ago</span>
                </div>
                <div className={styles.cardActions}>
                  <button className={`btn btn-outline btn-sm ${styles.editBtn}`}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${p.status === 'Active' ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => toggleStatus(p.id)}
                    title={p.status === 'Active' ? 'Deactivate' : 'Activate'}
                  >
                    {p.status === 'Active'
                      ? <><ToggleRight size={16} /> Active</>
                      : <><ToggleLeft size={16} /> Inactive</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <Building2 size={40} strokeWidth={1.2} />
          <p>No listings match your filters</p>
          <button className="btn btn-outline" onClick={() => { setSearch(''); setFilterTxn('All'); setFilterStatus('All') }}>
            Clear filters
          </button>
        </div>
      )}

    </div>
  )
}
