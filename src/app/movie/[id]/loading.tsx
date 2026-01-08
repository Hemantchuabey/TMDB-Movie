export default function MovieLoading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "48px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ color: "var(--muted)", fontSize: 16 }}>
        Loading movie details…
      </p>
    </main>
  );
}
