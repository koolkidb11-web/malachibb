# Roblox UI Generator Documentation

## Overview

The **Roblox UI Generator** is a professional-grade tool for creating GUI code for Roblox games without writing Lua from scratch. It features a visual editor with live preview, customization options, and instant Lua code generation.

## Features

### 🎯 8+ UI Component Types

1. **Button** - Clickable text button with hover effects
2. **Text Label** - Static text display element
3. **Text Input Box** - User input field with event handling
4. **Frame** - Container for other UI elements
5. **Scroll Frame** - Scrollable list container
6. **Progress Bar** - Animated progress indicator
7. **Image Button** - Image-based clickable button
8. **Dropdown Menu** - Selectable dropdown list

### 🎨 Customization Options

- **Text Content** - Custom text for labels and buttons
- **Background Color** - Full RGB color picker
- **Text Color** - Text color customization
- **Size** - 4 preset sizes (Small, Medium, Large, X-Large)
- **Corner Radius** - 0-20px adjustable corners
- **Stroke Thickness** - 0-5px border thickness
- **Stroke Color** - Custom border color

### 💻 Code Generation

- Real-time Lua code generation
- Copy-to-clipboard functionality
- Production-ready code
- Fully commented for easy modification
- Event handlers included

## UI Component Details

### Button
Clickable text button with built-in hover effects and click events.

**Features:**
- Mouse hover color change
- Click event handler
- Customizable appearance
- Border and corner radius support

**Generated Properties:**
```lua
button.Size = UDim2.new(0, 150, 0, 40)
button.BackgroundColor3 = Color3.fromHex("#FF6B6B")
button.TextSize = 18
button.Font = Enum.Font.GothamBold
```

### Text Label
Static text display for showing information.

**Features:**
- Multiple font options
- Custom text color
- Border support
- Scalable sizing

### Text Input Box
User input field for collecting player input.

**Features:**
- Placeholder text
- Focus detection
- Event handling on text submission
- Custom styling

### Frame
Container element for building complex UIs.

**Features:**
- Supports child elements
- UIListLayout for automatic arrangement
- Shadow effects
- Customizable background

### Scroll Frame
Scrollable container for lists and long content.

**Features:**
- Automatic UIListLayout
- Configurable scroll bar
- Sample items included
- Canvas size auto-calculation

### Progress Bar
Animated progress indicator.

**Features:**
- Smooth animation
- Customizable fill color
- Background styling
- Value-based sizing

### Image Button
Image-based clickable button.

**Features:**
- Custom image support
- Background color overlay
- Click event handler
- Size customization

### Dropdown Menu
Selectable dropdown list.

**Features:**
- Toggle visibility
- Multiple options
- Custom styling
- Option selection handling

## Color Format

Colors are specified in Hex format (e.g., `#FF6B6B`) which is automatically converted to Roblox Color3:

```lua
Color3.fromHex("#FF6B6B")
```

## Size Presets

| Preset | Dimensions | Use Case |
|--------|-----------|----------|
| **Small** | 100x32 | Compact buttons |
| **Medium** | 150x40 | Standard buttons |
| **Large** | 200x50 | Primary action buttons |
| **X-Large** | 250x60 | Large interactive elements |

## Generated Code Example

```lua
-- Create Button UI
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ButtonGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Button
local button = Instance.new("TextButton")
button.Name = "CustomButton"
button.Size = UDim2.new(0, 150, 0, 40)
button.Position = UDim2.new(0.5, -75, 0.5, -20)
button.BackgroundColor3 = Color3.fromHex("#FF6B6B")
button.TextColor3 = Color3.fromHex("#FFFFFF")
button.TextSize = 18
button.Font = Enum.Font.GothamBold
button.Text = "Click Me"
button.BorderSizePixel = 1
button.BorderColor3 = Color3.fromHex("#000000")
button.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 8)
corner.Parent = button

-- Button Click Event
button.MouseButton1Click:Connect(function()
    print("Button clicked!")
    -- Add your code here
end)

-- Mouse Hover Effects
button.MouseEnter:Connect(function()
    button.BackgroundColor3 = Color3.fromHex("#FF8A8A")
end)

button.MouseLeave:Connect(function()
    button.BackgroundColor3 = Color3.fromHex("#FF6B6B")
end)
```

## How to Use Generated Code

1. **Copy the code** from the generator
2. **Open Roblox Studio**
3. **Insert a LocalScript** in StarterPlayer > StarterGui
4. **Paste the code**
5. **Test your game** (F5 or Play button)
6. **Customize further** with your own event handlers and logic

## Best Practices

✅ **Do:**
- Use meaningful UI names for better organization
- Add comments to explain custom modifications
- Test UI responsiveness on different screen sizes
- Use consistent color schemes
- Optimize with UIAspectRatioConstraint for scaling

❌ **Don't:**
- Modify generated structure unless necessary
- Use excessive transparency
- Create too many UI elements at once (performance)
- Use non-standard fonts
- Forget to test on mobile devices

## Common Customizations

### Adding Click Sounds
```lua
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://1234567890"
sound.Parent = button

button.MouseButton1Click:Connect(function()
    sound:Play()
end)
```

### Adding Tweens (Animation)
```lua
local TweenService = game:GetService("TweenService")
local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Quad)
local goal = {BackgroundColor3 = Color3.fromHex("#00FF00")}
local tween = TweenService:Create(button, tweenInfo, goal)

button.MouseButton1Click:Connect(function()
    tween:Play()
end)
```

### Disabling Button
```lua
button.Active = false
button.BackgroundColor3 = Color3.fromHex("#CCCCCC")
button.TextColor3 = Color3.fromHex("#666666")
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| UI not visible | Check that ScreenGui.Parent = playerGui |
| Click events not working | Ensure LocalScript location (StarterGui/StarterPlayer) |
| Colors look wrong | Verify Hex color format (#RRGGBB) |
| UI overlap issues | Use UDim2 positioning with proper coordinates |
| Text too small/large | Adjust TextSize property |

## Performance Tips

- Batch create UI elements
- Use UIListLayout instead of manual positioning
- Limit update frequency
- Clean up unused UI with :Destroy()
- Use ObjectValue for references instead of searching

## API Integration

The Roblox UI Generator is accessible via:
- **Route:** `/roblox-ui`
- **Type:** Public (no authentication required)
- **Response:** HTML with interactive editor

## Future Enhancements

- [ ] Template library
- [ ] Theme presets
- [ ] Animation builder
- [ ] Export to file
- [ ] Undo/Redo functionality
- [ ] Responsive layout tools
- [ ] Lua code validation
- [ ] Online preview in Roblox
