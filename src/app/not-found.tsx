export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 12,
          }}
        >
          Movie Not Found
        </h1>

        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          The movie you are looking for does not exist or may have been removed.
        </p>

        <a
          href="/"
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          Go back to search
        </a>
      </div>
    </main>
  );
}
