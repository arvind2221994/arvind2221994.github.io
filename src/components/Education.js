import React from 'react';
import resumeData from '../data/resumeData.json';

const EducationItem = ({ degree, institution, duration, details }) => (
  <div className="education-item">
    <h3>{degree}</h3>
    <div className="institution-info">
      <span className="institution-name">{institution}</span>
      <span className="duration">{duration}</span>
    </div>
    {details && <p className="details">{details}</p>}
  </div>
);

const Education = () => {
  return (
    <section className="resume-section" id="education">
      <h2> 📚 Education</h2>
      {resumeData.education.map((edu, index) => (
        <EducationItem key={index} {...edu} />
      ))}
    </section>
  );
};

export default Education;
