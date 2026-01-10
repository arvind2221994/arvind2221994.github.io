import React from 'react';
import resumeData from '../data/resumeData.json';
import './AboutSection.css';
import { SiGmail,SiLinkedin,SiGithub } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";

const AboutSection = () => {
  const { summary, contact } = resumeData.about;
  
  return (
    <section className="resume-section" id="about">
      <h2>{resumeData.about.title}</h2>
      <div dangerouslySetInnerHTML={{__html: summary}} />
      <h2> 👤 My profiles</h2>
      <div className="contact-info">
        <p>
            <SiGmail color="#EA4335" />
            <a href={`mailto:${contact.email}`} target='_blank' rel="noopener noreferrer">{contact.email}</a>
        </p>
        <p>
            <MdLocationPin color="#4285F4" />
            <a href={`https://www.google.com/maps/search/?api=1&query=${contact.location}`} target='_blank' rel="noopener noreferrer">{contact.location}</a>
        </p>
        <p>
            <SiLinkedin color="#0077B5"/>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a>
        </p>
        <p>
            <SiGithub color="#24292F" />
            <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
