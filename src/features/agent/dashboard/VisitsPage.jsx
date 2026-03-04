import { useState } from 'react'
import { Calendar, Clock, Phone, MapPin, CheckCircle, XCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { siteVisits as initialVisits } from '../../../data/mockData.js'
import styles from './VisitsPage.module.css'

const STATUS_CONF = {
  'Scheduled':  { bg: '#DEEAF1', color: '#2E75B6', icon: Clock },
  'Completed':  { bg: '#D8F0E4', color: '#2E7D52', icon: CheckCircle },
  'Cancelled':  { bg: '#FDECEA', color: '#C0392B', icon: XCircle },
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function MiniCalendar({ visits }) {
  const [cur, setCur] = useState(new Date(2024, 0, 1))
  const year = cur.getFullYear(), month = cur.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const visitDates = new Set(visits.filter(v => v.status === 'Scheduled').map(v => v.date))

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.cal}>
      <div className={styles.calHead}>
        <button onClick={() => setCur(new Date(year, month - 1, 1))}><ChevronLeft size={15} /></button>
        <span>{MONTHS[month]} {year}</span>
        <button onClick={() => setCur(new Date(year, month + 1, 1))}><ChevronRight size={15} /></button>
      </div>
      <div className={styles.calDays}>
        {DAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className={styles.calGrid}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
          const hasVisit = visitDates.has(dateStr)
          const isToday  = d === 16 && month === 0
          return (
            <div key={d}
              className={`${styles.calCell} ${hasVisit ? styles.calHasVisit : ''} ${isToday ? styles.calToday : ''}`}>
              {d}
              {hasVisit && <span className={styles.calDot} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function VisitsPage() {
  const [visits, setVisits] = useState(initialVisits)
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [newVisit, setNewVisit] = useState({ client: '', property: '', date: '', time: '', phone: '' })

  const set = (k, v) => setNewVisit(p => ({ ...p, [k]: v }))

  const addVisit = () => {
    if (!newVisit.client || !newVisit.date || !newVisit.time) return
    setVisits(prev => [{
      id: `V${Date.now()}`, ...newVisit, status: 'Scheduled'
    }, ...prev])
    setNewVisit({ client: '', property: '', date: '', time: '', phone: '' })
    setShowForm(false)
  }

  const updateStatus = (id, status) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v))
  }

  const filtered = visits.filter(v => filter === 'All' || v.status === filter)
  const scheduled = visits.filter(v => v.status === 'Scheduled')
  const completed  = visits.filter(v => v.status === 'Completed')

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Site Visit Scheduler</h2>
          <p>{scheduled.length} upcoming · {completed.length} completed this month</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          <Plus size={15} /> Schedule Visit
        </button>
      </div>

      {/* Add Visit Form */}
      {showForm && (
        <div className={styles.addForm}>
          <h4>New Site Visit</h4>
          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Client Name <span className="required">*</span></label>
              <input className="form-input" placeholder="Client full name" value={newVisit.client} onChange={e => set('client', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Property</label>
              <input className="form-input" placeholder="e.g. 2 BHK, Bandra West" value={newVisit.property} onChange={e => set('property', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Date <span className="required">*</span></label>
              <input type="date" className="form-input" value={newVisit.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Time <span className="required">*</span></label>
              <input type="time" className="form-input" value={newVisit.time} onChange={e => set('time', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Client Phone</label>
              <input type="tel" maxLength={10} className="form-input" placeholder="10-digit number" value={newVisit.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className="btn btn-primary" onClick={addVisit}>Confirm Visit</button>
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className={styles.layout}>
        {/* Left: Visit list */}
        <div className={styles.visitPanel}>
          {/* Filter tabs */}
          <div className={styles.tabs}>
            {['All', 'Scheduled', 'Completed', 'Cancelled'].map(t => (
              <button key={t}
                className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`}
                onClick={() => setFilter(t)}>{t}
                <span className={styles.tabCount}>
                  {t === 'All' ? visits.length : visits.filter(v => v.status === t).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.visitList}>
            {filtered.map(v => {
              const cfg = STATUS_CONF[v.status] || STATUS_CONF['Scheduled']
              const Icon = cfg.icon
              return (
                <div key={v.id} className={styles.visitCard}>
                  <div className={styles.visitDateBlock}>
                    <span className={styles.visitDateNum}>
                      {v.date ? new Date(v.date + 'T00:00:00').getDate() : '?'}
                    </span>
                    <span className={styles.visitDateMon}>
                      {v.date ? MONTHS[new Date(v.date + 'T00:00:00').getMonth()].slice(0, 3) : ''}
                    </span>
                  </div>
                  <div className={styles.visitBody}>
                    <div className={styles.visitClient}>{v.client}</div>
                    <div className={styles.visitProp}><MapPin size={11} />{v.property}</div>
                    <div className={styles.visitTime}><Clock size={11} />{v.time}</div>
                  </div>
                  <div className={styles.visitActions}>
                    <span className={styles.visitStatus} style={{ background: cfg.bg, color: cfg.color }}>
                      <Icon size={11} /> {v.status}
                    </span>
                    {v.status === 'Scheduled' && (
                      <div className={styles.visitBtns}>
                        <a href={`tel:${v.phone}`} className={styles.callBtn}><Phone size={13} /></a>
                        <button className={styles.doneBtn} onClick={() => updateStatus(v.id, 'Completed')}>
                          <CheckCircle size={13} /> Done
                        </button>
                        <button className={styles.cancelBtn} onClick={() => updateStatus(v.id, 'Cancelled')}>
                          <XCircle size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className={styles.empty}>No visits in this category</div>
            )}
          </div>
        </div>

        {/* Right: Calendar */}
        <div className={styles.calPanel}>
          <MiniCalendar visits={visits} />
          <div className={styles.calLegend}>
            <div><span className={styles.dot} style={{ background: 'var(--marigold)' }} /> Scheduled visit</div>
            <div><span className={styles.dot} style={{ background: 'var(--ink)' }} /> Today</div>
          </div>
        </div>
      </div>
    </div>
  )
}
