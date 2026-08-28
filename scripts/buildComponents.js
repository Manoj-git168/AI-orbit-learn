const fs = require('fs');
const path = require('path');

// 1. components/Navbar.tsx
const navbarCode = `"use client";

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
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050505]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo and primary links */}
          <div className="flex items-center gap-9">
            <Link
              href="/learn"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-white transition-opacity hover:opacity-80"
            >
              <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              AI ORBIT
            </Link>

            <nav className="hidden items-center gap-6 text-xs font-medium tracking-[0.04em] text-neutral-400 md:flex">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={\`transition-colors \${
                      link.active
                        ? "text-white font-medium relative after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-[2px] after:bg-white"
                        : "hover:text-white"
                    }\`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2.5 border border-white/[0.08] bg-[#0c0c0c] px-3.5 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
              aria-label="Search resources"
            >
              <Search size={14} strokeWidth={1.7} />
              <span className="hidden sm:inline text-neutral-400">Search</span>
              <kbd className="hidden sm:inline-block rounded border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Saved Library Link */}
            <Link
              href="/learn/saved"
              className={\`flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors \${
                pathname === "/learn/saved"
                  ? "border-white/[0.2] bg-white text-black font-medium"
                  : "border-white/[0.08] text-neutral-400 hover:border-white/[0.2] hover:text-white"
              }\`}
              aria-label="Saved resources"
            >
              <Bookmark size={13} strokeWidth={1.8} fill={savedIds.length > 0 && pathname !== "/learn/saved" ? "currentColor" : "none"} />
              <span className="hidden sm:inline">Saved</span>
              {savedIds.length > 0 && (
                <span className={\`ml-0.5 rounded-full px-1.5 text-[10px] \${
                  pathname === "/learn/saved" ? "bg-black text-white" : "bg-white/[0.1] text-white"
                }\`}>
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Submit Resource CTA */}
            <Link
              href="/learn/submit"
              className="hidden lg:inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
            >
              <Plus size={13} strokeWidth={2.2} />
              Submit
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center border border-white/[0.08] text-neutral-400 transition-colors hover:text-white md:hidden"
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
                    className={\`py-1 \${link.active ? "text-white font-medium" : "hover:text-white"}\`}
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
`;

