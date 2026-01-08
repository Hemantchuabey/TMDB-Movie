import { GET } from '@/app/api/movies/search/route';
import * as tmdb from '@/app/lib/tmdb';

jest.mock('@/app/lib/tmdb');

describe('GET /api/movies/search', () => {
  it('returns search results for valid query', async () => {
    // mock TMDB calls
    (tmdb.tmdbFetch as jest.Mock)
      .mockResolvedValueOnce({
        images: { secure_base_url: 'https://img/' },
      })
      .mockResolvedValueOnce({
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
            overview: 'Overview',
            vote_average: 7,
            poster_path: '/x.jpg',
          },
        ],
      });

    const req = new Request(
      'http://localhost/api/movies/search?q=test&page=1'
    );

    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results[0].title).toBe('Test Movie');
    expect(body.results[0].poster_url).toContain('https://img/');
  });

  it('returns 400 for invalid query', async () => {
    const req = new Request(
      'http://localhost/api/movies/search?q=a&page=1'
    );

    const res = await GET(req);

    expect(res.status).toBe(400);
  });
});
