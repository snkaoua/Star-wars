// Import React hooks:
// - useState: to store and update local state inside the component
// - useEffect: to run side effects when the component mounts or updates
import { useEffect, useState } from 'react';

// Import the Character type from your API module.
// This ensures that "favorites" will be an array of Character objects
// with the correct fields (name, height, birthYear, gender, etc.).
import type { Character } from '../api';

// Helpers for working with favorites storage (probably localStorage or similar):
// - getFavorites: returns the current list of favorite characters
// - saveFavorites: saves a new list of favorite characters
import { getFavorites, saveFavorites } from '../favorites';

// React component that represents the "Favorites" page of the app
function FavoritesPage() {
  // Local state that holds an array of characters marked as favorites.
  // Initial value is an empty array.
  const [favorites, setFavorites] = useState<Character[]>([]);

  // useEffect with an empty dependency array []:
  // - This means the effect runs only once, right after the component is first rendered.
  // - Here we use it to load the favorites from storage when the page opens.
  useEffect(() => {
    // Call the helper function to get the current list of favorites
    // (for example, from localStorage).
    const stored = getFavorites();

    // Update the component state so the UI shows these favorites.
    setFavorites(stored);
  }, []); // [] means: run once on mount, not on every re-render.

  // Handler for removing a character from the favorites list
  // Parameter "name" is the name of the character we want to remove.
  function handleRemove(name: string) {
    // Create a new array that contains all favorites except the one with this name.
    // filter(...) returns a new array, does not mutate the original.
    const next = favorites.filter((c) => c.name !== name);

    // Update the React state with the new list.
    setFavorites(next);

    // Persist the new favorites array using your helper function
    // so the change is saved (e.g., in localStorage).
    saveFavorites(next);
  }

  // If there are no favorites at all (length === 0), show an "empty state" message.
  if (favorites.length === 0) {
    return (
      // Container for the page content.
      // "page-contained" is probably a CSS class that centers and constrains width.
      <div className="page-contained">
        {/* Page title */}
        <h1>Favorite Characters</h1>

        {/* Informational text when there are no favorites yet.
            Inline styles are used to limit max width for better readability. */}
        <p style={{ maxWidth: 500 }}>
          You don&apos;t have any favorite characters yet.
          {/* Using &apos; to escape the apostrophe in JSX. */}
          Go to the <strong>Search</strong> page and click the ⭐ next to a character
          to add them here.
        </p>
      </div>
    );
  }

  // If we reach this return, it means favorites.length > 0,
  // so we show a table with all favorite characters.
  return (
    <div className="page-contained">
      {/* Page title */}
      <h1>Favorite Characters</h1>

      {/* Short description above the table.
          - maxWidth limits the text width.
          - marginBottom adds space between the paragraph and the table. */}
      <p style={{ maxWidth: 600, marginBottom: '1.5rem' }}>
        Here are all the characters you marked as favorites on this device.
      </p>

      {/* Table that displays the favorite characters.
          "data-table" is a CSS class where you probably define the table design. */}
      <table className="data-table">
        <thead>
          <tr>
            {/* Table header cells: one for each column */}
            <th>Name</th>
            <th>Height</th>
            <th>Birth Year</th>
            <th>Gender</th>
            {/* Empty header for the "Remove" button column */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over all favorite characters.
              For each character "c", render one <tr> (table row). */}
          {favorites.map((c) => (
            // key={c.name}:
            // - React uses "key" to track list items and optimize re-rendering.
            // - Using the character's name as key assumes names are unique.
            <tr key={c.name}>
              {/* Each <td> shows one property of the character */}
              <td>{c.name}</td>
              <td>{c.height}</td>
              <td>{c.birthYear}</td>
              <td>{c.gender}</td>
              <td style={{ textAlign: 'right' }}>
                {/* Button to remove this character from favorites.
                    className "history-delete" is reused styling (probably a red button). */}
                <button
                  className="history-delete"
                  // When clicked, call handleRemove with this character's name.
                  onClick={() => handleRemove(c.name)}
                >
                  {/* Cross symbol + text to show it's a delete action */}
                  ✕ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export the FavoritesPage component so it can be imported and used in the router
// or other parts of the app.
export default FavoritesPage;
