type TMDBSearchResult = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
};

type TMDBSearchResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TMDBSearchResult[];
};

type TMDBConfig = {
  images: {
    secure_base_url: string;
  };
};

export function mapSearchResults(
  tmdbResponse: TMDBSearchResponse,
  config: TMDBConfig
) {
  const imageBaseUrl =
    config.images.secure_base_url + 'w500';

  return {
    page: tmdbResponse.page,
    total_pages: tmdbResponse.total_pages,
    total_results: tmdbResponse.total_results,
    results: tmdbResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
      poster_url: movie.poster_path
        ? imageBaseUrl + movie.poster_path
        : null,
    })),
  };
}
