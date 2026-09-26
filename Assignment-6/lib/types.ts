export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export type PlanStatus = "plan" | "saved";

export type PlanItem = {
  workoutId: number;
  status: PlanStatus;
  done: boolean;
  addedAt: number;
};

export type SortKey = "duration" | "calories" | "rating";
