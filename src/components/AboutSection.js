import React from 'react';
import resumeData from '../data/resumeData.json';
import './AboutSection.css';
import Skills from './Skills';

const AboutSection = () => {
  const { summary } = resumeData.about;
  
  return (
    <section className="resume-section" id="about">
      <h2>{resumeData.about.title}</h2>
      <div dangerouslySetInnerHTML={{__html: summary}} />
      <Skills />
    </section>
  );
};

export default AboutSection;
