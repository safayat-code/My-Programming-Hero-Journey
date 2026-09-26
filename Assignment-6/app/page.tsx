"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (cancelled) return;
        setWorkouts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sortField: Record<SortKey, keyof Workout> = {
    duration: "duration",
    calories: "caloriesBurned",
    rating: "rating",
  };

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;
    const field = sortField[sortKey];
    return [...filtered].sort(
      (a, b) => (b[field] as number) - (a[field] as number)
    );
  }, [workouts, sortKey, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag"
                className="w-48 rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 hover:border-accent/60 focus:border-accent sm:w-60"
              />
            </div>
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        </div>

        <div className="mt-8">
          {status === "loading" && <Loader label="Loading workouts…" />}

          {status === "error" && (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center">
              <p className="font-display text-lg font-semibold uppercase text-white">
                Couldn&apos;t load the library
              </p>
              <p className="mt-2 text-sm text-muted">
                Check your connection and refresh the page.
              </p>
            </div>
          )}

          {status === "ready" && visibleWorkouts.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center">
              <p className="font-display text-lg font-semibold uppercase text-white">
                No matches
              </p>
              <p className="mt-2 text-sm text-muted">
                Try a different name or muscle group.
              </p>
            </div>
          )}

          {status === "ready" && visibleWorkouts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
