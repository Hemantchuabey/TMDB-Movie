import { tmdbFetch } from '@/app/lib/tmdb';

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
    const config = await tmdbFetch('/configuration', 86400);
    const imageBaseUrl =
      config.images.secure_base_url + 'w500';


const data = await tmdbFetch(
  `/search/movie?query=${encodeURIComponent(q)}&page=${page}&include_adult=false&language=en-US`,
  60
);


    const results = data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
      poster_url: movie.poster_path
        ? imageBaseUrl + movie.poster_path
        : null,
    }));

    return Response.json({
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results,
    });
  } catch (error: any) {
          if (error.message === 'RATE_LIMIT') {
      return Response.json(
        {
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
