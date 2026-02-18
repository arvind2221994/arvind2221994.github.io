import React, { useState, useContext, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TerminalUI from './TerminalUI';
const TicTacToe = lazy(() => import('./tictactoe/TicTacToe'));
const Minesweeper = lazy(() => import('./minesweeper/game'));
const Sudoku = lazy(() => import('./sudoku/sudoku'));
const HomePage = lazy(() => import('./HomePage'));
import { isMobileDevice } from './utility/helpers';
import { MenuProvider } from './context/MenuContext';

const Home = () => {
  const [mode, setMode] = useState('GUI');

  return (
    <>
    <header className="header">
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
    </header>
      <>
         {mode === 'Terminal' ? <TerminalUI /> : <HomePage />}
      </>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MenuProvider><Home /></MenuProvider>} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/sudoku" element={<Sudoku />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;