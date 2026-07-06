# Joke Generator API Documentation

## Overview
The Joke Generator uses the **JokeAPI** external service to fetch random jokes across multiple categories.

## API Endpoints

### 1. Get Random Joke
**GET** `/api/jokes/random`

Fetches a completely random joke from any category.

**Response:**
```json
{
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
  "category": "Programming",
  "type": "single",
  "safe": true
}
```

### 2. Get Joke by Category
**GET** `/api/jokes/category/:category`

Fetches a joke from a specific category.

**Parameters:**
- `category` (string) - One of: `Programming`, `Knock-Knock`, `General`, `Christmas`, `Spooky`, `Any`

**Response:**
```json
{
  "joke": "What do you call a programmer from Finland? Nerdic!",
  "category": "Programming",
  "type": "single",
  "safe": true
}
```

**Error Response (Invalid Category):**
```json
{
  "error": "Invalid category",
  "validCategories": ["Programming", "Knock-Knock", "General", "Christmas", "Spooky", "Any"]
}
```

### 3. Get Multiple Jokes
**GET** `/api/jokes/multiple/:count`

Fetches multiple random jokes in one request.

**Parameters:**
- `count` (number) - Number of jokes to fetch (1-10, auto-limited)

**Response:**
```json
{
  "jokes": [
    {
      "joke": "Why do programmers prefer dark mode?",
      "category": "Programming",
      "type": "single",
      "safe": true
    },
    {
      "joke": "Setup: Knock knock!\nDelivery: Who's there?",
      "category": "Knock-Knock",
      "type": "twopart",
      "safe": true
    }
  ],
  "count": 2
}
```

## Joke Types

### Single Part
Standalone joke in one line.
```json
{
  "type": "single",
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs!"
}
```

### Two Part
Setup + Delivery format (typically knock-knock or Q&A jokes).
```json
{
  "type": "twopart",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs!"
}
```

## Categories

| Category | Description | Example |
|----------|-------------|----------|
| **Programming** | Tech and coding jokes | "Why do developers make bad partners? They always forget to commit!" |
| **Knock-Knock** | Classic knock-knock format | "Knock knock! Who's there? Joke. Joke who? Joke's on you!" |
| **General** | General humor | "Why did the scarecrow win an award? He was outstanding in his field!" |
| **Christmas** | Holiday-themed jokes | "What do snowmen eat for breakfast? Frosted Flakes!" |
| **Spooky** | Halloween/scary jokes | "Why do ghosts like to take the elevator? They love a lift!" |
| **Any** | Random from all categories | Mixed selection |

## Safe Mode
All jokes are filtered for safety and appropriateness.
- `safe: true` - Family-friendly joke
- `safe: false` - Edgy/adult joke (not returned by default)

## Usage Examples

### JavaScript/Frontend
```javascript
// Get a random joke
const response = await fetch('/api/jokes/random');
const data = await response.json();
console.log(data.joke);

// Get a programming joke
const progJoke = await fetch('/api/jokes/category/Programming');
const progData = await progJoke.json();
console.log(progData.joke);

// Get 5 random jokes
const multiJokes = await fetch('/api/jokes/multiple/5');
const multiData = await multiJokes.json();
console.log(multiData.jokes);
```

### cURL
```bash
# Get random joke
curl http://localhost:5000/api/jokes/random

# Get programming joke
curl http://localhost:5000/api/jokes/category/Programming

# Get 3 jokes
curl http://localhost:5000/api/jokes/multiple/3
```

## Error Handling

### Network Error
```json
{
  "error": "Failed to fetch joke",
  "details": "Error message from JokeAPI"
}
```

### Invalid Category
```json
{
  "error": "Invalid category",
  "validCategories": ["Programming", "Knock-Knock", "General", "Christmas", "Spooky", "Any"]
}
```

## External API

**Provider:** [JokeAPI](https://jokeapi.dev/)

**Base URL:** `https://v2.jokeapi.dev`

**Rate Limits:** None - free tier is unlimited

**Response Time:** ~100-200ms average

## Features

✅ No authentication required for jokes endpoint
✅ Unlimited free jokes
✅ Multiple joke categories
✅ Both single and two-part jokes
✅ Safe mode filtering
✅ Fast response times
✅ 6 different humor categories
✅ Batch joke retrieval (1-10 jokes per request)

## Frontend UI

The Joke Generator page includes:
- 🎲 Random joke button
- 🏷️ Category selector (6 options)
- 📚 Multiple jokes loader (1-10)
- 📱 Responsive design
- ⚡ Real-time loading states
- 🎨 Beautiful dark theme UI

## Future Enhancements

- [ ] Save favorite jokes to database
- [ ] Share jokes on social media
- [ ] Rate jokes (funny/not funny)
- [ ] Search jokes by keyword
- [ ] Custom joke submissions
- [ ] Joke of the day feature
- [ ] Email joke subscriptions
