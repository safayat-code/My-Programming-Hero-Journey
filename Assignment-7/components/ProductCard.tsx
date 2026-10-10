import Link from "next/link";
import type { Product } from "@/lib/types";
import { taka, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-soft text-4xl">{p.image}</div>
      <h3 className="text-lg font-bold leading-snug group-hover:text-brand">{p.nameBn}</h3>
      <p className="text-sm text-gray-500">{unitLabel(p.unit)}</p>
      <div className="mt-3 flex items-end justify-between border-t border-dashed border-gray-200 pt-3">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-lg font-extrabold text-brand-dark">{taka(p.today)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
