import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Bookmark, Plus, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between selection:bg-[#7048e8]/30">
      <Navbar />

      <main className="flex-1 hero-glow">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7048e8] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7048e8]" />
            </span>
            <span>AI ORBIT ECOSYSTEM</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            The AI Learning Signal.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Discover, bookmark, and master high-signal learning tracks, multi-agent frameworks, prompt engineering blueprints, and career roadmaps.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7048e8] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_20px_rgba(112,72,232,0.4)]"
            >
              <BookOpen size={16} />
              <span>Explore Learn Hub</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/learn/roadmaps"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1f1f26] bg-[#0c0c10] px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-[#2f2f3a] hover:bg-[#121217] hover:text-white"
            >
              <Compass size={16} />
              <span>Career Roadmaps</span>
            </Link>
          </div>

          {/* Quick Ecosystem Modules Grid */}
          <div className="mt-20 grid gap-4 text-left sm:grid-cols-3">
            <Link
              href="/learn"
              className="group rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6 transition-all duration-300 hover:border-[#2f2f3a] hover:bg-[#121217] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#7048e8]">
                <BookOpen size={18} />
              </div>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-zinc-100">
                Curated Catalog
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                100+ verified courses, tutorials, and ebooks across LLMs, AI Agents, and Generative AI.
              </p>
            </Link>

            <Link
              href="/learn/roadmaps"
              className="group rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6 transition-all duration-300 hover:border-[#2f2f3a] hover:bg-[#121217] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#7048e8]">
                <Compass size={18} />
              </div>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-zinc-100">
                Career Roadmaps
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Step-by-step milestone pathways from foundations to shipping autonomous production agents.
              </p>
            </Link>

            <Link
              href="/learn/saved"
              className="group rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6 transition-all duration-300 hover:border-[#2f2f3a] hover:bg-[#121217] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-400">
                <Bookmark size={18} />
              </div>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-zinc-100">
                Personal Library
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Bookmark and organise your saved learning materials with quick search and filter views.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}