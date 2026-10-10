import type { Category, Product } from "./types";
const BASES = ["https://api.abcz.workers.dev/api/bazardor", "https://api.api-store.workers.dev/api/bazardor"];

async function get<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}
export const fetchProducts = () => get<Product[]>("/products");
export const fetchCategories = () => get<Category[]>("/categories");
