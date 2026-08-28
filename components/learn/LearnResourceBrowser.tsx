"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Grid,
  List,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  BookOpen,
} from "lucide-react";

import ResourceCard from "@/components/learn/ResourceCard";
import ResourceListItem from "@/components/learn/ResourceListItem";
import type {
  LearningResource,
  ResourceLevel,
  ResourceType,
} from "@/types/resources";

interface LearnResourceBrowserProps {
  resources: LearningResource[];
}

type SortOption = "popular" | "rating" | "newest";
type ViewMode = "grid" | "list";

const categories = [
  "All",
  "Generative AI",
  "LLMs",
  "AI Agents",
  "Prompt Engineering",
  "Machine Learning",
  "AI Coding",
  "Automation",
  "Computer Vision",
];

export default function LearnResourceBrowser({
  resources: initialResources,
}: LearnResourceBrowserProps) {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "All";

  const [resources, setResources] = useState<LearningResource[]>(initialResources);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [search, setSearch] = useState(searchFromUrl);
  const [type, setType] = useState<"All" | ResourceType>("All");
  const [level, setLevel] = useState<"All" | ResourceLevel>("All");
  const [category, setCategory] = useState(categoryFromUrl);
  const [price, setPrice] = useState<"All" | "Free" | "Paid">("All");
  const [sort, setSort] = useState<SortOption>("popular");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync URL changes (e.g. from Hero pills or Hero search)
  useEffect(() => {
    if (searchParams.has("search")) {
      setSearch(searchParams.get("search") || "");
    }
    if (searchParams.has("category")) {
      setCategory(searchParams.get("category") || "All");
    }
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchResources = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (type !== "All") params.set("type", type);
        if (level !== "All") params.set("level", level);
        if (category !== "All") params.set("category", category);
        if (price !== "All") params.set("price", price);
        params.set("sort", sort);

        const query = params.toString();
        const res = await fetch(`/api/resources${query ? `?${query}` : ""}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch resources");
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setResources(result.data);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Keep current resources on fetch fail
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchResources, 200);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, type, level, category, price, sort]);

  const sortedResources = [...resources].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return Number(b.id) - Number(a.id);
    return b.reviewCount - a.reviewCount;
  });

  const clearFilters = () => {
    setSearch("");
    setType("All");
    setLevel("All");
    setCategory("All");
    setPrice("All");
    setSort("popular");
  };

  const hasFilters =
    search.trim().length > 0 ||
    type !== "All" ||
    level !== "All" ||
    category !== "All" ||
    price !== "All";

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24" id="resources-browser">
      {/* Header bar */}
      <div className="mb-6 flex flex-col gap-4 border-b border-[#1f1f26] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Explore All Resources
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            {loading
              ? "Filtering resources..."
              : `${sortedResources.length} ${
                  sortedResources.length === 1 ? "resource" : "resources"
                } available`}
          </p>
        </div>

        {/* View Mode Toggle & Reset Button */}
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 py-1.5 text-xs text-zinc-400 transition-all hover:border-[#2f2f3a] hover:text-white"
            >
              <X size={13} />
              <span>Clear filters</span>
            </button>
          )}

          {/* Grid vs List View Switcher */}
          <div className="flex items-center rounded-lg border border-[#1f1f26] bg-[#0f0f13] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-[#7048e8] text-white font-medium"
                  : "text-zinc-500 hover:text-white"
              }`}
              title="Grid View"
              aria-label="Switch to Grid View"
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-[#7048e8] text-white font-medium"
                  : "text-zinc-500 hover:text-white"
              }`}
              title="List View"
              aria-label="Switch to List View"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Live Search Input */}
      <div className="mb-5 flex items-center rounded-xl border border-[#1f1f26] bg-[#0f0f13] transition-all focus-within:border-[#7048e8] focus-within:ring-1 focus-within:ring-[#7048e8]/30">
        <Search
          size={17}
          className="ml-4 shrink-0 text-zinc-500"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Filter by keyword, topic, instructor, framework (e.g. LangChain, Claude, PyTorch)..."
          className="h-12 w-full bg-transparent px-3.5 text-xs text-white outline-none placeholder:text-zinc-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="mr-3 p-1 text-zinc-500 hover:text-white"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters Toolbar */}
      <div className="mb-8 flex flex-col gap-4 border-b border-[#1f1f26] pb-6">
        {/* Resource Type Selector Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(["All", "Course", "Guide", "Ebook", "Tutorial", "Roadmap"] as const).map((item) => {
            const active = type === item;
            return (
              <button
                key={item}
                onClick={() => setType(item as any)}
                className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#7048e8] text-white shadow-[0_0_12px_rgba(112,72,232,0.3)]"
                    : "border border-[#1f1f26] bg-[#0f0f13] text-zinc-400 hover:border-[#2f2f3a] hover:text-white"
                }`}
              >
                {item === "All" ? "All Formats" : `${item}s`}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Level */}
          <div className="flex items-center gap-2 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3">
            <SlidersHorizontal size={13} className="text-zinc-500" />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as "All" | ResourceLevel)}
              className="h-9 bg-transparent text-xs text-zinc-300 outline-none"
              aria-label="Filter by level"
            >
              <option value="All" className="bg-[#0f0f13] text-white">All levels</option>
              <option value="Beginner" className="bg-[#0f0f13] text-white">Beginner</option>
              <option value="Intermediate" className="bg-[#0f0f13] text-white">Intermediate</option>
              <option value="Advanced" className="bg-[#0f0f13] text-white">Advanced</option>
            </select>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-zinc-300 outline-none"
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item} className="bg-[#0f0f13] text-white">
                {item === "All" ? "All categories" : item}
              </option>
            ))}
          </select>

          {/* Price */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value as "All" | "Free" | "Paid")}
            className="h-9 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-zinc-300 outline-none"
            aria-label="Filter by pricing"
          >
            <option value="All" className="bg-[#0f0f13] text-white">All prices</option>
            <option value="Free" className="bg-[#0f0f13] text-white">Free</option>
            <option value="Paid" className="bg-[#0f0f13] text-white">Paid</option>
          </select>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3">
            <ArrowUpDown size={13} className="text-zinc-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-9 bg-transparent text-xs text-zinc-300 outline-none"
              aria-label="Sort by"
            >
              <option value="popular" className="bg-[#0f0f13] text-white">Most Popular</option>
              <option value="rating" className="bg-[#0f0f13] text-white">Highest Rated</option>
              <option value="newest" className="bg-[#0f0f13] text-white">Newest Added</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400">
            <span className="text-[11px] text-zinc-500 font-medium">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                Search: &quot;{search}&quot;
                <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-white"><X size={11} /></button>
              </span>
            )}
            {type !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                Type: {type}
                <button onClick={() => setType("All")} className="text-zinc-400 hover:text-white"><X size={11} /></button>
              </span>
            )}
            {category !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                Domain: {category}
                <button onClick={() => setCategory("All")} className="text-zinc-400 hover:text-white"><X size={11} /></button>
              </span>
            )}
            {level !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                Level: {level}
                <button onClick={() => setLevel("All")} className="text-zinc-400 hover:text-white"><X size={11} /></button>
              </span>
            )}
            {price !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300">
                Price: {price}
                <button onClick={() => setPrice("All")} className="text-zinc-400 hover:text-white"><X size={11} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Resource Content - Grid or List */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="min-h-64 animate-pulse rounded-xl border border-[#1f1f26] bg-[#0c0c10]" />
          ))}
        </div>
      ) : sortedResources.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedResources.map((resource) => (
              <ResourceListItem key={resource.id} resource={resource} />
            ))}
          </div>
        )
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-[#1f1f26] bg-[#0c0c10] px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
            <BookOpen size={18} className="text-zinc-500" />
          </div>

          <h3 className="mt-4 text-base font-bold text-white">No resources found</h3>

          <p className="mt-2 max-w-md text-xs leading-relaxed text-zinc-400">
            Try adjusting your search keywords or clearing some filters to explore more learning content.
          </p>

          <button
            onClick={clearFilters}
            className="mt-5 rounded-lg border border-[#1f1f26] bg-[#121217] px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-[#2f2f3a] hover:text-white"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}
