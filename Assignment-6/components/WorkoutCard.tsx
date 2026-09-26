import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import StatRow from "./StatRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-base font-bold uppercase leading-tight text-white sm:text-lg">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-auto pt-1">
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
