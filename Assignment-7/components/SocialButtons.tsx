"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const go = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) toast.error(error.message || `${provider} দিয়ে লগইন করা যায়নি`);
  };
  const btn = "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 font-semibold hover:bg-gray-50";
  return (
    <div className="space-y-2.5">
      <button type="button" onClick={() => go("google")} className={btn}><span className="font-bold text-blue-600">G</span> Google দিয়ে চালিয়ে যান</button>
      <button type="button" onClick={() => go("github")} className={btn}><span>🐙</span> GitHub দিয়ে চালিয়ে যান</button>
    </div>
  );
}
