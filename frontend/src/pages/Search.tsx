// SearchPage component: handles character searching (with 500ms debounce), 
// displays results and selected character details, 
// manages favorites (saved locally), and shows/deletes search history fetched from the backend.

import { useEffect, useState } from 'react';

import {
  searchCharacters,
  getSearchHistory,
  deleteHistoryItem,
} from '../api';

import type { Character, HistoryItem } from '../api';

import { getFavorites, saveFavorites } from '../favorites';

function SearchPage() {
  const [term, setTerm] = useState('');

  const [results, setResults] = useState<Character[]>([]);

  const [count, setCount] = useState(0);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    loadHistory();
    setFavorites(getFavorites());
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
    setSelectedCharacter(null);

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

  function isFavorite(character: Character): boolean {
    return favorites.some((f) => f.name === character.name);
  }

  function handleToggleFavorite(character: Character) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.name === character.name);
      let next: Character[];

      if (exists) {
        next = prev.filter((f) => f.name !== character.name);
      } else {
        next = [...prev, character];
      }

      saveFavorites(next);

      return next;
    });
  }

  return (
    <div className="page-contained search-page">
      <h1 className="search-title">Character Search</h1>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={term} 
          onChange={(e) => setTerm(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a character (e.g. Luke)"
        />
        <button onClick={() => handleSearch()} className="sw-btn-primary">
          Search
        </button>
      </div>

      {loading && <p className="search-status">Loading...</p>}

      {error && <p className="search-status error">{error}</p>}

      {!loading && !error && term.trim() !== '' && results.length === 0 && (
        <p className="search-status">No results found.</p>
      )}

      {results.length > 0 && !loading && !error && (
        <div className="search-results">
          <div className="search-results-header">
            <h2>Results ({count})</h2>
            <span className="search-term-label">
              for "<strong>{term.trim()}</strong>"
            </span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>Fav</th>
                <th>Name</th>
                <th>Height</th>
                <th>Birth Year</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {results.map((c) => {
                const active = selectedCharacter?.name === c.name;

                const favorite = isFavorite(c);

                return (
                  <tr
                    key={c.name} 
                    
                    onClick={() => setSelectedCharacter(c)}
                    className={active ? 'row-selected' : ''}
                    style={{ cursor: 'pointer' }} 
                  >
                    <td
                      className="favorite-cell"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className={
                          'fav-star-btn ' +
                          (favorite ? 'fav-star-btn-active' : '')
                        }
                        onClick={() => handleToggleFavorite(c)}
                        aria-label={
                          favorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        ★
                      </button>
                    </td>

                    <td className="fav-name">{c.name}</td>
                    <td>{c.height}</td>
                    <td>{c.birthYear}</td>
                    <td>{c.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedCharacter && (
        <div className="character-card">

          <h3>{selectedCharacter.name}</h3>

          <div className="character-grid">
            <div>
              <span className="label">Height</span>
              <span className="value">{selectedCharacter.height} cm</span>
            </div>
            <div>
              <span className="label">Birth year</span>
              <span className="value">{selectedCharacter.birthYear}</span>
            </div>
            <div>
              <span className="label">Gender</span>
              <span className="value">{selectedCharacter.gender}</span>
            </div>
          </div>

          <p className="character-note">
            Data is fetched from the public SWAPI service – some fields may be
            unknown for certain characters.
          </p>
        </div>
      )}

      <div className="search-history">
        <h2>Search History</h2>
        {history.length === 0 ? (
          <p className="search-status">No history yet.</p>
        ) : (
          <ul className="history-list">
            {history.map((item) => (
              <li key={item.id} className="history-item">
                <button
                  className="history-chip"
                  onClick={() => handleSearch(item.term)}
                >
                  {item.term}{' '}
                  <span className="history-count">({item.count})</span>
                </button>

                <span className="history-date">
                  {new Date(item.createdAt).toLocaleString()}
                </span>

                <button
                  onClick={() => handleDeleteHistory(item.id)}
                  className="history-delete"
                >
                  ✕
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
