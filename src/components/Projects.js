import React from 'react';
import resumeData from '../data/resumeData.json';

const ProjectCard = ({ title, description, technologies, link, github }) => (
  <div className="project-card">
    <h3>{title}</h3>
    <p className="project-description">{description}</p>
    <div className="project-tech">
      {technologies.map((tech, index) => (
        <span key={index} className="tech-tag">{tech}</span>
      ))}
    </div>
    <div className="project-links">
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Live Demo →</a>}
      {github && <a href={github} target="_blank" rel="noopener noreferrer">GitHub →</a>}
    </div>
  </div>
);

const Projects = () => {
  return (
    <section className="resume-section" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {resumeData.projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
