import { Clock, Flame, Star } from "lucide-react";

export default function StatRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-400 sm:text-sm">
      <span className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-accent" />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className="h-3.5 w-3.5 text-accent" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
        {rating}
      </span>
    </div>
  );
}
