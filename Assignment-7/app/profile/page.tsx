"use client";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  if (isPending) return <div className="mx-auto max-w-md px-4 py-12"><div className="h-56 animate-pulse rounded-2xl bg-gray-200" /></div>;
  const u = session?.user;
  if (!u) return null;
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
        {u.image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={u.image} alt={u.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
          : <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand text-4xl font-bold text-white">{u.name?.[0]?.toUpperCase()}</div>}
        <h1 className="mt-4 text-2xl font-extrabold">{u.name}</h1>
        <p className="text-gray-500">{u.email}</p>
        <Link href="/profile/update" className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
