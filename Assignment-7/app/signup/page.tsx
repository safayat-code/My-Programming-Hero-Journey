"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim(), email = String(f.get("email")).trim(), password = String(f.get("password"));
    if (!name || !email || !password) { const m = "সবগুলো ঘর পূরণ করুন"; setError(m); toast.error(m); return; }
    if (password.length < 6) { const m = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"; setError(m); toast.error(m); return; }
    setLoading(true); setError("");
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) { const m = error.message || "রেজিস্ট্রেশন সম্পন্ন করা যায়নি"; setError(m); toast.error(m); return; }
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  const input = "w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-brand focus:outline-none";
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-extrabold">নতুন অ্যাকাউন্ট খুলুন</h1>
        <p className="mb-5 text-sm text-gray-500">কয়েক সেকেন্ডেই রেজিস্টার করুন</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">নাম</label><input name="name" placeholder="আপনার নাম" className={input} /></div>
          <div><label className="mb-1 block text-sm font-medium">ইমেইল</label><input name="email" type="email" placeholder="you@example.com" className={input} /></div>
          <div><label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label><input name="password" type="password" placeholder="কমপক্ষে ৬ অক্ষর" className={input} /></div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{loading ? "অপেক্ষা করুন…" : "রেজিস্টার"}</button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />অথবা<span className="h-px flex-1 bg-gray-200" /></div>
        <SocialButtons />
        <p className="mt-5 text-center text-sm text-gray-600">আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-brand hover:underline">সাইন ইন করুন</Link></p>
      </div>
    </div>
  );
}
