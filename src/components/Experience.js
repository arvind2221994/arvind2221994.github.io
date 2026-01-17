import React, { useState } from 'react';
import Modal from 'react-modal';
import resumeData from '../data/resumeData.json';
import './Experience.css';

Modal.setAppElement('#root');

const ExperienceItem = ({ experience, onReadMore, side }) => (
  <div className={`timeline-item-container ${side}`}>
    <div className="timeline-item-content">
      <div className="timeline-date">{experience.duration}</div>
      <div className="timeline-card">
        <h3 className="timeline-title">{experience.title}</h3>
        <h4 className="timeline-company">{experience.company}</h4>
        <button onClick={() => onReadMore(experience)} className="read-more-btn">
          Read More
        </button>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const openModal = (experience) => {
    setSelectedExperience(experience);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedExperience(null);
  };

  return (
    <section className="resume-section" id="experience">
      <h2>Work Experience</h2>
      <div className="timeline-container">
        {resumeData.experience.map((exp, index) => (
          <ExperienceItem 
            key={index} 
            experience={exp}
            onReadMore={openModal}
            side={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>

      {selectedExperience && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Experience Details"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{selectedExperience.title}</h2>
          <h3>{selectedExperience.company}</h3>
          <p>{selectedExperience.duration}</p>
          <p>{selectedExperience.description}</p>
          <ul>
            {selectedExperience.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
          </ul>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </section>
  );
};

export default Experience;
