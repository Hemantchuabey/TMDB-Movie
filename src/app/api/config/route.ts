import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET() {
  const data = await tmdbFetch('/configuration');

  return Response.json(data.images, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
