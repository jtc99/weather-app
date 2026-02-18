import { useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  async function handleSearch(e) {
    e && e.preventDefault()
    if (!city) return
    setLoading(true)
    setError(null)
    setWeather(null)
    try {
      const res = await fetch(`${API_BASE}/weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: city }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.message || 'Request failed')
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Simple Weather</h1>

      <form onSubmit={handleSearch} className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g. London)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Search'}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {weather && (
        <div className="result">
          <h2>
            {weather.name}, {weather.sys?.country}
          </h2>
          <p>
            <strong>{Math.round(weather.main?.temp)}°C</strong> —{' '}
            {weather.weather?.[0]?.description}
          </p>
          <p>Humidity: {weather.main?.humidity}%</p>
          <p>Wind: {weather.wind?.speed} m/s</p>
        </div>
      )}

      <p className="note">Note: backend must run at http://localhost:8000 (Vite proxies /api)</p>
    </div>
  )
}

export default App
