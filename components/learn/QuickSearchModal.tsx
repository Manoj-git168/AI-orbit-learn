"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock3, Search, Star, X } from "lucide-react";
import { resources } from "@/data/resources";
import type { LearningResource } from "@/types/resources";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LearningResource[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      return;
    }

    // Default top 6 when modal opens
    setResults(resources.slice(0, 6));
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(resources.slice(0, 6));
      return;
    }

    const q = query.toLowerCase();
    const filtered = resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.provider.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    onClose();
    startTransition(() => {
      router.push(`/learn/${slug}`);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-md sm:pt-28 animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#1f1f26] bg-[#0c0c10] shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-[#1f1f26] px-4">
          <Search size={18} className="text-zinc-500 shrink-0 ml-1" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search AI courses, guides, topics, frameworks..."
            className="h-14 w-full bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#181820]">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.slug)}
                className="group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#15151c]"
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-[#1f1f26] bg-[#121217] px-2 py-0.5 text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-300">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="mt-1.5 truncate text-sm font-semibold text-white group-hover:text-zinc-100">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 truncate text-xs text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 shrink-0">
                  <span className="flex items-center gap-1">
                    <Star size={11} fill="currentColor" className="text-amber-400" /> {item.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 size={11} className="text-zinc-500" /> {item.duration}
                  </span>
                  <ArrowRight size={14} className="text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-white" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-zinc-500">
              No learning resources found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[#1f1f26] bg-[#07070a] px-4 py-3 text-[11px] text-zinc-500">
          <span>
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
          <div className="flex items-center gap-3">
            <span>Esc to close</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
