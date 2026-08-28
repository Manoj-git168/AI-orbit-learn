"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function LearnHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      const el = document.getElementById("resources-browser");
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push(`/learn?search=${encodeURIComponent(trimmed)}#resources-browser`);
    setTimeout(() => {
      const el = document.getElementById("resources-browser");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-2xl items-center rounded-xl border border-[#1f1f26] bg-[#0f0f13] px-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all focus-within:border-[#7048e8] focus-within:ring-1 focus-within:ring-[#7048e8]/30"
    >
      <Search
        size={18}
        className="shrink-0 text-zinc-500 ml-1"
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search 100+ AI courses, agents, LLM architectures, roadmaps..."
        className="h-14 w-full bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
        aria-label="Search learning resources"
      />

      <button
        type="submit"
        className="hidden rounded-lg bg-[#7048e8] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)] sm:block shrink-0"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
