"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
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
          Something went wrong
        </h1>

        <p
          style={{
            color: "var(--muted)",
            marginBottom: 24,
            maxWidth: 400,
          }}
        >
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={reset}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--card-bg)",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    </main>
  );
}
