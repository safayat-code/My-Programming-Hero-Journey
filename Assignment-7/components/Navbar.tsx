"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useData } from "./DataProvider";
import { useSession, signOut } from "@/lib/auth-client";
import { banglaDate } from "@/lib/bn";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { categories } = useData();
  const { data: session, isPending } = useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const link = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${active ? "bg-brand text-white" : "text-gray-600 hover:bg-brand-soft hover:text-brand"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" className="leading-tight">
          <span className="text-xl font-extrabold text-brand">🛒 বাজার দর</span>
          <span className="block text-xs text-gray-500">{date || "\u00A0"}</span>
        </Link>

        <div className="order-3 w-full overflow-x-auto no-scrollbar md:order-2 md:w-auto">
          <nav className="flex gap-1.5 py-1">
            <Link href="/" className={link(pathname === "/")}>সব পণ্য</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className={link(pathname === `/category/${c.slug}`)}>
                {c.icon} {c.nameBn}
              </Link>
            ))}
          </nav>
        </div>

        <div className="order-2 flex items-center gap-2 md:order-3">
          {isPending ? <div className="h-9 w-32 animate-pulse rounded-full bg-gray-200" />
            : session ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 text-sm font-semibold hover:border-brand">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">{session.user.name?.[0]?.toUpperCase() ?? "U"}</span>
                  <span className="hidden max-w-24 truncate sm:inline">{session.user.name}</span>
                </Link>
                <button onClick={handleSignOut} className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">সাইন আউট</button>
              </>
            ) : (
              <>
                <Link href="/signin" className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">সাইন ইন</Link>
                <Link href="/signup" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">সাইন আপ</Link>
              </>
            )}
        </div>
      </div>
      {/* Ticker lives directly under the navbar */}
    </header>
  );
}
