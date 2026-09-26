"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                  active
                    ? "text-accent"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105 sm:px-4 sm:text-sm"
          >
            Plan
            <span className="rounded-full bg-black/15 px-1.5 py-0.5 text-[11px] leading-none">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent sm:px-4 sm:text-sm"
          >
            Saved
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] leading-none">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-6 border-t border-border px-4 py-2 md:hidden">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-sm font-medium uppercase tracking-wide ${
                active ? "text-accent" : "text-neutral-400"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
