import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function GameOver({ score, onRestart, onExit }) {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveScore = async () => {
    if (!playerName.trim()) return;
    setSaving(true);
    try {
      await axios.post(`${API_URL}/api/scores`, { playerName, score });
      setSaved(true);
    } catch (err) {
      console.error('Error saving score:', err);
    }
    setSaving(false);
  };

  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>Game Over!</h2>
        <p>Your Score: <strong>{score}</strong></p>
        {!saved ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              maxLength={20}
            />
            <button onClick={saveScore} disabled={saving || !playerName.trim()}>
              {saving ? 'Saving...' : 'Save Score'}
            </button>
          </>
        ) : (
          <p className="saved-msg">✅ Score saved!</p>
        )}
        <button onClick={onRestart}>Play Again</button>
        <button onClick={onExit}>Home</button>
      </div>
    </div>
  );
}

export default GameOver;
