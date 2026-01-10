import React from 'react';
import './GuiBody.css';
import AboutSection from './components/AboutSection';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';

const GuiBody = ({ menuWidth }) => {
  return (
    <div 
      className='guiBody' 
      style={{ marginLeft: menuWidth, transition: 'margin-left 0.3s ease' }}
    >
      <AboutSection />
      <Experience />
      <Skills />
    </div>
  );
};

export default GuiBody;