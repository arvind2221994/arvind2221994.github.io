import React from 'react';
import resumeData from '../data/resumeData.json';
import './Experience.css';

const ExperienceItem = ({ title, company, duration, description, achievements, isLast }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    {!isLast && <div className="timeline-line"></div>}
    
    <div className="timeline-content">
      <div className="timeline-date">{duration}</div>
      <div className="timeline-card">
        <h3 className="timeline-title">{title}</h3>
        <h4 className="timeline-company">{company}</h4>
        <p className="timeline-description">{description}</p>
        {achievements && achievements.length > 0 && (
          <ul className="timeline-achievements">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const Experience = () => {
  return (
    <section className="resume-section" id="experience">
      <div className="timeline-container">
        <h2>Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <ExperienceItem 
            key={index} 
            {...exp} 
            isLast={index === resumeData.experience.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
