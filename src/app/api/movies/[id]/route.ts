import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movieId = Number(id);


  if (!movieId || movieId <= 0) {
    return Response.json(
      { error: 'Invalid movie id' },
      { status: 400 }
    );
  }

  try {
    const config = await tmdbFetch('/configuration');
    const posterBaseUrl =
      config.images.secure_base_url + 'w500';
    const backdropBaseUrl =
      config.images.secure_base_url + 'w780';

    const data = await tmdbFetch(
      `/movie/${movieId}?append_to_response=videos,credits`
    );


    const cast = data.credits?.cast
      ?.slice(0, 5)
      .map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character,
      }));

    const trailers = data.videos?.results
      ?.filter(
        (v: any) =>
          v.site === 'YouTube' && v.type === 'Trailer'
      )
      .map((v: any) => ({
        id: v.id,
        key: v.key,
        name: v.name,
      }));

    return Response.json({
      id: data.id,
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      runtime: data.runtime,
      rating: data.vote_average,
      genres: data.genres,
      poster_url: data.poster_path
        ? posterBaseUrl + data.poster_path
        : null,
      backdrop_url: data.backdrop_path
        ? backdropBaseUrl + data.backdrop_path
        : null,
      cast,
      trailers,
    });
  } catch (error : any) {
        if (error.message === 'RATE_LIMIT') {
      return Response.json(
        {
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }
    return Response.json(
      { error: 'Movie not found' },
      { status: 404 }
    );
  }
}
