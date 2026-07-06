import React, { useState } from 'react';
import api from '../services/api';

const RobloxUIGenerator = () => {
  const [uiType, setUiType] = useState('button');
  const [uiConfig, setUiConfig] = useState({
    text: 'Click Me',
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
    size: 'medium',
    cornerRadius: 8,
    strokeThickness: 1,
    strokeColor: '#000000'
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(true);

  const uiTypes = [
    { id: 'button', name: 'Button', icon: '🔘' },
    { id: 'textlabel', name: 'Text Label', icon: '📝' },
    { id: 'textinput', name: 'Text Box', icon: '✏️' },
    { id: 'frame', name: 'Frame', icon: '📦' },
    { id: 'scrollframe', name: 'Scroll Frame', icon: '📜' },
    { id: 'progressbar', name: 'Progress Bar', icon: '📊' },
    { id: 'imagebutton', name: 'Image Button', icon: '🖼️' },
    { id: 'dropdown', name: 'Dropdown', icon: '▼' }
  ];

  const sizeOptions = {
    small: { width: 100, height: 32 },
    medium: { width: 150, height: 40 },
    large: { width: 200, height: 50 },
    xlarge: { width: 250, height: 60 }
  };

  const generateRobloxUI = () => {
    let code = '';

    switch (uiType) {
      case 'button':
        code = `-- Create Button UI\nlocal Players = game:GetService("Players")
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
button.Size = UDim2.new(0, ${sizeOptions[uiConfig.size].width}, 0, ${sizeOptions[uiConfig.size].height})
button.Position = UDim2.new(0.5, -${sizeOptions[uiConfig.size].width / 2}, 0.5, -${sizeOptions[uiConfig.size].height / 2})
button.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
button.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
button.TextSize = 18
button.Font = Enum.Font.GothamBold
button.Text = "${uiConfig.text}"
button.BorderSizePixel = ${uiConfig.strokeThickness}
button.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
button.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = button

-- Button Click Event
button.MouseButton1Click:Connect(function()
    print("Button clicked!")
    -- Add your code here
end)

-- Mouse Hover Effects
button.MouseEnter:Connect(function()
    button.BackgroundColor3 = Color3.fromHex("${lightenColor(uiConfig.backgroundColor)}")
end)

button.MouseLeave:Connect(function()
    button.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
end)`;
        break;

      case 'textlabel':
        code = `-- Create Text Label\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "LabelGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Text Label
local label = Instance.new("TextLabel")
label.Name = "InfoLabel"
label.Size = UDim2.new(0, 300, 0, 50)
label.Position = UDim2.new(0.5, -150, 0.1, 0)
label.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
label.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
label.TextSize = 20
label.Font = Enum.Font.Gotham
label.Text = "${uiConfig.text}"
label.BorderSizePixel = ${uiConfig.strokeThickness}
label.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
label.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = label

-- Optional: Auto-update text
-- label.Text = "Updated: " .. os.time()`;
        break;

      case 'textinput':
        code = `-- Create Text Input Box\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "InputGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Text Box
local textBox = Instance.new("TextBox")
textBox.Name = "InputBox"
textBox.Size = UDim2.new(0, ${sizeOptions[uiConfig.size].width}, 0, ${sizeOptions[uiConfig.size].height})
textBox.Position = UDim2.new(0.5, -${sizeOptions[uiConfig.size].width / 2}, 0.5, -${sizeOptions[uiConfig.size].height / 2})
textBox.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
textBox.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
textBox.TextSize = 16
textBox.Font = Enum.Font.Gotham
textBox.PlaceholderText = "${uiConfig.text}"
textBox.PlaceholderColor3 = Color3.fromHex("${uiConfig.textColor}")
textBox.BorderSizePixel = ${uiConfig.strokeThickness}
textBox.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
textBox.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = textBox

-- Handle text input
textBox.FocusLost:Connect(function(enterPressed)
    if enterPressed then
        print("User entered: " .. textBox.Text)
        -- Process input here
    end
end)`;
        break;

      case 'frame':
        code = `-- Create Frame\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "FrameGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Frame
local frame = Instance.new("Frame")
frame.Name = "MainFrame"
frame.Size = UDim2.new(0, 400, 0, 300)
frame.Position = UDim2.new(0.5, -200, 0.5, -150)
frame.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
frame.BorderSizePixel = ${uiConfig.strokeThickness}
frame.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
frame.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = frame

-- Add shadow effect (optional)
local shadow = Instance.new("UIStroke")
shadow.Thickness = 2
shadow.Color = Color3.fromHex("000000")
shadow.Transparency = 0.7
shadow.Parent = frame

-- Add UIListLayout for child elements
local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 10)
listLayout.FillDirection = Enum.FillDirection.Vertical
listLayout.Parent = frame`;
        break;

      case 'scrollframe':
        code = `-- Create Scroll Frame\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ScrollGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create ScrollingFrame
local scrollFrame = Instance.new("ScrollingFrame")
scrollFrame.Name = "ScrollList"
scrollFrame.Size = UDim2.new(0, 300, 0, 400)
scrollFrame.Position = UDim2.new(0.5, -150, 0.5, -200)
scrollFrame.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
scrollFrame.BorderSizePixel = ${uiConfig.strokeThickness}
scrollFrame.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
scrollFrame.ScrollBarThickness = 10
scrollFrame.CanvasSize = UDim2.new(0, 0, 0, 500)
scrollFrame.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = scrollFrame

-- Add UIListLayout
local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 8)
listLayout.FillDirection = Enum.FillDirection.Vertical
listLayout.Parent = scrollFrame

-- Add sample items
for i = 1, 10 do
    local item = Instance.new("TextLabel")
    item.Name = "Item" .. i
    item.Size = UDim2.new(1, -10, 0, 30)
    item.BackgroundColor3 = Color3.fromHex("${lightenColor(uiConfig.backgroundColor)}")
    item.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
    item.Text = "Item " .. i
    item.Parent = scrollFrame
end`;
        break;

      case 'progressbar':
        code = `-- Create Progress Bar\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ProgressGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Background Frame
local bgFrame = Instance.new("Frame")
bgFrame.Name = "Background"
bgFrame.Size = UDim2.new(0, 300, 0, 30)
bgFrame.Position = UDim2.new(0.5, -150, 0.5, -15)
bgFrame.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
bgFrame.BorderSizePixel = ${uiConfig.strokeThickness}
bgFrame.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
bgFrame.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = bgFrame

-- Create Fill Frame
local fillFrame = Instance.new("Frame")
fillFrame.Name = "Fill"
fillFrame.Size = UDim2.new(0.5, 0, 1, 0)  -- 50% progress
fillFrame.BackgroundColor3 = Color3.fromHex("${uiConfig.textColor}")
fillFrame.BorderSizePixel = 0
fillFrame.Parent = bgFrame

-- Animate progress
local currentProgress = 0
while true do
    currentProgress = (currentProgress + 0.5) % 100
    fillFrame.Size = UDim2.new(currentProgress / 100, 0, 1, 0)
    wait(0.05)
end`;
        break;

      case 'imagebutton':
        code = `-- Create Image Button\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ImageButtonGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create ImageButton
local imageButton = Instance.new("ImageButton")
imageButton.Name = "CustomImageButton"
imageButton.Size = UDim2.new(0, 100, 0, 100)
imageButton.Position = UDim2.new(0.5, -50, 0.5, -50)
imageButton.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
-- Replace with your own image ID
imageButton.Image = "rbxasset://textures/Cursors/DragLockedCursor.png"
imageButton.BorderSizePixel = ${uiConfig.strokeThickness}
imageButton.BorderColor3 = Color3.fromHex("${uiConfig.strokeColor}")
imageButton.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = imageButton

-- Button Click Event
imageButton.MouseButton1Click:Connect(function()
    print("Image button clicked!")
end)`;
        break;

      case 'dropdown':
        code = `-- Create Dropdown Menu\nlocal Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "DropdownGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Main Button
local mainButton = Instance.new("TextButton")
mainButton.Name = "DropdownButton"
mainButton.Size = UDim2.new(0, 150, 0, 40)
mainButton.Position = UDim2.new(0.5, -75, 0.5, -20)
mainButton.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
mainButton.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
mainButton.Text = "Select Option"
mainButton.Parent = screenGui

-- Add Corner Radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, ${uiConfig.cornerRadius})
corner.Parent = mainButton

-- Create Dropdown List
local dropdownList = Instance.new("Frame")
dropdownList.Name = "DropdownList"
dropdownList.Size = UDim2.new(0, 150, 0, 0)
dropdownList.Position = UDim2.new(0.5, -75, 0.5, 20)
dropdownList.BackgroundColor3 = Color3.fromHex("${lightenColor(uiConfig.backgroundColor)}")
dropdownList.Visible = false
dropdownList.Parent = screenGui

-- Add options
local options = {"Option 1", "Option 2", "Option 3"}
local listLayout = Instance.new("UIListLayout")
listLayout.Parent = dropdownList

for _, option in ipairs(options) do
    local optionButton = Instance.new("TextButton")
    optionButton.Name = option
    optionButton.Size = UDim2.new(1, 0, 0, 40)
    optionButton.BackgroundColor3 = Color3.fromHex("${uiConfig.backgroundColor}")
    optionButton.TextColor3 = Color3.fromHex("${uiConfig.textColor}")
    optionButton.Text = option
    optionButton.Parent = dropdownList
end

-- Toggle dropdown
mainButton.MouseButton1Click:Connect(function()
    dropdownList.Visible = not dropdownList.Visible
end)`;
        break;

      default:
        code = '-- Select a UI type to generate code';
    }

    setGeneratedCode(code);
  };

  const lightenColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const lighter = (val) => Math.min(255, val + 50).toString(16).padStart(2, '0');
    return `#${lighter(r)}${lighter(g)}${lighter(b)}`.toUpperCase();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfigChange = (key, value) => {
    setUiConfig(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    generateRobloxUI();
  }, [uiType, uiConfig]);

  const sizeLabel = {
    small: '100x32',
    medium: '150x40',
    large: '200x50',
    xlarge: '250x60'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">🎮 Roblox UI Generator</h1>
        <p className="text-gray-400 text-lg">Create professional Roblox GUI code instantly</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - UI Selection */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-4">🧩 UI Components</h2>
            <div className="grid grid-cols-2 gap-2">
              {uiTypes.map(ui => (
                <button
                  key={ui.id}
                  onClick={() => setUiType(ui.id)}
                  className={`py-2 px-3 rounded-lg text-sm font-mono transition ${
                    uiType === ui.id
                      ? 'bg-red-600 text-white border-2 border-red-400 shadow-lg'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-2 border-gray-600'
                  }`}
                >
                  <span className="text-lg">{ui.icon}</span>
                  <div className="text-xs mt-1">{ui.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Middle Panel - Configuration */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">⚙️ Configuration</h2>
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Text Content</label>
                <input
                  type="text"
                  value={uiConfig.text}
                  onChange={(e) => handleConfigChange('text', e.target.value)}
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={uiConfig.backgroundColor}
                    onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={uiConfig.backgroundColor}
                    onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                    className="flex-1 bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-500 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={uiConfig.textColor}
                    onChange={(e) => handleConfigChange('textColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={uiConfig.textColor}
                    onChange={(e) => handleConfigChange('textColor', e.target.value)}
                    className="flex-1 bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-500 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Size</label>
                <select
                  value={uiConfig.size}
                  onChange={(e) => handleConfigChange('size', e.target.value)}
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-500 text-sm"
                >
                  <option value="small">Small (100x32)</option>
                  <option value="medium">Medium (150x40)</option>
                  <option value="large">Large (200x50)</option>
                  <option value="xlarge">X-Large (250x60)</option>
                </select>
              </div>

              {/* Corner Radius */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Corner Radius: {uiConfig.cornerRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={uiConfig.cornerRadius}
                  onChange={(e) => handleConfigChange('cornerRadius', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Stroke Thickness */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Stroke Thickness: {uiConfig.strokeThickness}px</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={uiConfig.strokeThickness}
                  onChange={(e) => handleConfigChange('strokeThickness', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Stroke Color */}
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">Stroke Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={uiConfig.strokeColor}
                    onChange={(e) => handleConfigChange('strokeColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={uiConfig.strokeColor}
                    onChange={(e) => handleConfigChange('strokeColor', e.target.value)}
                    className="flex-1 bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-red-500 text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview & Code */}
          <div className="lg:col-span-1 space-y-4">
            {/* Toggle Preview/Code */}
            <div className="flex gap-2 bg-gray-800 rounded-lg p-2 border border-gray-700">
              <button
                onClick={() => setPreview(true)}
                className={`flex-1 py-2 px-4 rounded transition font-bold ${
                  preview
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                👁️ Preview
              </button>
              <button
                onClick={() => setPreview(false)}
                className={`flex-1 py-2 px-4 rounded transition font-bold ${
                  !preview
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                💻 Code
              </button>
            </div>

            {/* Preview */}
            {preview && (
              <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 min-h-96 flex items-center justify-center">
                <div
                  style={{
                    backgroundColor: uiConfig.backgroundColor,
                    color: uiConfig.textColor,
                    width: sizeOptions[uiConfig.size].width,
                    height: sizeOptions[uiConfig.size].height,
                    borderRadius: uiConfig.cornerRadius,
                    border: `${uiConfig.strokeThickness}px solid ${uiConfig.strokeColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="hover:shadow-lg hover:scale-105"
                >
                  {uiConfig.text}
                </div>
              </div>
            )}

            {/* Generated Code */}
            {!preview && (
              <div className="bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden min-h-96 flex flex-col">
                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <span className="font-mono text-sm text-gray-400">Lua Code</span>
                  <button
                    onClick={copyToClipboard}
                    className={`px-3 py-1 rounded text-sm font-bold transition ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-gray-300 leading-relaxed">
                  {generatedCode}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">⚡</p>
            <p className="text-sm"><span className="font-bold">8+ UI Types</span></p>
            <p className="text-xs text-gray-400">Buttons, Labels, Input boxes & more</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">🎨</p>
            <p className="text-sm"><span className="font-bold">Full Customization</span></p>
            <p className="text-xs text-gray-400">Colors, sizes, borders & effects</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">📝</p>
            <p className="text-sm"><span className="font-bold">Copy-Paste Code</span></p>
            <p className="text-xs text-gray-400">Ready-to-use Lua scripts</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">🚀</p>
            <p className="text-sm"><span className="font-bold">Production Ready</span></p>
            <p className="text-xs text-gray-400">Professional quality output</p>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-2xl font-bold mb-4">📚 How to Use</h3>
          <ol className="space-y-3 text-gray-300 text-sm">
            <li><span className="font-bold text-red-400">1.</span> Select a UI component from the left panel</li>
            <li><span className="font-bold text-red-400">2.</span> Customize colors, size, and properties in the middle panel</li>
            <li><span className="font-bold text-red-400">3.</span> Preview your UI on the right or view the generated code</li>
            <li><span className="font-bold text-red-400">4.</span> Click "Copy" to copy the Lua code</li>
            <li><span className="font-bold text-red-400">5.</span> Paste into your Roblox game's LocalScript</li>
            <li><span className="font-bold text-red-400">6.</span> Customize further and add your own event handlers</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RobloxUIGenerator;
