import React, { createContext, useState, useContext } from 'react';
import { isMobileDevice } from '../utility/helpers';

export const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  //const [menuWidth, setMenuWidth] = useState('0%');
  const [activeSection, setActiveSection] = useState('home');

  const handleToggle = () => {
    const isMobile = isMobileDevice();
    //setMenuWidth(isMobile ? '100%' : '15%');
  };

  const handleLinkClick = (section) => {
    handleToggle();
    setActiveSection(section);
  };

  const value = {
    activeSection,
    handleToggle,
    handleLinkClick,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
