import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <Dumbbell className="h-10 w-10 text-accent" />
      <p className="font-display mt-6 text-7xl font-bold text-white">404</p>
      <h1 className="font-display mt-3 text-xl font-bold uppercase text-white">
        Rep not found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The page or workout you&apos;re looking for doesn&apos;t exist. Head
        back to the library and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}
