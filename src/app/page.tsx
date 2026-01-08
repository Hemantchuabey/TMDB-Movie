import SearchBox from "@/components/SearchBox";
import MovieGrid from "@/components/MovieGrid";

type SearchParams = {
  q?: string;
  page?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, page = "1" } = await searchParams;

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
      if (!res.ok) error = data.error;
    } catch {
      error = "Failed to load movies";
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "48px 16px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Movie Explorer
          </h1>
          <p style={{ color: "#6b7280" }}>Search movies using TMDB</p>
        </header>

        <SearchBox />

        {!q && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Start by searching for a movie.
          </p>
        )}

        {error && (
          <p style={{ color: "#dc2626", textAlign: "center" }}>{error}</p>
        )}

        {q && !error && data?.results?.length === 0 && (
          <p style={{ textAlign: "center" }}>No results found.</p>
        )}

        {data?.results?.length > 0 && <MovieGrid movies={data.results} />}
      </div>
    </main>
  );
}
