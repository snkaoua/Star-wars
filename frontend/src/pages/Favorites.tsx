// FavoritesPage component: loads the user’s saved favorite characters
//  from local storage on mount, displays them in a table,
//  and lets the user remove favorites (updating both state and local storage).

import { useEffect, useState } from 'react';

import type { Character } from '../api';

import { getFavorites, saveFavorites } from '../favorites';

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = getFavorites();

    setFavorites(stored);
  }, []); 

  function handleRemove(name: string) { 
    const next = favorites.filter((c) => c.name !== name);

    setFavorites(next);

    saveFavorites(next);
  }

  if (favorites.length === 0) {
    return (
      <div className="page-contained">
        <h1>Favorite Characters</h1>

        <p style={{ maxWidth: 500 }}>
          You don&apos;t have any favorite characters yet.
          Go to the <strong>Search</strong> page and click the ⭐ next to a character
          to add them here.
        </p>
      </div>
    );
  }

  return (
    <div className="page-contained">
      <h1>Favorite Characters</h1>

      <p style={{ maxWidth: 600, marginBottom: '1.5rem' }}>
        Here are all the characters you marked as favorites on this device.
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((c) => (
            
            <tr key={c.name}>

              <td>{c.name}</td>
              <td>{c.height}</td>
              <td>{c.birthYear}</td>
              <td>{c.gender}</td>
              <td style={{ textAlign: 'right' }}>

                <button
                  className="history-delete"
                  onClick={() => handleRemove(c.name)}
                >
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

export default FavoritesPage;
 