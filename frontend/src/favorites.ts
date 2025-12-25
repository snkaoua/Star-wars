// Favorites storage helper: reads and writes the user’s favorite characters 
// to `localStorage` (with safe parsing and SSR checks) using a single storage key.

import type { Character } from './api';

const STORAGE_KEY = 'sw-favorites';

export function getFavorites(): Character[] {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as Character[];
  } catch {
    return [];
  }
}

export function saveFavorites(list: Character[]) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
