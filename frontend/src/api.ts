// Base URL for your backend API.
// In development, the server runs on localhost:3000 and exposes routes under /api.
const API_BASE = 'http://localhost:3000/api';


// -------------------- TypeScript interfaces --------------------

// Interface describing the shape of a "Character" object
// as it is sent/received between frontend and backend.
export interface Character {
  // Name of the character (e.g. "Luke Skywalker").
  name: string;

  // Height as a string, usually in centimeters (e.g. "172").
  // It's a string because SWAPI also sometimes returns "unknown".
  height: string;

  // Birth year, e.g. "19BBY" (Before Battle of Yavin) or "unknown".
  birthYear: string;

  // Gender, e.g. "male", "female", "n/a", "unknown".
  gender: string;
}

// Interface for one entry in the search history.
export interface HistoryItem {
  // Unique numeric id (from the database).
  id: number;

  // The exact search term the user typed (e.g. "luke").
  term: string;

  // How many results were found for this term, or how many times it was searched
  // (depending on how you implemented it on the backend).
  count: number;

  // When this search was performed, in ISO string format (e.g. "2025-12-01T13:00:00.000Z").
  createdAt: string;
}


// -------------------- API functions --------------------

/**
 * Search for characters by name/term.
 *
 * @param term - The search string typed by the user (e.g. "Luke").
 * @returns A promise that resolves to an object containing:
 *   - search: the term that was searched
 *   - count: total number of matching characters
 *   - results: array of Character objects
 */
export async function searchCharacters(term: string): Promise<{
  search: string;
  count: number;
  results: Character[];
}> {
  // Build the URL with a query parameter:
  // - encodeURIComponent(term) ensures special characters (spaces, ?, &, etc.)
  //   are safely encoded in the URL.
  const res = await fetch(`${API_BASE}/characters?search=${encodeURIComponent(term)}`);

  // Check if the HTTP response status is in the 200–299 range.
  // If not, we throw an error so the caller can catch it and show a message.
  if (!res.ok) {
    throw new Error('Failed to search characters');
  }

  // Parse the response body as JSON and return it.
  // We expect it to match the structure defined in the Promise<...> above.
  return res.json();
}

/**
 * Get the list of previous search terms from the server.
 *
 * @returns A promise that resolves to an array of HistoryItem objects.
 */
export async function getSearchHistory(): Promise<HistoryItem[]> {
  // Simple GET request to the /search-history endpoint.
  const res = await fetch(`${API_BASE}/search-history`);

  // If the response is not OK (e.g. 500, 404, 403), throw an error.
  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }

  // Return the parsed JSON, which should be a HistoryItem[] array.
  return res.json();
}

/**
 * Delete a search history item by its id.
 *
 * @param id - The numeric id of the history item to delete.
 * @returns A promise that resolves to void (no data needed back).
 */
export async function deleteHistoryItem(id: number): Promise<void> {
  // Send a DELETE request to /search-history/:id
  const res = await fetch(`${API_BASE}/search-history/${id}`, {
    method: 'DELETE',
  });

  // If deletion failed (non-2xx response), throw an error so the UI can handle it.
  if (!res.ok) {
    throw new Error('Failed to delete history item');
  }

  // No need to return anything; the caller just waits for completion.
}
