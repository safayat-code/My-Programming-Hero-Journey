"use client";
import { useData } from "./DataProvider";
import { bn, unitShort } from "@/lib/bn";

export default function Ticker() {
  const { products, loading } = useData();
  if (loading || !products.length) return <div className="h-9 bg-brand-dark" />;
  const items = [...products, ...products];
  return (
    <div className="marquee overflow-hidden bg-brand-dark text-white" aria-label="দামের তালিকা">
      <div className="marquee-track py-2 text-sm">
        {items.map((p, i) => (
          <span key={i} className="mx-5 inline-flex items-center gap-1.5 whitespace-nowrap">
            <span>{p.image}</span><span className="font-semibold">{p.nameBn}</span>
            <span>{bn(p.today)} টাকা/{unitShort(p.unit)}</span>
            <span className={p.change.dir === "up" ? "text-green-300" : p.change.dir === "down" ? "text-red-300" : "text-gray-300"}>
              {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"} {bn(Math.abs(p.change.pct))}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
