import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#232326] bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/learn"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-white"
            >
              <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
              AI ORBIT
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-neutral-400">
              The AI Signal — Discover, learn, and master the best AI courses, guides, models, and tools across the global intelligence ecosystem.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500">
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
