// src/Components/Sidebar2.jsx
import React, { useEffect, useState } from 'react';
import { FaTimes, FaChevronRight, FaBars } from 'react-icons/fa'; // Added FaBars for collapsed indicator
import { menuItems } from '../Constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SidebarItem from './SidebarItem.jsx';

const Sidebar2 = ({ sidebarOpen, toggleSidebar, setShowRecharge }) => {
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false); // State for desktop hover expand

  // Function to close sidebar on mobile after item click
  const handleItemClick = (url) => {
    if (url) {
        navigate(url);
    }
    // Only toggle mobile sidebar if it's currently open and on a small screen
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
  };

  useEffect(()=>{
    if (location.pathname === "/dashboard/logout") {
      logout();
      if (sidebarOpen) toggleSidebar(); // Close mobile sidebar if open on logout
    }
  },[location.pathname, logout, toggleSidebar, sidebarOpen]);

  // Handle desktop hover events
  const handleMouseEnter = () => {
    setIsDesktopExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsDesktopExpanded(false);
  };

  const sidebarItems = menuItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-gray-900 text-white h-full sticky top-16 z-20 
                    transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin 
                    ${isDesktopExpanded ? 'w-sidebar-expanded' : 'w-sidebar-collapsed'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`flex items-center border-b border-gray-700 py-4 px-4 overflow-hidden h-24
                          ${isDesktopExpanded ? 'justify-start' : 'justify-center'}`}>
          <img 
            src="/images/logo2.png" 
            alt="Brand Logo" 
            className={`h-14 w-auto transition-transform duration-300 shrink-0 ${!isDesktopExpanded ? 'scale-110' : ''}`}
          /> 
          <span className={`ml-3 text-xl font-bold text-white transition-all duration-300 whitespace-nowrap overflow-hidden
                          ${isDesktopExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'}`}>
            7D Express
          </span>
        </div>
        
        {/* Scrollable menu items for desktop */}
        <ul className="p-2 flex-grow overflow-y-auto scrollbar-thin">
          {sidebarItems.map((item) => {
            if ((item.admin && !admin) || (item.merchantOnly && admin)) {
              return null;
            }
            return (
              <SidebarItem
                key={item.url || item.name}
                item={item}
                setShowRecharge={setShowRecharge}
                handleItemClick={handleItemClick}
                isExpanded={isDesktopExpanded} // Pass expanded state to item
              />
            );
          })}
        </ul>
      </div>

      {/* Mobile Sidebar (remains as a fixed overlay) */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden overflow-y-auto scrollbar-thin pb-20`}
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
        {/* Scrollable menu items for mobile */}
        <ul className="p-4 flex-grow overflow-y-auto scrollbar-thin">
          {sidebarItems.map((item) => {
            if ((item.admin && !admin) || (item.merchantOnly && admin)) {
              return null;
            }
            return(
              <SidebarItem
                key={item.url || item.name}
                item={item}
                setShowRecharge={setShowRecharge}
                handleItemClick={handleItemClick}
                isExpanded={true} // Mobile sidebar is always expanded
              />
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar2;
