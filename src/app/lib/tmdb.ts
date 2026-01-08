const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function tmdbFetch(
  path: string,
  revalidate: number
) {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate },
  });

  if (response.status === 429) {
    throw new Error('RATE_LIMIT');
  }

  if (!response.ok) {
    throw new Error('TMDB_ERROR');
  }

  return response.json();
}
