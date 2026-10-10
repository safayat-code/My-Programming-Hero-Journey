"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import SortSelect, { SortKey, sortProducts } from "@/components/SortSelect";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function Home() {
  const { products, loading, error } = useData();
  const [sort, setSort] = useState<SortKey>("default");

  const risers = useMemo(() => products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6), [products]);
  const fallers = useMemo(() => products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6), [products]);
  const all = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-soft to-[#fafaf7]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-wide text-brand">আজকের বাজার দর</p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">নিত্যপ্রয়োজনীয় পণ্যের দাম, <span className="text-brand">এক নজরে</span></h1>
            <p className="mt-4 max-w-lg text-gray-600">দেশের বিভিন্ন বাজারের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের সর্বশেষ দাম দেখুন এবং কোন পণ্যের দাম বাড়ল-কমল তা জেনে নিন।</p>
            <a href="#সব-পণ্য" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow hover:bg-brand-dark">
              সব পণ্য দেখুন <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={420} height={350} priority className="h-auto w-full max-w-sm" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10">
        {error && <p className="rounded-lg bg-red-50 p-4 text-red-600">ডেটা লোড করা যায়নি। পরে আবার চেষ্টা করুন।</p>}

        <section>
          <h2 className="mb-4 text-2xl font-extrabold text-green-700">আজ দাম বেড়েছে ▲</h2>
          {loading ? <GridSkeleton n={6} /> : <div className={grid}>{risers.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-extrabold text-red-600">আজ দাম কমেছে ▼</h2>
          {loading ? <GridSkeleton n={6} /> : <div className={grid}>{fallers.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </section>

        <section id="সব-পণ্য" className="scroll-mt-28">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold">সব পণ্য</h2>
              <p className="text-gray-500">সবগুলো নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম</p>
            </div>
            <SortSelect value={sort} onChange={setSort} />
          </div>
          {loading ? <GridSkeleton n={12} /> : <div className={grid}>{all.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </section>
      </div>
    </>
  );
}
