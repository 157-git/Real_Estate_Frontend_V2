// ─── Admin Profile ─────────────────────────────────────────────
export const adminProfile = {
  name: 'Anita Kulkarni',
  role: 'Super Admin',
  email: 'anita@propconnect.in',
  avatar: null,
}

// ─── Platform KPIs ─────────────────────────────────────────────
export const platformKPIs = {
  totalListings: 4820,
  activeListings: 3214,
  totalUsers: 18740,
  newUsersThisMonth: 642,
  totalAgents: 318,
  pendingVerifications: 27,
  tokenTransactionsThisMonth: 184,
  revenueThisMonth: 2840000,
  revenueLastMonth: 2210000,
}

// ─── Festivals Calendar ─────────────────────────────────────────
export const festivalsCalendar = [
  { id: 'f1',  key: 'diwali',          name: 'Diwali',                  date: '2026-10-20', type: 'national',      emoji: '🪔', color: '#E8900A', bgColor: '#FEF3DC' },
  { id: 'f2',  key: 'gudhi_padwa',     name: 'Gudhi Padwa',             date: '2026-03-19', type: 'maharashtrian', emoji: '🪅', color: '#C0392B', bgColor: '#FDECEA' },
  { id: 'f3',  key: 'makar_sankranti', name: 'Makar Sankranti',         date: '2026-01-14', type: 'national',      emoji: '🪁', color: '#2E6B3E', bgColor: '#EAF4ED' },
  { id: 'f4',  key: 'ganesh_chaturthi',name: 'Ganesh Chaturthi',        date: '2026-08-19', type: 'maharashtrian', emoji: '🐘', color: '#D4880A', bgColor: '#FEF3D0' },
  { id: 'f5',  key: 'holi',            name: 'Holi',                    date: '2026-03-13', type: 'national',      emoji: '🎨', color: '#8E2D8E', bgColor: '#F5E6F5' },
  { id: 'f6',  key: 'christmas',       name: 'Christmas',               date: '2026-12-25', type: 'national',      emoji: '🎄', color: '#2E6B3E', bgColor: '#EAF4ED' },
  { id: 'f7',  key: 'independence_day',name: 'Independence Day',        date: '2026-08-15', type: 'national',      emoji: '🇮🇳', color: '#E8900A', bgColor: '#FEF3DC' },
  { id: 'f8',  key: 'republic_day',    name: 'Republic Day',            date: '2026-01-26', type: 'national',      emoji: '🎖️', color: '#1A6DB5', bgColor: '#E3EEF8' },
  { id: 'f9',  key: 'akshay_tritiya',  name: 'Akshay Tritiya',          date: '2026-04-28', type: 'auspicious',    emoji: '✨', color: '#C47408', bgColor: '#FEF3DC' },
  { id: 'f10', key: 'dussehra',        name: 'Dussehra',                date: '2026-10-02', type: 'national',      emoji: '🏹', color: '#C0392B', bgColor: '#FDECEA' },
  { id: 'f11', key: 'navratri',        name: 'Navratri',                date: '2026-09-22', type: 'national',      emoji: '🌺', color: '#8E2D8E', bgColor: '#F5E6F5' },
  { id: 'f12', key: 'gudi_padwa',      name: 'Gudi Padwa (Alt)',        date: '2026-03-29', type: 'maharashtrian', emoji: '🪮', color: '#C0392B', bgColor: '#FDECEA' },
]

// ─── Offer Types ───────────────────────────────────────────────
export const offerTypes = [
  { id: 'platform_fee',    label: 'Platform Fee Discount',       icon: '🏷️',  description: 'Discount or waiver on seller listing fees' },
  { id: 'zero_brokerage',  label: 'Zero Brokerage',              icon: '🤝',  description: 'Waive agent commission on transactions' },
  { id: 'token_offer',     label: 'Token / Booking Offer',       icon: '🔖',  description: 'Reduced token amount or extended validity' },
  { id: 'stamp_duty',      label: 'Stamp Duty Highlight',        icon: '📜',  description: 'Inform users of government stamp duty reductions' },
  { id: 'cashback',        label: 'Cashback Offer',              icon: '💸',  description: 'Cashback on first booking or listing' },
  { id: 'partner_service', label: 'Partner & Service Discount',  icon: '🤲',  description: 'Discounts on home loans, legal, interior etc.' },
  { id: 'referral_bonus',  label: 'Referral Bonus',              icon: '🎁',  description: 'Enhanced referral rewards during festival' },
]

