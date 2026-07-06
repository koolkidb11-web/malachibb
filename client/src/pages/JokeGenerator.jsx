import React, { useState, useEffect } from 'react';
import api from '../services/api';

const JokeGenerator = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Any');
  const [jokes, setJokes] = useState([]);
  const [multipleCount, setMultipleCount] = useState(3);
  const [showMultiple, setShowMultiple] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Programming', 'Knock-Knock', 'General', 'Christmas', 'Spooky', 'Any'];

  const fetchRandomJoke = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    setShowMultiple(false);

    try {
      const response = await api.get(`/jokes/random`);
      setJoke(response.data.joke);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch joke');
    } finally {
      setLoading(false);
    }
  };

  const fetchJokeByCategory = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    setShowMultiple(false);

    try {
      const response = await api.get(`/jokes/category/${category}`);
      setJoke(response.data.joke);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch joke');
    } finally {
      setLoading(false);
    }
  };

  const fetchMultipleJokes = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    setShowMultiple(true);

    try {
      const response = await api.get(`/jokes/multiple/${multipleCount}`);
      setJokes(response.data.jokes);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch jokes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">😂 Joke Generator</h1>
        <p className="text-gray-400 text-lg">Laugh out loud with random jokes</p>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Main Joke Display */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8 border-2 border-purple-500 shadow-xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
              </div>
              <p className="text-gray-400 mt-4">Finding a good joke for you...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-50 text-red-200 px-4 py-3 rounded text-center">
              ❌ {error}
            </div>
          ) : joke ? (
            <div className="text-center">
              <p className="text-3xl mb-4">😄</p>
              <p className="text-2xl font-mono leading-relaxed whitespace-pre-wrap">{joke}</p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-xl">Click "Get Joke" to see a funny joke!</p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 bg-opacity-50 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Control Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={fetchRandomJoke}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            🎲 Random Joke
          </button>
          <button
            onClick={() => setShowMultiple(!showMultiple)}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            📚 Multiple Jokes
          </button>
        </div>

        {/* Category Selection */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <label className="block text-lg font-bold mb-4">🏷️ Select Category:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-4 rounded-lg font-mono transition ${
                  category === cat
                    ? 'bg-purple-600 text-white border-2 border-purple-400'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-2 border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={fetchJokeByCategory}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            🎯 Get {category} Joke
          </button>
        </div>

        {/* Multiple Jokes Section */}
        {showMultiple && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <label className="block text-lg font-bold mb-4">📊 How many jokes? (1-10)</label>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                min="1"
                max="10"
                value={multipleCount}
                onChange={(e) => setMultipleCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="flex-1 bg-gray-900 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={fetchMultipleJokes}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition disabled:opacity-50"
              >
                Load
              </button>
            </div>
          </div>
        )}

        {/* Display Multiple Jokes */}
        {showMultiple && jokes.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold mb-4">📝 Your Jokes ({jokes.length}):</h2>
            {jokes.map((j, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-bold">#{idx + 1}</span>
                  <span className="text-sm text-gray-400">{j.category}</span>
                </div>
                <p className="text-lg font-mono whitespace-pre-wrap">{j.joke}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-3xl font-bold text-blue-400">∞</p>
            <p className="text-gray-400 text-sm">Endless Jokes</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-3xl font-bold text-green-400">📚</p>
            <p className="text-gray-400 text-sm">6 Categories</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-3xl font-bold text-purple-400">🚀</p>
            <p className="text-gray-400 text-sm">Instant Load</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeGenerator;
