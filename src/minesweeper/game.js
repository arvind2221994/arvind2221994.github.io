import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import './game.css';
import Footer from '../Footer';

const GameContext = createContext();

function Square({ isMine }) {
    const [isOpened, setIsOpened] = useState(false);
    const { setResult } = useContext(GameContext);

    function onSquareClick() {
        if(!isOpened){
            if(isMine){
                console.log("Game Over! You clicked on a mine.");
                setResult(0); // Set game over state
            } else {
                console.log("Safe! No mine here.");
            }
            setIsOpened(true);
        }
    }
    const className = `square ${isOpened ? (isMine ? 'goodbye' : 'opened') : ''}`;

  return (
    <button className={className} onClick={onSquareClick} disabled={isOpened} data-mine={isMine}></button>
  );
}

function ResultMessage() {
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

export default function Minesweeper(){
    const [difficulty, setDifficulty] = useState(8);
    const selectedDifficultyRef = useRef(difficulty);
    const [squares, setSquares] = useState(Array(difficulty * difficulty).fill(0));
    const [result, setResult] = useState(-1);

    function handleDifficultyChange(event) {
        const newDifficulty = parseInt(event.target.value, 10);
        selectedDifficultyRef.current = newDifficulty;
    }

    function renderBoard() {
        const newDifficulty = selectedDifficultyRef.current;
        setDifficulty(newDifficulty);
        const size = newDifficulty * newDifficulty;
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
    }

    const boardStyle = {
        gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
    };

    useEffect(() => {
        renderBoard();
    }, []);

    return (
        <GameContext.Provider value={{ result, setResult }}>
        <header className='header'>
        <h1>Minesweeper game</h1>
        <p>
            This is a simple Minesweeper game built with React. Click on a square to make your move. The game will automatically detect wins and draws. Enjoy playing!
        </p>
        </header>
        <div className="game">
            <div className="game-controls">
                <button onClick={renderBoard}>New Game</button>
                <label>Difficulty: &nbsp;
                    <select id='difficulty' defaultValue={difficulty} onChange={handleDifficultyChange}>
                        <option value={8}>Easy</option>
                        <option value={16}>Medium</option>
                        <option value={24}>Hard</option>
                    </select>
                </label>
            </div>
            <div className="game-board">
                <div className='grid' style={boardStyle}>
                    {squares.map((square, i) => (
                        <Square key={i} isMine={square} />
                    ))}
                </div>
                {result!==-1 && (<ResultMessage />)}
            </div>
        </div>
        <Footer />
        </GameContext.Provider>
    );
}