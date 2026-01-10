import React, { useState } from 'react';
import './LeftMenu.css';
import { TfiControlForward } from "react-icons/tfi";

const LeftMenu = ({ menuWidth, setMenuWidth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    setMenuWidth(newExpanded ? '15%' : '3rem');
  };

  return (
    <div className="leftmenu" style={{width: menuWidth}}>
        <TfiControlForward 
            className="arrowButton" 
            onClick={handleToggle}
            style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
            aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
        />
      {isExpanded && (
        <div className="linksContainer" style={{opacity: isExpanded ? 1 : 0}}>
          <a href="#about" >About</a>
          <a href="#projects" >Projects</a>
          <a href="#skills" >Skills</a>
          <a href="#experience" >Experience</a>
          <a href="#contact" >Contact</a>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
