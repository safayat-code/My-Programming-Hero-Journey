import { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load the workout library.");
  }
  return res.json();
}

export async function getWorkout(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  // Some APIs return an empty object / null for a missing id instead of a 404.
  if (!data || !data.id) return null;
  return data;
}
