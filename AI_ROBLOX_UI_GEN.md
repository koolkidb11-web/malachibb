# AI Roblox UI Generator Documentation

## Overview

The **AI Roblox UI Generator** uses GPT-4 to create custom, production-ready Roblox UI code based on natural language descriptions. Instead of selecting from templates, you describe what you want and AI generates the complete Lua code.

## Features

### 🤖 Three AI Modes

#### 1. **Generate** - Create Custom UI from Description
Describe your UI in natural language and AI creates the complete Lua code.

**Example:**
```
Input: "Create a Pacific Ocean themed inventory menu with blue waves, shell icons, and tropical colors"
Output: Complete Lua code with themed UI components
```

**Supported Themes:**
- Modern
- Cyberpunk
- Fantasy
- Steampunk
- Minimalist
- Dark
- Tropical
- Neon

#### 2. **Enhance** - Improve Existing Code
Take generated code and request AI enhancements.

**Enhancement Examples:**
- "Add smooth animations to the buttons"
- "Add hover effects and transitions"
- "Make it mobile responsive"
- "Add sound effects on click"
- "Improve the color scheme"

#### 3. **Suggestions** - Get Design Ideas
Ask AI for design recommendations based on UI type and purpose.

**Example:**
```
Input: Type: "Cyberpunk", Purpose: "Leaderboard display"
Output: Color suggestions, layout ideas, component recommendations
```

## API Endpoints

### Generate Custom UI
**POST** `/api/roblox-ai/generate-roblox-ui`

**Authentication:** Required (Free/Plus tier)

**Request Body:**
```json
{
  "description": "Create a Pacific Ocean themed inventory menu",
  "theme": "tropical",
  "colors": ["#FF6B6B", "#4ECDC4", "#1A535C"]
}
```

**Response:**
```json
{
  "uiCode": "-- Generated Lua code here...",
  "requestsRemaining": 8,
  "theme": "tropical",
  "description": "Create a Pacific Ocean themed inventory menu"
}
```

### Enhance Existing Code
**POST** `/api/roblox-ai/enhance-ui`

**Request Body:**
```json
{
  "code": "-- Existing Lua code",
  "enhancement": "Add animations and improve colors"
}
```

**Response:**
```json
{
  "enhancedCode": "-- Improved Lua code",
  "originalCode": "-- Original code backup",
  "requestsRemaining": 7
}
```

### Get UI Suggestions
**POST** `/api/roblox-ai/ui-suggestions`

**Request Body:**
```json
{
  "type": "cyberpunk",
  "purpose": "Leaderboard display"
}
```

**Response:**
```json
{
  "suggestions": "{
    \"colors\": [\"#00FF41\", \"#FF00FF\"],
    \"layout\": \"Vertical with neon borders\",
    \"components\": [\"Animated buttons\", \"Gradient backgrounds\"],
    \"bestPractices\": [...]
  }",
  "requestsRemaining": 6
}
```

## Usage Examples

### Example 1: Pacific Ocean Inventory
```
Description: "Create a Pacific Ocean themed inventory UI with:
- Blue color scheme (ocean blue, cyan, teal)
- Shell icons on buttons
- Wave-like design at top
- Treasure chest for items display
- Tropical fish decorations"

Theme: Tropical
Colors: [#1A5276, #0E7BA7, #F39C12]
```

**AI Generated:**
```lua
-- Pacific Ocean Themed Inventory
local screenGui = Instance.new("ScreenGui")
local mainFrame = Instance.new("Frame")
mainFrame.BackgroundColor3 = Color3.fromHex("#1A5276")
-- ... Complete code with tropical theme
```

### Example 2: Cyberpunk Shop
```
Description: "Cyberpunk shopping interface with:
- Neon green/pink color scheme
- Glitch effects on buttons
- Animated price counters
- Item preview window
- Purchase confirmation dialog"

Theme: Cyberpunk
Colors: [#00FF41, #FF00FF, #00FFFF]
```

### Example 3: Fantasy RPG Menu
```
Description: "Fantasy RPG main menu with:
- Medieval scroll background
- Gold and brown colors
- Quest log display
- Character stats panel
- Enchanted button effects"

Theme: Fantasy
Colors: [#8B4513, #FFD700, #654321]
```

## Theme Details

| Theme | Colors | Use Case | Style |
|-------|--------|----------|-------|
| **Modern** | Blue/Gray | General games | Clean, minimal |
| **Cyberpunk** | Neon/Dark | Futuristic games | Glitchy, high-tech |
| **Fantasy** | Gold/Brown | RPGs | Medieval, ornate |
| **Steampunk** | Bronze/Copper | Adventure | Gears, industrial |
| **Minimalist** | B&W | All games | Simple, readable |
| **Dark** | Dark tones | Horror/Mystery | Ominous, moody |
| **Tropical** | Ocean/Green | Relaxing | Vibrant, nature |
| **Neon** | Bright colors | Arcade | Retro, flashy |

## Best Practices

✅ **Do:**
- Be specific in descriptions (colors, layout, purpose)
- Start with a base generation, then enhance
- Ask for suggestions before generating
- Include the intended use case
- Mention desired animations/effects

❌ **Don't:**
- Ask for extremely complex 3D UI (Roblox is 2D UI focused)
- Ignore the theme you selected
- Generate huge amounts of code at once
- Use copyrighted material descriptions

## Tier Limits

| Tier | Daily Requests | Speed | Support |
|------|----------------|-------|----------|
| **Free** | 10/day | Standard | Community |
| **Plus** | Unlimited | Faster | Priority |

## Error Handling

### Daily Limit Exceeded
```json
{
  "error": "Daily request limit reached. Upgrade to Plus for unlimited requests."
}
```

### Missing Parameters
```json
{
  "error": "UI description is required"
}
```

### Invalid Theme
AI will still generate code but may not match the theme perfectly.

## Generated Code Quality

All AI-generated code includes:
- ✅ Complete working implementation
- ✅ UICorner for modern styling
- ✅ Proper Color3.fromHex() usage
- ✅ Event handlers for buttons
- ✅ Comments explaining each section
- ✅ Best practices for Roblox
- ✅ ScreenGui setup
- ✅ LocalPlayer integration

## Example Generated Code

```lua
-- Pacific Ocean Themed Inventory UI
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "OceanInventory"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Main Frame with Ocean Blue
local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0.5, 0, 0.7, 0)
mainFrame.Position = UDim2.new(0.25, 0, 0.15, 0)
mainFrame.BackgroundColor3 = Color3.fromHex("#1A5276")
mainFrame.BorderSizePixel = 0
mainFrame.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = mainFrame

-- ... More components
```

## Future Enhancements

- [ ] Real-time preview in browser
- [ ] Multi-component generation
- [ ] Animation presets
- [ ] Accessibility improvements
- [ ] Mobile optimization
- [ ] Team collaboration features
- [ ] UI component library
- [ ] Version history/undo system

## Support

For issues or questions:
1. Check error messages
2. Review theme documentation
3. Try a simpler description first
4. Contact support if persisting
