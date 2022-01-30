import React, { useState } from 'react';
import ReactDom from 'react-dom';

import './index.css';

const Square = (props) => {
 
  return (
    <button 
    className='square'
    onClick={props.onClickEvent }
    >
      {props.value}
    </button>
  );
};

const Board = () => {
const initialSquares = Array(9).fill(null);
const [squares, setSquares] = useState(initialSquares);

const [xIsNext, setXIsNext] = useState(true);

const handleClickEvent = (i) => {
  // 1 make copy square state array
  const newSquares = [...squares];

 const winnerDeclared = Boolean(calculateWinner(newSquares));
 const squareFilled = Boolean(newSquares[i]);
 if(winnerDeclared || squareFilled) {
   return;
 }
  //2 mutate the copy, setting i-th element to X
  newSquares[i] = xIsNext ? 'X' : '0';
  //3 call the setSquares
  setSquares(newSquares);
  setXIsNext(!xIsNext);
};

  const renderSquare = (i) => {
    return (
      <Square 
      value={squares[i]}
      onClickEvent = {() => handleClickEvent(i)}
       />
    );
  };
const winner = calculateWinner(squares);
  const status = winner ?
  `Winner: ${winner}`:
  `Next player: ${xIsNext ? 'X' : '0'}`;


  return (
    <div>
      <div className='status'>{status}</div>
      <div className='boardrow'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className='boardrow'>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className='boardrow'>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
      </div>
      );
};

const Game = () => {
  return (
      <div className='game'>
       Tic-Tac-Toe
        <Board />
      </div>
      );
};

      ReactDom.render(
      <Game />,
      document.getElementById('root')
      );

function calculateWinner(squares){
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6], //diagonals
  ];

  for(let line of lines){
    const [a, b, c] = line;

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]; //'X' or '0'
    } 
  }
  return null;
}