// ─── Active Campaigns ──────────────────────────────────────────
export const festiveCampaigns = [
  {
    id: 'c1',
    name: 'Diwali Dhamaka 2026',
    festivalKey: 'diwali',
    festivalName: 'Diwali',
    emoji: '🪔',
    offerType: 'platform_fee',
    offerTypeName: 'Platform Fee Discount',
    discountValue: '100% OFF',
    discountDetail: 'Free listing for 30 days',
    targetAudience: 'Sellers',
    propertyTypes: ['All'],
    cities: ['Pan India'],
    startDate: '2026-10-15',
    endDate: '2026-10-25',
    status: 'completed',
    impressions: 84200,
    clicks: 12300,
    conversions: 842,
    color: '#E8900A',
    bgColor: '#FEF3DC',
  },
  {
    id: 'c2',
    name: 'Makar Sankranti Deal',
    festivalKey: 'makar_sankranti',
    festivalName: 'Makar Sankranti',
    emoji: '🪁',
    offerType: 'token_offer',
    offerTypeName: 'Token / Booking Offer',
    discountValue: '₹1,001',
    discountDetail: 'Book any property at just ₹1,001 token',
    targetAudience: 'Buyers',
    propertyTypes: ['Residential'],
    cities: ['Pune', 'Mumbai', 'Nashik'],
    startDate: '2026-01-12',
    endDate: '2026-01-16',
    status: 'active',
    impressions: 28400,
    clicks: 4100,
    conversions: 198,
    color: '#2E6B3E',
    bgColor: '#EAF4ED',
  },
  {
    id: 'c3',
    name: 'Gudhi Padwa Property Fair',
    festivalKey: 'gudhi_padwa',
    festivalName: 'Gudhi Padwa',
    emoji: '🪅',
    offerType: 'zero_brokerage',
    offerTypeName: 'Zero Brokerage',
    discountValue: '0% Brokerage',
    discountDetail: 'Zero brokerage on all transactions',
    targetAudience: 'All',
    propertyTypes: ['All'],
    cities: ['Pune', 'Mumbai', 'Aurangabad', 'Nagpur'],
    startDate: '2026-03-27',
    endDate: '2026-03-31',
    status: 'scheduled',
    impressions: 0,
    clicks: 0,
    conversions: 0,
    color: '#C0392B',
    bgColor: '#FDECEA',
  },
  {
    id: 'c4',
    name: 'Republic Day Cashback',
    festivalKey: 'republic_day',
    festivalName: 'Republic Day',
    emoji: '🎖️',
    offerType: 'cashback',
    offerTypeName: 'Cashback Offer',
    discountValue: '₹2,000',
    discountDetail: 'Cashback on first property booking',
    targetAudience: 'Buyers',
    propertyTypes: ['Residential'],
    cities: ['Pan India'],
    startDate: '2026-01-24',
    endDate: '2026-01-28',
    status: 'draft',
    impressions: 0,
    clicks: 0,
    conversions: 0,
    color: '#1A6DB5',
    bgColor: '#E3EEF8',
  },
]

// ─── Recent User Registrations ─────────────────────────────────
export const recentUsers = [
  { id: 'u1', name: 'Neha Joshi',     type: 'Buyer',  city: 'Pune',    date: '2026-03-04', status: 'verified' },
  { id: 'u2', name: 'Vikas Pawar',    type: 'Seller', city: 'Mumbai',  date: '2026-03-04', status: 'pending' },
  { id: 'u3', name: 'Sunita Patil',   type: 'Agent',  city: 'Nagpur',  date: '2026-03-03', status: 'verified' },
  { id: 'u4', name: 'Ravi Chandra',   type: 'NRI',    city: 'Dubai',   date: '2026-03-03', status: 'pending' },
  { id: 'u5', name: 'Deepa Sharma',   type: 'Buyer',  city: 'Nashik',  date: '2026-03-02', status: 'verified' },
]

// ─── Pending Listings ──────────────────────────────────────────
export const pendingListings = [
  { id: 'l1', property: '3 BHK, Koregaon Park', owner: 'Mahesh Kulkarni', type: 'Sell', price: '₹1.4 Cr', submitted: '2026-03-03' },
  { id: 'l2', property: 'Shop, FC Road',          owner: 'Priti Deshpande', type: 'Rent', price: '₹45k/mo',  submitted: '2026-03-03' },
  { id: 'l3', property: '2 BHK, Baner',           owner: 'Sanjay More',     type: 'Sell', price: '₹78 L',    submitted: '2026-03-02' },
  { id: 'l4', property: 'Warehouse, Chakan',      owner: 'Logistics Ltd.',  type: 'Rent', price: '₹1.2L/mo', submitted: '2026-03-02' },
]
