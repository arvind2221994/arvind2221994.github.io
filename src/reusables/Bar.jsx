import React, { useState } from 'react';
import './Bar.css';
import { useMenu } from '../context/MenuContext';

const Bar = () => {
    const { activeSection, handleLinkClick } = useMenu();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleClick(name) {
        handleLinkClick(name);
        setMobileOpen(false); // collapse accordion after selection
    }

    function toggleMobile() {
        setMobileOpen(prev => !prev);
    }

    return (
        <div className={`navbar ${mobileOpen ? 'mobile-open' : ''}`}>
            <button
                className="hamburger"
                onClick={toggleMobile}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            <ul className='elements'>
                <li>
                    <button className={activeSection === 'home' ? 'active' : ''} name='home' onClick={(e) => handleClick(e.target.name)}>Home</button>
                </li>
                <li>
                    <button className={activeSection === 'experience' ? 'active' : ''} name='experience' onClick={(e) => handleClick(e.target.name)}>Experience</button>
                </li>
                <li>
                    <button className={activeSection === 'skills' ? 'active' : ''} name='skills' onClick={(e) => handleClick(e.target.name)}>Skills</button>
                </li>
                <li>
                    <button className={activeSection === 'projects' ? 'active' : ''} name='projects' onClick={(e) => handleClick(e.target.name)}>Projects</button>
                </li>
                <li>
                    <button className={activeSection === 'contact' ? 'active' : ''} name='contact' onClick={(e) => handleClick(e.target.name)}>Contact</button>
                </li>
            </ul>
        </div>
    );
};

export default Bar;