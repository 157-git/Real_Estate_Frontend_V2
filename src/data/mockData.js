// ─── Agent Profile ────────────────────────────────────────────
export const agentProfile = {
  name: 'Rajesh Mehta',
  agency: 'Mehta Realty Associates',
  rera: 'A51900012345',
  reraExpiry: '2026-03-15',
  phone: '9876543210',
  email: 'rajesh@mehtarealty.in',
  city: 'Mumbai',
  areas: ['Bandra West', 'Andheri', 'Juhu', 'Versova', 'Lokhandwala'],
  experience: '8 years',
  rating: 4.7,
  reviews: 62,
  verified: true,
  joinedDate: 'Jan 2020',
  avatar: null,
}

// ─── KPI Summary ──────────────────────────────────────────────
export const kpiData = {
  activeListings: 24,
  openLeads: 18,
  siteVisitsThisMonth: 11,
  closedDealsThisMonth: 3,
  commissionMTD: 187500,
  commissionYTD: 1240000,
  tokenReceived: 4,
  dealsInPipeline: 9,
}

// ─── Deal Pipeline ────────────────────────────────────────────
export const pipelineDeals = [
  { id: 'D001', property: '3 BHK, Bandra West', client: 'Suresh Iyer', stage: 'Site Visit Scheduled', stageIdx: 1, amount: 8500000, date: '2024-01-14', type: 'Buy' },
  { id: 'D002', property: '2 BHK, Andheri East', client: 'Priya Sharma', stage: 'Negotiation', stageIdx: 2, amount: 5200000, date: '2024-01-12', type: 'Buy' },
  { id: 'D003', property: 'Shop, Lokhandwala', client: 'Amit Gupta', stage: 'Token Received', stageIdx: 3, amount: 3800000, date: '2024-01-10', type: 'Buy' },
  { id: 'D004', property: '1 BHK, Juhu', client: 'Meera Nair', stage: 'Agreement Signed', stageIdx: 4, amount: 28000, date: '2024-01-08', type: 'Rent' },
  { id: 'D005', property: '4 BHK Villa, Juhu', client: 'Ravi Kapoor', stage: 'Inquiry Received', stageIdx: 0, amount: 15000000, date: '2024-01-15', type: 'Buy' },
  { id: 'D006', property: 'Office Space, BKC', client: 'TechStart Pvt Ltd', stage: 'Negotiation', stageIdx: 2, amount: 120000, date: '2024-01-11', type: 'Rent' },
  { id: 'D007', property: '2 BHK, Versova', client: 'Sneha Desai', stage: 'Site Visit Scheduled', stageIdx: 1, amount: 4600000, date: '2024-01-13', type: 'Buy' },
  { id: 'D008', property: 'Godown, Andheri', client: 'Logistics Co.', stage: 'Token Received', stageIdx: 3, amount: 85000, date: '2024-01-09', type: 'Rent' },
]

export const pipelineStages = [
  { label: 'Inquiry', color: '#6B7280', bg: '#F3F4F6' },
  { label: 'Site Visit', color: '#2E75B6', bg: '#DEEAF1' },
  { label: 'Negotiation', color: '#D4880A', bg: '#FEF3D0' },
  { label: 'Token', color: '#7030A0', bg: '#EAD9F5' },
  { label: 'Agreement', color: '#2E7D52', bg: '#D8F0E4' },
  { label: 'Closed', color: '#1A2B4A', bg: '#E8EDF5' },
]

