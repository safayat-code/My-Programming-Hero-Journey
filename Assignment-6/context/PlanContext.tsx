"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PlanItem, PlanStatus } from "@/lib/types";

const STORAGE_KEY = "fitlog:plan-items";
export const PLAN_CAP = 5;

type PlanContextValue = {
  items: PlanItem[];
  planItems: PlanItem[];
  savedItems: PlanItem[];
  planCount: number;
  savedCount: number;
  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (workoutId: number) => boolean;
  addToSaved: (workoutId: number) => boolean;
  removeItem: (workoutId: number, status: PlanStatus) => void;
  toggleDone: (workoutId: number) => void;
  hydrated: boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // Ignore corrupt storage and start fresh.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable (private mode, quota); fail silently.
    }
  }, [items, hydrated]);

  const planItems = useMemo(
    () => items.filter((i) => i.status === "plan"),
    [items]
  );
  const savedItems = useMemo(
    () => items.filter((i) => i.status === "saved"),
    [items]
  );

  const isInPlan = (workoutId: number) =>
    items.some((i) => i.workoutId === workoutId && i.status === "plan");
  const isSaved = (workoutId: number) =>
    items.some((i) => i.workoutId === workoutId && i.status === "saved");

  const addToPlan = (workoutId: number) => {
    if (isInPlan(workoutId)) return false;
    if (planItems.length >= PLAN_CAP) return false;
    setItems((prev) => [
      ...prev,
      { workoutId, status: "plan", done: false, addedAt: Date.now() },
    ]);
    return true;
  };

  const addToSaved = (workoutId: number) => {
    if (isSaved(workoutId)) return false;
    setItems((prev) => [
      ...prev,
      { workoutId, status: "saved", done: false, addedAt: Date.now() },
    ]);
    return true;
  };

  const removeItem = (workoutId: number, status: PlanStatus) => {
    setItems((prev) =>
      prev.filter((i) => !(i.workoutId === workoutId && i.status === status))
    );
  };

  const toggleDone = (workoutId: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.workoutId === workoutId && i.status === "plan"
          ? { ...i, done: !i.done }
          : i
      )
    );
  };

  const value: PlanContextValue = {
    items,
    planItems,
    savedItems,
    planCount: planItems.length,
    savedCount: savedItems.length,
    isInPlan,
    isSaved,
    isPlanFull: planItems.length >= PLAN_CAP,
    addToPlan,
    addToSaved,
    removeItem,
    toggleDone,
    hydrated,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
