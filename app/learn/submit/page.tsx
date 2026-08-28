"use client";

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
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Back to Learn Hub</span>
          </Link>

          {successSlug ? (
            <div className="mt-8 rounded-xl border border-[#1f1f26] bg-[#0f0f13] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Check size={20} />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-white">Resource Submitted!</h2>
              <p className="mt-3 max-w-md mx-auto text-xs leading-relaxed text-zinc-400">
                Your resource &quot;{title}&quot; has been added to AI Orbit Learn and is now discoverable in the library.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={`/learn/${successSlug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#7048e8] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)]"
                >
                  View Resource Page
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center rounded-lg border border-[#1f1f26] bg-[#121217] px-5 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-[#2f2f3a] hover:text-white"
                >
                  Browse All Resources
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="border-b border-[#1f1f26] pb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
                  Community Contribution
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                  Submit an AI Resource
                </h1>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Recommend a high-quality course, guide, tutorial, or ebook to be cataloged on AI Orbit Learn.
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Title & URL */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Resource Title *
                    </label>
                    <input
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. LangGraph Multi-Agent Architecture"
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Target Website / Source URL *
                    </label>
                    <input
                      required
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://..."
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Short Description *
                  </label>
                  <input
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence overview shown on search cards..."
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                  />
                </div>

                {/* Full Overview */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Comprehensive Overview
                  </label>
                  <textarea
                    rows={4}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    placeholder="Detailed explanation of what the resource covers, methodologies, tools..."
                    className="mt-1.5 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] p-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                  />
                </div>

                {/* Classification Row */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Format Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none"
                    >
                      <option value="Course" className="bg-[#0f0f13]">Course</option>
                      <option value="Guide" className="bg-[#0f0f13]">Guide</option>
                      <option value="Ebook" className="bg-[#0f0f13]">Ebook</option>
                      <option value="Tutorial" className="bg-[#0f0f13]">Tutorial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Domain Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none"
                    >
                      <option value="Generative AI" className="bg-[#0f0f13]">Generative AI</option>
                      <option value="LLMs" className="bg-[#0f0f13]">LLMs</option>
                      <option value="AI Agents" className="bg-[#0f0f13]">AI Agents</option>
                      <option value="Prompt Engineering" className="bg-[#0f0f13]">Prompt Engineering</option>
                      <option value="Machine Learning" className="bg-[#0f0f13]">Machine Learning</option>
                      <option value="AI Coding" className="bg-[#0f0f13]">AI Coding</option>
                      <option value="Automation" className="bg-[#0f0f13]">Automation</option>
                      <option value="Computer Vision" className="bg-[#0f0f13]">Computer Vision</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Skill Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none"
                    >
                      <option value="Beginner" className="bg-[#0f0f13]">Beginner</option>
                      <option value="Intermediate" className="bg-[#0f0f13]">Intermediate</option>
                      <option value="Advanced" className="bg-[#0f0f13]">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Pricing
                    </label>
                    <select
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none"
                    >
                      <option value="Free" className="bg-[#0f0f13]">Free</option>
                      <option value="Paid" className="bg-[#0f0f13]">Paid</option>
                    </select>
                  </div>
                </div>

                {/* Provider, Author, Duration */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Provider / Platform
                    </label>
                    <input
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      placeholder="e.g. DeepLearning.AI / YouTube"
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Author / Instructor
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Andrew Ng"
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Duration / Est. Time
                    </label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 5 hours"
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                  </div>
                </div>

                {/* Learning Outcomes Tag Adder */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
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
                      className="h-11 flex-1 rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3.5 text-xs text-white outline-none focus:border-[#7048e8]"
                    />
                    <button
                      type="button"
                      onClick={addOutcome}
                      className="rounded-lg border border-[#1f1f26] bg-[#121217] px-4 text-xs font-medium text-zinc-300 hover:border-[#2f2f3a] hover:text-white transition-all"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-[#1f1f26] bg-[#121217] px-3.5 py-2 text-xs text-zinc-300"
                      >
                        <span className="truncate pr-3">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeOutcome(idx)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
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
                    className="rounded-lg bg-[#7048e8] px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)] disabled:opacity-50"
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
