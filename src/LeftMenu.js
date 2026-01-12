import React, { useState } from 'react';
import './LeftMenu.css';
import { GiHamburgerMenu } from "react-icons/gi";

const LeftMenu = ({ menuWidth, setMenuWidth, activeSection, setActiveSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    setMenuWidth(newExpanded ? '15%' : '4rem');
  };

  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="leftmenu" style={{width: menuWidth}}>
        <GiHamburgerMenu 
            className="arrowButton" 
            onClick={handleToggle}
            style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
            aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
        />
      {isExpanded && (
        <div className="linksContainer" style={{opacity: isExpanded ? 1 : 0}}>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
            className={activeSection === 'about' ? 'active' : ''}
          >
            About
          </a>
          <a 
            href="#experience" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('experience'); }}
            className={activeSection === 'experience' ? 'active' : ''}
          >
            Experience
          </a>
          <a 
            href="#skills" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('skills'); }}
            className={activeSection === 'skills' ? 'active' : ''}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('projects'); }}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>
          <a 
            href="#example" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('example'); }}
            className={activeSection === 'example' ? 'active' : ''}
          >
            MicroFrontend
          </a>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
