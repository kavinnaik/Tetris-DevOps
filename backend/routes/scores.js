const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET top 10 scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new score
router.post('/', async (req, res) => {
  const score = new Score({
    playerName: req.body.playerName,
    score: req.body.score
  });
  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
