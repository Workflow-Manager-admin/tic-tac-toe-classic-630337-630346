import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.includes(null) ? null : 'Draw';
}

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const winner = calculateWinner(squares);
  const currentPlayer = xIsNext ? 'X' : 'O';
  
  const handleClick = (i) => {
    if (squares[i] || winner) return;
    
    const newSquares = squares.slice();
    newSquares[i] = currentPlayer;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winner === 'Draw') {
    status = "It's a Draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Current Player: ${currentPlayer}`;
  }

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
