import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMDB Movie Explorer",
  description: "Explore movies using TMDB API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            "--bg": "#f9fafb",
            "--card-bg": "#ffffff",
            "--text": "#111827",
            "--muted": "#6b7280",
            "--border": "#e5e7eb",
            "--hover-border": "#6366f1",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
