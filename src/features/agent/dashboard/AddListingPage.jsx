import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import {
  Home, MapPin, IndianRupee, Maximize2, Image,
  Star, Navigation, Package, CheckCircle,
  Save, Send, AlertCircle, ChevronRight, X,
  Plus, Trash2, Info, Upload, Building2
} from 'lucide-react'
import styles from './AddListingPage.module.css'

// ─── Tab config ───────────────────────────────────────────────
const TABS = [
  { id: 'basic',      label: 'Basic Info',      icon: Home,        required: true  },
  { id: 'location',   label: 'Location',         icon: MapPin,      required: true  },
  { id: 'pricing',    label: 'Pricing',           icon: IndianRupee, required: true  },
  { id: 'size',       label: 'Size & Floor',      icon: Maximize2,   required: false },
  { id: 'photos',     label: 'Photos & Media',    icon: Image,       required: false },
  { id: 'amenities',  label: 'Amenities',         icon: Star,        required: false },
  { id: 'nearby',     label: 'Nearby Places',     icon: Navigation,  required: false },
  { id: 'brand',      label: 'Brand & Materials', icon: Package,     required: false },
]

const PROPERTY_TYPES = [
  { group: 'Residential', items: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+', 'Studio Apartment', 'Penthouse', 'Villa', 'Bungalow', 'Row House', 'Duplex', 'Farmhouse'] },
  { group: 'Commercial',  items: ['Shop', 'Showroom', 'Office Space', 'Co-working Space', 'Commercial Complex'] },
  { group: 'Industrial',  items: ['Godown / Warehouse', 'Factory', 'Industrial Shed', 'Cold Storage'] },
  { group: 'Land / Plot', items: ['Residential Plot', 'Agricultural Land', 'NA Plot', 'Commercial Plot'] },
  { group: 'Institutional', items: ['School / College', 'Hospital / Clinic', 'Hostel / Hotel'] },
]

const AMENITIES_LIST = [
  { group: 'Essential',   items: ['Lift / Elevator', 'Power Backup', 'Security Guard', 'CCTV', 'Intercom / VDP', 'Fire Safety'] },
  { group: 'Lifestyle',   items: ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children Play Area', 'Jogging Track', 'Garden / Landscaping'] },
  { group: 'Utilities',   items: ['Piped Gas (PNG)', 'Solar Panels', 'Rainwater Harvesting', 'Water Softener', 'STP / Sewage Plant', 'EV Charging Point'] },
  { group: 'Parking',     items: ['Covered Parking', 'Open Parking', 'Basement Parking', 'Visitor Parking', '2-Wheeler Parking'] },
  { group: 'Connectivity',items: ['Broadband / Fiber', 'DTH / Cable', 'Vastu Compliant', 'Corner Property', 'Corner Unit'] },
]

const NEARBY_PLACES = [
  { key: 'school',    label: 'School',             icon: '🏫' },
  { key: 'college',   label: 'College / University',icon: '🎓' },
  { key: 'hospital',  label: 'Hospital / Clinic',   icon: '🏥' },
  { key: 'metro',     label: 'Metro Station',        icon: '🚇' },
  { key: 'railway',   label: 'Railway Station',      icon: '🚂' },
  { key: 'airport',   label: 'Airport',              icon: '✈️'  },
  { key: 'mall',      label: 'Mall / Market',        icon: '🛍️' },
  { key: 'bank',      label: 'Bank / ATM',           icon: '🏦' },
  { key: 'temple',    label: 'Temple / Mandir',      icon: '🛕' },
  { key: 'mosque',    label: 'Masjid',               icon: '🕌' },
  { key: 'church',    label: 'Church',               icon: '⛪' },
  { key: 'park',      label: 'Park / Garden',        icon: '🌳' },
]

const FLOORING = ['Marble', 'Vitrified Tiles', 'Ceramic Tiles', 'Wooden / Laminate', 'Granite', 'Mosaic', 'Other']
const WALLS    = ['Developer Finish', 'Fresh Paint', 'Texture / Designer', 'Bare Wall / Unfinished']
const DOORS    = ['Wooden (Teak)', 'Wooden (Flush)', 'UPVC', 'Aluminium', 'Steel']

// ─── Field helpers ────────────────────────────────────────────
function Field({ label, required, error, hint, children, half }) {
  return (
    <div className={`${styles.field} ${half ? styles.fieldHalf : ''}`}>
      <label className="form-label">
        {label}{required && <span className="required"> *</span>}
      </label>
      {children}
      {error && <span className="form-error"><AlertCircle size={12} />{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  )
}

// ─── Initial form state ───────────────────────────────────────
const INIT = {
  // Basic
  title: '', propType: '', propCategory: '', txnType: '', ownershipType: '',
  propAge: '', renovated: '', buyerHistory: '', description: '', facing: '',
  // Location
  flatNo: '', building: '', street: '', area: '', city: '', district: '',
  state: '', pincode: '', landmark: '',
  dirEn: '', dirHi: '', dirMr: '',
  // Pricing
  listPrice: '', negotiable: 'Yes', monthlyRent: '', deposit: '', advanceMonths: '',
  maintenance: '', maintenanceIncluded: 'No', agreementDuration: '',
  lockIn: '', escalation: '',
  tokenAmount: '', tokenRefund: 'Refundable', tokenValidity: '',
  reraNo: '',
  // Size
  builtUp: '', carpet: '', superBuiltUp: '', plotArea: '', plotUnit: 'sqft',
  totalFloors: '', floorNo: '', bedrooms: '', bathrooms: '', balconies: '',
  washroom: '', washroomType: '',
  // Photos (file refs + previews)
  photos: [], videos: [], floorPlan: null, virtualTourUrl: '',
  // Amenities
  amenities: [],
  parkingAvailable: '', parkingType: [], twoWheeler: '', fourWheeler: '', parkingOwnership: '',
  // Nearby
  nearby: {},
  // Brand
  flooring: '', kitchen: '', kitchenBrand: '', sanitaryBrand: '',
  chimney: '', chimneyBrand: '', doorsWindows: '', wallFinish: '',
  falseCeiling: '', securityGrill: '', acProvision: '',
}

// ─── Main Component ───────────────────────────────────────────
export default function AddListingPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('basic')
  const [form, setForm]           = useState(INIT)
  const [errors, setErrors]       = useState({})
  const [photoPreviews, setPhotoPreviews] = useState([])
  const [submitted, setSubmitted] = useState(false) // 'draft' | 'review' | false
  const [saving, setSaving]       = useState(false)
  const photoRef = useRef()

  const set  = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const setNearby = (k, v) => setForm(p => ({ ...p, nearby: { ...p.nearby, [k]: v } }))

  const toggleAmenity = (item) =>
    setForm(p => ({
      ...p,
      amenities: p.amenities.includes(item)
        ? p.amenities.filter(a => a !== item)
        : [...p.amenities, item]
    }))

  const toggleParkingType = (t) =>
    setForm(p => ({
      ...p,
      parkingType: p.parkingType.includes(t)
        ? p.parkingType.filter(x => x !== t)
        : [...p.parkingType, t]
    }))

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map(f => URL.createObjectURL(f))
    setPhotoPreviews(p => [...p, ...previews].slice(0, 30))
    setForm(p => ({ ...p, photos: [...p.photos, ...files].slice(0, 30) }))
  }

  const removePhoto = (i) => {
    setPhotoPreviews(p => p.filter((_, idx) => idx !== i))
    setForm(p => ({ ...p, photos: p.photos.filter((_, idx) => idx !== i) }))
  }

  // Basic validation on required fields
  const validateBasic = () => {
    const e = {}
    if (!form.title.trim())   e.title   = 'Listing title is required'
    if (!form.propType)        e.propType = 'Select a property type'
    if (!form.txnType)         e.txnType  = 'Select transaction type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateLocation = () => {
    const e = {}
    if (!form.area.trim())    e.area    = 'Area / locality is required'
    if (!form.city.trim())    e.city    = 'City is required'
    if (!form.state)           e.state   = 'State is required'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePricing = () => {
    const e = {}
    const isSale = form.txnType === 'Sale' || form.txnType === 'Resale'
    if (isSale && !form.listPrice) e.listPrice = 'Listed price is required'
    if (!isSale && !form.monthlyRent) e.monthlyRent = 'Monthly rent is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSaveDraft = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSubmitted('draft')
  }

  const handleSubmit = async () => {
    const basicOk    = validateBasic()
    const locationOk = validateLocation()
    const pricingOk  = validatePricing()
    if (!basicOk) { setActiveTab('basic'); return }
    if (!locationOk) { setActiveTab('location'); return }
    if (!pricingOk) { setActiveTab('pricing'); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 1600))
    setSaving(false)
    setSubmitted('review')
  }

  const isSale = form.txnType === 'Sale' || form.txnType === 'Resale'
  const isRent = form.txnType === 'Rent' || form.txnType === 'Lease'
  const completedTabs = {
    basic:     !!(form.title && form.propType && form.txnType),
    location:  !!(form.area && form.city && form.pincode),
    pricing:   !!(form.listPrice || form.monthlyRent),
    size:      !!(form.builtUp || form.carpet),
    photos:    photoPreviews.length > 0,
    amenities: form.amenities.length > 0,
    nearby:    Object.keys(form.nearby).length > 0,
    brand:     !!(form.flooring || form.kitchen),
  }

  // ─── Success Screen ───────────────────────────────────────
  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            {submitted === 'draft' ? <Save size={48} /> : <CheckCircle size={48} />}
          </div>
          <h2>{submitted === 'draft' ? 'Draft Saved!' : 'Listing Submitted for Review'}</h2>
          <p>
            {submitted === 'draft'
              ? `"${form.title || 'Your listing'}" has been saved as a draft. You can continue editing anytime from My Listings.`
              : `"${form.title || 'Your listing'}" has been submitted for review. It will go live within 24 hours after verification.`
            }
          </p>
          <div className={styles.successMeta}>
            {form.propType && <div><span>Type</span><strong>{form.propType}</strong></div>}
            {form.city     && <div><span>Location</span><strong>{form.city}{form.area ? `, ${form.area}` : ''}</strong></div>}
            {(form.listPrice || form.monthlyRent) && (
              <div><span>Price</span><strong>
                {form.listPrice ? `₹${parseFloat(form.listPrice).toLocaleString('en-IN')}` : `₹${form.monthlyRent}/mo`}
              </strong></div>
            )}
          </div>
          <div className={styles.successActions}>
            <button className="btn btn-primary" onClick={() => navigate('/agent/dashboard/listings')}>
              Go to My Listings
            </button>
            <button className="btn btn-outline" onClick={() => { setSubmitted(false); setForm(INIT); setPhotoPreviews([]); setActiveTab('basic') }}>
              Add Another Listing
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Add New Listing</h2>
          <p>Fill in the details below. Required sections marked with <span style={{color:'var(--marigold)'}}>*</span></p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-outline ${styles.draftBtn}`} onClick={handleSaveDraft} disabled={saving}>
            {saving ? <span className={styles.spinner}/> : <Save size={15}/>}
            Save Draft
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? <span className={styles.spinner}/> : <Send size={15}/>}
            Submit for Review
          </button>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className={styles.tabBar}>
        {TABS.map((tab, i) => {
          const done = completedTabs[tab.id]
          return (
            <button
              key={tab.id}
              className={`${styles.tabItem} ${activeTab === tab.id ? styles.tabActive : ''} ${done ? styles.tabDone : ''}`}
              onClick={() => { setErrors({}); setActiveTab(tab.id) }}
            >
              <span className={styles.tabIcon}>
                {done ? <CheckCircle size={14}/> : <tab.icon size={14}/>}
              </span>
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.required && !done && <span className={styles.tabReq}>*</span>}
            </button>
          )
        })}
      </div>

      {/* ── Form Body ── */}
      <div className={styles.formBody}>

        {/* ══ BASIC INFO ══ */}
        {activeTab === 'basic' && (
          <div className={styles.tabContent}>
            <Section title="Property Classification" subtitle="Tell us what kind of property this is">
              <div className={styles.row2}>
                <Field label="Transaction Type" required error={errors.txnType}>
                  <div className={styles.radioGrid}>
                    {['Sale', 'Resale', 'Rent', 'Lease'].map(t => (
                      <label key={t} className={`${styles.radioCard} ${form.txnType === t ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="txnType" value={t} checked={form.txnType === t}
                          onChange={() => set('txnType', t)} hidden/>
                        {t}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Ownership Type">
                  <select className="form-input form-select" value={form.ownershipType} onChange={e => set('ownershipType', e.target.value)}>
                    <option value="">Select</option>
                    {['Freehold','Leasehold','Co-operative Society','Government Allotted','Trust Property'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Property Type" required error={errors.propType}>
                <div className={styles.propTypeGrid}>
                  {PROPERTY_TYPES.map(g => (
                    <div key={g.group} className={styles.propGroup}>
                      <div className={styles.propGroupLabel}>{g.group}</div>
                      <div className={styles.propGroupItems}>
                        {g.items.map(item => (
                          <button key={item} type="button"
                            className={`${styles.propChip} ${form.propType === item ? styles.propChipActive : ''}`}
                            onClick={() => set('propType', item)}>{item}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Field>
            </Section>

            <Section title="Listing Details">
              <Field label="Listing Title" required error={errors.title}
                hint="E.g. '3 BHK Spacious Flat with Garden View in Bandra West'">
                <input className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="Write a descriptive title for your listing"
                  value={form.title} onChange={e => set('title', e.target.value)} maxLength={120}/>
                <span className="form-hint" style={{textAlign:'right', display:'block'}}>
                  {form.title.length}/120
                </span>
              </Field>

              <Field label="Property Description"
                hint="Mention highlights, nearby landmarks, seller conditions, etc.">
                <textarea className={`form-input ${styles.textarea}`} rows={5}
                  placeholder="Describe the property in detail — construction quality, natural light, view, society, seller conditions..."
                  value={form.description} onChange={e => set('description', e.target.value)} maxLength={1500}/>
                <span className="form-hint" style={{textAlign:'right', display:'block'}}>
                  {form.description.length}/1500
                </span>
              </Field>

              <div className={styles.row3}>
                <Field label="Property Age">
                  <select className="form-input form-select" value={form.propAge} onChange={e => set('propAge', e.target.value)}>
                    <option value="">Select</option>
                    {['New / Under Construction','0–2 Years','2–5 Years','5–10 Years','10–20 Years','20+ Years'].map(a => <option key={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Renovated">
                  <select className="form-input form-select" value={form.renovated} onChange={e => set('renovated', e.target.value)}>
                    <option value="">Select</option>
                    <option>Yes — Recently</option>
                    <option>Yes — Few years ago</option>
                    <option>No</option>
                    <option>Not Applicable</option>
                  </select>
                </Field>
                <Field label="Buyer History (Resale)">
                  <select className="form-input form-select" value={form.buyerHistory} onChange={e => set('buyerHistory', e.target.value)}>
                    <option value="">Select</option>
                    {['Pre-owned (1st Owner)','2nd Buyer','3rd Buyer','4th+ Buyer'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </Field>
              </div>

              <div className={styles.row2}>
                <Field label="Facing Direction">
                  <div className={styles.radioGrid}>
                    {['East','West','North','South','North-East','North-West','South-East','South-West'].map(d => (
                      <label key={d} className={`${styles.radioCard} ${form.facing === d ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="facing" value={d} checked={form.facing === d} onChange={() => set('facing', d)} hidden/>
                        {d}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </Section>

            <div className={styles.tabNav}>
              <div/>
              <button className="btn btn-primary" onClick={() => setActiveTab('location')}>
                Next: Location <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ LOCATION ══ */}
        {activeTab === 'location' && (
          <div className={styles.tabContent}>
            <Section title="Full Address" subtitle="Exact address — visible to interested buyers/tenants only after inquiry">
              <div className={styles.row2}>
                <Field label="Flat / House / Shop No." half>
                  <input className="form-input" placeholder="e.g. A-402"
                    value={form.flatNo} onChange={e => set('flatNo', e.target.value)}/>
                </Field>
                <Field label="Building / Society / Complex Name" half>
                  <input className="form-input" placeholder="e.g. Sunrise Heights CHS"
                    value={form.building} onChange={e => set('building', e.target.value)}/>
                </Field>
              </div>
              <Field label="Street / Road Name">
                <input className="form-input" placeholder="e.g. S.V. Road, Near XYZ Signal"
                  value={form.street} onChange={e => set('street', e.target.value)}/>
              </Field>
              <div className={styles.row2}>
                <Field label="Area / Locality" required error={errors.area}>
                  <input className={`form-input ${errors.area ? 'error' : ''}`}
                    placeholder="e.g. Bandra West"
                    value={form.area} onChange={e => set('area', e.target.value)}/>
                </Field>
                <Field label="City" required error={errors.city}>
                  <input className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="e.g. Mumbai"
                    value={form.city} onChange={e => set('city', e.target.value)}/>
                </Field>
              </div>
              <div className={styles.row3}>
                <Field label="District">
                  <input className="form-input" placeholder="e.g. Mumbai Suburban"
                    value={form.district} onChange={e => set('district', e.target.value)}/>
                </Field>
                <Field label="State" required error={errors.state}>
                  <select className={`form-input form-select ${errors.state ? 'error' : ''}`}
                    value={form.state} onChange={e => set('state', e.target.value)}>
                    <option value="">Select State</option>
                    {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi NCT','Chandigarh','J&K','Ladakh','Puducherry'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode" required error={errors.pincode}>
                  <input className={`form-input ${errors.pincode ? 'error' : ''}`}
                    placeholder="6-digit pincode" maxLength={6}
                    value={form.pincode} onChange={e => set('pincode', e.target.value.replace(/\D/g,''))}/>
                </Field>
              </div>
              <Field label="Landmark" hint="Nearest well-known reference point">
                <input className="form-input" placeholder="e.g. Near Lilavati Hospital, Opp. XYZ Mall"
                  value={form.landmark} onChange={e => set('landmark', e.target.value)}/>
              </Field>
            </Section>

            <Section title="Directions (Trilingual)" subtitle="Helps buyers find the property — shown in 3 languages">
              <div className={styles.infoBox}>
                <Info size={14}/> Directions are shown to interested buyers to help with navigation. Keep it concise — mention facing direction, nearest landmark, and distance.
              </div>
              <Field label="Directions in English" hint="e.g. 'East-facing — 200m North of XYZ Metro Station, turn right at the signal'">
                <textarea className={`form-input ${styles.textareaSm}`} rows={2}
                  placeholder="English directions..." value={form.dirEn} onChange={e => set('dirEn', e.target.value)}/>
              </Field>
              <Field label="Directions in Hindi (हिंदी)">
                <textarea className={`form-input ${styles.textareaSm}`} rows={2}
                  placeholder="हिंदी में दिशा-निर्देश..." value={form.dirHi} onChange={e => set('dirHi', e.target.value)}/>
              </Field>
              <Field label="Directions in Marathi (मराठी)">
                <textarea className={`form-input ${styles.textareaSm}`} rows={2}
                  placeholder="मराठीत दिशा..." value={form.dirMr} onChange={e => set('dirMr', e.target.value)}/>
              </Field>
            </Section>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('basic')}>← Basic Info</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('pricing')}>
                Next: Pricing <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ PRICING ══ */}
        {activeTab === 'pricing' && (
          <div className={styles.tabContent}>
            {isSale && (
              <Section title="Sale / Resale Pricing">
                <div className={styles.row2}>
                  <Field label="Expected / Listed Price (₹)" required error={errors.listPrice}>
                    <div className="form-input-icon">
                      <IndianRupee size={15} className="input-icon"/>
                      <input className={`form-input ${errors.listPrice ? 'error' : ''}`}
                        type="number" placeholder="e.g. 8500000"
                        value={form.listPrice} onChange={e => set('listPrice', e.target.value)}/>
                    </div>
                    {form.listPrice && (
                      <span className="form-hint">
                        {parseFloat(form.listPrice) >= 10000000
                          ? `₹${(parseFloat(form.listPrice)/10000000).toFixed(2)} Crore`
                          : parseFloat(form.listPrice) >= 100000
                          ? `₹${(parseFloat(form.listPrice)/100000).toFixed(2)} Lakh` : ''}
                      </span>
                    )}
                  </Field>
                  <Field label="Negotiable">
                    <div className={styles.radioGrid}>
                      {['Yes','No','Partially'].map(v => (
                        <label key={v} className={`${styles.radioCard} ${form.negotiable === v ? styles.radioCardActive : ''}`}>
                          <input type="radio" name="negotiable" value={v} checked={form.negotiable === v} onChange={() => set('negotiable', v)} hidden/>{v}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>
            )}

            {isRent && (
              <Section title="Rental Pricing">
                <div className={styles.row3}>
                  <Field label="Monthly Rent (₹)" required error={errors.monthlyRent}>
                    <div className="form-input-icon">
                      <IndianRupee size={15} className="input-icon"/>
                      <input className={`form-input ${errors.monthlyRent ? 'error' : ''}`}
                        type="number" placeholder="e.g. 28000"
                        value={form.monthlyRent} onChange={e => set('monthlyRent', e.target.value)}/>
                    </div>
                  </Field>
                  <Field label="Security Deposit (₹)">
                    <div className="form-input-icon">
                      <IndianRupee size={15} className="input-icon"/>
                      <input className="form-input" type="number" placeholder="e.g. 56000"
                        value={form.deposit} onChange={e => set('deposit', e.target.value)}/>
                    </div>
                  </Field>
                  <Field label="Advance Rent (Months)">
                    <input className="form-input" type="number" placeholder="e.g. 2"
                      value={form.advanceMonths} onChange={e => set('advanceMonths', e.target.value)}/>
                  </Field>
                </div>
                <div className={styles.row3}>
                  <Field label="Agreement Duration">
                    <select className="form-input form-select" value={form.agreementDuration} onChange={e => set('agreementDuration', e.target.value)}>
                      <option value="">Select</option>
                      {['11 Months','1 Year','2 Years','3 Years','Custom'].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Lock-in Period (Months)">
                    <input className="form-input" type="number" placeholder="e.g. 6"
                      value={form.lockIn} onChange={e => set('lockIn', e.target.value)}/>
                  </Field>
                  <Field label="Annual Rent Escalation (%)">
                    <input className="form-input" type="number" placeholder="e.g. 5"
                      value={form.escalation} onChange={e => set('escalation', e.target.value)}/>
                  </Field>
                </div>
                <div className={styles.row2}>
                  <Field label="Maintenance Charges (₹/month)">
                    <input className="form-input" type="number" placeholder="e.g. 3500"
                      value={form.maintenance} onChange={e => set('maintenance', e.target.value)}/>
                  </Field>
                  <Field label="Maintenance Included in Rent?">
                    <div className={styles.radioGrid}>
                      {['Yes','No'].map(v => (
                        <label key={v} className={`${styles.radioCard} ${form.maintenanceIncluded === v ? styles.radioCardActive : ''}`}>
                          <input type="radio" name="maintenanceIncluded" value={v} checked={form.maintenanceIncluded === v} onChange={() => set('maintenanceIncluded', v)} hidden/>{v}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>
            )}

            <Section title="Token Amount">
              <div className={styles.row3}>
                <Field label="Token Amount (₹)" hint="Amount to reserve/block property">
                  <div className="form-input-icon">
                    <IndianRupee size={15} className="input-icon"/>
                    <input className="form-input" type="number" placeholder="e.g. 50000"
                      value={form.tokenAmount} onChange={e => set('tokenAmount', e.target.value)}/>
                  </div>
                </Field>
                <Field label="Token Refund Policy">
                  <div className={styles.radioGrid}>
                    {['Refundable','Non-Refundable','Partial'].map(v => (
                      <label key={v} className={`${styles.radioCard} ${form.tokenRefund === v ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="tokenRefund" value={v} checked={form.tokenRefund === v} onChange={() => set('tokenRefund', v)} hidden/>{v}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Token Validity (Days)">
                  <input className="form-input" type="number" placeholder="e.g. 7"
                    value={form.tokenValidity} onChange={e => set('tokenValidity', e.target.value)}/>
                </Field>
              </div>
            </Section>

            <Section title="RERA Details">
              <div className={styles.row2}>
                <Field label="RERA Registration Number" hint="Leave blank if not applicable / exempt">
                  <input className="form-input" placeholder="e.g. P51800012345"
                    value={form.reraNo} onChange={e => set('reraNo', e.target.value.toUpperCase())}/>
                </Field>
                <div className={styles.reraNote}>
                  <Info size={14}/>
                  <div>
                    <strong>When is RERA mandatory?</strong>
                    <p>Projects with more than 8 apartments or land area over 500 sq m require RERA registration. Check your state RERA portal for verification.</p>
                  </div>
                </div>
              </div>
            </Section>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('location')}>← Location</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('size')}>
                Next: Size & Floor <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ SIZE & FLOOR ══ */}
        {activeTab === 'size' && (
          <div className={styles.tabContent}>
            <Section title="Area Details" subtitle="Enter area in square feet (sq ft) unless specified">
              <div className={styles.row3}>
                <Field label="Built-up Area (sq ft)" hint="Total constructed area">
                  <input className="form-input" type="number" placeholder="e.g. 1450"
                    value={form.builtUp} onChange={e => set('builtUp', e.target.value)}/>
                </Field>
                <Field label="Carpet Area (sq ft)" hint="RERA carpet area — usable floor area">
                  <input className="form-input" type="number" placeholder="e.g. 1100"
                    value={form.carpet} onChange={e => set('carpet', e.target.value)}/>
                </Field>
                <Field label="Super Built-up Area (sq ft)">
                  <input className="form-input" type="number" placeholder="e.g. 1650"
                    value={form.superBuiltUp} onChange={e => set('superBuiltUp', e.target.value)}/>
                </Field>
              </div>
              {(form.propType?.includes('Plot') || form.propType?.includes('Land') || form.propType?.includes('Farm')) && (
                <div className={styles.row2}>
                  <Field label="Plot / Land Area">
                    <input className="form-input" type="number" placeholder="Area value"
                      value={form.plotArea} onChange={e => set('plotArea', e.target.value)}/>
                  </Field>
                  <Field label="Plot Area Unit">
                    <div className={styles.radioGrid}>
                      {['sqft','sqm','acres','gunta','bigha'].map(u => (
                        <label key={u} className={`${styles.radioCard} ${form.plotUnit === u ? styles.radioCardActive : ''}`}>
                          <input type="radio" name="plotUnit" value={u} checked={form.plotUnit === u} onChange={() => set('plotUnit', u)} hidden/>{u}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              )}
            </Section>

            <Section title="Configuration">
              <div className={styles.row3}>
                <Field label="Bedrooms">
                  <div className={styles.radioGrid}>
                    {['0 (Studio)','1','2','3','4','5+'].map(b => (
                      <label key={b} className={`${styles.radioCard} ${form.bedrooms === b ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="bedrooms" value={b} checked={form.bedrooms === b} onChange={() => set('bedrooms', b)} hidden/>{b}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Bathrooms">
                  <div className={styles.radioGrid}>
                    {['1','2','3','4','5+'].map(b => (
                      <label key={b} className={`${styles.radioCard} ${form.bathrooms === b ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="bathrooms" value={b} checked={form.bathrooms === b} onChange={() => set('bathrooms', b)} hidden/>{b}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Balconies">
                  <div className={styles.radioGrid}>
                    {['0','1','2','3+'].map(b => (
                      <label key={b} className={`${styles.radioCard} ${form.balconies === b ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="balconies" value={b} checked={form.balconies === b} onChange={() => set('balconies', b)} hidden/>{b}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </Section>

            <Section title="Floor Information">
              <div className={styles.row2}>
                <Field label="Total Floors in Building">
                  <input className="form-input" type="number" placeholder="e.g. 14"
                    value={form.totalFloors} onChange={e => set('totalFloors', e.target.value)}/>
                </Field>
                <Field label="Property Floor Number" hint="Ground = 0">
                  <input className="form-input" placeholder="e.g. 7 or Ground or Basement"
                    value={form.floorNo} onChange={e => set('floorNo', e.target.value)}/>
                </Field>
              </div>
            </Section>

            {(form.propType?.includes('Shop') || form.propType?.includes('Office') || form.propType?.includes('Commercial')) && (
              <Section title="Washroom (Commercial)">
                <div className={styles.row2}>
                  <Field label="Washroom Available">
                    <div className={styles.radioGrid}>
                      {['Yes','No'].map(v => (
                        <label key={v} className={`${styles.radioCard} ${form.washroom === v ? styles.radioCardActive : ''}`}>
                          <input type="radio" name="washroom" value={v} checked={form.washroom === v} onChange={() => set('washroom', v)} hidden/>{v}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.washroom === 'Yes' && (
                    <Field label="Washroom Type">
                      <div className={styles.radioGrid}>
                        {['Common (Shared)','Independent (Exclusive)'].map(v => (
                          <label key={v} className={`${styles.radioCard} ${form.washroomType === v ? styles.radioCardActive : ''}`}>
                            <input type="radio" name="washroomType" value={v} checked={form.washroomType === v} onChange={() => set('washroomType', v)} hidden/>{v}
                          </label>
                        ))}
                      </div>
                    </Field>
                  )}
                </div>
              </Section>
            )}

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('pricing')}>← Pricing</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('photos')}>
                Next: Photos <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ PHOTOS ══ */}
        {activeTab === 'photos' && (
          <div className={styles.tabContent}>
            <Section title="Property Photos" subtitle="Add at least 5 photos. More photos = more leads. Good lighting helps.">
              <div className={styles.photoUploadArea} onClick={() => photoRef.current?.click()}>
                <input ref={photoRef} type="file" multiple accept="image/*" hidden onChange={handlePhotos}/>
                <Upload size={32} color="var(--ink-muted)"/>
                <strong>Click to upload photos</strong>
                <span>JPG, PNG — max 5MB each · up to 30 photos</span>
                <button className="btn btn-outline btn-sm" type="button"
                  onClick={e => { e.stopPropagation(); photoRef.current?.click() }}>
                  <Plus size={14}/> Choose Files
                </button>
              </div>

              {photoPreviews.length > 0 && (
                <div className={styles.photoGrid}>
                  {photoPreviews.map((src, i) => (
                    <div key={i} className={styles.photoThumb}>
                      <img src={src} alt={`Photo ${i+1}`}/>
                      {i === 0 && <span className={styles.coverBadge}>Cover</span>}
                      <button className={styles.removePhoto} onClick={() => removePhoto(i)}>
                        <X size={12}/>
                      </button>
                    </div>
                  ))}
                  <div className={styles.addMorePhoto} onClick={() => photoRef.current?.click()}>
                    <Plus size={24}/>
                    <span>Add More</span>
                  </div>
                </div>
              )}
              {photoPreviews.length > 0 && (
                <p className="form-hint">{photoPreviews.length}/30 photos · First photo is the cover image</p>
              )}
            </Section>

            <Section title="Videos & Tour">
              <div className={styles.row2}>
                <Field label="Video Upload" hint="MP4, max 3 videos, 5 min each">
                  <div className={styles.fileUploadBtn} onClick={() => document.getElementById('videoUp').click()}>
                    <input id="videoUp" type="file" multiple accept="video/mp4" hidden
                      onChange={e => set('videos', Array.from(e.target.files).slice(0, 3))}/>
                    <Upload size={16}/> Choose Video Files
                    {form.videos.length > 0 && <span className={styles.fileCount}>{form.videos.length} selected</span>}
                  </div>
                </Field>
                <Field label="Floor Plan" hint="PDF or image of floor plan">
                  <div className={styles.fileUploadBtn} onClick={() => document.getElementById('fpUp').click()}>
                    <input id="fpUp" type="file" accept=".pdf,image/*" hidden
                      onChange={e => set('floorPlan', e.target.files[0])}/>
                    <Upload size={16}/> Upload Floor Plan
                    {form.floorPlan && <span className={styles.fileCount}>{form.floorPlan.name}</span>}
                  </div>
                </Field>
              </div>
              <Field label="360° Virtual Tour URL" hint="Paste link from Matterport, Google Street View, etc.">
                <input className="form-input" placeholder="https://..."
                  value={form.virtualTourUrl} onChange={e => set('virtualTourUrl', e.target.value)}/>
              </Field>
            </Section>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('size')}>← Size & Floor</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('amenities')}>
                Next: Amenities <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ AMENITIES ══ */}
        {activeTab === 'amenities' && (
          <div className={styles.tabContent}>
            <Section title="Society / Building Amenities" subtitle={`${form.amenities.length} selected`}>
              {AMENITIES_LIST.map(g => (
                <div key={g.group} className={styles.amenityGroup}>
                  <div className={styles.amenityGroupLabel}>{g.group}</div>
                  <div className={styles.amenityChips}>
                    {g.items.map(item => (
                      <button key={item} type="button"
                        className={`${styles.amenityChip} ${form.amenities.includes(item) ? styles.amenityChipOn : ''}`}
                        onClick={() => toggleAmenity(item)}>
                        {form.amenities.includes(item) && <CheckCircle size={12}/>} {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Parking Details">
              <div className={styles.row2}>
                <Field label="Parking Available">
                  <div className={styles.radioGrid}>
                    {['Yes','No'].map(v => (
                      <label key={v} className={`${styles.radioCard} ${form.parkingAvailable === v ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="parkingAvailable" value={v} checked={form.parkingAvailable === v} onChange={() => set('parkingAvailable', v)} hidden/>{v}
                      </label>
                    ))}
                  </div>
                </Field>
                {form.parkingAvailable === 'Yes' && (
                  <Field label="Parking Ownership">
                    <select className="form-input form-select" value={form.parkingOwnership} onChange={e => set('parkingOwnership', e.target.value)}>
                      <option value="">Select</option>
                      {['Allotted with Property','Common Parking','Rented Separately'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                )}
              </div>
              {form.parkingAvailable === 'Yes' && (
                <>
                  <Field label="Parking Type (select all that apply)">
                    <div className={styles.amenityChips}>
                      {['Open Parking','Covered Parking','Basement Parking','Stilt Parking','Multi-level'].map(t => (
                        <button key={t} type="button"
                          className={`${styles.amenityChip} ${form.parkingType.includes(t) ? styles.amenityChipOn : ''}`}
                          onClick={() => toggleParkingType(t)}>
                          {form.parkingType.includes(t) && <CheckCircle size={12}/>} {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <div className={styles.row2}>
                    <Field label="2-Wheeler Slots">
                      <input className="form-input" type="number" placeholder="e.g. 1"
                        value={form.twoWheeler} onChange={e => set('twoWheeler', e.target.value)}/>
                    </Field>
                    <Field label="4-Wheeler Slots">
                      <input className="form-input" type="number" placeholder="e.g. 1"
                        value={form.fourWheeler} onChange={e => set('fourWheeler', e.target.value)}/>
                    </Field>
                  </div>
                </>
              )}
            </Section>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('photos')}>← Photos</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('nearby')}>
                Next: Nearby Places <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ NEARBY ══ */}
        {activeTab === 'nearby' && (
          <div className={styles.tabContent}>
            <Section title="Distances from Key Places" subtitle="Enter approximate distance in km or minutes. Helps buyers make faster decisions.">
              <div className={styles.nearbyGrid}>
                {NEARBY_PLACES.map(p => (
                  <div key={p.key} className={styles.nearbyRow}>
                    <div className={styles.nearbyLabel}>
                      <span className={styles.nearbyEmoji}>{p.icon}</span>
                      <span>{p.label}</span>
                    </div>
                    <div className={styles.nearbyInputs}>
                      <input className="form-input" type="number" placeholder="km"
                        value={form.nearby[p.key + '_km'] || ''}
                        onChange={e => setNearby(p.key + '_km', e.target.value)}
                        style={{width: 80}}/>
                      <span className={styles.nearbyOr}>or</span>
                      <input className="form-input" type="number" placeholder="min"
                        value={form.nearby[p.key + '_min'] || ''}
                        onChange={e => setNearby(p.key + '_min', e.target.value)}
                        style={{width: 80}}/>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('amenities')}>← Amenities</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('brand')}>
                Next: Brand & Materials <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* ══ BRAND & MATERIALS ══ */}
        {activeTab === 'brand' && (
          <div className={styles.tabContent}>
            <Section title="Finishes & Materials" subtitle="Premium details that influence buyer decisions">
              <div className={styles.row3}>
                <Field label="Flooring Type">
                  <select className="form-input form-select" value={form.flooring} onChange={e => set('flooring', e.target.value)}>
                    <option value="">Select</option>
                    {FLOORING.map(f => <option key={f}>{f}</option>)}
                  </select>
                </Field>
                <Field label="Wall Finish">
                  <select className="form-input form-select" value={form.wallFinish} onChange={e => set('wallFinish', e.target.value)}>
                    <option value="">Select</option>
                    {WALLS.map(w => <option key={w}>{w}</option>)}
                  </select>
                </Field>
                <Field label="Doors & Windows">
                  <select className="form-input form-select" value={form.doorsWindows} onChange={e => set('doorsWindows', e.target.value)}>
                    <option value="">Select</option>
                    {DOORS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <div className={styles.row2}>
                <Field label="False Ceiling">
                  <div className={styles.radioGrid}>
                    {['Yes','No'].map(v => (
                      <label key={v} className={`${styles.radioCard} ${form.falseCeiling === v ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="falseCeiling" value={v} checked={form.falseCeiling === v} onChange={() => set('falseCeiling', v)} hidden/>{v}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Security Grill / Door">
                  <div className={styles.radioGrid}>
                    {['Yes','No'].map(v => (
                      <label key={v} className={`${styles.radioCard} ${form.securityGrill === v ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="securityGrill" value={v} checked={form.securityGrill === v} onChange={() => set('securityGrill', v)} hidden/>{v}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </Section>

            <Section title="Kitchen & Fittings">
              <div className={styles.row3}>
                <Field label="Kitchen Type">
                  <select className="form-input form-select" value={form.kitchen} onChange={e => set('kitchen', e.target.value)}>
                    <option value="">Select</option>
                    {['Modular Kitchen','Semi-Modular','Basic / Platform','Open Kitchen','No Kitchen'].map(k => <option key={k}>{k}</option>)}
                  </select>
                </Field>
                <Field label="Kitchen Brand" hint="e.g. Hettich, Hafele, Sleek">
                  <input className="form-input" placeholder="Brand name if modular"
                    value={form.kitchenBrand} onChange={e => set('kitchenBrand', e.target.value)}/>
                </Field>
                <Field label="AC Provision">
                  <div className={styles.radioGrid}>
                    {['Installed','Provision Only','Not Available'].map(v => (
                      <label key={v} className={`${styles.radioCard} ${form.acProvision === v ? styles.radioCardActive : ''}`}>
                        <input type="radio" name="acProvision" value={v} checked={form.acProvision === v} onChange={() => set('acProvision', v)} hidden/>{v}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
              <div className={styles.row2}>
                <Field label="Sanitary Fittings Brand" hint="e.g. Jaguar, Kohler, Parryware, Cera">
                  <input className="form-input" placeholder="Brand name"
                    value={form.sanitaryBrand} onChange={e => set('sanitaryBrand', e.target.value)}/>
                </Field>
                <Field label="Chimney / Exhaust">
                  <div className={styles.row2} style={{gap:8}}>
                    <select className="form-input form-select" value={form.chimney} onChange={e => set('chimney', e.target.value)}>
                      <option value="">Status</option>
                      {['Installed','Provision Only','Not Available'].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input className="form-input" placeholder="Brand (e.g. Faber)"
                      value={form.chimneyBrand} onChange={e => set('chimneyBrand', e.target.value)}/>
                  </div>
                </Field>
              </div>
            </Section>

            {/* Final submit strip */}
            <div className={styles.submitStrip}>
              <div className={styles.submitInfo}>
                <div className={styles.completionDots}>
                  {TABS.map(t => (
                    <span key={t.id}
                      className={`${styles.dot} ${completedTabs[t.id] ? styles.dotDone : ''}`}
                      title={t.label}/>
                  ))}
                </div>
                <span>{Object.values(completedTabs).filter(Boolean).length} of {TABS.length} sections completed</span>
              </div>
              <div className={styles.submitBtns}>
                <button className="btn btn-outline btn-lg" onClick={handleSaveDraft} disabled={saving}>
                  {saving ? <span className={styles.spinner}/> : <Save size={16}/>} Save as Draft
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={saving}>
                  {saving ? <span className={styles.spinner}/> : <Send size={16}/>} Submit for Review
                </button>
              </div>
            </div>

            <div className={styles.tabNav}>
              <button className="btn btn-outline" onClick={() => setActiveTab('nearby')}>← Nearby Places</button>
              <div/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
