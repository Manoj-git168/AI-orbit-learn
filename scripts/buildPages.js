const fs = require('fs');
const path = require('path');

// Ensure directories exist
fs.mkdirSync('app/learn/submit', { recursive: true });
fs.mkdirSync('app/learn/roadmaps', { recursive: true });
fs.mkdirSync('app/api/resources/[slug]/review', { recursive: true });
fs.mkdirSync('app/api/roadmaps', { recursive: true });

// 1. app/learn/page.tsx
const learnPageCode = `import { ArrowRight, Compass, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/learn/ResourceCard";
import LearnResourceBrowser from "@/components/learn/LearnResourceBrowser";
import LearnHeroSearch from "@/components/learn/LearnHeroSearch";
import { getAllResources } from "@/lib/resourceService";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const allResources = await getAllResources();
  const featuredResources = allResources.filter((r) => r.featured).slice(0, 6);

  const topics = [
    "Generative AI",
    "LLMs",
    "AI Agents",
    "Prompt Engineering",
    "Machine Learning",
    "AI Coding",
    "Automation",
    "Computer Vision",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 text-center">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400">
            <Sparkles size={12} className="text-neutral-400" />
            AI Orbit Learn
          </div>

          <h1 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            Learn what&apos;s next in AI.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            Curated courses, guides, tutorials, and career roadmaps to help you understand, build, and master the modern AI ecosystem.
          </p>

          {/* Interactive Search Bar */}
          <LearnHeroSearch />

          {/* Stats Bar */}
          <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-8 text-xs text-neutral-500">
            <div>
              <span className="font-mono text-white font-medium">{allResources.length}+</span> Curated Resources
            </div>
            <span>·</span>
            <div>
              <span className="font-mono text-white font-medium">100%</span> Free & Verified Tracks
            </div>
            <span>·</span>
            <div>
              <span className="font-mono text-white font-medium">Daily</span> Ecosystem Updates
            </div>
          </div>
        </section>

        {/* Topics Quick Filter Bar */}
        <section className="border-y border-white/[0.08] bg-[#070707]">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Explore by Domain
              </span>

              <Link
                href="/learn/roadmaps"
                className="flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white"
              >
                <Compass size={13} />
                View Career Roadmaps
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={\`/learn?category=\${encodeURIComponent(topic)}#resources-browser\`}
                  className="border border-white/[0.08] bg-[#0c0c0c] px-3.5 py-2 text-xs text-neutral-400 transition-all hover:border-white/[0.2] hover:bg-white/[0.04] hover:text-white"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources Section */}
        {featuredResources.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Curated Highlights
                </p>
                <h2 className="mt-1.5 text-2xl font-medium tracking-tight">
                  Featured learning resources
                </h2>
              </div>

              <a
                href="#resources-browser"
                className="hidden items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white sm:flex"
              >
                View all ({allResources.length})
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {/* Full Resource Browser (With Grid/List Toggle & Live Filters) */}
        <div id="resources">
          <Suspense
            fallback={
              <div className="mx-auto max-w-7xl px-6 pb-24">
                <div className="min-h-80 animate-pulse border border-white/[0.08] bg-[#080808]" />
              </div>
            }
          >
            <LearnResourceBrowser resources={allResources} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 2. app/learn/[slug]/page.tsx
const resourceDetailPageCode = `import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  ExternalLink,
  Star,
  Globe,
  Award,
  Layers3,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/learn/ResourceCard";
import ResourceThumbnail from "@/components/learn/ResourceThumbnail";
import SaveButton from "@/components/learn/SaveButton";
import ShareButton from "@/components/learn/ShareButton";
import CurriculumAccordion from "@/components/learn/CurriculumAccordion";
import ReviewSection from "@/components/learn/ReviewSection";
import { getResourceBySlug, getRelatedResources } from "@/lib/resourceService";

