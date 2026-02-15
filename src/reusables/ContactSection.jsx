import React, {useState, useEffect} from 'react';
import { SiGmail,SiLinkedin,SiGithub,SiInstagram } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import './ContactSection.css';

const ContactSection = ({ contact }) => {
  return (
    <section className="contact-section">
        <div className="contact-info" >
            <div>
                <a href={`mailto:${contact.email}`} target='_blank' rel="noopener noreferrer">
                    <SiGmail className="icon" />
                </a>
            </div>
            <div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${contact.location}`} target='_blank' rel="noopener noreferrer">
                    <MdLocationPin className="icon" />
                </a>
            </div>
            <div>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <SiLinkedin className="icon" />
                </a>
            </div>
            <div>
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                    <SiGithub className="icon" />
                </a>
            </div>
            <div>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    <SiInstagram className="icon" />
                </a>
            </div>

        </div>
    </section>
  );
};

export default ContactSection;