import React from 'react';
import resumeData from '../data/resumeData.json';
import './AboutSection.css';


const AboutSection = () => {
  const { summary, contact } = resumeData.about;
  
  return (
    <section className="resume-section" id="about">
      <h2>{resumeData.about.title}</h2>
      <div dangerouslySetInnerHTML={{__html: summary}} />
      <h2> 👤 My profiles</h2>
      
    </section>
  );
};

export default AboutSection;
