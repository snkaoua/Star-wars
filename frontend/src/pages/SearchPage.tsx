import { useEffect, useState } from 'react';
import {
  searchCharacters,
  getSearchHistory,
  deleteHistoryItem,
} from '../api'; 

import type { Character, HistoryItem } from '../api';

function SearchPage() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Character[]>([]);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getSearchHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSearch(submittedTerm?: string) {
    const searchTerm = (submittedTerm ?? term).trim();
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchCharacters(searchTerm);
      setResults(data.results);
      setCount(data.count);
      await loadHistory();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setResults([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }

  // debounce על השדה
  useEffect(() => {
    const trimmed = term.trim();

    if (!trimmed) {
      setResults([]);
      setCount(0);
      setError(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [term]);

  async function handleDeleteHistory(id: number) {
    try {
      await deleteHistoryItem(id);
      await loadHistory();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1>Star Wars Search</h1>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a character (e.g. Luke)"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={() => handleSearch()} style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && term.trim() !== '' && results.length === 0 && (
        <p>No results found.</p>
      )}

      {results.length > 0 && !loading && !error && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Results ({count})</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '0.5rem',
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Name
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Height
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Birth Year
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((c) => (
                <tr key={c.name}>
                  <td style={{ padding: '0.25rem 0' }}>{c.name}</td>
                  <td>{c.height}</td>
                  <td>{c.birthYear}</td>
                  <td>{c.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h2>Search History</h2>
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                }}
              >
                <button onClick={() => handleSearch(item.term)}>
                  {item.term} ({item.count})
                </button>
                <span style={{ fontSize: '0.8rem', color: '#555' }}>
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                <button
                  onClick={() => handleDeleteHistory(item.id)}
                  style={{ marginLeft: 'auto' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