interface ResourceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
        <Navbar />
        <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">404</p>
          <h1 className="mt-4 text-3xl font-medium">Resource not found</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
            The learning resource you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/learn"
            className="mt-7 border border-white/[0.1] px-5 py-2.5 text-xs text-neutral-300 transition-colors hover:border-white/[0.2] hover:text-white"
          >
            Back to Learn
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedResources = await getRelatedResources(resource, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 py-6 text-xs text-neutral-500">
            <Link href="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <span>/</span>
            <Link
              href={\`/learn?category=\${encodeURIComponent(resource.category)}\`}
              className="hover:text-white transition-colors"
            >
              {resource.category}
            </Link>
            <span>/</span>
            <span className="truncate max-w-[240px] text-neutral-400 sm:max-w-md">
              {resource.title}
            </span>
          </div>

          {/* Header Banner */}
          <section className="border-b border-white/[0.08] pb-12 pt-4">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-neutral-400">
                  {resource.type}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  {resource.category}
                </span>
                <span className="text-xs text-neutral-600">·</span>
                <span className="text-xs text-neutral-400">{resource.level}</span>
                <span className="text-xs text-neutral-600">·</span>
                <span className={\`text-xs font-medium \${resource.price === "Free" ? "text-emerald-400" : "text-neutral-300"}\`}>
                  {resource.price}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
                {resource.description}
              </p>

              {/* Action Toolbar */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={resource.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  Start Learning
                  <ArrowUpRight size={15} />
                </a>

                <SaveButton
                  resourceId={resource.id}
                  resourceTitle={resource.title}
                  variant="button"
                />

                <ShareButton title={resource.title} />

                <a
                  href="#reviews"
                  className="border border-white/[0.1] px-5 py-3 text-sm text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
                >
                  Reviews ({resource.reviewCount})
                </a>
              </div>
            </div>
          </section>

          {/* Resource Overview & Information Panel */}
          <section className="grid gap-8 border-b border-white/[0.08] py-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Visual Thumbnail */}
            <div>
              <ResourceThumbnail resource={resource} large />
            </div>

            {/* Quick Metadata Box */}
            <div className="border border-white/[0.08] bg-[#080808]">
              <div className="border-b border-white/[0.08] px-6 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                  Resource Details
                </p>
              </div>

              <div className="divide-y divide-white/[0.06] text-xs">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-neutral-500">Skill Level</span>
                  <span className="text-white font-medium">{resource.level}</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="flex items-center gap-2 text-neutral-500">
                    <Clock3 size={13} />
                    Duration
                  </span>
                  <span className="text-white">{resource.duration}</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-neutral-500">Format</span>
                  <span className="text-white">{resource.format}</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-neutral-500">Pricing</span>
                  <span className={\`font-medium \${resource.price === "Free" ? "text-emerald-400" : "text-white"}\`}>
                    {resource.price}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <Star size={13} />
                    Rating
                  </span>
                  <span className="text-white">
                    {resource.rating} / 5.0{" "}
                    <span className="text-neutral-600 font-normal">
                      ({resource.reviewCount} reviews)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <Globe size={13} />
                    Language
                  </span>
                  <span className="text-white">{resource.language || "English"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Overview & Topic Tags */}
          <section className="grid gap-12 border-b border-white/[0.08] py-14 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Deep Dive
              </p>
              <h2 className="mt-2 text-2xl font-medium">About this resource</h2>
              <p className="mt-5 text-sm leading-7 text-neutral-400 whitespace-pre-line">
                {resource.overview}
              </p>
            </div>

            {/* Tags & Taxonomy */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Covered Frameworks & Topics
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={\`/learn?search=\${encodeURIComponent(tag)}#resources-browser\`}
                    className="border border-white/[0.08] bg-[#0c0c0c] px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Target Audience & Prerequisites */}
              {resource.prerequisites && resource.prerequisites.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                    Prerequisites
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-neutral-400">
                    {resource.prerequisites.map((req) => (
                      <li key={req} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-neutral-600" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Key Learning Outcomes Checklist */}
          {resource.learningOutcomes && resource.learningOutcomes.length > 0 && (
            <section className="border-b border-white/[0.08] py-14">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Curated Outcomes
              </p>
              <h2 className="mt-2 text-2xl font-medium">What you&apos;ll learn</h2>

              <div className="mt-8 grid gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {resource.learningOutcomes.map((outcome, idx) => (
                  <div key={outcome} className="flex gap-4 bg-[#080808] p-6">
                    <span className="font-mono text-xs text-neutral-600">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-white" />
                      <p className="text-xs leading-6 text-neutral-300">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Curriculum / Syllabus Accordion */}
          {resource.curriculum && resource.curriculum.length > 0 && (
            <section className="border-b border-white/[0.08] py-14">
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                    Syllabus
                  </p>
                  <h2 className="mt-2 text-2xl font-medium">Course Curriculum</h2>
                </div>
                <span className="text-xs text-neutral-500">
                  {resource.curriculum.length} Modules
                </span>
              </div>

              <CurriculumAccordion curriculum={resource.curriculum} />
            </section>
          )}

          {/* Author & Provider Card */}
          <section className="border-b border-white/[0.08] py-14">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
              Instructor & Provider
            </p>

            <div className="mt-6 flex flex-col justify-between gap-6 border border-white/[0.08] bg-[#080808] p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-medium text-white">{resource.provider}</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Instructor: <span className="text-neutral-300 font-medium">{resource.author}</span>
                </p>
                {resource.authorBio && (
                  <p className="mt-3 max-w-xl text-xs leading-6 text-neutral-400">
                    {resource.authorBio}
                  </p>
                )}
              </div>

              <a
                href={resource.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/[0.1] px-4 py-2.5 text-xs text-neutral-300 transition-colors hover:border-white/[0.2] hover:text-white shrink-0"
              >
                Visit Provider Website
                <ExternalLink size={14} />
              </a>
            </div>
          </section>

          {/* Community Reviews & Interactive Feedback Form */}
          <ReviewSection
            slug={resource.slug}
            initialReviews={resource.reviews || []}
            rating={resource.rating}
            reviewCount={resource.reviewCount}
          />

          {/* Related Resources Grid */}
          {relatedResources.length > 0 && (
            <section className="py-16">
              <div className="mb-7">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Continue Exploring
                </p>
                <h2 className="mt-2 text-2xl font-medium">Related resources</h2>
              </div>

              <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
                {relatedResources.map((item) => (
                  <ResourceCard key={item.id} resource={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 3. app/learn/saved/page.tsx
const savedPageCode = `"use client";

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
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <section className="border-b border-white/[0.08] py-12">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to Learn
            </Link>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Your Library
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
                  Saved resources
                </h1>
                <p className="mt-2 text-xs text-neutral-500">
                  {savedResources.length}{" "}
                  {savedResources.length === 1 ? "resource" : "resources"} bookmarked
                </p>
              </div>

              {savedResources.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllSaved}
                    className="flex items-center gap-1.5 border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-red-500/30 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                    Clear library
                  </button>

                  <div className="flex items-center border border-white/[0.08] bg-[#0c0c0c] p-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={\`flex h-7 w-7 items-center justify-center transition-colors \${
                        viewMode === "grid"
                          ? "bg-white text-black font-medium"
                          : "text-neutral-500 hover:text-white"
                      }\`}
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
              <div className="flex items-center border border-white/[0.08] bg-[#080808] px-3 sm:w-80">
                <Search size={14} className="text-neutral-600 shrink-0" />
                <input
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter saved resources..."
                  className="h-9 w-full bg-transparent px-3 text-xs text-white outline-none placeholder:text-neutral-600"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto">
                {["All", "Course", "Guide", "Ebook", "Tutorial"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={\`px-3 py-1.5 text-xs transition-colors \${
                      selectedType === t
                        ? "bg-white text-black font-medium"
                        : "text-neutral-500 hover:text-white"
                    }\`}
                  >
                    {t === "All" ? "All Formats" : t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List or Grid */}
          <section className="pb-24 pt-4">
            {savedResources.length > 0 ? (
              filteredResources.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="border border-white/[0.08] bg-[#080808] p-12 text-center text-xs text-neutral-500">
                  No saved resources match your query.
                </div>
              )
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center border border-white/[0.08] bg-[#080808] px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center border border-white/[0.08]">
                  <Bookmark size={18} className="text-neutral-600" />
                </div>
                <h2 className="mt-6 text-base font-medium">Nothing saved yet</h2>
                <p className="mt-2 max-w-md text-xs leading-6 text-neutral-500">
                  Bookmark courses, guides, tutorials, and ebooks while exploring AI Orbit Learn to reference them anytime.
                </p>
                <Link
                  href="/learn"
                  className="mt-6 bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  Explore Learn Library
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
`;

// 4. app/learn/submit/page.tsx
const submitPageCode = `"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Plus, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SubmitResourcePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [type, setType] = useState<string>("Course");
  const [category, setCategory] = useState("Generative AI");
  const [level, setLevel] = useState<string>("Intermediate");
  const [price, setPrice] = useState<string>("Free");
  const [duration, setDuration] = useState("6 hours");
  const [format, setFormat] = useState("Video course");
  const [provider, setProvider] = useState("");
  const [author, setAuthor] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [outcomeInput, setOutcomeInput] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>([
    "Understand the core architecture and application flow",
    "Implement production-ready patterns with evaluation",
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [successSlug, setSuccessSlug] = useState("");
  const [error, setError] = useState("");

  const addOutcome = () => {
    if (!outcomeInput.trim()) return;
    setOutcomes([...outcomes, outcomeInput.trim()]);
    setOutcomeInput("");
  };

  const removeOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !websiteUrl.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: title.trim(),
          description: description.trim(),
          overview: overview.trim() || description.trim(),
          learningOutcomes: outcomes,
          type,
          category,
          level,
          price,
          duration: duration.trim(),
          format: format.trim(),
          provider: provider.trim() || "Community Contributor",
          author: author.trim() || "AI Specialist",
          websiteUrl: websiteUrl.trim(),
          featured: false,
          tags: [category, type, "Community"],
        }),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to submit resource");
      }

      setSuccessSlug(slug);
    } catch (err: any) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Learn
          </Link>

          {successSlug ? (
            <div className="mt-8 border border-white/[0.08] bg-[#080808] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Check size={20} />
              </div>
              <h2 className="mt-5 text-2xl font-medium">Resource Submitted!</h2>
              <p className="mt-3 max-w-md mx-auto text-xs leading-6 text-neutral-400">
                Your resource &quot;{title}&quot; has been added to AI Orbit Learn and is now discoverable in the library.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href={\`/learn/\${successSlug}\`}
                  className="bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  View Resource Page
                </Link>
                <Link
                  href="/learn"
                  className="border border-white/[0.1] px-5 py-2.5 text-xs text-neutral-400 transition-colors hover:text-white hover:border-white/[0.2]"
                >
                  Browse All Resources
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="border-b border-white/[0.08] pb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Community Contribution
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-tight">
                  Submit an AI Resource
                </h1>
                <p className="mt-2 text-xs leading-6 text-neutral-500">
                  Recommend a high-quality course, guide, tutorial, or ebook to be cataloged on AI Orbit Learn.
                </p>
              </div>

              {error && (
                <div className="mt-6 border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Title & URL */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Resource Title *
                    </label>
                    <input
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. LangGraph Multi-Agent Architecture"
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Target Website / Source URL *
                    </label>
                    <input
                      required
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://..."
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-medium text-neutral-400">
                    Short Description *
                  </label>
                  <input
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence overview shown on search cards..."
                    className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                  />
                </div>

                {/* Full Overview */}
                <div>
                  <label className="block text-xs font-medium text-neutral-400">
                    Comprehensive Overview
                  </label>
                  <textarea
                    rows={4}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    placeholder="Detailed explanation of what the resource covers, methodologies, tools..."
                    className="mt-1.5 w-full border border-white/[0.08] bg-[#0c0c0c] p-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                  />
                </div>

                {/* Classification Row */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Format Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none"
                    >
                      <option value="Course">Course</option>
                      <option value="Guide">Guide</option>
                      <option value="Ebook">Ebook</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Domain Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none"
                    >
                      <option value="Generative AI">Generative AI</option>
                      <option value="LLMs">LLMs</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Prompt Engineering">Prompt Engineering</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="AI Coding">AI Coding</option>
                      <option value="Automation">Automation</option>
                      <option value="Computer Vision">Computer Vision</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Skill Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Pricing
                    </label>
                    <select
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none"
                    >
                      <option value="Free">Free</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>

                {/* Provider, Author, Duration */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Provider / Platform
                    </label>
                    <input
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      placeholder="e.g. DeepLearning.AI / YouTube"
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Author / Instructor
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Andrew Ng"
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400">
                      Duration / Est. Time
                    </label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 5 hours"
                      className="mt-1.5 h-11 w-full border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                  </div>
                </div>

                {/* Learning Outcomes Tag Adder */}
                <div>
                  <label className="block text-xs font-medium text-neutral-400">
                    Key Learning Outcomes
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      value={outcomeInput}
                      onChange={(e) => setOutcomeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addOutcome();
                        }
                      }}
                      placeholder="Type a key takeaway and click Add..."
                      className="h-11 flex-1 border border-white/[0.08] bg-[#0c0c0c] px-3.5 text-xs text-white outline-none focus:border-white/[0.2]"
                    />
                    <button
                      type="button"
                      onClick={addOutcome}
                      className="border border-white/[0.1] px-4 text-xs text-neutral-300 hover:text-white"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border border-white/[0.06] bg-[#090909] px-3 py-2 text-xs text-neutral-300"
                      >
                        <span className="truncate pr-3">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeOutcome(idx)}
                          className="text-neutral-500 hover:text-red-400"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-white px-6 py-3 text-xs font-medium text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit to Library"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 5. app/learn/roadmaps/page.tsx
const roadmapsPageCode = `import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Compass, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { roadmaps } from "@/data/roadmaps";

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Learn
          </Link>

          <section className="border-b border-white/[0.08] pb-12 pt-6">
            <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400">
              <Compass size={12} />
              Career Tracks
            </div>

            <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
              AI Learning Roadmaps
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400">
              Step-by-step career pathways curated by AI Orbit to take you from foundational understanding to shipping production-grade intelligence systems.
            </p>
          </section>

          {/* Roadmaps Grid */}
          <section className="py-12 space-y-16">
            {roadmaps.map((track) => (
              <div
                key={track.id}
                className="border border-white/[0.08] bg-[#080808] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                        {track.category}
                      </span>
                      <span className="text-xs text-neutral-500">{track.level}</span>
                    </div>

                    <h2 className="mt-2 text-2xl font-medium text-white">{track.title}</h2>
                    <p className="mt-1.5 max-w-2xl text-xs leading-6 text-neutral-400">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 shrink-0">
                    <Clock3 size={13} />
                    <span>{track.estimatedDuration}</span>
                  </div>
                </div>

                {/* Sequential Milestones */}
                <div className="mt-8 space-y-6">
                  {track.milestones.map((m) => (
                    <div
                      key={m.step}
                      className="relative flex flex-col gap-4 border-l border-white/[0.1] pl-6 transition-colors hover:border-white/[0.3] sm:flex-row sm:items-start sm:justify-between"
                    >
                      <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#050505] border border-white/[0.2] font-mono text-[9px] text-neutral-400">
                        {m.step}
                      </span>

                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white">{m.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-neutral-400">
                          {m.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.skills.map((skill) => (
                            <span
                              key={skill}
                              className="border border-white/[0.06] bg-[#0c0c0c] px-2 py-0.5 text-[10px] text-neutral-500"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {m.recommendedResourceSlugs && m.recommendedResourceSlugs.length > 0 && (
                        <div className="flex flex-col gap-1.5 shrink-0 sm:items-end">
                          <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                            Recommended
                          </span>
                          {m.recommendedResourceSlugs.map((slug) => (
                            <Link
                              key={slug}
                              href={\`/learn/\${slug}\`}
                              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                            >
                              <span>Explore Course</span>
                              <ArrowUpRight size={12} />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 6. app/api/resources/route.ts
const apiResourcesCode = `import { NextRequest, NextResponse } from "next/server";
import { getAllResources, createResource } from "@/lib/resourceService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || undefined;
    const type = searchParams.get("type") || undefined;
    const category = searchParams.get("category") || undefined;
    const level = searchParams.get("level") || undefined;
    const price = searchParams.get("price") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;
    const featuredParam = searchParams.get("featured");
    const featured = featuredParam === "true" ? true : featuredParam === "false" ? false : undefined;

    const resources = await getAllResources({
      search,
      type,
      category,
      level,
      price,
      featured,
      sort,
    });

    return NextResponse.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error("API GET resources error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.websiteUrl) {
      return NextResponse.json(
        { success: false, message: "Title and websiteUrl are required." },
        { status: 400 }
      );
    }

    const created = await createResource(body);

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error) {
    console.error("API POST resource error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create resource" },
      { status: 500 }
    );
  }
}
`;

// 7. app/api/resources/[slug]/route.ts
const apiResourceSlugCode = `import { NextRequest, NextResponse } from "next/server";
import { getResourceBySlug, getRelatedResources } from "@/lib/resourceService";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const resource = await getResourceBySlug(slug);

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found" },
        { status: 404 }
      );
    }

    const related = await getRelatedResources(resource, 3);

    return NextResponse.json({
      success: true,
      data: {
        ...resource,
        related,
      },
    });
  } catch (error) {
    console.error("API GET resource slug error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}
`;

// 8. app/api/resources/[slug]/review/route.ts
const apiResourceReviewCode = `import { NextRequest, NextResponse } from "next/server";
import { addReviewToResource } from "@/lib/resourceService";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    if (!body.author || !body.comment) {
      return NextResponse.json(
        { success: false, message: "Author and comment are required." },
        { status: 400 }
      );
    }

    const ok = await addReviewToResource(slug, {
      author: body.author,
      role: body.role || "AI Practitioner",
      rating: Number(body.rating) || 5,
      comment: body.comment,
    });

    return NextResponse.json({
      success: ok,
    });
  } catch (error) {
    console.error("API POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add review" },
      { status: 500 }
    );
  }
}
`;

// 9. app/api/roadmaps/route.ts
const apiRoadmapsCode = `import { NextResponse } from "next/server";
import { roadmaps } from "@/data/roadmaps";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: roadmaps.length,
    data: roadmaps,
  });
}
`;

// Write files
fs.writeFileSync('app/learn/page.tsx', learnPageCode, 'utf-8');
console.log('Written app/learn/page.tsx');

fs.writeFileSync('app/learn/[slug]/page.tsx', resourceDetailPageCode, 'utf-8');
console.log('Written app/learn/[slug]/page.tsx');

fs.writeFileSync('app/learn/saved/page.tsx', savedPageCode, 'utf-8');
console.log('Written app/learn/saved/page.tsx');

fs.writeFileSync('app/learn/submit/page.tsx', submitPageCode, 'utf-8');
console.log('Written app/learn/submit/page.tsx');

fs.writeFileSync('app/learn/roadmaps/page.tsx', roadmapsPageCode, 'utf-8');
console.log('Written app/learn/roadmaps/page.tsx');

fs.writeFileSync('app/api/resources/route.ts', apiResourcesCode, 'utf-8');
console.log('Written app/api/resources/route.ts');

fs.writeFileSync('app/api/resources/[slug]/route.ts', apiResourceSlugCode, 'utf-8');
console.log('Written app/api/resources/[slug]/route.ts');

fs.writeFileSync('app/api/resources/[slug]/review/route.ts', apiResourceReviewCode, 'utf-8');
console.log('Written app/api/resources/[slug]/review/route.ts');

fs.writeFileSync('app/api/roadmaps/route.ts', apiRoadmapsCode, 'utf-8');
console.log('Written app/api/roadmaps/route.ts');

