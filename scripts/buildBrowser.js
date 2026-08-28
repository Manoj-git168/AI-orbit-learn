const fs = require('fs');

// 1. components/learn/ResourceThumbnail.tsx
const thumbnailCode = `import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Eye,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
  Workflow,
  Compass,
} from "lucide-react";

import type { LearningResource } from "@/types/resources";

interface ResourceThumbnailProps {
  resource: LearningResource;
  large?: boolean;
}

const iconMap: Record<string, any> = {
  "Prompt Engineering": Sparkles,
  "AI Agents": Bot,
  "Generative AI": BrainCircuit,
  LLMs: Network,
  "Computer Vision": Eye,
  Automation: Workflow,
  "AI Coding": Code2,
  "Machine Learning": Cpu,
  "AI Engineering": Database,
  "AI Strategy": Compass,
};

export default function ResourceThumbnail({
  resource,
  large = false,
}: ResourceThumbnailProps) {
  const Icon = iconMap[resource.category] || Layers3;

  return (
    <div
      className={\`relative flex w-full items-center justify-center overflow-hidden border border-white/[0.08] bg-[#090909] transition-colors group-hover:border-white/[0.16] \${
        large ? "aspect-[16/8]" : "aspect-[16/9]"
      }\`}
    >
      {/* Background Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: large ? "48px 48px" : "36px 36px",
        }}
      />

      {/* Central Visual Orb */}
      <div className="relative flex flex-col items-center">
        <div
          className={\`flex items-center justify-center rounded-full border border-white/[0.12] bg-[#0c0c0c] shadow-inner transition-transform duration-300 group-hover:scale-105 \${
            large ? "h-24 w-24" : "h-16 w-16"
          }\`}
        >
          <Icon
            size={large ? 36 : 24}
            strokeWidth={1.2}
            className="text-neutral-400 group-hover:text-white transition-colors"
          />
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span className="h-1 w-8 bg-neutral-800" />
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
        </div>

        <span className="mt-3 text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-600">
          {resource.category}
        </span>
      </div>

      {/* Technical Corner Annotations */}
      <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.18em] text-neutral-700">
        AI / {String(resource.id).padStart(2, "0")}
      </span>

      <span className="absolute bottom-4 right-4 text-[9px] font-medium tracking-[0.18em] text-neutral-700 uppercase">
        {resource.type}
      </span>
    </div>
  );
}
`;

// 2. components/learn/SaveButton.tsx
const saveButtonCode = `"use client";

import { Bookmark } from "lucide-react";
import { useSavedResources } from "@/components/learn/SavedResourcesProvider";

interface SaveButtonProps {
  resourceId: string;
  resourceTitle: string;
  variant?: "icon" | "button";
}

export default function SaveButton({
  resourceId,
  resourceTitle,
  variant = "icon",
}: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedResources();
  const saved = isSaved(resourceId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(resourceId);
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? \`Remove \${resourceTitle} from saved\` : \`Save \${resourceTitle}\`}
        className={\`inline-flex items-center gap-2 border px-4 py-2.5 text-xs transition-colors \${
          saved
            ? "border-white/[0.2] bg-white text-black font-medium"
            : "border-white/[0.1] text-neutral-400 hover:border-white/[0.2] hover:text-white"
        }\`}
      >
        <Bookmark
          size={14}
          fill={saved ? "currentColor" : "none"}
          strokeWidth={1.7}
        />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? \`Remove \${resourceTitle} from saved\` : \`Save \${resourceTitle}\`}
      title={saved ? "Remove from saved" : "Save to library"}
      className={\`absolute bottom-[68px] right-4 z-10 flex h-8 w-8 items-center justify-center border bg-[#080808]/95 backdrop-blur-sm transition-all duration-200 \${
        saved
          ? "border-white/[0.2] text-white opacity-100"
          : "border-white/[0.08] text-neutral-500 opacity-0 hover:border-white/[0.2] hover:text-white group-hover:opacity-100"
      }\`}
    >
      <Bookmark
        size={14}
        fill={saved ? "currentColor" : "none"}
        strokeWidth={1.7}
      />
    </button>
  );
}
`;

