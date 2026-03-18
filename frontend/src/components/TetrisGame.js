import React, { useState, useEffect, useCallback } from 'react';
import GameOver from './GameOver';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY = 0;

const PIECES = [
  { shape: [[1,1,1,1]], color: '#00f0f0' },
  { shape: [[1,1],[1,1]], color: '#f0f000' },
  { shape: [[0,1,0],[1,1,1]], color: '#a000f0' },
  { shape: [[1,0],[1,0],[1,1]], color: '#f0a000' },
  { shape: [[0,1],[0,1],[1,1]], color: '#0000f0' },
  { shape: [[0,1,1],[1,1,0]], color: '#00f000' },
  { shape: [[1,1,0],[0,1,1]], color: '#f00000' },
];

const createBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(EMPTY));

const randomPiece = () => {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    shape: p.shape,
    color: p.color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(p.shape[0].length / 2),
    y: 0,
  };
};

const isValid = (board, piece, offsetX = 0, offsetY = 0, shape = piece.shape) => {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const newX = piece.x + c + offsetX;
      const newY = piece.y + r + offsetY;
      if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false;
      if (newY >= 0 && board[newY][newX] !== EMPTY) return false;
    }
  }
  return true;
};

const rotate = shape => {
  const rows = shape.length, cols = shape[0].length;
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => shape[rows - 1 - r][c])
  );
};

const mergePiece = (board, piece) => {
  const newBoard = board.map(row => [...row]);
  piece.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell && piece.y + r >= 0) {
        newBoard[piece.y + r][piece.x + c] = piece.color;
      }
    });
  });
  return newBoard;
};

const clearLines = board => {
  const newBoard = board.filter(row => row.some(cell => cell === EMPTY));
  const cleared = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array.from({ length: cleared }, () => Array(BOARD_WIDTH).fill(EMPTY));
  return { board: [...emptyRows, ...newBoard], cleared };
};

function TetrisGame({ onExit }) {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(randomPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const drop = useCallback(() => {
    if (gameOver || paused) return;
    if (isValid(board, piece, 0, 1)) {
      setPiece(p => ({ ...p, y: p.y + 1 }));
    } else {
      const merged = mergePiece(board, piece);
      const { board: cleared, cleared: lines } = clearLines(merged);
      setScore(s => s + lines * 100);
      const next = randomPiece();
      if (!isValid(cleared, next)) {
        setBoard(cleared);
        setGameOver(true);
      } else {
        setBoard(cleared);
        setPiece(next);
      }
    }
  }, [board, piece, gameOver, paused]);

  useEffect(() => {
    const interval = setInterval(drop, 500);
    return () => clearInterval(interval);
  }, [drop]);

  useEffect(() => {
    const handleKey = e => {
      if (gameOver || paused) return;
      if (e.key === 'ArrowLeft' && isValid(board, piece, -1, 0))
        setPiece(p => ({ ...p, x: p.x - 1 }));
      else if (e.key === 'ArrowRight' && isValid(board, piece, 1, 0))
        setPiece(p => ({ ...p, x: p.x + 1 }));
      else if (e.key === 'ArrowDown' && isValid(board, piece, 0, 1))
        setPiece(p => ({ ...p, y: p.y + 1 }));
      else if (e.key === 'ArrowUp') {
        const rotated = rotate(piece.shape);
        if (isValid(board, piece, 0, 0, rotated))
          setPiece(p => ({ ...p, shape: rotated }));
      } else if (e.key === ' ') {
        let newY = piece.y;
        while (isValid(board, { ...piece, y: newY + 1 })) newY++;
        setPiece(p => ({ ...p, y: newY }));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board, piece, gameOver, paused]);

  const renderBoard = () => {
    const display = board.map(row => [...row]);
    if (!gameOver) {
      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell && piece.y + r >= 0) {
            display[piece.y + r][piece.x + c] = piece.color;
          }
        });
      });
    }
    return display;
  };

  const handleRestart = () => {
    setBoard(createBoard());
    setPiece(randomPiece());
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  return (
    <div className="tetris-wrapper">
      <div className="tetris-info">
        <h2>🎮 Tetris</h2>
        <p>Score: <strong>{score}</strong></p>
        <button onClick={() => setPaused(p => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={onExit}>Exit</button>
        <div className="controls">
          <p>Controls:</p>
          <p>⬅ ➡ Move</p>
          <p>⬆ Rotate</p>
          <p>⬇ Soft Drop</p>
          <p>Space Hard Drop</p>
        </div>
      </div>
      <div className="tetris-board">
        {renderBoard().map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="cell"
              style={{ backgroundColor: cell || '#1a1a2e' }}
            />
          ))
        )}
      </div>
      {gameOver && (
        <GameOver
          score={score}
          onRestart={handleRestart}
          onExit={onExit}
        />
      )}
      {paused && !gameOver && (
        <div className="gameover-overlay">
          <div className="gameover-box">
            <h2>⏸ Paused</h2>
            <button onClick={() => setPaused(false)}>Resume</button>
            <button onClick={onExit}>Exit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TetrisGame;
