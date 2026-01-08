"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;

    router.push(`/?q=${encodeURIComponent(query)}&page=1`);
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 32,
      }}
    >
      <input
        type="text"
        placeholder="Search movies…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          color: "var(--text)",
        }}
      />
    </form>
  );
}
