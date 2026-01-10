import React from 'react';
import resumeData from '../data/resumeData.json';
import './Skills.css';

const SkillCategory = ({ category, skills }) => (
  <div className="skill-category-card">
    <div className="skill-category-header">
      <h3 className="skill-category-title">{category}</h3>
      <span className="skill-count">{skills.length} skills</span>
    </div>
    <div className="skill-tags-grid">
      {skills.map((skill, index) => (
        <div key={index} className="skill-badge">
          <span className="skill-name">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section className="resume-section skills-section" id="skills">
      <div className="skills-header">
        <h2>⚡ Arsenal of Expertise</h2>
        <p className="skills-subtitle">From pixels to pipelines — my tech stack that powers my innovation</p>
      </div>
      <div className="skills-grid">
        {resumeData.skills.map((category, index) => (
          <SkillCategory key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
