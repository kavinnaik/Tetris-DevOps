import React, { useState } from 'react';
import TetrisGame from './components/TetrisGame';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [screen, setScreen] = useState('home'); // home, game, leaderboard

  return (
    <div className="app">
      {screen === 'home' && (
        <div className="home">
          <h1>🎮 Tetris</h1>
          <button onClick={() => setScreen('game')}>Play Game</button>
          <button onClick={() => setScreen('leaderboard')}>Leaderboard</button>
        </div>
      )}
      {screen === 'game' && (
        <TetrisGame onExit={() => setScreen('home')} />
      )}
      {screen === 'leaderboard' && (
        <Leaderboard onBack={() => setScreen('home')} />
      )}
    </div>
  );
}

export default App;
