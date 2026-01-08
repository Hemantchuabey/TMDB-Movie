# TMDB Movie Explorer (Next.js App Router)

This project is a small Movie Explorer application built using **Next.js App Router** and **The Movie Database (TMDB)** API.

The goal of this assignment was not UI polish, but to demonstrate:

- Correct SSR usage
- Clean backend-for-frontend (BFF) architecture
- Proper API handling, caching, and error handling
- Production-ready structure

---

## 🚀 Features

- Server-side rendered movie search
- Movie detail page with full information
- Backend-for-frontend using Next.js Route Handlers
- Secure TMDB integration (no secrets exposed to the client)
- Pagination via query parameters
- Loading, empty, error, and not-found states
- Rate limit handling
- Light/Dark theme support (UI-level)

---

## 🧱 Architecture Overview

This app follows a **Backend-for-Frontend (BFF)** pattern using Next.js Route Handlers.

### Why BFF?

- Keeps TMDB token fully server-side
- Allows validation and response normalization
- Prevents client-side API misuse
- Makes the frontend independent of TMDB response shape

### High-level flow
