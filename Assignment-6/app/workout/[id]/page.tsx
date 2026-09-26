import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkout } from "@/lib/api";
import WorkoutDetail from "@/components/WorkoutDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkout(id);
  return {
    title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog",
  };
}

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetail workout={workout} />;
}
