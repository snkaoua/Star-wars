// React hooks:
// - useState: for local component state (inputs, results, flags, etc.).
// - useEffect: for running side-effects when some state/props change.
import { useEffect, useState } from 'react';

// API helpers for working with the backend (or SWAPI proxy):
// - searchCharacters: sends a request to search characters by name/term.
// - getSearchHistory: fetches previous search terms and stats.
// - deleteHistoryItem: removes an item from the stored search history.
import {
  searchCharacters,
  getSearchHistory,
  deleteHistoryItem,
} from '../api';

// Type definitions imported from the API module:
// - Character: shape of a single character result (name, height, birthYear...).
// - HistoryItem: shape of a single search history item (id, term, count, createdAt...).
import type { Character, HistoryItem } from '../api';

// Helpers for local favorites (likely stored in localStorage or similar):
// - getFavorites: load favorites.
// - saveFavorites: persist favorites.
import { getFavorites, saveFavorites } from '../favorites';

// Main React component responsible for:
// - searching characters
// - showing results & details
// - handling favorites
// - showing and reusing search history
function SearchPage() {
  // term: the current text inside the search input.
  const [term, setTerm] = useState('');

  // results: array of characters returned from the last search.
  const [results, setResults] = useState<Character[]>([]);

  // count: total number of matching characters from the API
  // (may be greater than results.length if pagination exists server-side).
  const [count, setCount] = useState(0);

  // history: list of previous search terms, fetched from the backend.
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // loading: true while a search request is in progress.
  const [loading, setLoading] = useState(false);

  // error: holds an error message string if the last search failed, or null if everything is OK.
  const [error, setError] = useState<string | null>(null);

  // selectedCharacter: the character the user clicked on in the results table.
  // Used to show extra info in the character detail card.
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // favorites: list of favorite characters for this device.
  // Synchronized with localStorage via getFavorites/saveFavorites.
  const [favorites, setFavorites] = useState<Character[]>([]);

  // Initial load effect:
  // - runs only once on component mount because dependency array is [].
  // - loads search history from the server.
  // - loads favorites from local storage.
  useEffect(() => {
    loadHistory();
    setFavorites(getFavorites());
  }, []);

  // Helper function to load search history from the backend.
  // Wrapped in try/catch for error safety.
  async function loadHistory() {
    try {
      const data = await getSearchHistory();
      setHistory(data);
    } catch (err) {
      // For now, just log the error; we don't show it in the UI.
      console.error(err);
    }
  }

  // Main function to perform a search.
  // - submittedTerm is optional: used when clicking a term from history.
  // - If submittedTerm is not provided, falls back to the current "term" state.
  async function handleSearch(submittedTerm?: string) {
    // Use submitted term if provided; otherwise, use the current input value.
    const searchTerm = (submittedTerm ?? term).trim();

    // If the search term is empty after trimming spaces, do nothing.
    if (!searchTerm) return;

    // Set flags for "loading state" and reset error and selected character.
    setLoading(true);
    setError(null);
    setSelectedCharacter(null);

    try {
      // Call API helper to search characters for the given term.
      const data = await searchCharacters(searchTerm);

      // Update results with the returned list.
      setResults(data.results);

      // Update count with total matches.
      setCount(data.count);

      // Refresh search history after a successful search.
      await loadHistory();
    } catch (err: any) {
      // In case of error:
      // - Set a human-readable error message.
      // - Reset results and count so the UI is consistent.
      setError(err.message || 'Something went wrong');
      setResults([]);
      setCount(0);
    } finally {
      // In any case (success or error), stop the loading spinner.
      setLoading(false);
    }
  }

  // Auto-search effect (debounced search):
  // - Watches the "term" state.
  // - When the user types something, waits 500 ms before running handleSearch().
  // - If the user keeps typing quickly, the previous timer is cleared,
  //   so we avoid sending too many requests.
  useEffect(() => {
    const trimmed = term.trim();

    // If the term is empty:
    // - clear results,
    // - clear count,
    // - clear any previous error.
    if (!trimmed) {
      setResults([]);
      setCount(0);
      setError(null);
      return;
    }

    // Set a timeout to run handleSearch() after 500ms (0.5 seconds).
    const timeoutId = window.setTimeout(() => {
      handleSearch();
    }, 500);

    // Cleanup function:
    // - If term changes before 500ms, this cancels the previous timeout.
    // - This is the classic "debounce" pattern.
    return () => clearTimeout(timeoutId);
  }, [term]); // Re-run this effect whenever "term" changes.

  // Delete a single history item by its id.
  async function handleDeleteHistory(id: number) {
    try {
      await deleteHistoryItem(id);
      // After deleting, reload history from the backend to update the list.
      await loadHistory();
    } catch (err) {
      console.error(err);
    }
  }

  // Check if a character is already in the favorites list.
  // - Uses .some() to find any favorite with the same name.
  function isFavorite(character: Character): boolean {
    return favorites.some((f) => f.name === character.name);
  }

  // Toggle favorite status for a given character:
  // - If character is already in favorites: remove it.
  // - If not: add it.
  function handleToggleFavorite(character: Character) {
    // Use functional setState to ensure we work with the latest state.
    setFavorites((prev) => {
      // Check if character already exists in the previous favorites array.
      const exists = prev.some((f) => f.name === character.name);
      let next: Character[];

      if (exists) {
        // Remove from favorites: keep all except this character.
        next = prev.filter((f) => f.name !== character.name);
      } else {
        // Add to favorites: spread old array and append new character.
        next = [...prev, character];
      }

      // Persist the updated favorites array (e.g. into localStorage).
      saveFavorites(next);

      // Return the new favorites state so React updates the UI.
      return next;
    });
  }

  // JSX for rendering the page:
  return (
    <div className="page-contained search-page">
      {/* Page title */}
      <h1 className="search-title">Character Search</h1>

      {/* Search bar area: input + button */}
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={term} // Controlled input: value always reflects "term" state.
          onChange={(e) => setTerm(e.target.value)} // Update term when user types.
          // Allow pressing Enter to trigger an immediate search (on top of the debounce).
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a character (e.g. Luke)"
        />
        {/* Manual search button.
            Even though there's auto-search after 500ms,
            this gives the user explicit control. */}
        <button onClick={() => handleSearch()} className="sw-btn-primary">
          Search
        </button>
      </div>

      {/* Loading indicator: shown while a request is in progress. */}
      {loading && <p className="search-status">Loading...</p>}

      {/* Error message: shown if there's an error string in state. */}
      {error && <p className="search-status error">{error}</p>}

      {/* If:
          - not loading,
          - no error,
          - user typed something,
          - and no results at all,
          then show "No results" message.
      */}
      {!loading && !error && term.trim() !== '' && results.length === 0 && (
        <p className="search-status">No results found.</p>
      )}

      {/* Results table:
          - Only shown if we have results, and not currently loading or in error state. */}
      {results.length > 0 && !loading && !error && (
        <div className="search-results">
          {/* Header above the table: title and the search term. */}
          <div className="search-results-header">
            <h2>Results ({count})</h2>
            <span className="search-term-label">
              for "<strong>{term.trim()}</strong>"
            </span>
          </div>

          {/* Table reused from your "data-table" styles (same as favorites). */}
          <table className="data-table">
            <thead>
              <tr>
                {/* "Fav" column for the star button; aligned center. */}
                <th style={{ width: '60px', textAlign: 'center' }}>Fav</th>
                <th>Name</th>
                <th>Height</th>
                <th>Birth Year</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {/* Map each character in results to a table row. */}
              {results.map((c) => {
                // active: true if this character is currently selected.
                const active = selectedCharacter?.name === c.name;

                // favorite: true if this character is in the favorites list.
                const favorite = isFavorite(c);

                return (
                  <tr
                    key={c.name} // key uses name; assumes names are unique.
                    // Clicking anywhere on the row selects the character
                    // and shows the details card below.
                    onClick={() => setSelectedCharacter(c)}
                    // If active, apply 'row-selected' class for highlighting.
                    className={active ? 'row-selected' : ''}
                    style={{ cursor: 'pointer' }} // Show pointer cursor to indicate clickability.
                  >
                    {/* Favorites star cell */}
                    <td
                      className="favorite-cell"
                      // Stop click from bubbling to the row onClick when user clicks the star.
                      // This prevents the row from toggling "selected" when they just want
                      // to change favorite status.
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        // Base class: "fav-star-btn".
                        // If favorite == true, add "fav-star-btn-active" for highlighted style.
                        className={
                          'fav-star-btn ' +
                          (favorite ? 'fav-star-btn-active' : '')
                        }
                        // Toggle favorite state for this character.
                        onClick={() => handleToggleFavorite(c)}
                        // Accessibility: screen readers will read this label instead of just "★".
                        aria-label={
                          favorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        {/* Star symbol (★) representing favorite. */}
                        ★
                      </button>
                    </td>

                    {/* Name and the other data columns */}
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

      {/* Character detail card:
          - Shown only when a character has been selected by clicking on a row. */}
      {selectedCharacter && (
        <div className="character-card">
          {/* Character name as title */}
          <h3>{selectedCharacter.name}</h3>

          {/* Small grid showing key properties: height, birth year, gender. */}
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

          {/* Extra note to explain that data comes from SWAPI
              and may not be complete. */}
          <p className="character-note">
            Data is fetched from the public SWAPI service – some fields may be
            unknown for certain characters.
          </p>
        </div>
      )}

      {/* Search history section:
          - Always visible at the bottom.
          - Lets the user quickly rerun previous searches. */}
      <div className="search-history">
        <h2>Search History</h2>
        {history.length === 0 ? (
          // Empty history message.
          <p className="search-status">No history yet.</p>
        ) : (
          // List of past searches.
          <ul className="history-list">
            {history.map((item) => (
              <li key={item.id} className="history-item">
                {/* Clickable chip:
                    - Clicking re-runs the search with this item.term. */}
                <button
                  className="history-chip"
                  onClick={() => handleSearch(item.term)}
                >
                  {item.term}{' '}
                  {/* Show how many times this term was searched. */}
                  <span className="history-count">({item.count})</span>
                </button>

                {/* Show when this search was created.
                    toLocaleString() formats the date/time in the user’s locale. */}
                <span className="history-date">
                  {new Date(item.createdAt).toLocaleString()}
                </span>

                {/* Button to delete this search term from the history list. */}
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

// Export the SearchPage component so it can be used in the router
// (e.g., for the "/search" route).
export default SearchPage;
