import React from 'react';
import resumeData from '../data/resumeData.json';

const ExperienceItem = ({ title, company, duration, description, achievements }) => (
  <div className="experience-item">
    <h3>{title}</h3>
    <div className="company-info">
      <span className="company-name">{company}</span>
      <span className="duration">{duration}</span>
    </div>
    <p className="description">{description}</p>
    {achievements && (
      <ul className="achievements">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    )}
  </div>
);

const Experience = () => {
  return (
    <section className="resume-section" id="experience">
      <h2>Work Experience</h2>
      {resumeData.experience.map((exp, index) => (
        <ExperienceItem key={index} {...exp} />
      ))}
    </section>
  );
};

export default Experience;
