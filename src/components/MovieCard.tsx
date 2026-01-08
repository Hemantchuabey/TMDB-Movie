type Props = {
  movie: {
    id: number;
    title: string;
    overview: string;
    vote_average: number;
    poster_url?: string | null;
  };
};

export default function MovieCard({ movie }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        alignItems: "flex-start",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 80,
          height: 120,
          flexShrink: 0,
          borderRadius: 8,
          overflow: "hidden",
          background: "#f3f4f6",
        }}
      >
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 6,
            color: "#111827",
          }}
        >
          {movie.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            marginBottom: 8,
          }}
        >
          ⭐ {movie.vote_average}
        </p>

        <p
          style={{
            fontSize: 14,
            color: "#374151",
            lineHeight: 1.4,
          }}
        >
          {movie.overview
            ? movie.overview.slice(0, 120) + "…"
            : "No description available."}
        </p>
      </div>
    </div>
  );
}