// ─── Leads ────────────────────────────────────────────────────
export const leads = [
  { id: 'L001', name: 'Arjun Malhotra', phone: '9823456789', email: 'arjun.m@gmail.com', interest: '2 BHK in Bandra', budget: '₹60–80L', source: 'Platform', status: 'New', time: '2 hrs ago', type: 'Buy' },
  { id: 'L002', name: 'Kavita Rao',     phone: '9712345678', email: 'kavita.rao@outlook.com', interest: '3 BHK, Andheri West', budget: '₹90–1.1Cr', source: 'Referral', status: 'Contacted', time: '5 hrs ago', type: 'Buy' },
  { id: 'L003', name: 'Farhan Sheikh',  phone: '9634567890', email: 'farhan.s@yahoo.com', interest: 'Shop near Lokhandwala', budget: '₹35–45L', source: 'Platform', status: 'Site Visit', time: 'Yesterday', type: 'Buy' },
  { id: 'L004', name: 'Deepika Joshi',  phone: '9545678901', email: 'deepika.j@gmail.com', interest: '1 BHK Rent, Versova', budget: '₹20–25k/mo', source: 'Platform', status: 'New', time: '1 day ago', type: 'Rent' },
  { id: 'L005', name: 'Ramesh Nair',    phone: '9456789012', email: 'ramesh.n@gmail.com', interest: 'Villa, Juhu', budget: '₹3–4 Cr', source: 'Direct', status: 'Negotiation', time: '2 days ago', type: 'Buy' },
  { id: 'L006', name: 'Pooja Bhat',     phone: '9367890123', email: 'pooja.bhat@gmail.com', interest: '2 BHK Rent, Juhu', budget: '₹45–55k/mo', source: 'Platform', status: 'Contacted', time: '3 days ago', type: 'Rent' },
  { id: 'L007', name: 'Vikram Tiwari',  phone: '9278901234', email: 'vikram.t@company.in', interest: 'Office Space, BKC', budget: '₹1–1.5L/mo', source: 'Referral', status: 'Closed', time: '4 days ago', type: 'Rent' },
  { id: 'L008', name: 'Anita Kulkarni', phone: '9189012345', email: 'anita.k@gmail.com', interest: '3 BHK Resale, Bandra', budget: '₹1.2–1.5 Cr', source: 'Platform', status: 'New', time: '5 hrs ago', type: 'Buy' },
]

