import React, { useState } from 'react';
import './GuiBody.css';
import AboutSection from './components/AboutSection';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LeftMenu from './LeftMenu';

const GuiBody = () => {
    const [menuWidth, setMenuWidth] = useState('4rem');
    const [activeSection, setActiveSection] = useState('about');

    const renderSection = () => {
        switch(activeSection) {
            case 'about':
                return <AboutSection />;
            case 'experience':
                return <Experience />;
            case 'education':
                return <Education />;
            case 'skills':
                return <Skills />;
            case 'projects':
                return <Projects />;
            default:
                return <AboutSection />;
        }
    };

    return (
        <div>
            <LeftMenu 
                menuWidth={menuWidth} 
                setMenuWidth={setMenuWidth}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <div 
                className='guiBody' 
                style={{ marginLeft: menuWidth }}
            >
                {renderSection()}
            </div>
        </div>
    );
};

export default GuiBody;