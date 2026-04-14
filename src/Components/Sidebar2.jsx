// src/Components/Sidebar2.jsx
import React, { useEffect, useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import { menuItems } from '../Constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SidebarItem from './SidebarItem.jsx';
// Removed import of WalletRechargeModal, now managed by App.jsx

// Accept setShowRecharge as prop, which is actually setShowWalletRechargeModal from App.jsx
const Sidebar2 = ({ sidebarOpen, toggleSidebar, setShowRecharge }) => { // Updated props
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Removed local showRecharge state, now controlled by App.jsx

  // Function to close sidebar on mobile after item click
  const handleItemClick = (url) => {
    if (url) {
        navigate(url);
    }
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
  };

  useEffect(()=>{
    if (location.pathname === "/dashboard/logout") {
      logout();
      if (sidebarOpen) toggleSidebar();
    }
  },[location.pathname, logout, toggleSidebar]);

  const sidebarItems = menuItems
  return (
    <>
    {/* WalletRechargeModal is now rendered in App.jsx */}
    <div>
       {/* Desktop Sidebar */}
       <div className="bg-gray-900 h-full w-64 text-white hidden md:block flex-shrink-0 overflow-y-auto">
        <div className="flex justify-center items-center py-4 border-b border-gray-700">
          <img src="/images/logo2.png" alt="Brand Logo" className="h-16 w-auto" />
        </div>
        <ul className="p-4">
          {sidebarItems.map((item) => {
            if ((item.admin && !admin) || (item.merchantOnly && admin)) {
              return null;
            }
            return (
              <SidebarItem
                key={item.url || item.name}
                item={item}
                setShowRecharge={setShowRecharge} // Pass the prop down
                handleItemClick={handleItemClick}
              />
            );
          })}
        </ul>
      </div>

       {/* Mobile Sidebar */}
       <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={toggleSidebar}
          className="p-4 absolute top-0 right-0 text-white flex justify-end z-50"
        >
          <FaTimes className="h-7 w-7" />
        </button>
        <div className="flex justify-center items-center py-4 pt-16 border-b border-gray-600">
          <img src="/images/logo2.png" alt="Brand Logo" className="h-16 w-auto" />
        </div>
        <ul className="p-4">
          {sidebarItems.map((item) => {
            if ((item.admin && !admin) || (item.merchantOnly && admin)) {
              return null;
            }
            return(
              <SidebarItem
                key={item.url || item.name}
                item={item}
                setShowRecharge={setShowRecharge} // Pass the prop down
                handleItemClick={handleItemClick}
              />
            )
          })}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar2;