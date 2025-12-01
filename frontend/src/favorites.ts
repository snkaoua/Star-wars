// Import the Character type so we can type the favorites list correctly.
// This guarantees that every favorite we store has the same shape
// as the Character object returned from the API.
import type { Character } from './api';

// Key name under which we store favorites in localStorage.
// All favorite data will be saved as a single JSON string under this key.
const STORAGE_KEY = 'sw-favorites';

/**
 * Load the list of favorite characters from localStorage.
 *
 * @returns An array of Character objects.
 *          If nothing is stored (or data is invalid), returns an empty array.
 */
export function getFavorites(): Character[] {
  // In some environments (e.g. server-side rendering with Next.js),
  // "window" does not exist. This check prevents runtime errors.
  if (typeof window === 'undefined') return [];

  // Read the raw JSON string from localStorage.
  const raw = window.localStorage.getItem(STORAGE_KEY);

  // If there is nothing stored under this key, return an empty list.
  if (!raw) return [];

  try {
    // Try to parse the JSON string into a JavaScript array.
    // We cast it to Character[] to tell TypeScript what we expect.
    return JSON.parse(raw) as Character[];
  } catch {
    // If parsing fails (corrupted data, different format, etc.),
    // we return an empty list instead of crashing the app.
    return [];
  }
}

/**
 * Save the list of favorite characters to localStorage.
 *
 * @param list - Array of Character objects to store.
 */
export function saveFavorites(list: Character[]) {
  // Same safety check as in getFavorites:
  // if there is no window (server environment), do nothing.
  if (typeof window === 'undefined') return;

  // Convert the Character[] array to a JSON string and store it.
  // Next time, getFavorites() will read and parse this value.
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
