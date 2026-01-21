import React, { useState } from 'react';
import resumeData from '../data/resumeData.json';
import { SiGmail,SiLinkedin,SiGithub } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import './Footer.css';

const Footer = () => {
    const { contact } = resumeData.about;
    return (
        <footer className='footer'>
            <p>Developed by Arvind &nbsp;|&nbsp; 
                <a href="https://arvind2221994.github.io/">Portfolio</a>
            </p>
            <div className="contact-info" >
                <div>
                    <a href={`mailto:${contact.email}`} target='_blank' rel="noopener noreferrer" style={{fontSize:'1.5rem'}}>
                        <SiGmail color="#ec1d0a" />
                    </a>
                </div>
                <div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${contact.location}`} target='_blank' rel="noopener noreferrer" style={{fontSize:'1.5rem'}}>
                        <MdLocationPin color="#44960d" />
                    </a>
                </div>
                <div>       
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{fontSize:'1.5rem'}}>
                        <SiLinkedin color="#0e65f0"/>
                    </a>
                </div>
                <div>
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{fontSize:'1.5rem'}}>
                        <SiGithub color="#24292F" />
                    </a>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
