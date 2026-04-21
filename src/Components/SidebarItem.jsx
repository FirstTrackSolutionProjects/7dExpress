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

    // Filter items based on admin/merchantOnly status or if they are hidden
    if ((item.admin && !admin) || (item.merchantOnly && admin) || item.hidden) {
        return null;
    }

    // Determine active styling
    const isActiveLink = isCurrentMenu; 
    const itemClasses = `cursor-pointer w-full h-12 flex items-center relative transition-all duration-300
                        ${isActiveLink ? 'bg-purple-700 text-white' : 'text-gray-200'}
                        hover:bg-purple-700 hover:text-white
                        ${isExpanded ? 'px-4 justify-start' : 'px-0 justify-center'}
                        `;

    return (
        <>
            <li onClick={handleClick} className={itemClasses}>
                <div className={`flex items-center justify-center transition-all duration-300 shrink-0 ${isExpanded ? 'mr-3 w-6' : 'w-full'}`}>
                    {item.icon && <item.icon className={`transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-2xl'}`} />}
                </div>
                
                <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden
                                ${isExpanded ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0'}`}>
                    {item.name}
                </span>

                {item.isDropdown && isExpanded && (
                    <FaChevronRight className={`ml-auto transition-all duration-300 transform shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
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