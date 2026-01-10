import React from 'react';
import './GuiBody.css';

const GuiBody = ({ menuWidth }) => {
  return (
    <div 
      className='guiBody' 
      style={{ marginLeft: menuWidth, transition: 'margin-left 0.3s ease' }}
    >
      <h2>Welcome to the GUI</h2>
      <p>Main UI content goes here...</p>
    </div>
  );
};

export default GuiBody;