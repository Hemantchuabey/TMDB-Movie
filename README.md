# TMDB Movie Explorer

This project is an assignment for a **Catalyst Media Integrated LLP** Company.  
It demonstrate a small Movie Explorer application built using **Next.js App Router** and **The Movie Database (TMDB)** API.

---

## 🔗 Live Demo

https://tmdb-movie-six.vercel.app/

About Assignment :

- SSR usage
- Clean backend-for-frontend (BFF) architecture
- Proper API handling, caching, and error handling
- Production-ready structure

---

## 🛠 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Server Components (default)**
- **Route Handlers (`/app/api`)**
- **TMDB API (v3 endpoints + v4 token)**
- **Vercel (Deployment)**

---

## Features

- Server-side rendered movie search
- Movie detail page with full information
- Backend-for-frontend using Next.js Route Handlers
- Secure TMDB integration (no secrets exposed to the client)
- Pagination via query parameters
- Loading, empty, error, and not-found states
- Rate limit handling

---

## Architecture

This app follows a **Backend-for-Frontend (BFF)** pattern using Next.js Route Handlers.

## 🧠 Server-Side Rendering (SSR)

All data-driven pages are server-rendered:

- Search page reads from `searchParams` (`/?q=batman&page=1`)
- Movie detail page uses dynamic routing (`/movie/[id]`)
- No `useEffect` or client-side data fetching is used for primary data

Validation:

- `q` is required and minimum 2 characters
- `page` must be >= 1

Includes:

- Core movie details
- Genres
- Runtime
- Rating
- Top 5 cast members
- YouTube trailers
- Poster and backdrop URLs

Invalid IDs return a proper 404 response.

Instructions to run tests:

```bash
npm run test
```
