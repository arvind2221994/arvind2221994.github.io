import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LeftMenu from './LeftMenu';
import GuiBody from './GuiBody';
import TerminalUI from './TerminalUI';
import Footer from './Footer';

const Home = () => {
  const [mode, setMode] = useState('GUI');
  const [menuWidth, setMenuWidth] = useState('3rem');

  return (
    <div>
      <nav className="topNav">
        <div>
          <h1>Arvind Narayanan</h1>
          <p className="name-heading">Engineering inside...</p>
        </div>
        
        <div className='navDiv'>
          <button 
            onClick={() => setMode('GUI')}
            className="terminalLink"
            id={mode === 'GUI' ? 'cliLink' : 'guiLink'}
          >
            GUI
          </button>
          <button 
            onClick={() => setMode('Terminal')}
            className="terminalLink"
            id={mode === 'Terminal' ? 'cliLink' : 'guiLink'}
          >
            Terminal
          </button>
        </div>
      </nav>
      <div>
        <LeftMenu menuWidth={menuWidth} setMenuWidth={setMenuWidth} />
         {mode === 'Terminal' ? <TerminalUI menuWidth={menuWidth} /> : <GuiBody menuWidth={menuWidth} />}
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;