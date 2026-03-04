import { useState } from 'react'
import { Phone, Mail, MessageSquare, Users, Search, ChevronDown } from 'lucide-react'
import { leads as allLeads } from '../../../data/mockData.js'
import { Link } from "react-router-dom"
import styles from './LeadsPage.module.css'

const STATUS_CONFIG = {
  'New':         { bg: '#DEEAF1', color: '#2E75B6' },
  'Contacted':   { bg: '#FEF3D0', color: '#D4880A' },
  'Site Visit':  { bg: '#EAD9F5', color: '#7030A0' },
  'Negotiation': { bg: '#FCE4D6', color: '#C55A11' },
  'Closed':      { bg: '#D8F0E4', color: '#2E7D52' },
}

const STATUSES = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed']

export default function LeadsPage() {
  const [leads, setLeads]     = useState(allLeads)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('All')
  const [selected, setSelected] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const updateStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                        l.interest.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || l.status === filter
    return matchSearch && matchFilter
  })

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {})

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Leads & Inquiries</h2>
          <p>{leads.filter(l => l.status === 'New').length} new · {leads.length} total</p>
        </div>
      </div>

      {/* Pipeline Kanban strip */}
      <div className={styles.kanban}>
        {STATUSES.map(s => {
          const cfg = STATUS_CONFIG[s]
          return (
            <button key={s}
              className={`${styles.kanbanCol} ${filter === s ? styles.kanbanActive : ''}`}
              onClick={() => setFilter(filter === s ? 'All' : s)}
              style={filter === s ? { background: cfg.bg, borderColor: cfg.color } : {}}
            >
              <span className={styles.kanbanCount} style={filter === s ? { color: cfg.color } : {}}>
                {counts[s] || 0}
              </span>
              <span className={styles.kanbanLabel} style={filter === s ? { color: cfg.color } : {}}>
                {s}
              </span>
            </button>
          )
        })}
        {filter !== 'All' && (
          <button className={styles.clearFilter} onClick={() => setFilter('All')}>
            Show all ×
          </button>
        )}
      </div>

      {/* Search */}
      <div className="form-input-icon" style={{ maxWidth: 380 }}>
        <Search size={15} className="input-icon" />
        <input className="form-input" placeholder="Search by name, property interest…"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Lead Cards */}
      <div className={styles.leadsList}>
        {filtered.map(lead => {
          const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New']
          const isOpen = expandedId === lead.id
          return (
            <div key={lead.id} className={`${styles.leadCard} ${isOpen ? styles.leadCardOpen : ''}`}>
              <div className={styles.leadMain} onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                <div className={styles.leadAvatar}>{lead.name[0]}</div>
                <div className={styles.leadInfo}>
                  <div className={styles.leadName}>{lead.name}
                    <span className={styles.txnTag} style={{
                      background: lead.type === 'Buy' ? '#DEEAF1' : '#FCE4D6',
                      color: lead.type === 'Buy' ? '#2E75B6' : '#C55A11'
                    }}>{lead.type}</span>
                  </div>
                  <div className={styles.leadInterest}>{lead.interest}</div>
                </div>
                <div className={styles.leadMid}>
                  <div className={styles.leadBudget}>{lead.budget}</div>
                  <div className={styles.leadSource}>{lead.source}</div>
                </div>
                <div className={styles.leadRight}>
                  <span className={styles.leadStatus} style={{ background: cfg.bg, color: cfg.color }}>
                    {lead.status}
                  </span>
                  <span className={styles.leadTime}>{lead.time}</span>
                </div>
                <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
              </div>

              {isOpen && (
                <div className={styles.leadExpanded}>
                  <div className={styles.expandedLeft}>
                    <div className={styles.contactRow}><Phone size={13} />{lead.phone}</div>
                    <div className={styles.contactRow}><Mail size={13} />{lead.email}</div>
                  </div>
                  <div className={styles.expandedRight}>
                    <div className={styles.statusLabel}>Update Status</div>
                    <div className={styles.statusChips}>
                      {STATUSES.map(s => (
                        <button key={s}
                          className={`${styles.statusChip} ${lead.status === s ? styles.statusChipActive : ''}`}
                          style={lead.status === s ? { background: STATUS_CONFIG[s].bg, color: STATUS_CONFIG[s].color, borderColor: STATUS_CONFIG[s].color } : {}}
                          onClick={() => updateStatus(lead.id, s)}>{s}</button>
                      ))}
                    </div>
                    <div className={styles.expandedActions}>
                      <a href={`tel:${lead.phone}`} className="btn btn-outline btn-sm">
                        <Phone size={13} /> Call
                      </a>
                      <Link to="/agent/dashboard/messages" className="btn btn-primary btn-sm">
                        <MessageSquare size={13} /> Message
                      </Link>
                      <Link to="/agent/dashboard/visits" className="btn btn-outline btn-sm">
                        <Users size={13} /> Schedule Visit
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--ink-muted)', background: '#fff', borderRadius: 16 }}>
          No leads found
        </div>
      )}
    </div>
  )
}
