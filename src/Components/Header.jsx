// src/Components/Header.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaWallet } from 'react-icons/fa';
import { navItems } from '../Constants'; // Assuming navItems are for public pages, not dashboard links
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
// import NavItem from './NavItem'; // Not strictly needed in dashboard header, as nav items are in sidebar

// Accept setShowWalletRechargeModal as a prop
const Header = ({ toggleSidebar, sidebarOpen, setShowWalletRechargeModal }) => {
  const navigate = useNavigate();
  const { isAuthenticated, business_name, name, logout, verified } = useAuth();
  const { balance, refreshBalance } = useWallet();

  useEffect(() => {
    // Only refresh balance if authenticated and verified
    if (isAuthenticated && verified) {
      refreshBalance();
    }
  }, [isAuthenticated, verified, refreshBalance]);

  const displayName = business_name || name || 'User';

  return (
    <>
      <div className="fixed bg-bg-header bg-cover z-50 top-0 flex items-center w-full h-16 px-4 shadow-md">
        {/* Mobile Hamburger/Close Button (always on left on mobile, hidden on desktop) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-sky-950 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>

        {/* Logo (always visible on left) */}
        <Link to="/" className="flex items-center">
          <img src="/images/logo2.png" alt="Logo" className="h-14" />
        </Link>
        
        {/* Spacer to push content to the right (only on desktop) */}
        <div className="flex-grow hidden md:block"></div>

        {/* Desktop Navigation Links (hidden on mobile, if any were intended here) 
            Based on your Constants/index.js, navItems are public. In a dashboard header,
            they usually aren't shown, as sidebar serves navigation.
            Keeping this block hidden for consistency with dashboard context. */}
        {/* <nav className="hidden md:flex items-center h-full space-x-6 text-black">
          {navItems.map((item, index) => (
            <NavItem key={index} name={item.name} url={item.url} isDropdown={item.isDropdown} options={item.options} />
          ))}
        </nav> */}

        {/* User Info, Wallet, and Logout - Aligned to extreme right */}
        {isAuthenticated && (
          <div className="flex items-center h-full space-x-3 text-black ml-auto"> {/* ml-auto pushes this block to the far right */}
            {verified ? (
              <>
                {/* Wallet Balance - Always visible in dashboard header (mobile & desktop) */}
                <div
                  onClick={() => setShowWalletRechargeModal(true)}
                  className={`relative bg-blue-600 ${balance < 250 ? "text-red-400" : "text-green-400"} flex items-center font-medium rounded-lg px-2 py-1 cursor-pointer border-l-4 border-t-4 border-blue-900 text-sm`} // Reduced px/py, used text-sm for better mobile fit
                >
                  {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
                  <p><FaWallet className="inline-block mr-1" />{`₹${balance}`}</p>
                </div>
              </>
            ) : null}

            {/* User Name / Business Name - Hidden on mobile, visible on md and up */}
            <p className="hidden md:flex bg-white text-black items-center font-medium rounded-xl px-2 py-2 cursor-pointer">
              {displayName}
            </p>

            {/* Logout Button - Hidden on mobile, visible on md and up */}
            <p
              className="hidden md:flex bg-red-400 text-white items-center font-medium rounded-xl px-2 py-2 cursor-pointer"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;