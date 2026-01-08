const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function tmdbFetch(path: string) {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 429) {
    const error = new Error('RATE_LIMIT');
    throw error;
  }

  if (!response.ok) {
    const error = new Error('TMDB_ERROR');
    throw error;
  }

  return response.json();
}
