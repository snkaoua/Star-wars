const API_BASE = 'http://localhost:3000/api';


export interface Character {
  name: string;
  height: string;
  birthYear: string;
  gender: string;
}

export interface HistoryItem {
  id: number;
  term: string;
  count: number;
  createdAt: string;
}


export async function searchCharacters(term: string): Promise<{
  search: string;
  count: number;
  results: Character[];
}> {
  const res = await fetch(`${API_BASE}/characters?search=${encodeURIComponent(term)}`);

  if (!res.ok) {
    throw new Error('Failed to search characters');
  }

  return res.json();
}

export async function getSearchHistory(): Promise<HistoryItem[]> {
  const res = await fetch(`${API_BASE}/search-history`);

  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }

  return res.json();
}

export async function deleteHistoryItem(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/search-history/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete history item');
  }
}
