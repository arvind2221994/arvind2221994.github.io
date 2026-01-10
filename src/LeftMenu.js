import React, { useState } from 'react';
import './LeftMenu.css';

const LeftMenu = ({ menuWidth, setMenuWidth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    setMenuWidth(newExpanded ? '15%' : '2rem');
  };

  return (
    <div className="leftmenu" style={{width: menuWidth}}>
      <button 
        className="arrowButton"
        style={{transform: `translateY(-50%) rotate(${isExpanded ? '180deg' : '0deg'})`}}
        onClick={handleToggle}
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        →
      </button>
      
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
