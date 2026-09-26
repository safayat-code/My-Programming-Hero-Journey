"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import Loader from "@/components/Loader";
import PlanRow from "@/components/PlanRow";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [tab, setTab] = useState<Tab>("plan");

  const { planItems, savedItems, removeItem, toggleDone } = usePlan();
  const { showToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const workoutMap = useMemo(() => {
    const map = new Map<number, Workout>();
    workouts.forEach((w) => map.set(w.id, w));
    return map;
  }, [workouts]);

  const metrics = useMemo(() => {
    return planItems.reduce(
      (acc, item) => {
        const w = workoutMap.get(item.workoutId);
        if (!w) return acc;
        acc.exercises += 1;
        acc.minutes += w.duration;
        acc.calories += w.caloriesBurned;
        return acc;
      },
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [planItems, workoutMap]);

  const activeItems = tab === "plan" ? planItems : savedItems;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Exercises", value: metrics.exercises },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface px-3 py-5 text-center sm:px-6"
          >
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-2 border-b border-border">
        {[
          { key: "plan" as const, label: "Today's Plan" },
          { key: "saved" as const, label: "Saved" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-display -mb-px border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              tab === t.key
                ? "border-accent text-accent"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {status === "loading" && <Loader label="Loading workouts…" />}

        {status === "error" && (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center">
            <p className="font-display text-lg font-semibold uppercase text-white">
              Couldn&apos;t load your plan
            </p>
            <p className="mt-2 text-sm text-muted">
              Check your connection and refresh the page.
            </p>
          </div>
        )}

        {status === "ready" && activeItems.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <Dumbbell className="h-8 w-8 text-accent" />
            <p className="font-display mt-4 text-xl font-bold uppercase text-white">
              Nothing Here Yet
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {status === "ready" && activeItems.length > 0 && (
          <div className="flex flex-col gap-3">
            {activeItems.map((item) => {
              const workout = workoutMap.get(item.workoutId);
              if (!workout) return null;
              return (
                <PlanRow
                  key={`${item.status}-${item.workoutId}`}
                  item={item}
                  workout={workout}
                  onRemove={() => {
                    removeItem(item.workoutId, item.status);
                    showToast(
                      item.status === "plan"
                        ? "Removed from today's plan"
                        : "Removed from saved"
                    );
                  }}
                  onToggleDone={
                    tab === "plan"
                      ? () => {
                          toggleDone(item.workoutId);
                          showToast(
                            item.done ? "Marked as not done" : "Marked as done"
                          );
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
