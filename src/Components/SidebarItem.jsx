import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const SidebarItem = ({ item, setShowRecharge, handleItemClick, isExpanded }) => { // Added isExpanded prop
    const { admin } = useAuth()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentMenu, setIsCurrentMenu] = useState(false)

    useEffect(() => {
        const checkActive = (currentItem) => {
            const baseUrl = '/dashboard/';
            const currentPath = location.pathname;

            // Handle root dashboard path specifically
            if (currentItem.url === '' && currentPath === '/dashboard') {
                return true;
            }

            const itemPath = currentItem.url ? `${baseUrl}${currentItem.url}` : '';

            // Check for direct match or if current path starts with itemPath (for parent highlighting)
            if (itemPath && (itemPath === currentPath || currentPath.startsWith(itemPath + '/'))) { 
                return true;
            }
            // For dropdowns, also check if any child is active to highlight the parent
            if (currentItem.isDropdown && currentItem.dropDownOptions) {
                return currentItem.dropDownOptions.some(subItem => checkActive(subItem));
            }
            return false;
        };

        const currentIsActive = checkActive(item);
        setIsCurrentMenu(currentIsActive);

        // If it's a dropdown and it or any of its children are active, keep it open on desktop
        // On mobile, rely on user interaction (isOpen state)
        if (item.isDropdown && isExpanded) { // Only auto-open on desktop for hover state
            const shouldOpen = currentIsActive || item.dropDownOptions.some(subItem => location.pathname.startsWith(`/dashboard/${subItem.url}`));
            setIsOpen(shouldOpen);
        } else if (item.isDropdown && !isExpanded) { // On collapsed desktop, close dropdowns
            setIsOpen(false);
        }
    }, [location.pathname, item, isExpanded]);

    const handleClick = (e) => {
        if (item.isDropdown) {
            setIsOpen(!isOpen);
        } else if (item.name === "Wallet Recharge") {
            setShowRecharge(true);
            handleItemClick(); // Close mobile sidebar if applicable
        } else { // Standard navigation item or logout
            handleItemClick(`/dashboard/${item.url}`);
        }
    };

    // Filter items based on admin/merchantOnly status
    if ((item.admin && !admin) || (item.merchantOnly && admin)) {
        return null;
    }

    // Determine active styling
    const isActiveLink = isCurrentMenu; 
    const itemClasses = `cursor-pointer w-full h-12 flex items-center transition-all duration-300 relative
                        ${isActiveLink ? 'bg-purple-700 text-white' : 'text-gray-200'}
                        hover:bg-purple-700 hover:text-white
                        ${isExpanded ? 'px-4' : 'justify-center'}
                        `;

    return (
        <>
            <li onClick={handleClick} className={itemClasses}>
                {item.icon && <item.icon className={`${isExpanded ? 'mr-3 text-xl' : 'text-2xl'}`} />} {/* Adjust icon margin/size based on expanded state */}
                <p className={`whitespace-nowrap ${isExpanded ? 'block' : 'hidden'}`}>{item.name}</p> {/* Hide text when collapsed on desktop */}
                {item.isDropdown && isExpanded && ( // Only show chevron when expanded
                    <FaChevronRight className={`ml-auto transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                )}
            </li>
            {item.isDropdown && isOpen && (
                <ul className={`${isExpanded ? 'pl-6' : 'pl-0'} bg-gray-800`}>
                    {item.dropDownOptions.map((subitem, index) => (
                        <SidebarItem
                            key={subitem.url || subitem.name}
                            item={subitem}
                            setShowRecharge={setShowRecharge}
                            handleItemClick={handleItemClick}
                            isExpanded={isExpanded} // Pass expanded state down to sub-items
                        />
                    ))}
                </ul>
            )}
        </>
    )
}

export default SidebarItem;