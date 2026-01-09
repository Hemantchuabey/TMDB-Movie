const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function tmdbFetch(path: string) {
  const token = process.env.TMDB_READ_ACCESS_TOKEN?.trim();

  if (!token) {
    throw new Error('TMDB_TOKEN_MISSING');
  }

  const res = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (res.status === 429) {
    throw new Error('RATE_LIMIT');
  }

  if (!res.ok) {
    const text = await res.text();
    console.error('TMDB ERROR:', res.status, text);
    throw new Error('TMDB_FETCH_FAILED');
  }

  return res.json();
}
