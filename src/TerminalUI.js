import React from 'react';
import './GuiBody.css';

const TerminalUI = ({ menuWidth }) => {
  return (
      <div 
        className='terminal'
        style={{ marginLeft: menuWidth, transition: 'margin-left 0.3s ease' }}
      >
          <p> Terminal initialized. Logic goes here...</p>
      </div>
  );
};

export default TerminalUI;