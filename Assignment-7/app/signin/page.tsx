"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const warned = useRef(false);

  useEffect(() => {
    if (sp.get("protected") && !warned.current) {
      warned.current = true;
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন");
    }
  }, [sp]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim(), password = String(f.get("password"));
    if (!email || !password) { const m = "ইমেইল ও পাসওয়ার্ড দিন"; setError(m); toast.error(m); return; }
    setLoading(true); setError("");
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) { const m = error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়"; setError(m); toast.error(m); return; }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl); router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-extrabold">সাইন ইন করুন</h1>
        <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">ইমেইল</label>
            <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-brand focus:outline-none" /></div>
          <div><label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
            <input name="password" type="password" placeholder="••••••" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-brand focus:outline-none" /></div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{loading ? "অপেক্ষা করুন…" : "সাইন ইন"}</button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />অথবা<span className="h-px flex-1 bg-gray-200" /></div>
        <SocialButtons callbackURL={callbackUrl} />
        <p className="mt-5 text-center text-sm text-gray-600">অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-brand hover:underline">সাইন আপ করুন</Link></p>
      </div>
    </div>
  );
}
export default function SignInPage() { return <Suspense><SignInForm /></Suspense>; }
