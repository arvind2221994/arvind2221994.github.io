import React from 'react';
import resumeData from '../data/resumeData.json';

const SkillCategory = ({ category, skills }) => (
  <div className="skill-category">
    <h3>{category}</h3>
    <div className="skill-tags">
      {skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section className="resume-section" id="skills">
      <h2>Skills</h2>
      {resumeData.skills.map((category, index) => (
        <SkillCategory key={index} {...category} />
      ))}
    </section>
  );
};

export default Skills;
