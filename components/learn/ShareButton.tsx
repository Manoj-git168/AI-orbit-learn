"use client";

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
      className="inline-flex items-center gap-2 rounded-lg border border-[#1f1f26] bg-[#121217] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-[#2f2f3a] hover:bg-[#181820] hover:text-white"
      aria-label="Share resource"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-400" />
          <span className="text-emerald-400">Link Copied</span>
        </>
      ) : (
        <>
          <Share2 size={14} className="text-zinc-400" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
