import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';

const AIRobloxUIGenerator = () => {
  const [mode, setMode] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('modern');
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#1A535C']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [requestsRemaining, setRequestsRemaining] = useState('loading');
  const [previewMode, setPreviewMode] = useState('code'); // code or preview
  const [previewUI, setPreviewUI] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Parse Lua code to extract UI properties for visual preview
  const parseUIPreview = (code) => {
    if (!code) return null;

    // Extract component properties from Lua code
    const extractProperty = (prop) => {
      const regex = new RegExp(`${prop}\\s*=\\s*"([^"]+)"|${prop}\\s*=\\s*Color3\\.fromHex\\("([^"]+)"\\)|${prop}\\s*=\\s*([\\d.]+)`, 'i');
      const match = code.match(regex);
      return match ? (match[1] || match[2] || match[3]) : null;
    };

    return {
      text: extractProperty('button.Text|label.Text|textBox.Text') || 'UI Element',
      bgColor: extractProperty('BackgroundColor3') || colors[0],
      textColor: extractProperty('TextColor3') || '#FFFFFF',
      width: parseInt(extractProperty('Size.*UDim2.*([0-9]+)')) || 150,
      height: parseInt(extractProperty('Size.*UDim2.*([0-9]+)')) || 40,
      cornerRadius: parseInt(extractProperty('CornerRadius.*([0-9]+)')) || 8
    };
  };

  const generateUIWithAI = async () => {
    if (!description.trim()) {
      setError('Please describe what UI you want');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/roblox-ai/generate-roblox-ui', {
        description,
        theme,
        colors
      });

      setGeneratedCode(response.data.uiCode);
      setPreviewUI(parseUIPreview(response.data.uiCode));
      setRequestsRemaining(response.data.requestsRemaining);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: `Create ${theme} UI: ${description}` },
        { role: 'assistant', content: '✨ AI generated your custom Roblox UI code!' }
      ]);
      setDescription('');
      setPreviewMode('preview');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate UI');
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: description },
        { role: 'assistant', content: `❌ Error: ${err.response?.data?.error}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const enhanceUI = async () => {
    if (!generatedCode) {
      setError('Generate or paste code first');
      return;
    }

    if (!description.trim()) {
      setError('Describe what enhancement you want');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/roblox-ai/enhance-ui', {
        code: generatedCode,
        enhancement: description
      });

      setGeneratedCode(response.data.enhancedCode);
      setPreviewUI(parseUIPreview(response.data.enhancedCode));
      setRequestsRemaining(response.data.requestsRemaining);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: `Enhance: ${description}` },
        { role: 'assistant', content: '✨ UI code enhanced!' }
      ]);
      setDescription('');
      setPreviewMode('preview');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to enhance UI');
    } finally {
      setLoading(false);
    }
  };

  const getUISuggestions = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/roblox-ai/ui-suggestions', {
        type: theme,
        purpose: description || 'general game UI'
      });

      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: `Suggest design for ${theme}` },
        { role: 'assistant', content: response.data.suggestions }
      ]);
      setRequestsRemaining(response.data.requestsRemaining);
      setPreviewMode('preview');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themes = [
    { id: 'modern', name: 'Modern', emoji: '✨' },
    { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🤖' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🧙' },
    { id: 'steampunk', name: 'Steampunk', emoji: '⚙️' },
    { id: 'minimalist', name: 'Minimalist', emoji: '◻️' },
    { id: 'dark', name: 'Dark', emoji: '🌙' },
    { id: 'tropical', name: 'Tropical', emoji: '🌴' },
    { id: 'neon', name: 'Neon', emoji: '💡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">🤖 AI Roblox UI Generator</h1>
        <p className="text-gray-400 text-lg">Create custom Roblox UIs with AI assistance & Live Preview</p>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Mode Selector */}
        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-2 border border-gray-700 flex-wrap justify-center">
          <button
            onClick={() => setMode('generate')}
            className={`py-2 px-4 rounded transition font-bold ${
              mode === 'generate'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ✨ Generate
          </button>
          <button
            onClick={() => setMode('enhance')}
            className={`py-2 px-4 rounded transition font-bold ${
              mode === 'enhance'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🔧 Enhance
          </button>
          <button
            onClick={() => setMode('suggestions')}
            className={`py-2 px-4 rounded transition font-bold ${
              mode === 'suggestions'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            💡 Suggestions
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Input & Configuration */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-4">
              {mode === 'generate' ? '📝 Describe' : mode === 'enhance' ? '🎨 Enhance' : '💡 Ideas'}
            </h2>

            {mode === 'generate' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">UI Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Pacific Ocean inventory with blue waves, shells, and tropical colors"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`py-2 px-2 rounded text-xs font-bold transition ${
                          theme === t.id
                            ? 'bg-indigo-600 text-white border-2 border-indigo-400'
                            : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                        }`}
                      >
                        {t.emoji} {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Colors</label>
                  <div className="flex gap-2">
                    {colors.map((color, idx) => (
                      <input
                        key={idx}
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[idx] = e.target.value;
                          setColors(newColors);
                        }}
                        className="w-10 h-10 rounded cursor-pointer border-2 border-gray-600"
                        title={`Color ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateUIWithAI}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                  {loading ? '⏳ Generating...' : '✨ Generate UI'}
                </button>
              </div>
            )}

            {mode === 'enhance' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Enhancement Request</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Add animations, improve colors, add effects"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm h-24 resize-none"
                  />
                </div>

                <button
                  onClick={enhanceUI}
                  disabled={loading || !generatedCode}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                  {loading ? '⏳ Enhancing...' : '🔧 Enhance'}
                </button>
              </div>
            )}

            {mode === 'suggestions' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`py-2 px-2 rounded text-xs font-bold transition ${
                          theme === t.id
                            ? 'bg-indigo-600 text-white border-2 border-indigo-400'
                            : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                        }`}
                      >
                        {t.emoji} {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Purpose</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Leaderboard, shop menu, settings"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm h-20 resize-none"
                  />
                </div>

                <button
                  onClick={getUISuggestions}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                  {loading ? '⏳ Getting ideas...' : '💡 Get Ideas'}
                </button>
              </div>
            )}
          </div>

          {/* Middle Panel - Chat */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700 flex flex-col">
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 rounded-t-lg">
              <p className="text-white text-sm font-mono">💬 Conversation</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p className="text-lg">👋 Start by describing your UI idea</p>
                  <p className="text-xs mt-2">AI will generate custom Lua code for you</p>
                </div>
              ) : (
                chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm font-mono whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-400">⏳ AI is thinking...</p>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Right Panel - Preview & Code */}
          <div className="lg:col-span-2 space-y-4">
            {/* Preview/Code Toggle */}
            <div className="flex gap-2 bg-gray-800 rounded-lg p-2 border border-gray-700">
              <button
                onClick={() => setPreviewMode('preview')}
                className={`flex-1 py-2 px-4 rounded transition font-bold ${
                  previewMode === 'preview'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                👁️ Preview
              </button>
              <button
                onClick={() => setPreviewMode('code')}
                className={`flex-1 py-2 px-4 rounded transition font-bold ${
                  previewMode === 'code'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                💻 Code
              </button>
            </div>

            {/* Visual Preview */}
            {previewMode === 'preview' && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border-2 border-gray-700 min-h-80 flex items-center justify-center overflow-auto">
                {previewUI ? (
                  <div
                    style={{
                      backgroundColor: previewUI.bgColor,
                      color: previewUI.textColor,
                      width: Math.min(previewUI.width, 280),
                      height: Math.min(previewUI.height, 100),
                      borderRadius: previewUI.cornerRadius,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                      padding: '20px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 6px 30px rgba(99, 102, 241, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                    }}
                  >
                    {previewUI.text}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-8">
                    <p className="text-lg mb-2">🎨 Visual preview will appear here</p>
                    <p className="text-xs">Generate a UI to see it in action</p>
                  </div>
                )}
              </div>
            )}

            {/* Generated Code */}
            {previewMode === 'code' && (
              <div className="bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden flex flex-col min-h-80">
                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <span className="font-mono text-sm text-gray-400">📜 Lua Code</span>
                  <button
                    onClick={copyToClipboard}
                    disabled={!generatedCode}
                    className={`px-3 py-1 rounded text-sm font-bold transition ${
                      copied
                        ? 'bg-green-600 text-white'
                        : generatedCode
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                {generatedCode ? (
                  <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-green-400 leading-relaxed bg-black/20">
                    {generatedCode}
                  </pre>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <p className="text-center text-sm">Generated code will appear here</p>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-50 text-red-200 px-4 py-3 rounded text-sm border border-red-700">
                ❌ {error}
              </div>
            )}
          </div>
        </div>

        {/* Requests Remaining */}
        {requestsRemaining !== 'loading' && (
          <div className="mt-6 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-4 border border-indigo-700 text-center">
            <p className="text-gray-300">
              📊 Requests Remaining: <span className="font-bold text-indigo-300 text-lg">{requestsRemaining}</span>
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition text-center">
            <p className="text-3xl mb-2">🤖</p>
            <p className="font-bold">AI Powered</p>
            <p className="text-xs text-gray-400">GPT-4 generates custom code</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition text-center">
            <p className="text-3xl mb-2">👁️</p>
            <p className="font-bold">Live Preview</p>
            <p className="text-xs text-gray-400">See UI before copying code</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition text-center">
            <p className="text-3xl mb-2">🎨</p>
            <p className="font-bold">8+ Themes</p>
            <p className="text-xs text-gray-400">Modern, Cyber, Fantasy & more</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition text-center">
            <p className="text-3xl mb-2">⚡</p>
            <p className="font-bold">Production Ready</p>
            <p className="text-xs text-gray-400">Copy-paste into Roblox Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRobloxUIGenerator;
