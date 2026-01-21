import React, { useState, useRef, useEffect, useCallback, use } from 'react';
import './sudoku.css';
import Confetti from 'react-confetti';
import Footer from '../footer/Footer';
import { FaUndo } from "react-icons/fa";
import { TbDeviceGamepad2 } from "react-icons/tb";
import Header from '../header';

const numRegex = /^[1-9]$/;

function Square({ isVisible, value, row, col }) {
    const [inputValue, setInputValue] = useState(isVisible ? value : '');
    const valRef = useRef(value);
    useEffect(() => {
        setInputValue(isVisible ? value : '');
        valRef.current = value;
    }, [isVisible, value]);

    const className = `cell r${row} c${col} ${isVisible ? 'grey' : 'white'}`;
    
    const handleKeyDown = useCallback((e) => {
        if (!numRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }
    }, []);

    const verifyEntry = useCallback((target) => {
        const elem = target;
        const entry = elem.value;
        if (entry === '') return true;
        const correctValue = valRef.current;
        if (Number(entry) !== correctValue) {
            elem.classList.add('incorrect');
            return false;
        } else {
            elem.classList.remove('incorrect');
        }
        return true;
    }, [valRef]);

    const handleChange = useCallback((e) => {
        const entry = e.target.value;
        if (numRegex.test(entry) || entry === '') {
            setInputValue(entry);
        }
        verifyEntry(e.target);
    }, [verifyEntry]);

    return (
        <input 
            id={`r${row}-c${col}`} 
            className={className} 
            value={inputValue} 
            disabled={isVisible} 
            type="number" 
            maxLength="1"
            onKeyDown={handleKeyDown} 
            onChange={handleChange}
        />
    );
}

function initSudoku(size=9, clues) {
    const board = Array.from({ length: size }, () => Array(size).fill(0));

    // Fills the grid using a backtracking algorithm
    function solve(grid) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === 0) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (let num of nums) {
                        if (isSafe(grid, i, j, num)) {
                            grid[i][j] = num;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[i][j] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Checks if a number can be placed in a given cell
    function isSafe(grid, row, col, num) {
        // Check row
        for (let x = 0; x < size; x++) {
            if (grid[row][x] === num) {
                return false;
            }
        }
        // Check column
        for (let x = 0; x < size; x++) {
            if (grid[x][col] === num) {
                return false;
            }
        }
        // Check 3x3 subgrid
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    solve(board);

    // Flatten the 2D board into a 1D array of square objects
    const squares = board.flat().map(val => ({ value: val, isVisible: false }));

    // Make {clues} cells visible
    let count = 0;
    while (count < clues) {
        const index = Math.floor(Math.random() * squares.length);
        if (!squares[index].isVisible) {
            squares[index].isVisible = true;
            count++;
        }
    }

    return squares;
}

export default function Sudoku(){
    const [size, setSize] = useState(9);
    const [showDifficultyMenu, setShowDifficultyMenu] = useState(true);
    const [difficulty, setDifficulty] = useState(35);
    const [gameId, setGameId] = useState(1);
    
    const [squares, setSquares] = useState(() => initSudoku(size, difficulty));

    const isWin = function() {
        const incorrectCells = document.getElementsByClassName('incorrect');
        if(incorrectCells.length > 0){
            return false;
        }
        const cells = document.getElementsByClassName('cell');
        if(!cells || cells.length===0) return false;
        for(let i=0;i<cells.length;i++){
            if(cells[i].value === ''){
                return false;
            }
            if(Number(cells[i].value) !== squares[i].value){
                return false;
            }
        }
        return true;
    };

    function startNewGame(clues) {
        setShowDifficultyMenu(false);
        setTimeout(() => {
            setGameId(prevId => prevId + 1);
            setSquares(initSudoku(size, clues));
        }, 300);
        document.getElementById('new-cta')?.classList.remove('prompt-animation');
    }

    useEffect(() => {
        if (isWin()) {
            document.getElementById('new-cta')?.classList.add('prompt-animation');
        }
    }, [squares]);

    return (
        <>
        <Header name="Sudoku" tagline="" />
            {isWin() && <Confetti
                recycle={false}
                numberOfPieces={500}
                gravity={0.3}
                initialVelocityY={30}
                confettiSource={{
                    x: 0,
                    y: window.innerHeight,
                    w: window.innerWidth,
                    h: 0
                }}
                tweenDuration={3000}
            />}
        <header className='sudoku-header'>
            <p>
                This is a simple Sudoku game built with React. Write your solution in the grid. Enjoy playing!
            </p>
        </header>
        <div className="sudoku">
            <div className="sudoku-controls">
                {!showDifficultyMenu && <button id="new-cta" onClick={() => setShowDifficultyMenu(true)} >
                    <TbDeviceGamepad2 /> New Game</button>}
                {showDifficultyMenu && (
                    <>
                    <div className="difficulty-menu">
                        <label>Select Difficulty:</label>
                        <div className="difficulty-buttons">
                            <button className={difficulty === 35 ? 'selected' : ''} onClick={() => setDifficulty(35)}>Easy</button>
                            <button className={difficulty === 25 ? 'selected' : ''} onClick={() => setDifficulty(25)}>Medium</button>
                            <button className={difficulty === 17 ? 'selected' : ''} onClick={() => setDifficulty(17)}>Hard</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => startNewGame(difficulty)}> <TbDeviceGamepad2 /> Start game</button>
                    </div>
                    </>
                )}
                
            </div>
            {!showDifficultyMenu && (
                <div className="sudoku-board">
                    <div className='grid' style={{gridTemplateColumns: `repeat(9, 1fr)`}}>
                        {squares.map((square, i) => (
                            <Square key={`${gameId}-${i}`} isVisible={square.isVisible} value={square.value} row={Math.floor(i/9)} col={i%9} />
                        ))}
                    </div>
                </div>
            )}
            <div className="cta">
                {!showDifficultyMenu && (<button id="undo-cta" /* onClick={undoStep} */>
                <FaUndo /> Undo</button>)}
            </div>
        </div>
        <Footer style={{position: 'relative'}}/>
        </>
    );
}