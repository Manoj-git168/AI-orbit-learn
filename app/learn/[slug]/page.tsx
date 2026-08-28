import {
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
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 py-6 text-xs text-zinc-400">
            <Link href="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <span>/</span>
            <Link
              href={`/learn?category=${encodeURIComponent(resource.category)}`}
              className="hover:text-white transition-colors"
            >
              {resource.category}
            </Link>
            <span>/</span>
            <span className="truncate max-w-[240px] text-zinc-300 sm:max-w-md">
              {resource.title}
            </span>
          </div>

          {/* Header Banner */}
          <section className="border-b border-[#1f1f26] pb-12 pt-2">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-zinc-300">
                  {resource.type}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium">
                  {resource.category}
                </span>
                <span className="text-xs text-zinc-600">·</span>
                <span className="text-xs text-zinc-300">{resource.level}</span>
                <span className="text-xs text-zinc-600">·</span>
                <span className={`text-xs font-medium ${resource.price === "Free" ? "text-emerald-400" : "text-zinc-300"}`}>
                  {resource.price}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-8">
                {resource.description}
              </p>

              {/* Action Toolbar */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={resource.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#7048e8] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_20px_rgba(112,72,232,0.4)]"
                >
                  <span>Start Learning</span>
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>

                <SaveButton
                  resourceId={resource.id}
                  resourceTitle={resource.title}
                  variant="button"
                />

                <ShareButton title={resource.title} />

                <a
                  href="#reviews"
                  className="inline-flex items-center rounded-lg border border-[#1f1f26] bg-[#121217] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-[#2f2f3a] hover:bg-[#181820] hover:text-white"
                >
                  Reviews ({resource.reviewCount})
                </a>
              </div>
            </div>
          </section>

          {/* Resource Overview & Information Panel */}
          <section className="grid gap-8 border-b border-[#1f1f26] py-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Visual Thumbnail */}
            <div>
              <ResourceThumbnail resource={resource} large />
            </div>

            {/* Quick Metadata Box */}
            <div className="rounded-xl border border-[#232326] bg-[#0c0c0f] p-1">
              <div className="border-b border-[#232326] px-5 py-3.5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Resource Details
                </p>
              </div>

              <div className="divide-y divide-[#1c1c20] text-xs">
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-neutral-400">Skill Level</span>
                  <span className="text-white font-medium">{resource.level}</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Clock3 size={13} className="text-neutral-500" />
                    Duration
                  </span>
                  <span className="text-white">{resource.duration}</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-neutral-400">Format</span>
                  <span className="text-white">{resource.format}</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-neutral-400">Pricing</span>
                  <span className={`font-medium ${resource.price === "Free" ? "text-emerald-400" : "text-white"}`}>
                    {resource.price}
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Star size={13} fill="currentColor" className="text-amber-400" />
                    Rating
                  </span>
                  <span className="text-white">
                    {resource.rating} / 5.0{" "}
                    <span className="text-neutral-500 font-normal">
                      ({resource.reviewCount} reviews)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Globe size={13} className="text-neutral-500" />
                    Language
                  </span>
                  <span className="text-white">{resource.language || "English"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Overview & Topic Tags */}
          <section className="grid gap-12 border-b border-[#232326] py-14 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                Deep Dive
              </p>
              <h2 className="mt-2 text-2xl font-medium text-white">About this resource</h2>
              <p className="mt-5 text-sm leading-relaxed text-neutral-400 whitespace-pre-line">
                {resource.overview}
              </p>
            </div>

            {/* Tags & Taxonomy */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                Covered Frameworks & Topics
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/learn?search=${encodeURIComponent(tag)}#resources-browser`}
                    className="rounded-lg border border-[#232326] bg-[#0c0c0f] px-3 py-1.5 text-xs text-neutral-300 transition-all hover:border-zinc-700 hover:bg-[#141418] hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Target Audience & Prerequisites */}
              {resource.prerequisites && resource.prerequisites.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                    Prerequisites
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-neutral-400">
                    {resource.prerequisites.map((req) => (
                      <li key={req} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
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
            <section className="border-b border-[#232326] py-14">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                Curated Outcomes
              </p>
              <h2 className="mt-2 text-2xl font-medium text-white">What you&apos;ll learn</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {resource.learningOutcomes.map((outcome, idx) => (
                  <div key={outcome} className="flex gap-4 rounded-xl border border-[#232326] bg-[#0c0c0f] p-5">
                    <span className="font-mono text-xs text-neutral-500">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      <p className="text-xs leading-relaxed text-neutral-300">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Curriculum / Syllabus Accordion */}
          {resource.curriculum && resource.curriculum.length > 0 && (
            <section className="border-b border-[#232326] py-14">
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                    Syllabus
                  </p>
                  <h2 className="mt-2 text-2xl font-medium text-white">Course Curriculum</h2>
                </div>
                <span className="text-xs text-neutral-400">
                  {resource.curriculum.length} Modules
                </span>
              </div>

              <CurriculumAccordion curriculum={resource.curriculum} />
            </section>
          )}

          {/* Author & Provider Card */}
          <section className="border-b border-[#232326] py-14">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              Instructor & Provider
            </p>

            <div className="mt-6 flex flex-col justify-between gap-6 rounded-xl border border-[#232326] bg-[#0c0c0f] p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-medium text-white">{resource.provider}</h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Instructor: <span className="text-neutral-200 font-medium">{resource.author}</span>
                </p>
                {resource.authorBio && (
                  <p className="mt-3 max-w-xl text-xs leading-relaxed text-neutral-400">
                    {resource.authorBio}
                  </p>
                )}
              </div>

              <a
                href={resource.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#232326] bg-[#141418] px-4 py-2.5 text-xs text-neutral-300 transition-all hover:border-zinc-700 hover:bg-[#1a1a20] hover:text-white shrink-0"
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
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                  Continue Exploring
                </p>
                <h2 className="mt-2 text-2xl font-medium text-white">Related resources</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
