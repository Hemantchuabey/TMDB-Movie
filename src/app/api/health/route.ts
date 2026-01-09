import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET() {
  const config = await tmdbFetch('/configuration');

  return Response.json({
    ok: true,
    secureImageBaseUrl: config.images.secure_base_url,
  });
}
