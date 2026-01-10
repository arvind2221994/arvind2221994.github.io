import React from 'react';
import './GuiBody.css';

const TerminalUI = ({ menuWidth }) => {
  return (
      <div 
        className='terminal'
        style={{ marginLeft: menuWidth}}
      >
          <p> Terminal initialized. Logic goes here...</p>
      </div>
  );
};

export default TerminalUI;