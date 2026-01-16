import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GuiBody from './GuiBody';
import TerminalUI from './TerminalUI';
import Footer from './Footer';
import TicTacToe from './tictactoe/TicTacToe';
import Minesweeper from './minesweeper/game';

const Home = () => {
  const [mode, setMode] = useState('GUI');

  return (
    <>
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
      <>
         {mode === 'Terminal' ? <TerminalUI /> : <GuiBody />}
      </>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/minesweeper" element={<Minesweeper />} />
      </Routes>
    </Router>
  );
};

export default App;