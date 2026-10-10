import Link from "next/link";
export default function NotFoundView({ title = "৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি", text = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।" }: { title?: string; text?: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <div className="text-7xl">🛒</div>
      <h1 className="mt-4 text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 text-gray-500">{text}</p>
      <Link href="/" className="mt-6 rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
