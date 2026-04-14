import React, { createElement, useEffect } from 'react';
import Sidebar2 from '../Components/Sidebar2';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { menuItems } from '../Constants';
import { useNavigate } from 'react-router-dom';

// Accept setShowWalletRechargeModal as a prop
const Dashboard = ({ sidebarOpen, toggleSidebar, setShowWalletRechargeModal }) => { // Updated props
  const { admin, isAuthenticated, verified } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!verified) {
      navigate('/verify');
    }
  }, [isAuthenticated, verified, navigate]);

  if (!isAuthenticated || !verified) {
    return null;
  }
  const generateRoutes = (items, admin) => {
    return items.flatMap((item, index) => {
      if ((item.admin && !admin) || (item.merchantOnly && admin)) {
        return [];
      }
      const routes = [
        <Route
          key={item.url || `route-${index}`}
          path={item.url}
          element={item.component ? createElement(item.component) : null}
        />
      ];
      if (item.dropDownOptions && item.dropDownOptions.length > 0) {
        routes.push(...generateRoutes(item.dropDownOptions, admin));
      }
      return routes;
    });
  };
  return (
    <>
      <div className='flex h-[calc(100vh-64px)] font-inter bg-gray-200 relative'>
        {/* Pass setShowWalletRechargeModal to Sidebar2 */}
        <Sidebar2 sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} setShowRecharge={setShowWalletRechargeModal} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <main className={`flex-grow overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
          <Routes>
            {generateRoutes(menuItems, admin)}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default Dashboard;