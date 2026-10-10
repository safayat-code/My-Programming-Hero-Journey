"use client";
export type SortKey = "default" | "asc" | "desc";
export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
      সাজান:
      <span className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-ink focus:border-brand focus:outline-none">
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 7.5 10 12l4.5-4.5-1.4-1.4L10 9.2 6.9 6.1z" /></svg>
      </span>
    </label>
  );
}
export function sortProducts<T extends { today: number }>(list: T[], key: SortKey): T[] {
  if (key === "default") return list;
  return [...list].sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today)); // numeric, not string
}
