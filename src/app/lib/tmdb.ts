const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function tmdbFetch(path: string) {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with ${response.status}`);
  }

  return response.json();
}
