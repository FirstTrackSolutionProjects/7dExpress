import NavItem from "./NavItem";
import { navItems } from "../Constants";
import {  useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import WalletRechargeModal from "./WalletRechargeModal";
import { FaWallet } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const PublicHeader = () => {
  const navigate = useNavigate();
  const [showRecharge, setShowRecharge] = useState(false)
  const {verified, isAuthenticated, logout, business_name} = useAuth()
  const { balance, refreshBalance } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Renamed for clarity

  const closeRechargeModal = () => {
    setShowRecharge(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(()=>{
    if (!verified) return;
    refreshBalance();
  },[isAuthenticated, verified, refreshBalance])

  const handleNavLinkClick = (url) => {
    setIsMenuOpen(false); // Close menu on link click
    if (url) navigate(url);
  };
  
  return (
    <>
    {showRecharge && <WalletRechargeModal onClose={closeRechargeModal} open={showRecharge}/>}
    
    <div className="fixed bg-bg-header bg-cover z-10 top-0 flex justify-between items-center w-full h-16 px-4"> {/* Added px-4 */}
        <Link to="/" className="flex items-center">
          <img src="/images/logo2.png" alt="Logo" className="h-14" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex flex-1 justify-center items-center h-full text-black space-x-6">
          {navItems.map((item, index) => (
            <NavItem key={index} name={item.name} url={item.url} isDropdown={item.isDropdown} options={item.options} />
          ))}
        </nav>

        {/* Right-aligned container for wallet (mobile & desktop), desktop user actions, and mobile menu button */}
        <div className="flex h-16 items-center space-x-3 ml-auto"> {/* ml-auto pushes this block to the far right */}
          {isAuthenticated && verified && (
            <div onClick={() => setShowRecharge(true)} 
                 className={`relative bg-blue-600 ${balance < 250 ? "text-red-400" : "text-green-400"} flex items-center font-medium rounded-lg px-3 py-2 cursor-pointer border-l-4 border-t-4 border-blue-900 text-sm md:text-base`}>
              {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
              <p><FaWallet className="inline-block mr-1" />{`₹${balance}`}</p>
            </div>
          )}

          {/* Desktop User Info / Logout */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <p className="bg-white text-black flex items-center font-medium rounded-xl px-2 py-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                {business_name}
              </p>
              <p
                className="bg-red-400 text-white flex items-center font-medium rounded-xl px-2 py-2 cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button onClick={toggleMenu} className="block md:hidden px-4 py-2 bg-blue-600 text-white font-bold rounded-md">
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleMenu}></div>
      )}

      {/* Mobile Menu Content (Slide-in from right) */}
      <div className={`fixed md:hidden z-40 top-0 right-0 h-full w-3/4 max-w-xs bg-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex justify-between items-center h-16 px-4 bg-bg-header bg-cover shadow-sm">
          <Link to="/" className="flex items-center" onClick={toggleMenu}>
            <img src="/images/logo2.png" alt="Logo" className="h-12" />
          </Link>
          <button onClick={toggleMenu} className="p-2 text-blue-600">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4 pt-4 overflow-y-auto h-[calc(100%-64px)]">
          {isAuthenticated && (
            <p className="text-sky-950 text-lg font-bold bg-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleNavLinkClick('/dashboard')}>
              {business_name}
            </p>
          )}
          {navItems.map((item, index) => (
            // Using Link directly instead of NavItem to simplify and handle click
            <Link key={index} to={item.url} className="text-sky-950 text-lg font-bold py-2 hover:bg-gray-100 rounded-md px-2" onClick={() => handleNavLinkClick(item.url)}>
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <p className="text-red-600 text-lg font-bold py-2 hover:bg-gray-100 rounded-md px-2 cursor-pointer" onClick={() => { logout(); handleNavLinkClick('/'); }}>
              Logout
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicHeader;