import React, { useState, useRef } from 'react';
import './game.css';
import Footer from '../Footer';
function Square({value,onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Minesweeper(){
    const [difficulty, setDifficulty] = useState(10);
    const selectedDifficultyRef = useRef(difficulty);
    const [squares, setSquares] = useState(Array(difficulty * difficulty).fill(null));

    function handleSquareClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }

    function handleDifficultyChange(event) {
        const newDifficulty = parseInt(event.target.value, 10);
        selectedDifficultyRef.current = newDifficulty;
    }

    function renderBoard() {
        const newDifficulty = selectedDifficultyRef.current;
        setDifficulty(newDifficulty);
        setSquares(Array(newDifficulty * newDifficulty).fill(null));
    }

    const boardStyle = {
        gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
    };

    return (
        <>
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
                        <Square key={i} value={square} onSquareClick={() => handleSquareClick(i)} />
                    ))}
                </div>
                
            </div>
        </div>
        <Footer />
        </>
    );
}