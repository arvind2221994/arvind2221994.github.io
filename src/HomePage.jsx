import React from 'react';
import TitleCard from './reusables/TitleCard';
import AboutSection from './components/AboutSection';
import Bar from './reusables/Bar';
import Experience from './components/Experience';
import Projects from './components/Projects';
import FormHandler from './components/FormHandler';
import { useMenu } from './context/MenuContext';

const HomePage = () => {
  const { activeSection } = useMenu();

    const renderSection = () => {
        switch(activeSection) {
            case 'home':
                return <AboutSection />;
            case 'experience':
                return <Experience />;
            case 'projects':
                return <Projects />;
            case 'contact':
                return <FormHandler />;
            default:
                return <AboutSection />;
        }
    };
  return (
    <div className='home-page' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', gap: '10px' }}>
      <TitleCard/>
    <div className='home-page-content' style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '70%' }}>
        <Bar/>
        <div >
            {renderSection()}
        </div>
    </div>
    </div>
  )
}

export default HomePage;