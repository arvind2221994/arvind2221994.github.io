import React, { useState, useRef, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import './sudoku.css';
import Footer from '../Footer';

const numRegex = /^[1-9]$/;
const GameContext = createContext();

function Square({ isVisible, row, col }) {
    //const { result } = useContext(GameContext);
    const className = `cell r${row} c${col} ${isVisible ? 'grey': 'white'}`;
    const handleKeyDown = useCallback((e) => {
        // Block any key that isn't a digit from 1-9
        if (!numRegex.test(e.key)) {
            e.preventDefault();
        }
    }, []);
    const inputFn = useCallback((e) => {
        numRegex.test(e.target.value) ? e.target.value = e.target.value : '';
    }, []);

  return (
    <input id={`r${row}-c${col}`} className={className} disabled={isVisible} type="number" min="1" max="9" onKeyDown={handleKeyDown} onChange={inputFn}></input>
  );
}

/* function ResultMessage() {
    const { result } = useContext(GameContext);
    
    if (result === -1) return null; // Don't render anything if game is ongoing

    return (
        <div className='message'>
            {result===1 && (<div className='success'>
                Congratulations! You have cleared the minefield!
            </div>)}
            {result===0 && (<div className='failure'>
                Game Over! You clicked on a mine.
            </div>)}
        </div>
    );
}
 */
export default function Sudoku(){
    const [size, setSize] = useState(9);
    const selectedSizeRef = useRef(size);
    const [squares, setSquares] = useState(Array(size * size).fill(null).map(() => Math.floor(Math.random() * 9) + 1));
    const [visibleSquares, setVisibleSquares] = useState(-1);

    const isWin = useMemo(()=>{
        // Check if all guesses are correct
        if(!squares.length) return false;
    }, [squares]);

    useEffect(()=>{
        if(isWin){
            console.log("Congratulations! You have completed the grid!");
            document.getElementById('new-cta')?.classList.add('prompt-animation');
        }
    }, [isWin]);

    function handleSquareClick(index) {
        
    }
/* 
    function renderBoard() {
        setResult(-1); // Reset game result
        const newSize = selectedSizeRef.current;
        setSize(newSize);
        const size = newSize * newSize;
        const numMines = Math.floor(size/5);
        const newSquares = Array(size).fill(0);
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const randomIndex = Math.floor(Math.random() * size);
            if (newSquares[randomIndex] === 0) {
                newSquares[randomIndex] = 1; // 1 represents a mine
                minesPlaced++;
            }
        }
        setSquares(newSquares);
        document.getElementById('new-cta')?.classList.remove('prompt-animation');
    }

    useEffect(() => {
        renderBoard();
    }, []); */

    return (
        <GameContext.Provider>
        <header className='header'>
        <h1>Sudoku game</h1>
        <p>
            This is a simple Sudoku game built with React. Write your solution in the grid. Enjoy playing!
        </p>
        </header>
        <div className="sudoku">
            <div className="sudoku-controls">
                <button id="new-cta" /* onClick={renderBoard} */>New Game</button>
                <button id="undo-cta" /* onClick={undoStep} */>Undo</button>
            </div>
            <div className="sudoku-board">
                <div className='grid' style={{gridTemplateColumns: `repeat(9, 1fr)`}}>
                    {squares.map((square, i) => (
                        <Square key={i} isVisible={square} row={Math.floor(i/9)} col={i%9} />
                    ))}
                </div>
            </div>
        </div>
        <Footer style={{position: 'relative'}}/>
        </GameContext.Provider>
    );
}