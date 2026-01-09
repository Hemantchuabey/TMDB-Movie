export const runtime = 'nodejs';
export const revalidate = 86400;

import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET() {
  const data = await tmdbFetch('/configuration');
  return Response.json(data.images);
}
