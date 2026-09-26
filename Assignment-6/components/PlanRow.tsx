"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PlanItem, Workout } from "@/lib/types";
import StatRow from "./StatRow";

export default function PlanRow({
  item,
  workout,
  onRemove,
  onToggleDone,
}: {
  item: PlanItem;
  workout: Workout;
  onRemove: () => void;
  onToggleDone?: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center ${
        item.done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-16 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display truncate text-base font-bold uppercase text-white">
          {workout.name}
          {item.done && (
            <span className="ml-2 align-middle text-xs font-medium normal-case text-accent">
              Done
            </span>
          )}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2">
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {onToggleDone && (
          <button
            onClick={onToggleDone}
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
          >
            <Check className="h-3.5 w-3.5" />
            {item.done ? "Undo" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-neutral-400 transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
