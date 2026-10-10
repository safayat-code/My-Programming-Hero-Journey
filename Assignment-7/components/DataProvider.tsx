"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Category, Product } from "@/lib/types";
import { fetchCategories, fetchProducts } from "@/lib/api";

type Ctx = { products: Product[]; categories: Category[]; loading: boolean; error: boolean };
const DataCtx = createContext<Ctx>({ products: [], categories: [], loading: true, error: false });
export const useData = () => useContext(DataCtx);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Ctx>({ products: [], categories: [], loading: true, error: false });
  useEffect(() => {
    let alive = true;
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categories]) => alive && setState({ products, categories, loading: false, error: false }))
      .catch(() => alive && setState({ products: [], categories: [], loading: false, error: true }));
    return () => { alive = false; };
  }, []);
  return <DataCtx.Provider value={state}>{children}</DataCtx.Provider>;
}
