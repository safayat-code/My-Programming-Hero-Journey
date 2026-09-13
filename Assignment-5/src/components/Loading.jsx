export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <span className="loading loading-spinner loading-lg text-pink-500"></span>
      <p className="text-slate-500 text-sm">Loading technologies…</p>
    </div>
  );
}
