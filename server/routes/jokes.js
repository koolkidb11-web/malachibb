const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get a random joke from JokeAPI
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
    
    let joke = '';
    if (response.data.type === 'single') {
      joke = response.data.joke;
    } else {
      joke = `${response.data.setup}\n${response.data.delivery}`;
    }

    res.json({
      joke,
      category: response.data.category,
      type: response.data.type,
      safe: response.data.safe
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get a joke by category (Programming, Knock-Knock, General, Christmas)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['Programming', 'Knock-Knock', 'General', 'Christmas', 'Spooky', 'Any'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ 
        error: 'Invalid category',
        validCategories 
      });
    }

    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
    
    let joke = '';
    if (response.data.type === 'single') {
      joke = response.data.joke;
    } else {
      joke = `${response.data.setup}\n${response.data.delivery}`;
    }

    res.json({
      joke,
      category: response.data.category,
      type: response.data.type,
      safe: response.data.safe
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get multiple random jokes
router.get('/multiple/:count', async (req, res) => {
  try {
    const { count } = req.params;
    const numJokes = Math.min(Math.max(1, parseInt(count)), 10); // Limit between 1-10
    
    const jokes = [];
    for (let i = 0; i < numJokes; i++) {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
      
      let joke = '';
      if (response.data.type === 'single') {
        joke = response.data.joke;
      } else {
        joke = `${response.data.setup}\n${response.data.delivery}`;
      }

      jokes.push({
        joke,
        category: response.data.category,
        type: response.data.type,
        safe: response.data.safe
      });
    }

    res.json({ jokes, count: jokes.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jokes', details: error.message });
  }
});

module.exports = router;
