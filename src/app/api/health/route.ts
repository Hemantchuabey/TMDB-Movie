import { tmdbFetch } from '@/app/lib/tmdb';

export async function GET() {
  const config = await tmdbFetch('/configuration',86400);

  return Response.json({
    ok: true,
    secureImageBaseUrl: config.images.secure_base_url,
  });
}
