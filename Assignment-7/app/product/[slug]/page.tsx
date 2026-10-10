"use client";
import { use } from "react";
import Link from "next/link";
import { useData } from "@/components/DataProvider";
import ChangeBadge from "@/components/ChangeBadge";
import NotFoundView from "@/components/NotFoundView";
import { bn, taka, unitLabel } from "@/lib/bn";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { products, loading } = useData();
  const p = products.find((x) => x.slug === slug);

  if (loading)
    return <div className="mx-auto max-w-6xl animate-pulse px-4 py-10"><div className="h-32 rounded-2xl bg-gray-200" /><div className="mt-6 h-64 rounded-2xl bg-gray-100" /></div>;
  if (!p) return <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" text="আপনি যে পণ্যটি খুঁজছেন তা তালিকায় নেই।" />;

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length);
  const divisions = Array.from(new Set(p.markets.map((m) => m.division)));
  const history = [["গতকাল", p.yesterday], ["গত সপ্তাহ", p.lastWeek], ["গত মাস", p.lastMonth]] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href={`/category/${p.category}`} className="text-sm text-brand hover:underline">← {p.categoryNameBn}</Link>

      <section className="mt-3 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-6xl">{p.image}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold">{p.nameBn}</h1>
          <p className="mt-1 text-gray-600">{p.nameBn}-এর আজকের বাজার দর ও দেশের বিভিন্ন বাজারের তুলনামূলক চিত্র।</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-brand-soft px-3 py-1 font-semibold text-brand">{p.categoryIcon} {p.categoryNameBn}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-600">{unitLabel(p.unit)}</span>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-brand-dark">{taka(p.today)}</p>
          <ChangeBadge change={p.change} />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[["সর্বনিম্ন দাম", min, "text-blue-600"], ["সর্বোচ্চ দাম", max, "text-red-600"], ["গড় দাম", avg, "text-brand-dark"]].map(([label, val, color]) => (
          <div key={label as string} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`mt-1 text-2xl font-extrabold ${color}`}>{taka(val as number)}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">তুলনা</p>
          <ul className="mt-1 space-y-0.5 text-sm">
            {history.map(([l, v]) => <li key={l} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-semibold">{taka(v)}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-extrabold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {divisions.map((d) => (
            <div key={d} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <h3 className="bg-brand-soft px-4 py-2 font-bold text-brand-dark">{d} বিভাগ</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500"><tr><th className="px-4 py-2 font-medium">বাজার</th><th className="px-4 py-2 font-medium">সর্বনিম্ন</th><th className="px-4 py-2 font-medium">সর্বোচ্চ</th></tr></thead>
                  <tbody>
                    {p.markets.filter((m) => m.division === d).map((m) => (
                      <tr key={m.market} className="border-t border-gray-100">
                        <td className="px-4 py-2.5 font-medium">{m.market}</td>
                        <td className="px-4 py-2.5">{taka(m.min)}</td>
                        <td className="px-4 py-2.5">{taka(m.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">মোট {bn(p.markets.length)}টি বাজারের তথ্য অনুযায়ী।</p>
      </section>
    </div>
  );
}
