import { mapSearchResults } from '@/app/lib/mappers';

describe('mapSearchResults', () => {
  it('maps TMDB response to normalized shape', () => {
    const tmdbResponse = {
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [
        {
          id: 123,
          title: 'Batman',
          overview: 'Dark knight',
          release_date: '2022-01-01',
          vote_average: 8.5,
          poster_path: '/bat.jpg',
        },
      ],
    };

    const config = {
      images: {
        secure_base_url: 'https://img/',
      },
    };

    const result = mapSearchResults(tmdbResponse, config);

    expect(result.results[0]).toEqual({
      id: 123,
      title: 'Batman',
      release_date: '2022-01-01',
      overview: 'Dark knight',
      poster_url: 'https://img/w500/bat.jpg',
      vote_average: 8.5,
    });
  });
});
