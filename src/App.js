import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GuiBody from './GuiBody';
import TerminalUI from './TerminalUI';
import Footer from './Footer';
import TicTacToe from './tictactoe/TicTacToe';
import Minesweeper from './minesweeper/game';
import Sudoku from './sudoku/sudoku';
import { MenuProvider, default as MenuContext } from './context/MenuContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { isMobileDevice } from './utility/helpers';

const Home = () => {
  const [mode, setMode] = useState('GUI');
  const { isExpanded, handleToggle } = useContext(MenuContext);

  return (
    <>
      <nav className="topNav">
        <div className="leftDiv">
          <span>
            <GiHamburgerMenu 
              className="arrowButton" 
              onClick={handleToggle}
              style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
              aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
          />
          </span>
        </div>
        <div className="middleDiv">
          <h1 id = "headerH1">Arvind Narayanan</h1>
          <p className="name-heading">Engineering inside...</p>
        </div>
        <div className='navDiv'>
          <div>
            <button onClick={() => setMode('GUI')} className="terminalLink" id={mode === 'GUI' ? 'cliLink' : 'guiLink'}>
              GUI
            </button>
          </div>
          <div>
            <button onClick={() => setMode('Terminal')} className="terminalLink" id={mode === 'Terminal' ? 'cliLink' : 'guiLink'}>
              {isMobileDevice() ? 'CLI' : 'Terminal'}
            </button>
          </div>    
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
        <Route path="/" element={<MenuProvider><Home /></MenuProvider>} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/minesweeper" element={<Minesweeper />} />
        <Route path="/sudoku" element={<Sudoku />} />
      </Routes>
    </Router>
  );
};

export default App;