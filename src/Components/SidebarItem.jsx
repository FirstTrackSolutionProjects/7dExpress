import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const SidebarItem = ({ item, setShowRecharge, handleItemClick }) => { // setShowRecharge is now a prop
    const { admin } = useAuth()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentMenu, setIsCurrentMenu] = useState(false) // Initialized to false

    useEffect(() => {
        const checkActive = (currentItem) => {
            const baseUrl = '/dashboard/'; // All dashboard routes start with /dashboard/
            const currentPath = location.pathname;

            // Handle root dashboard path specifically
            if (currentItem.url === '' && currentPath === '/dashboard') {
                return true;
            }

            const itemPath = `${baseUrl}${currentItem.url}`;

            // Direct match
            if (itemPath === currentPath) {
                return true;
            }
            // Check if current path starts with dropdown parent path
            if (currentItem.isDropdown && currentPath.startsWith(itemPath)) {
                return true;
            }
            // For nested dropdowns, check if any child is active
            if (currentItem.isDropdown && currentItem.dropDownOptions) {
                return currentItem.dropDownOptions.some(subItem => checkActive(subItem));
            }
            return false;
        };

        const currentIsActive = checkActive(item);
        setIsCurrentMenu(currentIsActive);

        // If it's a dropdown and one of its children is active, ensure it's open
        if (item.isDropdown && item.dropDownOptions && item.dropDownOptions.some(subItem => location.pathname.startsWith(`/dashboard/${subItem.url}`))) {
            setIsOpen(true);
        } else if (item.isDropdown && !currentIsActive) { // Close if not active and is dropdown
            setIsOpen(false);
        }
    }, [location.pathname, item]);

    const handleClick = () => {
        if (item.isDropdown) {
            setIsOpen(!isOpen);
        } else if (item.name === "Wallet Recharge") {
            setShowRecharge(true); // This now calls the prop (setShowWalletRechargeModal)
            handleItemClick(); // Close sidebar if applicable
        } else { // Standard navigation item or logout
            handleItemClick(`/dashboard/${item.url}`);
        }
    };

    // Filter items based on admin/merchantOnly status
    if ((item.admin && !admin) || (item.merchantOnly && admin)) {
        return null; // Don't render item if conditions are not met
    }

    return (
        <>
            <li
                onClick={handleClick}
                className={`cursor-pointer px-2 w-full h-12 flex items-center transition-all duration-300
                            ${isCurrentMenu ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-200'}
                            hover:bg-gray-700 relative`}
            >
                {item.icon && item.icon !== "/logo.webp" && <item.icon className='mr-3' />} {/* Ensure icon exists and is not a placeholder */}
                <p className=''>{item.name}</p>
                {item.isDropdown ? (
                    <p className={`absolute transition-transform duration-300 ${isOpen ? "rotate-90" : ""} right-1`}>
                        <FaChevronRight className={`ml-auto transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </p>
                ) : null}
            </li>
            {item.isDropdown && isOpen && (
                <ul className="pl-6 bg-gray-800">
                    {item.dropDownOptions.map((subitem, index) => (
                        // Recursively render SidebarItem, passing setShowRecharge and handleItemClick
                        <SidebarItem
                            key={subitem.url || subitem.name}
                            item={subitem}
                            setShowRecharge={setShowRecharge}
                            handleItemClick={handleItemClick}
                        />
                    ))}
                </ul>
            )}
        </>
    )
}

export default SidebarItem