// 2. components/Footer.tsx
const footerCode = `import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/learn"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-white"
            >
              <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              AI ORBIT
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-neutral-500">
              The AI Signal — Discover, learn, and master the best AI courses, guides, models, and tools across the global intelligence ecosystem.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-neutral-600">
              <span>© {new Date().getFullYear()} AI Orbit</span>
              <span>·</span>
              <span>All rights reserved</span>
            </div>
          </div>

          {/* Learn Categories */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Learn Tracks
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/learn?category=Prompt+Engineering" className="hover:text-white transition-colors">
                  Prompt Engineering
                </Link>
              </li>
              <li>
                <Link href="/learn?category=AI+Agents" className="hover:text-white transition-colors">
                  Autonomous AI Agents
                </Link>
              </li>
              <li>
                <Link href="/learn?category=LLMs" className="hover:text-white transition-colors">
                  LLMs & Fine-Tuning
                </Link>
              </li>
              <li>
                <Link href="/learn?category=Generative+AI" className="hover:text-white transition-colors">
                  RAG & Embeddings
                </Link>
              </li>
              <li>
                <Link href="/learn?category=AI+Coding" className="hover:text-white transition-colors">
                  AI Coding & Workflows
                </Link>
              </li>
              <li>
                <Link href="/learn/roadmaps" className="hover:text-white transition-colors">
                  Career Roadmaps
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              AI Orbit Ecosystem
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="https://aiorbit.club/tasks" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Tasks <ArrowUpRight size={11} className="text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://aiorbit.club/companies" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Companies <ArrowUpRight size={11} className="text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://aiorbit.club/robots" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Robots <ArrowUpRight size={11} className="text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://aiorbit.club/leaderboard" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Leaderboard <ArrowUpRight size={11} className="text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://aiorbit.club/business" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Business AI <ArrowUpRight size={11} className="text-neutral-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Submit */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Community
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/learn/submit" className="hover:text-white transition-colors">
                  Submit a Resource
                </Link>
              </li>
              <li>
                <Link href="/learn/saved" className="hover:text-white transition-colors">
                  Your Saved Library
                </Link>
              </li>
              <li>
                <a href="https://aiorbit.club" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  About AI Orbit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

// 3. components/learn/QuickSearchModal.tsx
const quickSearchModalCode = `"use client";

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
      router.push(\`/learn/\${slug}\`);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-sm sm:pt-28 animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl border border-white/[0.12] bg-[#0a0a0a] shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-white/[0.08] px-4">
          <Search size={18} className="text-neutral-500 shrink-0 ml-1" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search AI courses, guides, topics, frameworks..."
            className="h-14 w-full bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-neutral-600"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-white/[0.04]">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.slug)}
                className="group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="border border-white/[0.08] px-2 py-0.5 text-[9px] font-medium tracking-[0.14em] uppercase text-neutral-400">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="mt-1.5 truncate text-sm font-medium text-white group-hover:text-neutral-200">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 truncate text-xs text-neutral-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-600 shrink-0">
                  <span className="flex items-center gap-1">
                    <Star size={11} /> {item.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 size={11} /> {item.duration}
                  </span>
                  <ArrowRight size={14} className="text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-neutral-500">
              No learning resources found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#070707] px-4 py-3 text-[11px] text-neutral-600">
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
`;

// 4. components/learn/ResourceListItem.tsx
const resourceListItemCode = `"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, Star } from "lucide-react";
import SaveButton from "@/components/learn/SaveButton";
import ResourceThumbnail from "@/components/learn/ResourceThumbnail";
import type { LearningResource } from "@/types/resources";

interface ResourceListItemProps {
  resource: LearningResource;
}

export default function ResourceListItem({ resource }: ResourceListItemProps) {
  return (
    <article className="group relative flex flex-col justify-between border border-white/[0.08] bg-[#080808] p-5 transition-all duration-200 hover:border-white/[0.18] hover:bg-[#0c0c0c] sm:flex-row sm:items-center">
      {/* Left Info */}
      <Link
        href={\`/learn/\${resource.slug}\`}
        className="flex flex-1 items-start gap-4"
        aria-label={\`View \${resource.title}\`}
      >
        <div className="w-24 shrink-0 sm:w-28">
          <ResourceThumbnail resource={resource} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-white/[0.08] px-2 py-0.5 text-[9px] font-medium tracking-[0.14em] uppercase text-neutral-400">
              {resource.type}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              {resource.category}
            </span>
            <span className="text-[10px] text-neutral-600">·</span>
            <span className="text-xs text-neutral-500">{resource.level}</span>
          </div>

          <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight text-white group-hover:text-neutral-200">
            {resource.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs leading-5 text-neutral-500 sm:line-clamp-2">
            {resource.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
            <span className="text-neutral-500">By {resource.provider}</span>
            <span className="flex items-center gap-1">
              <Clock3 size={12} strokeWidth={1.6} />
              {resource.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} strokeWidth={1.6} />
              {resource.rating} ({resource.reviewCount})
            </span>
            <span className={\`font-medium \${resource.price === "Free" ? "text-emerald-400" : "text-neutral-300"}\`}>
              {resource.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/[0.04] pt-3 sm:mt-0 sm:border-t-0 sm:pt-0 sm:pl-4">
        <SaveButton
          resourceId={resource.id}
          resourceTitle={resource.title}
          variant="button"
        />

        <Link
          href={\`/learn/\${resource.slug}\`}
          className="flex h-9 items-center gap-1.5 border border-white/[0.1] px-3 text-xs text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
        >
          <span>View</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </article>
  );
}
`;

// 5. components/learn/CurriculumAccordion.tsx
const curriculumAccordionCode = `"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, PlayCircle, Code, CheckCircle2 } from "lucide-react";
import type { CurriculumModule } from "@/types/resources";

interface CurriculumAccordionProps {
  curriculum: CurriculumModule[];
}

export default function CurriculumAccordion({ curriculum }: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!curriculum || curriculum.length === 0) {
    return (
      <div className="border border-white/[0.08] bg-[#080808] p-8 text-center text-sm text-neutral-500">
        Curriculum details are continuously updated as lessons are released.
      </div>
    );
  }

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getLessonIcon = (type?: string) => {
    switch (type) {
      case "video":
        return <PlayCircle size={14} className="text-neutral-500 shrink-0" />;
      case "project":
        return <Code size={14} className="text-neutral-500 shrink-0" />;
      case "exercise":
        return <CheckCircle2 size={14} className="text-neutral-500 shrink-0" />;
      default:
        return <FileText size={14} className="text-neutral-500 shrink-0" />;
    }
  };

  return (
    <div className="divide-y divide-white/[0.08] border border-white/[0.08] bg-[#080808]">
      {curriculum.map((module, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={module.title} className="transition-colors">
            <button
              onClick={() => toggleModule(idx)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
              aria-expanded={isOpen}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                    Module {String(idx + 1).padStart(2, "0")}
                  </span>
                  {module.duration && (
                    <span className="text-xs text-neutral-600">· {module.duration}</span>
                  )}
                </div>
                <h4 className="mt-1 text-sm font-medium text-white">{module.title}</h4>
              </div>

              <div className="flex items-center gap-3 text-neutral-500">
                <span className="text-xs">{module.lessons.length} lessons</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {isOpen && (
              <div className="divide-y divide-white/[0.04] border-t border-white/[0.06] bg-[#050505]/60 px-5 py-2">
                {module.lessons.map((lesson, lessonIdx) => (
                  <div
                    key={lesson.title}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-700 font-mono text-[11px]">
                        {idx + 1}.{lessonIdx + 1}
                      </span>
                      {getLessonIcon(lesson.type)}
                      <span className="text-neutral-300">{lesson.title}</span>
                    </div>

                    {lesson.duration && (
                      <span className="text-neutral-600 font-mono">{lesson.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
`;

// 6. components/learn/ReviewSection.tsx
const reviewSectionCode = `"use client";

import { useState } from "react";
import { MessageSquare, Star, User } from "lucide-react";
import type { ResourceReview } from "@/types/resources";

interface ReviewSectionProps {
  slug: string;
  initialReviews?: ResourceReview[];
  rating: number;
  reviewCount: number;
}

export default function ReviewSection({
  slug,
  initialReviews = [],
  rating,
  reviewCount,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ResourceReview[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch(\`/api/resources/\${slug}/review\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          role: role.trim() || "AI Practitioner",
          rating: userRating,
          comment: comment.trim(),
        }),
      });

      const newReview: ResourceReview = {
        id: "rev-" + Date.now(),
        author: author.trim(),
        role: role.trim() || "AI Practitioner",
        rating: userRating,
        date: "Just now",
        comment: comment.trim(),
      };

      setReviews([newReview, ...reviews]);
      setSuccessMessage("Thank you! Your review has been added.");
      setAuthor("");
      setRole("");
      setComment("");
      setShowForm(false);
    } catch {
      // Fallback optimistic UI
      const newReview: ResourceReview = {
        id: "rev-" + Date.now(),
        author: author.trim(),
        role: role.trim() || "AI Practitioner",
        rating: userRating,
        date: "Just now",
        comment: comment.trim(),
      };
      setReviews([newReview, ...reviews]);
      setSuccessMessage("Thank you! Your review has been added.");
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-b border-white/[0.08] py-14" id="reviews">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Feedback
          </p>
          <h2 className="mt-2 text-2xl font-medium">Community Reviews</h2>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-white/[0.1] px-4 py-2.5 text-xs text-neutral-300 transition-colors hover:border-white/[0.2] hover:text-white"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {successMessage && (
        <div className="mt-6 border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-400">
          {successMessage}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 border border-white/[0.08] bg-[#080808] p-6"
        >
          <h3 className="text-sm font-medium text-white">Share your experience</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-neutral-500">Your Name *</label>
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="mt-1 h-10 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none focus:border-white/[0.2]"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500">Your Role / Headline</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. AI Engineer / Data Scientist"
                className="mt-1 h-10 w-full border border-white/[0.08] bg-[#0c0c0c] px-3 text-xs text-white outline-none focus:border-white/[0.2]"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-neutral-500">Rating</label>
            <div className="mt-1 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="p-1 text-neutral-600 hover:text-white"
                >
                  <Star
                    size={18}
                    fill={star <= userRating ? "currentColor" : "none"}
                    className={star <= userRating ? "text-amber-400" : "text-neutral-700"}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs text-neutral-400">{userRating} / 5 Stars</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-neutral-500">Review *</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you learn? How helpful was this resource for your workflow?"
              className="mt-1 w-full border border-white/[0.08] bg-[#0c0c0c] p-3 text-xs text-white outline-none focus:border-white/[0.2]"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-white/[0.08] bg-[#080808] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-[#0e0e0e] text-neutral-400">
                    <User size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-white">{rev.author}</h4>
                    {rev.role && (
                      <p className="text-[11px] text-neutral-600">{rev.role}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-neutral-400">{rev.comment}</p>
              <p className="mt-3 text-[10px] text-neutral-700">{rev.date}</p>
            </div>
          ))
        ) : (
          <div className="col-span-2 border border-white/[0.08] bg-[#080808] p-8 text-center text-xs text-neutral-600">
            No community reviews yet. Be the first to leave feedback!
          </div>
        )}
      </div>
    </section>
  );
}
`;

// 7. components/learn/ShareButton.tsx
const shareButtonCode = `"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignored
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-white/[0.1] px-5 py-3 text-sm text-neutral-400 transition-colors hover:border-white/[0.2] hover:text-white"
      aria-label="Share resource"
    >
      {copied ? (
        <>
          <Check size={15} className="text-emerald-400" />
          <span className="text-emerald-400">Link Copied</span>
        </>
      ) : (
        <>
          <Share2 size={15} />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
`;

// Write all generated component files
fs.writeFileSync('components/Navbar.tsx', navbarCode, 'utf-8');
console.log('Written components/Navbar.tsx');

fs.writeFileSync('components/Footer.tsx', footerCode, 'utf-8');
console.log('Written components/Footer.tsx');

fs.writeFileSync('components/learn/QuickSearchModal.tsx', quickSearchModalCode, 'utf-8');
console.log('Written components/learn/QuickSearchModal.tsx');

fs.writeFileSync('components/learn/ResourceListItem.tsx', resourceListItemCode, 'utf-8');
console.log('Written components/learn/ResourceListItem.tsx');

fs.writeFileSync('components/learn/CurriculumAccordion.tsx', curriculumAccordionCode, 'utf-8');
console.log('Written components/learn/CurriculumAccordion.tsx');

fs.writeFileSync('components/learn/ReviewSection.tsx', reviewSectionCode, 'utf-8');
console.log('Written components/learn/ReviewSection.tsx');

fs.writeFileSync('components/learn/ShareButton.tsx', shareButtonCode, 'utf-8');
console.log('Written components/learn/ShareButton.tsx');

