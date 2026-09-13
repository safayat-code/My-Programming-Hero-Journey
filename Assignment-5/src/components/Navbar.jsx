import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = ["Home", "Technologies", "Projects", "About", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const Brand = ({ className = "" }) => (
    <a href="#home" className={`flex items-center gap-2 ${className}`}>
      <span className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-sm font-bold">
        DS
      </span>
      <span className="font-bold text-slate-900 text-lg whitespace-nowrap">
        Dev <span className="text-gradient">Stack</span>
      </span>
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 items-center gap-2">
        {/* Column 1: hamburger on mobile, brand on desktop */}
        <div className="flex items-center">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 -ml-2 text-slate-700 hover:bg-slate-100"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
          </button>
          <Brand className="hidden md:flex" />
        </div>

        {/* Column 2: brand on mobile (centered), nav links on desktop (centered) */}
        <div className="flex items-center justify-center min-w-0">
          <Brand className="md:hidden" />
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 whitespace-nowrap">
            {NAV_LINKS.map((link, i) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={i === 0 ? "text-pink-600" : "hover:text-slate-900 transition-colors"}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: auth buttons, always right-aligned */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button className="text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 whitespace-nowrap">
            Sign In
          </button>
          <button className="bg-gradient-brand text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3">
          <ul className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block py-2 hover:text-slate-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
