import { Routes, Route, Navigate } from 'react-router-dom'

// ── Landing ──────────────────────────────────────────────────
import LandingPage from './features/landing/LandingPage.jsx'

// ── Agent ────────────────────────────────────────────────────
import AgentLoginPage    from './features/agent/auth/AgentLogin.jsx'
import AgentRegisterPage from './features/agent/auth/AgentRegister.jsx'
import AgentDashboardLayout from './features/agent/dashboard/DashboardLayout.jsx'
import DashboardOverview from './features/agent/dashboard/DashboardOverview.jsx'
import ListingsPage      from './features/agent/dashboard/ListingsPage.jsx'
import AddListingPage    from './features/agent/dashboard/AddListingPage.jsx'
import LeadsPage         from './features/agent/dashboard/LeadsPage.jsx'
import VisitsPage        from './features/agent/dashboard/VisitsPage.jsx'
import MessagesPage      from './features/agent/dashboard/MessagesPage.jsx'
import CalculatorPage    from './features/agent/dashboard/CalculatorPage.jsx'
import FestiveOffers from './features/agent/dashboard/FestiveOffers.jsx'

// ── Buyer (placeholder) ───────────────────────────────────────
// import BuyerDashboard from './features/buyer/BuyerDashboard.jsx'

// ── Seller (placeholder) ──────────────────────────────────────
// import SellerDashboard from './features/seller/SellerDashboard.jsx'

export default function App() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/"    element={<LandingPage />} />

      {/* ── Agent Auth ── */}
      <Route path="/agent/login"    element={<AgentLoginPage />} />
      <Route path="/agent/register" element={<AgentRegisterPage />} />

      {/* ── Agent Dashboard ── */}
      <Route path="/agent/dashboard" element={<AgentDashboardLayout />}>
        <Route index                  element={<DashboardOverview />} />
        <Route path="listings"        element={<ListingsPage />} />
        <Route path="listings/add"    element={<AddListingPage />} />
        <Route path="leads"           element={<LeadsPage />} />
        <Route path="visits"          element={<VisitsPage />} />
        <Route path="messages"        element={<MessagesPage />} />
        <Route path="festive-offers"        element={<FestiveOffers />} />
        <Route path="calculator"      element={<CalculatorPage />} />
      </Route>

      {/* ── Buyer (to be built) ── */}
      {/* <Route path="/buyer/*" element={<BuyerRoutes />} /> */}

      {/* ── Seller (to be built) ── */}
      {/* <Route path="/seller/*" element={<SellerRoutes />} /> */}

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
