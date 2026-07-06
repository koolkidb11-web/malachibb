const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const User = require('../models/User');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const checkDailyLimit = async (userId, tier) => {
  const user = await User.findById(userId);
  
  if (new Date() > user.dailyRequests.resetAt) {
    user.dailyRequests.count = 0;
    user.dailyRequests.resetAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  const freeLimit = parseInt(process.env.FREE_TIER_DAILY_LIMIT) || 10;
  const limit = tier === 'free' ? freeLimit : Infinity;

  if (user.dailyRequests.count >= limit && tier === 'free') {
    throw new Error('Daily request limit reached. Upgrade to Plus for unlimited requests.');
  }

  return user;
};

// AI Generate Custom Roblox UI
router.post('/generate-roblox-ui', auth, aiLimiter, async (req, res) => {
  try {
    const { description, theme = 'modern', colors = [] } = req.body;
    const user = await checkDailyLimit(req.user.id, req.user.tier);

    if (!description) {
      return res.status(400).json({ error: 'UI description is required' });
    }

    const colorPrompt = colors.length > 0 ? `Use these colors: ${colors.join(', ')}` : '';

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert Roblox GUI designer. Generate professional, production-ready Lua code for Roblox UI elements. 
          Include:
          - Complete, working Lua code
          - UICorner for rounded corners
          - Proper Color3.fromHex() usage
          - Event handlers for buttons
          - Comments explaining each section
          - Best practices for Roblox UI
          Return ONLY valid Lua code, no markdown or explanations.`
        },
        {
          role: 'user',
          content: `Create a Roblox UI with the following description: ${description}
          Theme: ${theme}
          ${colorPrompt}
          Make it visually appealing, professional, and production-ready.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    user.dailyRequests.count++;
    user.totalRequests++;
    await user.save();

    res.json({
      uiCode: response.choices[0].message.content,
      requestsRemaining: user.tier === 'free' 
        ? (parseInt(process.env.FREE_TIER_DAILY_LIMIT) || 10) - user.dailyRequests.count
        : 'unlimited',
      theme,
      description
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// AI Enhance Existing UI Code
router.post('/enhance-ui', auth, aiLimiter, async (req, res) => {
  try {
    const { code, enhancement } = req.body;
    const user = await checkDailyLimit(req.user.id, req.user.tier);

    if (!code || !enhancement) {
      return res.status(400).json({ error: 'Both code and enhancement request are required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Roblox Lua expert. Enhance existing Roblox UI code while maintaining quality and best practices.
          Return ONLY valid Lua code.`
        },
        {
          role: 'user',
          content: `Enhance this Roblox UI code:
          ${code}
          
          Enhancement requested: ${enhancement}
          
          Keep the original structure but improve it as requested.`
        }
      ],
      max_tokens: 2000
    });

    user.dailyRequests.count++;
    user.totalRequests++;
    await user.save();

    res.json({
      enhancedCode: response.choices[0].message.content,
      originalCode: code,
      requestsRemaining: user.tier === 'free' 
        ? (parseInt(process.env.FREE_TIER_DAILY_LIMIT) || 10) - user.dailyRequests.count
        : 'unlimited'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// AI UI Design Suggestions
router.post('/ui-suggestions', auth, aiLimiter, async (req, res) => {
  try {
    const { type, purpose } = req.body;
    const user = await checkDailyLimit(req.user.id, req.user.tier);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a UI/UX designer for Roblox games. Provide helpful suggestions for creating professional UI.
          Format your response as a JSON object with keys: colors, layout, components, bestPractices.`
        },
        {
          role: 'user',
          content: `Suggest design ideas for a ${type} UI used for: ${purpose}`
        }
      ],
      max_tokens: 1000
    });

    user.dailyRequests.count++;
    user.totalRequests++;
    await user.save();

    res.json({
      suggestions: response.choices[0].message.content,
      requestsRemaining: user.tier === 'free' 
        ? (parseInt(process.env.FREE_TIER_DAILY_LIMIT) || 10) - user.dailyRequests.count
        : 'unlimited'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
