import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './TicTacToe.css';

function Square({value,onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function TicTacToe() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  // add function to check if all squares are null
  function allSquaresNull(squares) {
    return squares.every(square => square === null);
  }
  // add function to check for draw
  function isDraw(squares) {
    return squares.every(square => square !== null) && !calculateWinner(squares);
  }
  // Reset game function
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  if (winner) {
    status = (
      <>
        <strong><u>Winner:</u></strong>&nbsp; {winner}! &nbsp; Would you like to <button onClick={handleReset}> play again?</button>
      </>
    );
  } else if (allSquaresNull(squares)) {
    status = (
      <>
        <strong><u>Game Start</u></strong>&nbsp; X's turn
      </>
    );
  } else if (isDraw(squares)) {
    status = (
      <>
        <strong><u>Draw!</u></strong>&nbsp; Would you like to <br/> <button onClick={handleReset}> restart?</button>
      </>
    );
  } else {
    status = (
      <>
        <strong><u>Next player:</u></strong>&nbsp; {xIsNext ? "X" : "O"}
      </>
    );
  }

  return (
    <>
    {winner && (
      <Confetti 
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
      />
    )}
    <header className='header'>
      <h1>Tic Tac Toe Game</h1>
      <p>
        This is a simple Tic Tac Toe game built with React. Click on a square to make your move. The game will automatically detect wins and draws. Enjoy playing!
      </p>
    </header>
    <div className="game">
      <div className="status">{status}</div>
      <div className="game-board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
    <footer className="footer">
      <p>Developed by Arvind &nbsp;|&nbsp; 
      <a href="https://arvind2221994.github.io/">Portfolio</a>
      </p>
    </footer>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}