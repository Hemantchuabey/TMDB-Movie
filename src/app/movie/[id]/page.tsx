import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";

type Params = {
  id: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) {
    notFound();
  }
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  try {
    // const res = await fetch(`${protocol}://${host}/api/movies/${id}`, {
    //   cache: "no-store",
    // });

    const isLocalhost =
      host.startsWith("localhost") || host.startsWith("127.0.0.1");

    const protocol = isLocalhost ? "http" : "https";

    const url = new URL(`/api/movies/${id}`, `${protocol}://${host}`);

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Movie Not Found",
        description: "The requested movie could not be found.",
      };
    }

    const movie = await res.json();

    return {
      title: `${movie.title} | Movie Explorer`,
      description:
        movie.overview?.slice(0, 160) || "Movie details and information.",
    };
  } catch {
    return {
      title: "Movie Details",
      description: "Unable to load movie details.",
    };
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const res = await fetch(`/api/movies/${id}`, { cache: "no-store" });

  if (!res.ok) {
    notFound();
  }

  const movie = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>{movie.title}</h1>

      {movie.poster_url && (
        <img src={movie.poster_url} alt={movie.title} width={200} />
      )}

      <p>{movie.overview}</p>

      <p>
        <strong>Runtime:</strong> {movie.runtime} min
      </p>

      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>

      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres?.map((g: any) => g.name).join(", ")}
      </p>

      <h3>Top Cast</h3>
      <ul>
        {movie.cast?.map((c: any) => (
          <li key={c.id}>
            {c.name} as {c.character}
          </li>
        ))}
      </ul>
    </main>
  );
}
