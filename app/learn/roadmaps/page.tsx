import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Compass, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { roadmaps } from "@/data/roadmaps";

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Back to Learn Hub</span>
          </Link>

          <section className="border-b border-[#1f1f26] pb-12 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-300">
              <Compass size={13} className="text-[#7048e8]" />
              <span>Career Tracks</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              AI Learning Roadmaps
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Step-by-step career pathways curated by AI Orbit to take you from foundational understanding to shipping production-grade intelligence systems.
            </p>
          </section>

          {/* Roadmaps Grid */}
          <section className="py-12 space-y-12">
            {roadmaps.map((track) => (
              <div
                key={track.id}
                className="rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6 sm:p-8 transition-all hover:border-[#2f2f3a]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#1f1f26] pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                        {track.category}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">{track.level}</span>
                    </div>

                    <h2 className="mt-2.5 text-2xl font-bold text-white">{track.title}</h2>
                    <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-zinc-400">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0">
                    <Clock3 size={13} className="text-zinc-500" />
                    <span>{track.estimatedDuration}</span>
                  </div>
                </div>

                {/* Sequential Milestones */}
                <div className="mt-8 space-y-6">
                  {track.milestones.map((m) => (
                    <div
                      key={m.step}
                      className="relative flex flex-col gap-4 border-l border-[#23232c] pl-6 transition-colors hover:border-[#7048e8] sm:flex-row sm:items-start sm:justify-between"
                    >
                      <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#070709] border border-[#7048e8] font-mono text-[9px] text-zinc-300">
                        {m.step}
                      </span>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                          {m.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded border border-[#1f1f26] bg-[#121217] px-2 py-0.5 text-[10px] text-zinc-300 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {m.recommendedResourceSlugs && m.recommendedResourceSlugs.length > 0 && (
                        <div className="flex flex-col gap-1.5 shrink-0 sm:items-end">
                          <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-medium">
                            Recommended
                          </span>
                          {m.recommendedResourceSlugs.map((slug) => (
                            <Link
                              key={slug}
                              href={`/learn/${slug}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#1f1f26] bg-[#121217] px-3 py-1.5 text-xs text-zinc-300 hover:border-[#2f2f3a] hover:bg-[#181820] hover:text-white transition-all"
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
