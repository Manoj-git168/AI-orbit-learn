"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Bookmark, Grid, List, Search, Trash2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/learn/ResourceCard";
import ResourceListItem from "@/components/learn/ResourceListItem";
import { useSavedResources } from "@/components/learn/SavedResourcesProvider";
import { resources } from "@/data/resources";

export default function SavedResourcesPage() {
  const { savedIds, toggleSaved } = useSavedResources();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const savedResources = resources.filter((r) => savedIds.includes(r.id));

  const filteredResources = savedResources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.provider.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesType = selectedType === "All" || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  const clearAllSaved = () => {
    if (confirm("Are you sure you want to remove all saved resources from your library?")) {
      savedIds.forEach((id) => toggleSaved(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <section className="border-b border-[#1f1f26] py-12">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Back to Learn Hub</span>
            </Link>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
                  Your Library
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Saved Resources
                </h1>
                <p className="mt-1 text-xs text-zinc-400">
                  {savedResources.length}{" "}
                  {savedResources.length === 1 ? "resource" : "resources"} bookmarked for quick reference
                </p>
              </div>

              {savedResources.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllSaved}
                    className="flex items-center gap-1.5 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 py-1.5 text-xs text-zinc-400 transition-colors hover:border-red-500/30 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                    <span>Clear library</span>
                  </button>

                  <div className="flex items-center rounded-lg border border-[#1f1f26] bg-[#0f0f13] p-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-white text-black font-medium"
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      <Grid size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-white text-black font-medium"
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Search inside saved */}
          {savedResources.length > 0 && (
            <div className="my-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center rounded-xl border border-[#1f1f26] bg-[#0f0f13] px-3 sm:w-80">
                <Search size={14} className="text-zinc-500 shrink-0" />
                <input
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter saved resources..."
                  className="h-10 w-full bg-transparent px-3 text-xs text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto">
                {["All", "Course", "Guide", "Ebook", "Tutorial"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                      selectedType === t
                        ? "bg-[#7048e8] text-white shadow-[0_0_12px_rgba(112,72,232,0.3)]"
                        : "border border-[#1f1f26] bg-[#0f0f13] text-zinc-400 hover:border-[#2f2f3a] hover:text-white"
                    }`}
                  >
                    {t === "All" ? "All Formats" : t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List or Grid */}
          <section className="pb-24 pt-2">
            {savedResources.length > 0 ? (
              filteredResources.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredResources.map((resource) => (
                      <ResourceListItem key={resource.id} resource={resource} />
                    ))}
                  </div>
                )
              ) : (
                <div className="rounded-xl border border-[#1f1f26] bg-[#0f0f13] p-12 text-center text-xs text-zinc-400">
                  No saved resources match your query.
                </div>
              )
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-xl border border-[#1f1f26] bg-[#0f0f13] px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Bookmark size={18} className="text-zinc-500" />
                </div>
                <h2 className="mt-5 text-base font-semibold text-white">Nothing saved yet</h2>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-zinc-400">
                  Bookmark courses, guides, tutorials, and ebooks while exploring AI Orbit Learn to reference them anytime.
                </p>
                <Link
                  href="/learn"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#7048e8] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)]"
                >
                  <span>Explore Learn Library</span>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
