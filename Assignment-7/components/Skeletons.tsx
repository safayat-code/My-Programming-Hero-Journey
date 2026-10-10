export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-3 h-16 w-16 rounded-xl bg-gray-200" />
      <div className="mb-2 h-5 w-2/3 rounded bg-gray-200" />
      <div className="h-4 w-1/3 rounded bg-gray-100" />
      <div className="mt-4 flex justify-between border-t border-dashed pt-3">
        <div className="h-6 w-24 rounded bg-gray-200" /><div className="h-6 w-14 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
export function GridSkeleton({ n = 8 }: { n?: number }) {
  return (
    <div role="status" aria-label="Loading…" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: n }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
