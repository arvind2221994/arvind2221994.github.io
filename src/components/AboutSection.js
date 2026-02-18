import React from 'react';
import resumeData from '../data/resumeData.json';
import './forms.css';

const AboutSection = () => {
  const { summaryHTML } = resumeData.about;
  // add icons for certifications 
  return (
    <section className="resume-section" id="about">
      <h2>{resumeData.about.title}</h2>
      <div dangerouslySetInnerHTML={{__html: summaryHTML}} />
      <h2>🎖️ What I am studying...</h2> 
      <ul className="certifications-list">
        {resumeData.certifications.map((certification, index) => (
          <li key={index}>{certification}</li>
        ))}
      </ul>
    </section>
  );
};

export default AboutSection;
