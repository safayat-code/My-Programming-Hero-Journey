# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, dive into detailed workout pages, and build out "today's plan" — all tracked live in the navbar and saved across page reloads.

Live Link: <!-- paste your deployed URL here -->
GitHub Repository: <!-- paste your repo URL here -->

## Description

FitLog lets you browse a workout library pulled from a live API, open any lift to see full instructions and stats, and either add it to **Today's Plan** or **Save it for later**. The `/my-plan` page tracks live totals for exercises, minutes and calories, and everything persists in `localStorage` so your plan survives a refresh.

## Technologies Used

- **Next.js 16** (App Router) — routing, layouts, server + client components
- **React 19** — UI and state management (Context API for plan/saved state and toasts)
- **TypeScript** — type-safe components and data models
- **Tailwind CSS v4** — styling, responsive layout, dark theme
- **lucide-react** — icon set
- **FitLog REST API** (`https://api.abcz.workers.dev/api/fitlog`) — workout data source

## Features

1. **Responsive workout library** — a 3x4 grid of workout cards (image, category tags, name, equipment, duration/calories/rating stats) that reflows across mobile, tablet, and desktop.
2. **Sort & search** — sort the library by Duration, Calories, or Rating, and search by name or muscle-group tag, live.
3. **Detailed workout pages** — two-column layout with a full spec panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **Live plan tracking** — "Add to today's plan" and "Save for later" instantly update the navbar's Plan/Saved badges, show a toast, and persist to `localStorage`; the plan is capped at 5 lifts.
5. **My Plan dashboard** — tabbed Today's Plan / Saved views, live Exercises/Minutes/Calories summary cards, per-item Mark as Done / Remove actions with toasts, a loading state, and a friendly empty state.
6. **Polished states & routing** — custom 404 page, loading spinner while the API is fetched, and error handling so a bad connection or reload never crashes the app.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```
