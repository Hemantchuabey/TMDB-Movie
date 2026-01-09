export const runtime = 'nodejs';
export const revalidate = 60;

import { tmdbFetch } from '@/app/lib/tmdb';
import { mapSearchResults } from '@/app/lib/mappers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get('q')?.trim();
  const page = Number(searchParams.get('page') || 1);

  if (!q || q.length < 2) {
    return Response.json(
      { error: 'Query must be at least 2 characters long' },
      { status: 400 }
    );
  }

  if (page < 1) {
    return Response.json(
      { error: 'Page must be greater than or equal to 1' },
      { status: 400 }
    );
  }

  try {
    const config = await tmdbFetch('/configuration');

    const data = await tmdbFetch(
      `/search/movie?query=${encodeURIComponent(
        q
      )}&page=${page}&include_adult=false&language=en-US`
    );

    const normalized = mapSearchResults(data, config);

    return Response.json(normalized);
  } catch (error: any) {
    if (error.message === 'RATE_LIMIT') {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
