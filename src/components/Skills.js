import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import TagCloud from 'react-tag-cloud';
import resumeData from '../data/resumeData.json';
import './Skills.css';

const SkillCard = ({ category, skills }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="skill-card-front" onClick={handleClick}>
        <h3>{category}</h3>
      </div>

      <div className="skill-card-back" onClick={handleClick}>
        <TagCloud style={{
          fontFamily: 'sans-serif',
          fontSize: 22,
          color: () => `hsl(${Math.random() * 360}, 80%, 40%)`,
          width: '100%',
          height: '100%'
        }}>
          {skills.map((skill, index) => (
            <div key={index}>{skill}</div>
          ))}
        </TagCloud>
      </div>
    </ReactCardFlip>
  );
};

const Skills = () => {
  return (
    <section className="resume-section" id="skills">
      <div>
        <h2>⚡Arsenal of Expertise</h2>
        <p>From pixels to pipelines — my tech stack that powers my innovation</p>
      </div>
      <div className="skills-grid">
        {resumeData.skills.map((skillCategory, index) => (
          <SkillCard key={index} category={skillCategory.category} skills={skillCategory.skills} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
