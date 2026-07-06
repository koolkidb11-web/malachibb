import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';

const AIRobloxUIGenerator = () => {
  const [mode, setMode] = useState('generate'); // generate, enhance, suggestions
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('modern');
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#1A535C']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [requestsRemaining, setRequestsRemaining] = useState('loading');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

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
      setRequestsRemaining(response.data.requestsRemaining);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: `Create ${theme} UI: ${description}` },
        { role: 'assistant', content: 'AI generated your custom Roblox UI code!' }
      ]);
      setDescription('');
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
      setRequestsRemaining(response.data.requestsRemaining);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: `Enhance: ${description}` },
        { role: 'assistant', content: 'UI code enhanced!' }
      ]);
      setDescription('');
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

  const themes = ['modern', 'cyberpunk', 'fantasy', 'steampunk', 'minimalist', 'dark', 'tropical', 'neon'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">🤖 AI Roblox UI Generator</h1>
        <p className="text-gray-400 text-lg">Create custom Roblox UIs with AI assistance</p>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Mode Selector */}
        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-2 border border-gray-700">
          <button
            onClick={() => setMode('generate')}
            className={`flex-1 py-2 px-4 rounded transition font-bold ${
              mode === 'generate'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ✨ Generate
          </button>
          <button
            onClick={() => setMode('enhance')}
            className={`flex-1 py-2 px-4 rounded transition font-bold ${
              mode === 'enhance'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🔧 Enhance
          </button>
          <button
            onClick={() => setMode('suggestions')}
            className={`flex-1 py-2 px-4 rounded transition font-bold ${
              mode === 'suggestions'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            💡 Suggestions
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-4">{mode === 'generate' ? '📝 Describe' : mode === 'enhance' ? '🎨 Enhance' : '💭 Ideas'}</h2>

            {mode === 'generate' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">UI Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., A Pacific Ocean themed inventory menu with blue waves, treasure chest icons, and tropical colors"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    {themes.map(t => (
                      <option key={t} value={t} className="capitalize">
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-300 block mb-2">Primary Colors</label>
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
                        className="w-10 h-10 rounded cursor-pointer"
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
                    placeholder="e.g., Add animations, improve colors, add sound effects, make it responsive"
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
                  <label className="text-sm font-bold text-gray-300 block mb-2">UI Purpose</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Leaderboard display, shop menu, settings panel"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm h-20 resize-none"
                  />
                </div>

                <button
                  onClick={getUISuggestions}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                  {loading ? '⏳ Getting suggestions...' : '💡 Get Ideas'}
                </button>
              </div>
            )}
          </div>

          {/* Middle Panel - Chat */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700 flex flex-col">
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
              <p className="text-white text-sm font-mono">💬 Conversation</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-lg">👋 Start by describing your UI idea</p>
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
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Right Panel - Code Output */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg border-2 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600">
              <span className="font-mono text-sm text-gray-400">📝 Lua Code</span>
              <button
                onClick={copyToClipboard}
                disabled={!generatedCode}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  copied
                    ? 'bg-green-600 text-white'
                    : generatedCode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {copied ? '✅' : '📋'}
              </button>
            </div>
            
            {generatedCode ? (
              <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-gray-300 leading-relaxed">
                {generatedCode}
              </pre>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p className="text-center text-sm">Generated code will appear here</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900 bg-opacity-50 text-red-200 px-4 py-2 border-t border-red-700 text-xs">
                ❌ {error}
              </div>
            )}
          </div>
        </div>

        {/* Requests Remaining */}
        {requestsRemaining !== 'loading' && (
          <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-gray-300">
              📊 Requests Remaining: <span className="font-bold text-indigo-400">{requestsRemaining}</span>
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">✨</p>
            <p className="font-bold">AI Generated</p>
            <p className="text-xs text-gray-400">Custom UI code created by AI</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">🎨</p>
            <p className="font-bold">Theme Support</p>
            <p className="text-xs text-gray-400">8+ UI themes available</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <p className="text-2xl mb-2">📚</p>
            <p className="font-bold">Suggestions</p>
            <p className="text-xs text-gray-400">Get design recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRobloxUIGenerator;
