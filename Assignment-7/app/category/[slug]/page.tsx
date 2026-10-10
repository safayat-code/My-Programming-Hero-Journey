"use client";
import { use, useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import SortSelect, { SortKey, sortProducts } from "@/components/SortSelect";
import NotFoundView from "@/components/NotFoundView";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { products, categories, loading } = useData();
  const [sort, setSort] = useState<SortKey>("default");
  const category = categories.find((c) => c.slug === slug);
  const list = useMemo(() => sortProducts(products.filter((p) => p.category === slug), sort), [products, slug, sort]);

  if (loading)
    return <div className="mx-auto max-w-6xl px-4 py-10"><div className="mb-6 h-9 w-48 animate-pulse rounded bg-gray-200" /><GridSkeleton n={4} /></div>;

  if (!category || list.length === 0)
    return <NotFoundView title="এই ক্যাটাগরিতে কোনো পণ্য নেই" text="ক্যাটাগরিটি সঠিক নয় অথবা এখানে এখনো কোনো পণ্য যোগ করা হয়নি।" />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold"><span className="mr-2">{category.icon}</span>{category.nameBn}</h1>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
