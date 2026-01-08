import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET() {
  const data = await tmdbFetch('/configuration', 86400);

  return Response.json(data.images);
}