// ─── Listings ─────────────────────────────────────────────────
export const listings = [
  { id: 'P001', title: '3 BHK Spacious Flat', area: 'Bandra West, Mumbai', type: 'Apartment', txn: 'Sale', price: '₹1.85 Cr', sqft: 1450, status: 'Active', leads: 7, views: 142, postedDays: 8, facing: 'East', parking: true, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70' },
  { id: 'P002', title: '2 BHK Modern Flat',   area: 'Andheri East, Mumbai', type: 'Apartment', txn: 'Sale', price: '₹92 L', sqft: 1080, status: 'Active', leads: 4, views: 89, postedDays: 12, facing: 'West', parking: true, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=70' },
  { id: 'P003', title: 'Commercial Shop',     area: 'Lokhandwala, Mumbai', type: 'Shop', txn: 'Sale', price: '₹42 L', sqft: 320, status: 'On Hold', leads: 2, views: 54, postedDays: 22, facing: 'North', parking: false, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70' },
  { id: 'P004', title: '1 BHK for Rent',      area: 'Juhu, Mumbai', type: 'Apartment', txn: 'Rent', price: '₹28k/mo', sqft: 650, status: 'Active', leads: 9, views: 210, postedDays: 4, facing: 'East', parking: false, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70' },
  { id: 'P005', title: 'Villa with Garden',   area: 'Juhu, Mumbai', type: 'Villa', txn: 'Sale', price: '₹3.8 Cr', sqft: 3200, status: 'Active', leads: 3, views: 67, postedDays: 18, facing: 'South', parking: true, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=70' },
  { id: 'P006', title: 'Office Space BKC',    area: 'BKC, Mumbai', type: 'Office', txn: 'Rent', price: '₹1.1L/mo', sqft: 1800, status: 'Token Received', leads: 1, views: 38, postedDays: 30, facing: 'West', parking: true, img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=70' },
  { id: 'P007', title: '4 BHK Penthouse',     area: 'Versova, Mumbai', type: 'Apartment', txn: 'Sale', price: '₹2.4 Cr', sqft: 2100, status: 'Active', leads: 5, views: 98, postedDays: 6, facing: 'North', parking: true, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=70' },
  { id: 'P008', title: 'Godown / Warehouse',  area: 'Andheri, Mumbai', type: 'Godown', txn: 'Rent', price: '₹85k/mo', sqft: 5000, status: 'Deactivated', leads: 0, views: 12, postedDays: 45, facing: '-', parking: true, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=70' },
]

// ─── Site Visits ──────────────────────────────────────────────
export const siteVisits = [
  { id: 'V001', date: '2024-01-16', time: '10:30 AM', client: 'Arjun Malhotra', property: '3 BHK, Bandra West', status: 'Scheduled', phone: '9823456789' },
  { id: 'V002', date: '2024-01-16', time: '3:00 PM',  client: 'Sneha Desai',    property: '2 BHK, Versova',    status: 'Scheduled', phone: '9545678912' },
  { id: 'V003', date: '2024-01-17', time: '11:00 AM', client: 'Farhan Sheikh',  property: 'Shop, Lokhandwala', status: 'Scheduled', phone: '9634567890' },
  { id: 'V004', date: '2024-01-17', time: '4:30 PM',  client: 'Meera Nair',     property: '1 BHK, Juhu',       status: 'Scheduled', phone: '9712344567' },
  { id: 'V005', date: '2024-01-13', time: '2:00 PM',  client: 'Kavita Rao',     property: '3 BHK, Andheri',    status: 'Completed', phone: '9712345678' },
  { id: 'V006', date: '2024-01-12', time: '11:30 AM', client: 'Ramesh Nair',    property: 'Villa, Juhu',        status: 'Completed', phone: '9456789012' },
  { id: 'V007', date: '2024-01-11', time: '5:00 PM',  client: 'Pooja Bhat',     property: '2 BHK, Juhu Rent',  status: 'Cancelled', phone: '9367890123' },
  { id: 'V008', date: '2024-01-18', time: '10:00 AM', client: 'Anita Kulkarni', property: '3 BHK Resale, Bandra', status: 'Scheduled', phone: '9189012345' },
]

// ─── Messages ─────────────────────────────────────────────────
export const conversations = [
  {
    id: 'C001', name: 'Arjun Malhotra', role: 'Buyer', property: '3 BHK, Bandra West',
    lastMsg: 'Can we schedule a visit this weekend?', time: '10:42 AM', unread: 2,
    messages: [
      { from: 'them', text: 'Hello, I saw your listing for the 3 BHK in Bandra.', time: '10:20 AM' },
      { from: 'them', text: 'Is the price negotiable? We are looking for something around 1.7 Cr.', time: '10:21 AM' },
      { from: 'me',   text: 'Hi Arjun! Yes, the owner is open to slight negotiation. We can discuss when we meet.', time: '10:35 AM' },
      { from: 'them', text: 'Great! Can we schedule a visit this weekend?', time: '10:42 AM' },
    ]
  },
  {
    id: 'C002', name: 'Priya Sharma', role: 'Buyer', property: '2 BHK, Andheri East',
    lastMsg: 'What is the society maintenance charge?', time: '9:15 AM', unread: 1,
    messages: [
      { from: 'them', text: 'What is the society maintenance charge?', time: '9:15 AM' },
    ]
  },
  {
    id: 'C003', name: 'TechStart Pvt Ltd', role: 'Tenant', property: 'Office, BKC',
    lastMsg: 'We are okay with the 11-month agreement.', time: 'Yesterday', unread: 0,
    messages: [
      { from: 'me',   text: 'Have you reviewed the draft agreement?', time: 'Yesterday 4:00 PM' },
      { from: 'them', text: 'We are okay with the 11-month agreement.', time: 'Yesterday 5:30 PM' },
    ]
  },
  {
    id: 'C004', name: 'Ramesh Nair', role: 'Buyer', property: 'Villa, Juhu',
    lastMsg: 'Sending you the pre-approval letter shortly.', time: 'Mon', unread: 0,
    messages: [
      { from: 'them', text: 'Sending you the pre-approval letter shortly.', time: 'Mon 11:00 AM' },
    ]
  },
  {
    id: 'C005', name: 'Suresh Iyer', role: 'Seller', property: '3 BHK, Bandra West',
    lastMsg: 'Property is available for visit on Sunday.', time: 'Sun', unread: 0,
    messages: [
      { from: 'them', text: 'Property is available for visit on Sunday.', time: 'Sun 3:00 PM' },
    ]
  },
]

// ─── Commission ───────────────────────────────────────────────
export const commissionData = {
  mtd: 187500,
  ytd: 1240000,
  pending: 95000,
  deals: [
    { id: 'C001', property: 'Office, BKC',       client: 'TechStart Pvt Ltd', amount: 132000,  status: 'Received', date: 'Jan 10', pct: '1%' },
    { id: 'C002', property: '2 BHK, Andheri',    client: 'Priya Sharma',      amount: 55500,   status: 'Received', date: 'Jan 05', pct: '1%' },
    { id: 'C003', property: '3 BHK, Bandra',     client: 'Suresh Iyer',       amount: 185000,  status: 'Pending',  date: 'Jan 14', pct: '1%' },
    { id: 'C004', property: 'Shop, Lokhandwala', client: 'Amit Gupta',         amount: 38000,   status: 'Pending',  date: 'Jan 11', pct: '1%' },
    { id: 'C005', property: 'Villa, Juhu',        client: 'Ramesh Nair',       amount: 380000,  status: 'Expected', date: 'TBD',    pct: '1%' },
    { id: 'C006', property: '1 BHK, Juhu Rent',  client: 'Meera Nair',        amount: 28000,   status: 'Received', date: 'Dec 28', pct: '1 mo' },
  ]
}
