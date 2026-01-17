import React, { useState, useRef, createContext, useContext, useEffect, useMemo } from 'react';
import './game.css';
import Footer from '../Footer';

const GameContext = createContext();

function Square({ isMine, isOpened, onSquareClick }) {
    const { result } = useContext(GameContext);

    const isGameOver = result !== -1;

    const shouldReveal = (isGameOver && isMine) || isOpened;
    const className = `square ${shouldReveal ? (isMine ? 'goodbye' : 'opened') : ''}`;

  return (
    <button className={className} onClick={onSquareClick} disabled={shouldReveal} data-mine={isMine}></button>
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
    const [openedSquares, setOpenedSquares] = useState([]);

    const isWin = useMemo(()=>{
        if(!squares.length || !openedSquares.length) return false;

        const totalMines = squares.filter(square => square === 1).length;
        const totalOpened = openedSquares.filter(Boolean).length;
        return (squares.length - totalOpened) === totalMines;
    }, [squares, openedSquares]);

    useEffect(()=>{
        if(isWin){
            setResult(1);
            console.log("Congratulations! You have cleared the minefield!");
            document.getElementById('render-cta')?.classList.add('prompt-animation');
        }
    }, [isWin]);

    function handleSquareClick(index) {
        if(result !== -1 || openedSquares[index]) return; 

        setOpenedSquares(prevOpened => {
            const newOpened = [...prevOpened];
            newOpened[index] = true;
            return newOpened;
        });
        if(squares[index] === 1){
            setResult(0); // Game over
            console.log("Game Over! You clicked on a mine.");
            setSquares(prevSquares => prevSquares.map(square => (square === 1 ? 1 : square)));
            document.getElementById('render-cta')?.classList.add('prompt-animation');
        } else {
            console.log("Safe! No mine here.");
        }
    }
    function handleDifficultyChange(event) {
        const newDifficulty = parseInt(event.target.value, 10);
        selectedDifficultyRef.current = newDifficulty;
    }

    function renderBoard() {
        setResult(-1); // Reset game result
        setOpenedSquares([]); // Reset opened squares
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
        document.getElementById('render-cta')?.classList.remove('prompt-animation');
    }

    const boardStyle = {
        gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
    };

    useEffect(() => {
        renderBoard();
    }, []);

    return (
        <GameContext.Provider value={{ result }}>
        <header className='header'>
        <h1>Minesweeper game</h1>
        <p>
            This is a simple Minesweeper game built with React. Click on a square to reveal it. If you click on a mine, you lose. Clear all the squares without mines to win. Enjoy playing!
        </p>
        </header>
        <div className="game">
            <div className="game-controls">
                <button id="render-cta" onClick={renderBoard}>New Game</button>
                <label>Difficulty: &nbsp;
                    <select id='difficulty' defaultValue={difficulty} onChange={handleDifficultyChange}>
                        <option value={8}>Easy</option>
                        <option value={16}>Medium</option>
                        <option value={24}>Hard</option>
                    </select>
                </label>
            </div>
            <div className="game-board">
                {result!==-1 && (<ResultMessage />)}
                <div className='grid' style={boardStyle}>
                    {squares.map((square, i) => (
                        <Square key={i} isMine={square} isOpened={openedSquares[i]} onSquareClick={() => handleSquareClick(i)}/>
                    ))}
                </div>
            </div>
        </div>
        <Footer style={{position: 'relative'}}/>
        </GameContext.Provider>
    );
}