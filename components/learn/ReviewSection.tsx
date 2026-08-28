"use client";

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
      const res = await fetch(`/api/resources/${slug}/review`, {
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
    <section className="border-b border-[#1f1f26] py-14" id="reviews">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
            Feedback
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Community Reviews</h2>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg border border-[#1f1f26] bg-[#121217] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#2f2f3a] hover:text-white"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {successMessage && (
        <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-400">
          {successMessage}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6"
        >
          <h3 className="text-sm font-semibold text-white">Share your experience</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300">Your Name *</label>
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="mt-1 h-10 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none focus:border-[#7048e8]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300">Your Role / Headline</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. AI Engineer / Data Scientist"
                className="mt-1 h-10 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] px-3 text-xs text-white outline-none focus:border-[#7048e8]"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-zinc-300">Rating</label>
            <div className="mt-1 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="p-1 text-zinc-600 hover:text-white"
                >
                  <Star
                    size={18}
                    fill={star <= userRating ? "currentColor" : "none"}
                    className={star <= userRating ? "text-amber-400" : "text-zinc-700"}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs text-zinc-400">{userRating} / 5 Stars</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-zinc-300">Review *</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you learn? How helpful was this resource for your workflow?"
              className="mt-1 w-full rounded-lg border border-[#1f1f26] bg-[#0f0f13] p-3 text-xs text-white outline-none focus:border-[#7048e8]"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#7048e8] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#7f5af0] hover:shadow-[0_0_15px_rgba(112,72,232,0.4)] disabled:opacity-50"
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
              className="rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400">
                    <User size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{rev.author}</h4>
                    {rev.role && (
                      <p className="text-[11px] text-zinc-500">{rev.role}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-300 font-medium">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-300">{rev.comment}</p>
              <p className="mt-3 text-[10px] text-zinc-500">{rev.date}</p>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-8 text-center text-xs text-zinc-500">
            No community reviews yet. Be the first to leave feedback!
          </div>
        )}
      </div>
    </section>
  );
}
