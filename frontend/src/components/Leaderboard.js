import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/scores`)
      .then(res => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching scores:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : scores.length === 0 ? (
        <p>No scores yet. Be the first!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.playerName}</td>
                <td>{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Leaderboard;
