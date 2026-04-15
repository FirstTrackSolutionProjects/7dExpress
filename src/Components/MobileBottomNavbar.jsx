// src/Components/MobileBottomNavbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaClipboardList, FaHistory, FaWallet, FaPlusSquare, FaInfoCircle, FaPhone, FaRss, FaTags, FaUsers, FaUserCheck } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

const MobileBottomNavbar = ({ isDashboardRoute, sidebarOpen, closeSidebar, setShowWalletRechargeModal }) => {
    const location = useLocation();
    const { admin, verified } = useAuth();
    const { balance } = useWallet();

    const merchantDashboardItems = [
        { icon: FaHome, name: 'Dash', path: '/dashboard' },
        { icon: FaBox, name: 'Parcels', path: '/dashboard/parcels/domestic' },
        { icon: FaPlusSquare, name: 'Create', path: '/dashboard/order/create' },
        { icon: FaClipboardList, name: 'Reports', path: '/dashboard/shipment/reports' },
        { icon: FaHistory, name: 'History', path: '/dashboard/transaction-history' },
        {
            icon: FaWallet,
            name: 'Wallet',
            path: '/dashboard/wallet-recharge',
            action: 'openWalletModal'
        },
    ];

    const adminDashboardItems = [
        { icon: FaHome, name: 'Dash', path: '/dashboard' },
        { icon: FaUsers, name: 'Merchants', path: '/dashboard/manage/merchant/verified' },
        { icon: FaBox, name: 'Shipments', path: '/dashboard/manage/merchant/shipments/domestic' },
        { icon: FaUserCheck, name: 'Verify', path: '/dashboard/submissions/merchant-verification' },
        { icon: FaMoneyBillTransfer, name: 'Manual', path: '/dashboard/manual-recharge' },
        { icon: FaHistory, name: 'History', path: '/dashboard/transaction-history' },
    ];

    const publicNavItems = [
        { icon: FaHome, name: 'Home', path: '/' },
        { icon: FaInfoCircle, name: 'About', path: '/about' },
        { icon: FaClipboardList, name: 'Track', path: '/track' },
        { icon: FaRss, name: 'Blogs', path: '/blog' },
        { icon: FaTags, name: 'Pricing', path: '/pricing' },
        { icon: FaPhone, name: 'Contact', path: '/contact' },
    ];

    const currentNavItems = isDashboardRoute
        ? (admin ? adminDashboardItems : merchantDashboardItems)
        : publicNavItems;

    const handleLinkClick = (itemPath, itemAction) => {
        if (itemAction === 'openWalletModal' && isDashboardRoute && verified) {
            setShowWalletRechargeModal(true);
        }
        // ONLY call closeSidebar (which is App.jsx's toggleSidebar) if the sidebar is currently OPEN
        // and we are on a mobile device. This ensures it only closes the sidebar, not opens it.
        // The mobile bottom navbar is for mobile devices only.
        if (closeSidebar && sidebarOpen) { // check if sidebar is open
            closeSidebar(); // Toggle it to close
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around py-4 md:hidden z-50"> {/* Increased py-2 to py-4 */}
            {currentNavItems.map((item) => {
                const isActive = location.pathname === item.path ||
                    (item.path === '/dashboard' && location.pathname === '/dashboard/') ||
                    (item.path === '/dashboard/parcels/domestic' && location.pathname.startsWith('/dashboard/parcels')) ||
                    (item.path === '/dashboard/shipment/reports' && location.pathname.startsWith('/dashboard/shipment/reports')) ||
                    (item.path === '/dashboard/transaction-history' && location.pathname.startsWith('/dashboard/transaction-history')) ||
                    (item.path === '/dashboard/manage/merchant/verified' && location.pathname.startsWith('/dashboard/manage/merchant')) ||
                    (item.path === '/dashboard/manage/merchant/shipments/domestic' && location.pathname.startsWith('/dashboard/manage/merchant/shipments')) ||
                    (item.path === '/dashboard/submissions/merchant-verification' && location.pathname.startsWith('/dashboard/submissions')) ||
                    (item.path === '/pricing' && location.pathname.startsWith('/pricing'));

                if (item.action === 'openWalletModal' && isDashboardRoute && verified) {
                    return (
                        <div
                            key={item.name}
                            onClick={() => handleLinkClick(item.path, item.action)}
                            className={`flex flex-col items-center text-xs px-1 py-0.5 rounded-md cursor-pointer text-center flex-1 min-w-0 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                        >
                            {/* Adjusted text size for wallet balance to be more compact */}
                            <item.icon className="text-xl mb-0.5" />
                            <span className={`font-semibold text-[10px] ${balance < 250 ? "text-red-500" : "text-green-600"} whitespace-nowrap overflow-hidden text-ellipsis max-w-full block`}>₹{balance}</span>
                            <span className="text-gray-600 text-[9px] whitespace-nowrap overflow-hidden text-ellipsis max-w-full block">{item.name}</span>
                        </div>
                    );
                } else {
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => handleLinkClick(item.path, item.action)}
                            className={`flex flex-col items-center text-xs px-2 py-1 rounded-md flex-1 min-w-0
                                ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                        >
                            <item.icon className="text-xl mb-1" />
                            <span>{item.name}</span>
                        </Link>
                    );
                }
            })}
        </div>
    );
};

export default MobileBottomNavbar;