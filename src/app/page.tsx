type SearchParams = {
  q?: string;
  page?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  const q = resolvedSearchParams.q;
  const page = resolvedSearchParams.page || "1";

  let data: any = null;
  let error: string | null = null;

  if (q) {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
        }/api/movies/search?q=${q}&page=${page}`,
        { cache: "no-store" }
      );

      data = await res.json();

      if (!res.ok) {
        error = data.error || "Something went wrong";
      }
    } catch {
      error = "Failed to load movies";
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Movie Search</h1>

      {!q && <p>Use query params to search movies.</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {q && !error && data?.results?.length === 0 && <p>No movies found.</p>}

      {data?.results?.map((movie: any) => (
        <div key={movie.id} style={{ marginBottom: 16 }}>
          <strong>{movie.title}</strong>
          <div>Rating: {movie.vote_average}</div>
        </div>
      ))}
    </main>
  );
}

export const metadata = {
  title: "Movie Explorer - Discover Films",
  description: "Search and explore movies using TMDB API",
};
