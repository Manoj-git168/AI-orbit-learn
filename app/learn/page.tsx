import { ArrowRight, Compass, Sparkles, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between selection:bg-[#7048e8]/30">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Ambient Glow */}
        <section className="relative overflow-hidden border-b border-[#1f1f26] hero-glow">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-300 backdrop-blur-md">
              <Sparkles size={13} className="text-amber-400" />
              <span>AI Orbit Learn · Curated Hub</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Learn What&apos;s Next in AI.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Explore curated courses, guides, architectures, and career roadmaps to understand, build, and master the modern AI intelligence stack.
            </p>

            {/* Interactive Search Bar */}
            <LearnHeroSearch />

            {/* Stats Ticker */}
            <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{allResources.length}+</span>
                <span className="text-zinc-400 font-medium">Verified Tracks</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">100%</span>
                <span className="text-zinc-400 font-medium">Free Open Access</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">Daily</span>
                <span className="text-zinc-400 font-medium">Updated Catalog</span>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Quick Domain Bar */}
        <section className="border-b border-[#1f1f26] bg-[#09090d]">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Explore by Domain
              </span>

              <Link
                href="/learn/roadmaps"
                className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
              >
                <Compass size={13} className="text-[#7048e8]" />
                <span>View Career Roadmaps</span>
                <ArrowRight size={12} className="text-zinc-500" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/learn?category=${encodeURIComponent(topic)}#resources-browser`}
                  className="rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:border-[#2f2f3a] hover:bg-[#15151c] hover:text-white"
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
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7048e8] font-semibold">
                  Curated Highlights
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Featured Learning Resources
                </h2>
              </div>

              <a
                href="#resources-browser"
                className="hidden items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white sm:flex"
              >
                View all ({allResources.length})
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {/* Full Resource Browser */}
        <div id="resources">
          <Suspense
            fallback={
              <div className="mx-auto max-w-7xl px-6 pb-24">
                <div className="min-h-80 animate-pulse rounded-xl border border-[#1f1f26] bg-[#0c0c10]" />
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
