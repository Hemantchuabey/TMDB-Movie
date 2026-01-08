"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  function goToPage(page: number) {
    if (!q) return;
    router.push(`/?q=${encodeURIComponent(q)}&page=${page}`);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 40,
      }}
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          cursor: currentPage <= 1 ? "not-allowed" : "pointer",
          opacity: currentPage <= 1 ? 0.5 : 1,
        }}
      >
        ← Prev
      </button>

      <span style={{ color: "var(--muted)" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
          opacity: currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        Next →
      </button>
    </div>
  );
}
