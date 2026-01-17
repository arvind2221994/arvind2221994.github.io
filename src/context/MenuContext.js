import React, { createContext, useState, useContext } from 'react';
import { isMobileDevice } from '../utility/helpers';

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(Menu.Context);
};

export const MenuProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuWidth, setMenuWidth] = useState('0%');
  const [activeSection, setActiveSection] = useState('about');

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    const isMobile = isMobileDevice();
    setMenuWidth(newExpanded ? (isMobile ? '100%' : '15%'): '0%');
  };

  const handleLinkClick = (section) => {
    handleToggle();
    setActiveSection(section);
  };

  const value = {
    isExpanded,
    menuWidth,
    activeSection,
    handleToggle,
    handleLinkClick,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuContext;
