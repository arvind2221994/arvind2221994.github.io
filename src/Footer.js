import React, { useState } from 'react';
import resumeData from './data/resumeData.json';
import { SiGmail,SiLinkedin,SiGithub } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import './Footer.css';

const Footer = () => {
    const { contact } = resumeData.about;
    return (
        <div className="contact-info" >
            <div>
                <SiGmail color="#EA4335" />
                <a href={`mailto:${contact.email}`} target='_blank' rel="noopener noreferrer">{contact.email}</a>
            </div>
            <div>
                <MdLocationPin color="#4285F4" />
            <a href={`https://www.google.com/maps/search/?api=1&query=${contact.location}`} target='_blank' rel="noopener noreferrer">{contact.location}</a>
            </div>
            <div>       
                <SiLinkedin color="#0077B5"/>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a>
            </div>
            <div>
                <SiGithub color="#24292F" />
                <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a>
            </div>
            
        </div>
    );
};

export default Footer;
