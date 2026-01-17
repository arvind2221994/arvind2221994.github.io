import React, { useContext } from 'react';
import './LeftMenu.css';
import MenuContext from './context/MenuContext';

const LeftMenu = () => {
  const { isExpanded, menuWidth, activeSection, handleLinkClick } = useContext(MenuContext);

  return (
    <div className="leftmenu" style={{width: menuWidth}}>
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