// 3. components/learn/ResourceCard.tsx
const resourceCardCode = `import Link from "next/link";
import { ArrowUpRight, Clock3, Star } from "lucide-react";
import ResourceThumbnail from "@/components/learn/ResourceThumbnail";
import SaveButton from "@/components/learn/SaveButton";
import type { LearningResource } from "@/types/resources";

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="group relative flex flex-col justify-between bg-[#080808] transition-all duration-200 hover:bg-[#0c0c0c]">
      {/* Clickable Card Link */}
      <Link
        href={\`/learn/\${resource.slug}\`}
        className="block flex-1"
        aria-label={\`View \${resource.title}\`}
      >
        <div className="relative">
          <ResourceThumbnail resource={resource} />

          {/* Top format badge */}
          <span className="absolute left-4 top-4 border border-white/[0.08] bg-[#080808]/90 px-2.5 py-1 text-[9px] font-medium tracking-[0.14em] text-neutral-400 backdrop-blur-sm uppercase">
            {resource.type}
          </span>

          {/* Hover external arrow */}
          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-[#080808]/90 text-neutral-500 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white">
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </span>
        </div>

        {/* Text Details */}
        <div className="p-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            <span>{resource.category}</span>
            <span>{resource.level}</span>
          </div>

          <h3 className="mt-2.5 line-clamp-2 text-[16px] font-medium leading-snug tracking-tight text-white group-hover:text-neutral-200">
            {resource.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
            {resource.description}
          </p>

          {/* Metadata Row */}
          <div className="mt-5 flex items-center gap-4 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} strokeWidth={1.6} />
              {resource.duration}
            </span>

            <span className="flex items-center gap-1.5">
              <Star size={13} strokeWidth={1.6} />
              {resource.rating}
            </span>

            <span className={\`ml-auto font-medium \${resource.price === "Free" ? "text-emerald-400" : "text-neutral-300"}\`}>
              {resource.price}
            </span>
          </div>

          {/* Provider Footer */}
          <div className="mt-5 border-t border-white/[0.06] pt-3.5">
            <span className="text-xs text-neutral-600">
              {resource.provider}
            </span>
          </div>
        </div>
      </Link>

      {/* Floating Save Button */}
      <SaveButton
        resourceId={resource.id}
        resourceTitle={resource.title}
      />
    </article>
  );
}
`;

// 4. components/learn/LearnHeroSearch.tsx
const heroSearchCode = `"use client";

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
      const el = document.getElementById("resources");
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push(\`/learn?search=\${encodeURIComponent(trimmed)}#resources\`);
    setTimeout(() => {
      const el = document.getElementById("resources");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-2xl items-center border border-white/[0.1] bg-[#0a0a0a] px-4 transition-colors focus-within:border-white/[0.24]"
    >
      <Search
        size={19}
        strokeWidth={1.7}
        className="shrink-0 text-neutral-500 ml-1"
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search courses, guides, tutorials, roadmaps..."
        className="h-14 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-600"
        aria-label="Search learning resources"
      />

      <button
        type="submit"
        className="hidden border border-white/[0.08] bg-[#111111] px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-white hover:border-white/[0.2] sm:block"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
`;

