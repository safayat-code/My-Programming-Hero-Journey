"use client";

import Image from "next/image";
import { BookmarkPlus, CirclePlus } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import StatRow from "./StatRow";

const specRows = (w: Workout) => [
  { label: "Equipment", value: w.equipment },
  { label: "Difficulty", value: w.difficulty },
  { label: "Sets", value: String(w.sets) },
  { label: "Reps", value: w.reps },
  { label: "Duration", value: `${w.duration} min` },
  { label: "Calories", value: `${w.caloriesBurned} kcal` },
  { label: "Rating", value: String(w.rating) },
];

export default function WorkoutDetail({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handleAddToPlan = () => {
    const added = addToPlan(workout.id);
    if (added) {
      showToast("Added to today's plan");
    } else if (isPlanFull) {
      showToast("Today's plan is full — finish a lift first");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout.id);
    if (added) {
      showToast("Saved for later");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-4 text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-400">
            {workout.description}
          </p>

          <div className="mt-5">
            <StatRow
              duration={workout.duration}
              calories={workout.caloriesBurned}
              rating={workout.rating}
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            {specRows(workout).map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3 text-sm ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-2"
                }`}
              >
                <span className="font-display font-semibold uppercase tracking-wide text-neutral-400">
                  {row.label}
                </span>
                <span className="font-medium text-white">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase text-white">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-neutral-300">
                  <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              disabled={inPlan || isPlanFull}
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CirclePlus className="h-4 w-4" />
              {inPlan
                ? "Already in plan"
                : isPlanFull
                ? `Plan full (${PLAN_CAP}/${PLAN_CAP})`
                : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <BookmarkPlus className="h-4 w-4" />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
