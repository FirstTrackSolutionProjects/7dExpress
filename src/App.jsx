// src/App.jsx
import {Routes, Route, useLocation} from 'react-router-dom'
import Landing from './Pages/Landing'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Pricing from './Pages/Pricing'
import FAQs from './Components/FAQs'
import PrivacyPolicy from './Components/PrivacyPolicy'
import Blogs from './Pages/Blogs'
import TermsOfUse from './Components/TermsOfUse'
import SignupForm from './Pages/SignupForm'
import Tracking from './Pages/Tracking'
import Dashboard from './Pages/Dashboard'
import Verify from './Pages/Verify'
import Header from './Components/Header'
import { ToastContainer } from 'react-toastify'
import MobileBottomNavbar from './Components/MobileBottomNavbar'
import { useState } from 'react'
import WalletRechargeModal from './Components/WalletRechargeModal'

const App = () => {
  const location = useLocation()
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // State for dashboard sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // State for Wallet Recharge Modal visibility
  const [showWalletRechargeModal, setShowWalletRechargeModal] = useState(false);

  // Define public routes that should have the mobile bottom navbar
  const publicNavbarRoutes = ['/', '/about', '/track', '/blog', '/pricing', '/contact'];
  const isPublicRouteWithNavbar = publicNavbarRoutes.includes(location.pathname);

  // Determine if mobile bottom navbar should be visible (for padding calculation)
  // Dashboard routes handle their own padding internally to prevent fixed-height layout issues
  const isMobileNavbarVisible = isPublicRouteWithNavbar;
  const mobileNavbarPaddingClass = isMobileNavbarVisible ? 'pb-[80px] md:pb-0' : '';


  return (
    <>
      <ToastContainer />
      {/* Render combined Header */}
      <Header 
        isDashboard={isDashboardRoute} 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
        setShowWalletRechargeModal={setShowWalletRechargeModal} 
      />
      <div className={!isDashboardRoute ? `h-[72px]` : 'h-16'}></div>
      {/* Apply padding-bottom if mobile navbar is visible */}
      <div className={mobileNavbarPaddingClass}> 
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/about' element={<About />}></Route>
          <Route path='/track' element={<Tracking />}></Route>
          <Route path='/blog' element={<Blogs />}></Route>
          <Route path='/pricing' element={<Pricing />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/faq' element={<FAQs />}></Route>
          <Route path='/terms' element={<TermsOfUse />}></Route>
          <Route path='/privacy' element={<PrivacyPolicy />}></Route>
          {/* Pass sidebarOpen and toggleSidebar, and setShowWalletRechargeModal to Dashboard component */}
          <Route path='/dashboard/*' element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} setShowWalletRechargeModal={setShowWalletRechargeModal} />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
        </Routes>
        {!isDashboardRoute && <Footer />}
      </div>
      {/* Render MobileBottomNavbar if on dashboard route or a specified public route */}
      {(isDashboardRoute || isPublicRouteWithNavbar) && (
        // Add sidebarOpen prop here
        <MobileBottomNavbar isDashboardRoute={isDashboardRoute} sidebarOpen={sidebarOpen} closeSidebar={toggleSidebar} setShowWalletRechargeModal={setShowWalletRechargeModal} />
      )}

      {/* Render WalletRechargeModal globally, controlled by App.jsx state */}
      <WalletRechargeModal onClose={() => setShowWalletRechargeModal(false)} open={showWalletRechargeModal} />
    </>
  )
}

export default App;