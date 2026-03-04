import { useState } from 'react'
import {
  Plus, X, Calendar, Target, MapPin, Edit2, Trash2,
  Eye, Pause, Play, Copy, TrendingUp, Users, Building2,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock,
  Gift, Zap, Tag, RefreshCw
} from 'lucide-react'
import { festivalsCalendar, offerTypes, festiveCampaigns as initialCampaigns } from '../../../data/adminMockData.js'
import styles from './FestiveOffers.module.css'

const STATUS_META = {
  active:    { label: 'Active',    icon: Play,         bg: 'var(--success-light)', color: 'var(--success)' },
  scheduled: { label: 'Scheduled', icon: Clock,        bg: 'var(--warning-light)', color: 'var(--warning)' },
  draft:     { label: 'Draft',     icon: Edit2,        bg: 'var(--ivory-deep)',    color: 'var(--ink-muted)' },
  completed: { label: 'Completed', icon: CheckCircle,  bg: 'var(--tulsi-light)',   color: 'var(--tulsi)' },
  paused:    { label: 'Paused',    icon: Pause,        bg: 'var(--kumkum-pale)',   color: 'var(--kumkum)' },
}

const AUDIENCE = ['All Users', 'Buyers Only', 'Sellers Only', 'Agents Only', 'NRI Users']
const PROP_TYPES = ['All Property Types', 'Residential', 'Commercial', 'Industrial', 'Land / Plot']
const CITIES = ['Pan India', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Solapur']

const EMPTY_FORM = {
  name: '', festivalKey: '', offerType: '',
  discountValue: '', discountDetail: '',
  targetAudience: 'All Users', propertyTypes: ['All Property Types'],
  cities: ['Pan India'], startDate: '', endDate: '',
  status: 'draft',
}

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.draft
  const Icon = m.icon
  return (
    <span className={styles.statusBadge} style={{ background: m.bg, color: m.color }}>
      <Icon size={10} /> {m.label}
    </span>
  )
}

function MetricPill({ value, label }) {
  return (
    <div className={styles.metricPill}>
      <span className={styles.metricVal}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
      <span className={styles.metricLbl}>{label}</span>
    </div>
  )
}

function FestivalPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const selected = festivalsCalendar.find(f => f.key === value)
  return (
    <div className={styles.festPicker}>
      <button type="button" className={styles.festPickerBtn} onClick={() => setOpen(o => !o)}>
        {selected
          ? <><span>{selected.emoji}</span><span>{selected.name}</span><span className={styles.festType} style={{ background: selected.bgColor, color: selected.color }}>{selected.type}</span></>
          : <span className={styles.festPlaceholder}>Select a festival…</span>
        }
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className={styles.festDropdown}>
          {festivalsCalendar.map(f => (
            <button
              key={f.key} type="button"
              className={`${styles.festOption} ${value === f.key ? styles.festOptionActive : ''}`}
              onClick={() => { onChange(f.key); setOpen(false) }}
            >
              <span className={styles.festOptEmoji}>{f.emoji}</span>
              <div className={styles.festOptInfo}>
                <span className={styles.festOptName}>{f.name}</span>
                <span className={styles.festOptDate}>{f.date}</span>
              </div>
              <span className={styles.festType} style={{ background: f.bgColor, color: f.color }}>{f.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MultiSelect({ options, value, onChange, placeholder }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }
  return (
    <div className={styles.multiSelect}>
      {options.map(opt => (
        <button
          key={opt} type="button"
          className={`${styles.multiChip} ${value.includes(opt) ? styles.multiChipActive : ''}`}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function FestiveOffers() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId]       = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [tab, setTab]             = useState('campaigns') // 'campaigns' | 'calendar'

  function openCreate() {
    setForm(EMPTY_FORM)
    setEditId(null)
    setShowModal(true)
  }

  function openEdit(c) {
    setForm({
      name: c.name, festivalKey: c.festivalKey, offerType: c.offerType,
      discountValue: c.discountValue, discountDetail: c.discountDetail,
      targetAudience: c.targetAudience, propertyTypes: c.propertyTypes,
      cities: c.cities, startDate: c.startDate, endDate: c.endDate,
      status: c.status,
    })
    setEditId(c.id)
    setShowModal(true)
  }

  function saveCampaign() {
    const fest = festivalsCalendar.find(f => f.key === form.festivalKey) || {}
    const offerT = offerTypes.find(o => o.id === form.offerType) || {}
    if (editId) {
      setCampaigns(cs => cs.map(c => c.id === editId
        ? { ...c, ...form, festivalName: fest.name, emoji: fest.emoji, color: fest.color, bgColor: fest.bgColor, offerTypeName: offerT.label }
        : c))
    } else {
      setCampaigns(cs => [...cs, {
        ...form, id: 'c' + Date.now(),
        festivalName: fest.name, emoji: fest.emoji || '🎉',
        color: fest.color || 'var(--marigold)',
        bgColor: fest.bgColor || 'var(--marigold-pale)',
        offerTypeName: offerT.label || form.offerType,
        impressions: 0, clicks: 0, conversions: 0,
      }])
    }
    setShowModal(false)
  }

  function deleteCampaign(id) {
    setCampaigns(cs => cs.filter(c => c.id !== id))
  }

  function toggleStatus(id, newStatus) {
    setCampaigns(cs => cs.map(c => c.id === id ? { ...c, status: newStatus } : c))
  }

  function duplicateCampaign(c) {
    setCampaigns(cs => [...cs, { ...c, id: 'c' + Date.now(), name: c.name + ' (Copy)', status: 'draft', impressions: 0, clicks: 0, conversions: 0 }])
  }

  const filtered = filterStatus === 'all' ? campaigns : campaigns.filter(c => c.status === filterStatus)

  return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}><Gift size={22} /> Festive Offers</h1>
          <p className={styles.sub}>Create and manage festival-based promotional campaigns</p>
        </div>
        <button className={styles.createBtn} onClick={openCreate}>
          <Plus size={15} /> New Campaign
        </button>
      </div>

      {/* Summary KPIs */}
      <div className={styles.summaryRow}>
        {[
          { label: 'Total Campaigns', value: campaigns.length,                                             color: 'var(--ink)',        icon: Gift },
          { label: 'Active Now',      value: campaigns.filter(c => c.status === 'active').length,          color: 'var(--success)',     icon: Play },
          { label: 'Scheduled',       value: campaigns.filter(c => c.status === 'scheduled').length,       color: 'var(--warning)',     icon: Clock },
          { label: 'Total Conversions', value: campaigns.reduce((a, c) => a + c.conversions, 0),           color: 'var(--tulsi)',       icon: TrendingUp },
          { label: 'Total Impressions', value: campaigns.reduce((a, c) => a + c.impressions, 0).toLocaleString(), color: '#1A6DB5', icon: Eye },
        ].map(s => (
          <div key={s.label} className={styles.summaryCard}>
            <s.icon size={16} style={{ color: s.color }} />
            <span className={styles.summaryVal} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.summaryLbl}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={styles.tabRow}>
        <button className={`${styles.tab} ${tab === 'campaigns' ? styles.tabActive : ''}`} onClick={() => setTab('campaigns')}>
          <Zap size={14} /> Campaigns
        </button>
        <button className={`${styles.tab} ${tab === 'calendar' ? styles.tabActive : ''}`} onClick={() => setTab('calendar')}>
          <Calendar size={14} /> Festival Calendar
        </button>
      </div>

      {tab === 'campaigns' && (
        <>
          {/* Filter bar */}
          <div className={styles.filterBar}>
            {['all', 'active', 'scheduled', 'draft', 'completed', 'paused'].map(s => (
              <button
                key={s}
                className={`${styles.filterChip} ${filterStatus === s ? styles.filterChipActive : ''}`}
                onClick={() => setFilterStatus(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                {s !== 'all' && (
                  <span className={styles.filterCount}>{campaigns.filter(c => c.status === s).length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Campaign Cards */}
          <div className={styles.campaignList}>
            {filtered.length === 0 && (
              <div className={styles.empty}>
                <Gift size={36} style={{ color: 'var(--ink-light)', marginBottom: 12 }} />
                <p>No campaigns found. <button onClick={openCreate} className={styles.emptyLink}>Create one →</button></p>
              </div>
            )}
            {filtered.map(c => (
              <div key={c.id} className={styles.campaignCard} style={{ borderLeftColor: c.color }}>
                <div className={styles.cardMain}>
                  <div className={styles.cardLeft}>
                    <div className={styles.campEmojiBox} style={{ background: c.bgColor }}>{c.emoji}</div>
                    <div className={styles.campMeta}>
                      <div className={styles.campNameRow}>
                        <span className={styles.campName}>{c.name}</span>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className={styles.campSubRow}>
                        <span className={styles.campFest}>{c.festivalName}</span>
                        <span className={styles.dot}>·</span>
                        <span className={styles.campOfferType}>{c.offerTypeName}</span>
                        <span className={styles.dot}>·</span>
                        <span className={styles.campAudience}><Users size={11} /> {c.targetAudience}</span>
                        <span className={styles.dot}>·</span>
                        <span className={styles.campCities}><MapPin size={11} /> {c.cities.join(', ')}</span>
                      </div>
                      <div className={styles.campDates}>
                        <Calendar size={11} /> {c.startDate} → {c.endDate}
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardRight}>
                    <div className={styles.campDiscount} style={{ color: c.color }}>{c.discountValue}</div>
                    {c.impressions > 0 && (
                      <div className={styles.campMetrics}>
                        <MetricPill value={c.impressions} label="views" />
                        <MetricPill value={c.conversions} label="conv." />
                        <MetricPill value={c.clicks > 0 ? ((c.conversions / c.clicks) * 100).toFixed(1) + '%' : '—'} label="CVR" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand details */}
                {expandedId === c.id && (
                  <div className={styles.expandPanel}>
                    <div className={styles.expandGrid}>
                      <div><span className={styles.expandLabel}>Offer Detail</span><span className={styles.expandVal}>{c.discountDetail}</span></div>
                      <div><span className={styles.expandLabel}>Property Types</span><span className={styles.expandVal}>{c.propertyTypes.join(', ')}</span></div>
                      <div><span className={styles.expandLabel}>Target Cities</span><span className={styles.expandVal}>{c.cities.join(', ')}</span></div>
                      <div><span className={styles.expandLabel}>Audience</span><span className={styles.expandVal}>{c.targetAudience}</span></div>
                    </div>
                  </div>
                )}

                {/* Actions row */}
                <div className={styles.cardActions}>
                  <button className={styles.actionBtn} onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                    {expandedId === c.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {expandedId === c.id ? 'Less' : 'Details'}
                  </button>
                  <button className={styles.actionBtn} onClick={() => openEdit(c)}><Edit2 size={13} /> Edit</button>
                  <button className={styles.actionBtn} onClick={() => duplicateCampaign(c)}><Copy size={13} /> Duplicate</button>
                  {c.status === 'active'
                    ? <button className={styles.actionBtn} onClick={() => toggleStatus(c.id, 'paused')}><Pause size={13} /> Pause</button>
                    : c.status === 'paused'
                    ? <button className={`${styles.actionBtn} ${styles.actionGreen}`} onClick={() => toggleStatus(c.id, 'active')}><Play size={13} /> Resume</button>
                    : c.status === 'draft'
                    ? <button className={`${styles.actionBtn} ${styles.actionGreen}`} onClick={() => toggleStatus(c.id, 'scheduled')}><Play size={13} /> Schedule</button>
                    : null
                  }
                  <button className={`${styles.actionBtn} ${styles.actionRed}`} onClick={() => deleteCampaign(c.id)}><Trash2 size={13} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'calendar' && (
        <div className={styles.calendarGrid}>
          {festivalsCalendar.map(f => {
            const camp = campaigns.find(c => c.festivalKey === f.key)
            return (
              <div key={f.key} className={styles.calCard} style={{ borderColor: f.color + '50' }}>
                <div className={styles.calEmoji} style={{ background: f.bgColor }}>{f.emoji}</div>
                <div className={styles.calName}>{f.name}</div>
                <div className={styles.calDate}>{f.date}</div>
                <span className={styles.calType} style={{ background: f.bgColor, color: f.color }}>{f.type}</span>
                {camp
                  ? <div className={styles.calCampLinked}><CheckCircle size={11} /> {camp.name} <StatusBadge status={camp.status} /></div>
                  : <button className={styles.calAddBtn} onClick={() => { setForm({ ...EMPTY_FORM, festivalKey: f.key }); setEditId(null); setShowModal(true) }}>
                      <Plus size={11} /> Add Campaign
                    </button>
                }
              </div>
            )
          })}
        </div>
      )}

      {/* ── CREATE / EDIT MODAL ── */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>{editId ? 'Edit Campaign' : 'Create Festive Campaign'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            <div className={styles.modalBody}>
              {/* Campaign name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Campaign Name <span className={styles.req}>*</span></label>
                <input
                  className={styles.formInput}
                  placeholder="e.g. Diwali Dhamaka 2026"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              {/* Festival picker */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Festival <span className={styles.req}>*</span></label>
                <FestivalPicker value={form.festivalKey} onChange={v => setForm(f => ({ ...f, festivalKey: v }))} />
              </div>

              {/* Offer Type */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Offer Type <span className={styles.req}>*</span></label>
                <div className={styles.offerTypeGrid}>
                  {offerTypes.map(ot => (
                    <button
                      key={ot.id} type="button"
                      className={`${styles.offerTypeCard} ${form.offerType === ot.id ? styles.offerTypeActive : ''}`}
                      onClick={() => setForm(f => ({ ...f, offerType: ot.id }))}
                    >
                      <span className={styles.otEmoji}>{ot.icon}</span>
                      <span className={styles.otLabel}>{ot.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount value + detail */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Offer Value / Headline</label>
                  <input
                    className={styles.formInput}
                    placeholder="e.g. 100% OFF or ₹2,000 Cashback"
                    value={form.discountValue}
                    onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Offer Detail Description</label>
                  <input
                    className={styles.formInput}
                    placeholder="e.g. Free listing for 30 days this Diwali"
                    value={form.discountDetail}
                    onChange={e => setForm(f => ({ ...f, discountDetail: e.target.value }))}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Start Date <span className={styles.req}>*</span></label>
                  <input type="date" className={styles.formInput}
                    value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>End Date <span className={styles.req}>*</span></label>
                  <input type="date" className={styles.formInput}
                    value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>

              {/* Target Audience */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Target Audience</label>
                <div className={styles.selectRow}>
                  {AUDIENCE.map(a => (
                    <button key={a} type="button"
                      className={`${styles.selChip} ${form.targetAudience === a ? styles.selChipActive : ''}`}
                      onClick={() => setForm(f => ({ ...f, targetAudience: a }))}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Applicable Property Types</label>
                <MultiSelect options={PROP_TYPES} value={form.propertyTypes}
                  onChange={v => setForm(f => ({ ...f, propertyTypes: v }))} />
              </div>

              {/* Cities */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Target Cities</label>
                <MultiSelect options={CITIES} value={form.cities}
                  onChange={v => setForm(f => ({ ...f, cities: v }))} />
              </div>

              {/* Status */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Initial Status</label>
                <div className={styles.selectRow}>
                  {['draft', 'scheduled', 'active'].map(s => (
                    <button key={s} type="button"
                      className={`${styles.selChip} ${form.status === s ? styles.selChipActive : ''}`}
                      onClick={() => setForm(f => ({ ...f, status: s }))}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={saveCampaign} disabled={!form.name || !form.festivalKey || !form.offerType}>
                {editId ? <><RefreshCw size={14} /> Update Campaign</> : <><Plus size={14} /> Create Campaign</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