// 5. components/learn/LearnResourceBrowser.tsx
const browserCode = `"use client";

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
        const res = await fetch(\`/api/resources\${query ? \`?\${query}\` : ""}\`, {
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
      {/* Header & Controls */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Library
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight">
            All resources
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {loading
              ? "Updating results..."
              : \`\${sortedResources.length} \${
                  sortedResources.length === 1 ? "resource" : "resources"
                } available\`}
          </p>
        </div>

        {/* View Mode Toggle & Reset Button */}
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
            >
              <X size={13} />
              Clear filters
            </button>
          )}

          {/* Grid vs List View Switcher */}
          <div className="flex items-center border border-white/[0.08] bg-[#0c0c0c] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={\`flex h-7 w-7 items-center justify-center transition-colors \${
                viewMode === "grid"
                  ? "bg-white text-black font-medium"
                  : "text-neutral-500 hover:text-white"
              }\`}
              title="Grid View"
              aria-label="Switch to Grid View"
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={\`flex h-7 w-7 items-center justify-center transition-colors \${
                viewMode === "list"
                  ? "bg-white text-black font-medium"
                  : "text-neutral-500 hover:text-white"
              }\`}
              title="List View"
              aria-label="Switch to List View"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Live Search Input */}
      <div className="mb-6 flex items-center border border-white/[0.08] bg-[#080808] transition-colors focus-within:border-white/[0.18]">
        <Search
          size={18}
          strokeWidth={1.7}
          className="ml-4 shrink-0 text-neutral-600"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Filter by keyword, framework, topic or author..."
          className="h-12 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-600"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="mr-3 text-neutral-600 hover:text-white"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filters Toolbar */}
      <div className="mb-8 flex flex-col gap-4 border-b border-white/[0.08] pb-6">
        {/* Resource Type Selector Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {(["All", "Course", "Guide", "Ebook", "Tutorial"] as const).map((item) => {
            const active = type === item;
            return (
              <button
                key={item}
                onClick={() => setType(item)}
                className={\`shrink-0 px-4 py-2 text-xs transition-colors \${
                  active
                    ? "bg-white text-black font-medium"
                    : "border border-transparent text-neutral-500 hover:text-white"
                }\`}
              >
                {item === "All" ? "All Formats" : \`\${item}s\`}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Level */}
          <div className="flex items-center gap-2 border border-white/[0.08] bg-[#080808] px-3">
            <SlidersHorizontal size={13} className="text-neutral-600" />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as "All" | ResourceLevel)}
              className="h-9 bg-transparent text-xs text-neutral-300 outline-none"
              aria-label="Filter by level"
            >
              <option value="All" className="bg-[#0c0c0c] text-white">All levels</option>
              <option value="Beginner" className="bg-[#0c0c0c] text-white">Beginner</option>
              <option value="Intermediate" className="bg-[#0c0c0c] text-white">Intermediate</option>
              <option value="Advanced" className="bg-[#0c0c0c] text-white">Advanced</option>
            </select>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 border border-white/[0.08] bg-[#080808] px-3 text-xs text-neutral-300 outline-none"
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item} className="bg-[#0c0c0c] text-white">
                {item === "All" ? "All categories" : item}
              </option>
            ))}
          </select>

          {/* Price */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value as "All" | "Free" | "Paid")}
            className="h-9 border border-white/[0.08] bg-[#080808] px-3 text-xs text-neutral-300 outline-none"
            aria-label="Filter by pricing"
          >
            <option value="All" className="bg-[#0c0c0c] text-white">All prices</option>
            <option value="Free" className="bg-[#0c0c0c] text-white">Free</option>
            <option value="Paid" className="bg-[#0c0c0c] text-white">Paid</option>
          </select>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-1.5 border border-white/[0.08] bg-[#080808] px-3">
            <ArrowUpDown size={13} className="text-neutral-600" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-9 bg-transparent text-xs text-neutral-300 outline-none"
              aria-label="Sort by"
            >
              <option value="popular" className="bg-[#0c0c0c] text-white">Most Popular</option>
              <option value="rating" className="bg-[#0c0c0c] text-white">Highest Rated</option>
              <option value="newest" className="bg-[#0c0c0c] text-white">Newest Added</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-400">
            <span className="text-[11px] text-neutral-600">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[11px]">
                Search: &quot;{search}&quot;
                <button onClick={() => setSearch("")}><X size={11} /></button>
              </span>
            )}
            {type !== "All" && (
              <span className="inline-flex items-center gap-1 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[11px]">
                Type: {type}
                <button onClick={() => setType("All")}><X size={11} /></button>
              </span>
            )}
            {category !== "All" && (
              <span className="inline-flex items-center gap-1 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[11px]">
                Topic: {category}
                <button onClick={() => setCategory("All")}><X size={11} /></button>
              </span>
            )}
            {level !== "All" && (
              <span className="inline-flex items-center gap-1 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[11px]">
                Level: {level}
                <button onClick={() => setLevel("All")}><X size={11} /></button>
              </span>
            )}
            {price !== "All" && (
              <span className="inline-flex items-center gap-1 border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 text-[11px]">
                Price: {price}
                <button onClick={() => setPrice("All")}><X size={11} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Resource Content - Grid or List */}
      {loading ? (
        <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="min-h-64 animate-pulse bg-[#080808]" />
          ))}
        </div>
      ) : sortedResources.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex min-h-80 flex-col items-center justify-center border border-white/[0.08] bg-[#080808] px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center border border-white/[0.08]">
            <BookOpen size={18} className="text-neutral-600" />
          </div>

          <h3 className="mt-5 text-base font-medium">No resources found</h3>

          <p className="mt-2 max-w-md text-xs leading-6 text-neutral-500">
            Try adjusting your search keywords or clearing some filters to explore more learning content.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 border border-white/[0.1] px-4 py-2 text-xs text-neutral-300 transition-colors hover:border-white/[0.2] hover:text-white"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}
`;

fs.writeFileSync('components/learn/ResourceThumbnail.tsx', thumbnailCode, 'utf-8');
console.log('Written components/learn/ResourceThumbnail.tsx');

fs.writeFileSync('components/learn/SaveButton.tsx', saveButtonCode, 'utf-8');
console.log('Written components/learn/SaveButton.tsx');

fs.writeFileSync('components/learn/ResourceCard.tsx', resourceCardCode, 'utf-8');
console.log('Written components/learn/ResourceCard.tsx');

fs.writeFileSync('components/learn/LearnHeroSearch.tsx', heroSearchCode, 'utf-8');
console.log('Written components/learn/LearnHeroSearch.tsx');

fs.writeFileSync('components/learn/LearnResourceBrowser.tsx', browserCode, 'utf-8');
console.log('Written components/learn/LearnResourceBrowser.tsx');

