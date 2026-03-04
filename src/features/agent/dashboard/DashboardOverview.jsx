import { useState } from 'react'
import { Link } from "react-router-dom"
import {
  TrendingUp, Users, Calendar, Building2,
  IndianRupee, ArrowUpRight, Clock, Phone,
  ChevronRight, MapPin, Eye, Zap
} from 'lucide-react'
import {
  kpiData, pipelineDeals, pipelineStages,
  leads, listings, siteVisits, agentProfile
} from '../../../data/mockData.js'
import styles from './DashboardOverview.module.css'

const fmt = (n) => n >= 100000
  ? `₹${(n / 100000).toFixed(1)}L`
  : `₹${n.toLocaleString('en-IN')}`

const leadStatusColor = {
  'New':         { bg: '#DEEAF1', color: '#2E75B6' },
  'Contacted':   { bg: '#FEF3D0', color: '#D4880A' },
  'Site Visit':  { bg: '#EAD9F5', color: '#7030A0' },
  'Negotiation': { bg: '#FCE4D6', color: '#C55A11' },
  'Closed':      { bg: '#D8F0E4', color: '#2E7D52' },
}

export default function DashboardOverview() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
  const todayVisits = siteVisits.filter(v => v.status === 'Scheduled').slice(0, 3)
  const recentLeads = leads.filter(l => l.status !== 'Closed').slice(0, 5)

  return (
    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.greeting}>Good morning, {agentProfile.name.split(' ')[0]} 👋</h2>
          <p className={styles.date}>{today}</p>
        </div>
        <Link to="/agent/dashboard/listings/add" className={`btn btn-primary btn-sm ${styles.addBtn}`}>
          <Building2 size={15} /> Add New Listing
        </Link>
      </div>

      {/* ── KPI Strip ── */}
      <div className={styles.kpiStrip}>
        {[
          { label: 'Active Listings',    value: kpiData.activeListings, icon: Building2,    color: 'blue',   delta: '+3 this month' },
          { label: 'Open Leads',         value: kpiData.openLeads,      icon: Users,         color: 'orange', delta: '+5 this week' },
          { label: 'Visits Scheduled',   value: kpiData.siteVisitsThisMonth, icon: Calendar, color: 'purple', delta: 'This month' },
          { label: 'Commission MTD',     value: fmt(kpiData.commissionMTD), icon: IndianRupee, color: 'green', delta: '+18% vs last mo' },
        ].map(k => (
          <div key={k.label} className={`${styles.kpiCard} ${styles['kpi_' + k.color]}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiLabel}>{k.label}</span>
              <span className={styles.kpiIcon}><k.icon size={16} /></span>
            </div>
            <div className={styles.kpiValue}>{k.value}</div>
            <div className={styles.kpiDelta}>
              <TrendingUp size={11} /> {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 1: Pipeline + Today's Visits ── */}
      <div className={styles.row2}>

        {/* Deal Pipeline */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h3><Zap size={16} /> Deal Pipeline</h3>
            <Link to="/agent/dashboard/leads" className={styles.viewAll}>
              View all <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Stage counters */}
          <div className={styles.stageBar}>
            {pipelineStages.map(s => {
              const count = pipelineDeals.filter(d => d.stage.startsWith(s.label.replace('Site ', 'Site '))).length
              const total = pipelineDeals.length
              return (
                <div key={s.label} className={styles.stageSegment}
                  style={{ flex: Math.max(count, 0.5), background: s.bg }}>
                  <span style={{ color: s.color }}>{count || 0}</span>
                  <small style={{ color: s.color }}>{s.label}</small>
                </div>
              )
            })}
          </div>

          {/* Deal rows */}
          <div className={styles.dealList}>
            {pipelineDeals.slice(0, 6).map(deal => {
              const stage = pipelineStages.find(s =>
                deal.stage.toLowerCase().includes(s.label.toLowerCase())
              ) || pipelineStages[0]
              return (
                <div key={deal.id} className={styles.dealRow}>
                  <div className={styles.dealLeft}>
                    <div className={styles.dealProp}>{deal.property}</div>
                    <div className={styles.dealClient}>
                      <Users size={10} /> {deal.client}
                    </div>
                  </div>
                  <div className={styles.dealRight}>
                    <span className={styles.dealStage}
                      style={{ background: stage.bg, color: stage.color }}>
                      {deal.stage}
                    </span>
                    <span className={styles.dealAmt}>
                      {deal.type === 'Rent'
                        ? `₹${(deal.amount/1000).toFixed(0)}k/mo`
                        : fmt(deal.amount)
                      }
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's Visits + Commission snapshot */}
        <div className={styles.col2}>

          {/* Today's Visits */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3><Calendar size={16} /> Today's Visits</h3>
              <Link to="/agent/dashboard/visits" className={styles.viewAll}>
                Schedule <ArrowUpRight size={13} />
              </Link>
            </div>
            {todayVisits.length === 0 ? (
              <p className={styles.emptyNote}>No visits scheduled today</p>
            ) : (
              <div className={styles.visitList}>
                {todayVisits.map(v => (
                  <div key={v.id} className={styles.visitRow}>
                    <div className={styles.visitTime}>
                      <Clock size={12} />
                      {v.time}
                    </div>
                    <div className={styles.visitBody}>
                      <div className={styles.visitClient}>{v.client}</div>
                      <div className={styles.visitProp}>
                        <MapPin size={10} /> {v.property}
                      </div>
                    </div>
                    <a href={`tel:${v.phone}`} className={styles.callBtn}>
                      <Phone size={14} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commission Snapshot */}
          <div className={`${styles.panel} ${styles.commPanel}`}>
            <div className={styles.panelHead}>
              <h3><IndianRupee size={16} /> Commission</h3>
            </div>
            <div className={styles.commGrid}>
              <div className={styles.commStat}>
                <span className={styles.commAmt}>{fmt(kpiData.commissionMTD)}</span>
                <span className={styles.commLabel}>Received MTD</span>
              </div>
              <div className={styles.commStat}>
                <span className={styles.commAmt} style={{ color: 'var(--warning)' }}>
                  {fmt(95000)}
                </span>
                <span className={styles.commLabel}>Pending</span>
              </div>
              <div className={styles.commStat}>
                <span className={styles.commAmt} style={{ color: 'var(--ink)' }}>
                  {fmt(kpiData.commissionYTD)}
                </span>
                <span className={styles.commLabel}>YTD Total</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Row 2: Recent Leads + Active Listings ── */}
      <div className={styles.row2b}>

        {/* Recent Leads */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h3><Users size={16} /> Recent Leads</h3>
            <Link to="/agent/dashboard/leads" className={styles.viewAll}>
              All leads <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className={styles.leadsTable}>
            <div className={styles.tableHead}>
              <span>Client</span>
              <span>Interest</span>
              <span>Budget</span>
              <span>Status</span>
              <span>Time</span>
            </div>
            {recentLeads.map(l => {
              const s = leadStatusColor[l.status] || { bg: '#F3F4F6', color: '#6B7280' }
              return (
                <div key={l.id} className={styles.tableRow}>
                  <div className={styles.leadName}>
                    <div className={styles.leadInitial}>{l.name[0]}</div>
                    <div>
                      <div className={styles.leadNameText}>{l.name}</div>
                      <div className={styles.leadPhone}>{l.phone}</div>
                    </div>
                  </div>
                  <span className={styles.leadInterest}>{l.interest}</span>
                  <span className={styles.leadBudget}>{l.budget}</span>
                  <span className={styles.leadStatus} style={{ background: s.bg, color: s.color }}>
                    {l.status}
                  </span>
                  <span className={styles.leadTime}>{l.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active Listings mini */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h3><Building2 size={16} /> Active Listings</h3>
            <Link to="/agent/dashboard/listings" className={styles.viewAll}>
              Manage <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className={styles.miniListings}>
            {listings.filter(l => l.status === 'Active').slice(0, 4).map(p => (
              <div key={p.id} className={styles.miniListing}>
                <img src={p.img} alt={p.title} />
                <div className={styles.miniListingBody}>
                  <div className={styles.miniListingTitle}>{p.title}</div>
                  <div className={styles.miniListingArea}>
                    <MapPin size={10} /> {p.area}
                  </div>
                  <div className={styles.miniListingFoot}>
                    <span className={styles.miniPrice}>{p.price}</span>
                    <span className={styles.miniViews}><Eye size={11} /> {p.views}</span>
                    <span className={styles.miniLeads}><Users size={11} /> {p.leads} leads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
