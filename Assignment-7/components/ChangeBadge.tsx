import { bn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const p = Math.abs(change.pct);
  if (change.dir === "up")
    return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">▲ {bn(p)}%</span>;
  if (change.dir === "down")
    return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">▼ {bn(p)}%</span>;
  return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">— {bn(0)}%</span>;
}
