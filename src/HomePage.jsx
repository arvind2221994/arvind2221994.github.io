import React from 'react';
import TitleCard from './reusables/TitleCard';
import AboutSection from './components/AboutSection';
import Bar from './reusables/Bar';

const HomePage = () => {
  return (
    <div className='home-page' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '20px', gap: '10px' }}>
    <TitleCard/>
    <div className='home-page-content' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Bar/>
        <AboutSection/>
    </div>
    </div>
  )
}

export default HomePage;