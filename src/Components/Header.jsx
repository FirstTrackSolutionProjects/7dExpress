// src/Components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaWallet } from 'react-icons/fa';
import { navItems } from '../Constants';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import NavItem from './NavItem';

const Header = ({ isDashboard, toggleSidebar, sidebarOpen, setShowWalletRechargeModal }) => {
  const navigate = useNavigate();
  const { isAuthenticated, business_name, name, logout, verified } = useAuth();
  const { balance, refreshBalance } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && verified) {
      refreshBalance();
    }
  }, [isAuthenticated, verified, refreshBalance]);

  const displayName = business_name || name || 'User';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (url) => {
    setIsMobileMenuOpen(false);
    if (url) navigate(url);
  };

  return (
    <>
      <div className="fixed bg-bg-header bg-cover z-50 top-0 flex items-center w-full h-16 px-4 shadow-md">
        {/* Dashboard Left Hamburger (Sidebar Toggle) - Only on Dashboard mobile */}
        {isDashboard && (
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-sky-950 focus:outline-none flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink min-w-0">
          <img src="/images/logo2.png" alt="Logo" className="h-12 md:h-14 object-contain" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex flex-grow justify-center items-center h-full space-x-6 text-black px-4">
          {navItems.map((item, index) => (
            <NavItem key={index} name={item.name} url={item.url} isDropdown={item.isDropdown} options={item.options} />
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center h-full space-x-2 md:space-x-3 text-black ml-auto flex-shrink-0">
          {isAuthenticated && verified && (
            <div
              onClick={() => setShowWalletRechargeModal(true)}
              className={`relative bg-blue-600 ${balance < 250 ? "text-red-400" : "text-green-400"} flex items-center font-medium rounded-lg px-2 py-1 cursor-pointer border-l-4 border-t-4 border-blue-900 text-sm md:text-base`}
            >
              {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
              <p><FaWallet className="inline-block mr-1" />{`₹${balance}`}</p>
            </div>
          )}

          {/* Desktop User Actions */}
          {isAuthenticated && (
            <>
              <p className="hidden md:flex bg-white text-black items-center font-medium rounded-xl px-2 py-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                {displayName}
              </p>
              <p
                className="hidden md:flex bg-red-400 text-white items-center font-medium rounded-xl px-2 py-2 cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </p>
            </>
          )}

          {/* Mobile Right Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-2 text-sky-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60]" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Menu Content (Right Side) */}
      <div className={`fixed md:hidden z-[70] top-0 right-0 h-full w-3/4 max-w-xs bg-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex justify-between items-center h-16 px-4 bg-bg-header bg-cover shadow-sm">
          <Link to="/" className="flex items-center" onClick={toggleMobileMenu}>
            <img src="/images/logo2.png" alt="Logo" className="h-12" />
          </Link>
          <button onClick={toggleMobileMenu} className="p-2 text-blue-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4 pt-4 overflow-y-auto h-[calc(100%-64px)]">
          {isAuthenticated && (
            <p className="text-sky-950 text-lg font-bold bg-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleNavLinkClick('/dashboard')}>
              {displayName}
            </p>
          )}
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.url} 
              className="text-sky-950 text-lg font-bold py-2 hover:bg-gray-100 rounded-md px-2" 
              onClick={toggleMobileMenu}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <p 
              className="text-red-600 text-lg font-bold py-2 hover:bg-gray-100 rounded-md px-2 cursor-pointer" 
              onClick={() => {
                logout();
                handleNavLinkClick('/');
              }}
            >
              Logout
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;