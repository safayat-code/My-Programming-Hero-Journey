import { Dumbbell } from "lucide-react";

export default function Loader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-neutral-400">
      <Dumbbell className="h-8 w-8 animate-spin-slow text-accent" />
      <p className="font-display text-sm uppercase tracking-wide">{label}</p>
    </div>
  );
}
