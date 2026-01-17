import React, { useContext } from 'react';
import './GuiBody.css';
import AboutSection from './components/AboutSection';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LeftMenu from './LeftMenu';
import MenuContext from './context/MenuContext';

const GuiBody = () => {
    const { menuWidth, activeSection } = useContext(MenuContext);

    const renderSection = () => {
        switch(activeSection) {
            case 'about':
                return <AboutSection />;
            case 'experience':
                return <Experience />;
            case 'projects':
                return <Projects />;
            default:
                return <AboutSection />;
        }
    };

    return (
        <div>
            <LeftMenu />
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