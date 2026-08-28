"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Bookmark, Menu, Plus, Search, Sparkles, X } from "lucide-react";
import { useSavedResources } from "@/components/learn/SavedResourcesProvider";
import QuickSearchModal from "@/components/learn/QuickSearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { savedIds } = useSavedResources();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Tasks", href: "https://aiorbit.club/tasks", external: true },
    { label: "Companies", href: "https://aiorbit.club/companies", external: true },
    { label: "Robots", href: "https://aiorbit.club/robots", external: true },
    { label: "Leaderboard", href: "https://aiorbit.club/leaderboard", external: true },
    { label: "Business", href: "https://aiorbit.club/business", external: true },
    { label: "Learn", href: "/learn", active: pathname === "/learn" || pathname.startsWith("/learn/") && pathname !== "/learn/saved" && pathname !== "/learn/roadmaps" && pathname !== "/learn/submit" },
    { label: "Roadmaps", href: "/learn/roadmaps", active: pathname === "/learn/roadmaps" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#1f1f26] bg-[#070709]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-6">
          {/* Logo and navigation links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-base font-bold tracking-wider text-white hover:opacity-90 transition-opacity"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[11px] font-black">
                ●
              </span>
              <span>AIORBIT</span>
            </Link>

            <nav className="hidden items-center gap-6 text-xs font-medium text-zinc-400 md:flex">
              <Link
                href="/learn"
                className={`transition-colors ${
                  pathname === "/learn" ? "text-white font-semibold" : "hover:text-white"
                }`}
              >
                Learn Hub
              </Link>
              <Link
                href="/learn/roadmaps"
                className={`transition-colors ${
                  pathname === "/learn/roadmaps" ? "text-white font-semibold" : "hover:text-white"
                }`}
              >
                Roadmaps
              </Link>
              <a
                href="https://aiorbit.club/tasks"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Tasks
              </a>
              <a
                href="https://aiorbit.club/companies"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Companies
              </a>
              <a
                href="https://aiorbit.club/leaderboard"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Leaderboard
              </a>
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#1f1f26] bg-[#0f0f13] px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-[#2f2f3a] hover:text-white"
              aria-label="Search resources"
            >
              <Search size={13} className="text-zinc-500" />
              <span className="hidden sm:inline text-zinc-300">Search</span>
              <kbd className="hidden sm:inline-block rounded border border-[#262630] bg-[#16161c] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Saved Library Link */}
            <Link
              href="/learn/saved"
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                pathname === "/learn/saved"
                  ? "border-[#7048e8] bg-[#7048e8]/10 text-white font-medium"
                  : "border-[#1f1f26] bg-[#0f0f13] text-zinc-400 hover:border-[#2f2f3a] hover:text-white"
              }`}
              aria-label="Saved resources"
            >
              <Bookmark
                size={13}
                fill={savedIds.length > 0 ? "currentColor" : "none"}
                className={savedIds.length > 0 ? "text-amber-400" : "text-zinc-400"}
              />
              <span className="hidden sm:inline">Saved</span>
              {savedIds.length > 0 && (
                <span className="ml-0.5 rounded-full bg-[#7048e8] px-1.5 py-0.2 text-[10px] font-medium text-white">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Submit Resource CTA - Purple Pill Button */}
            <Link
              href="/learn/submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#7048e8] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)]"
            >
              <Plus size={13} strokeWidth={2.4} />
              <span>Submit</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1f1f26] text-zinc-400 transition-colors hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/[0.08] bg-[#080808] px-6 py-5 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-neutral-400">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-1 ${link.active ? "text-white font-medium" : "hover:text-white"}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/learn/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-white py-2.5 text-xs font-medium text-black"
              >
                <Plus size={14} />
                Submit a Resource
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
