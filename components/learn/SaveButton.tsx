"use client";

import { Bookmark } from "lucide-react";
import { useSavedResources } from "@/components/learn/SavedResourcesProvider";

interface SaveButtonProps {
  resourceId: string;
  resourceTitle: string;
  variant?: "icon" | "button";
}

export default function SaveButton({
  resourceId,
  resourceTitle,
  variant = "icon",
}: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedResources();
  const saved = isSaved(resourceId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(resourceId);
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? `Remove ${resourceTitle} from saved` : `Save ${resourceTitle}`}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition-all ${
          saved
            ? "border-[#7048e8] bg-[#7048e8]/15 text-white shadow-[0_0_12px_rgba(112,72,232,0.25)]"
            : "border-[#1f1f26] bg-[#121217] text-zinc-300 hover:border-[#2f2f3a] hover:bg-[#181820] hover:text-white"
        }`}
      >
        <Bookmark
          size={14}
          fill={saved ? "currentColor" : "none"}
          className={saved ? "text-amber-400" : "text-zinc-400"}
          strokeWidth={1.8}
        />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? `Remove ${resourceTitle} from saved` : `Save ${resourceTitle}`}
      title={saved ? "Remove from saved" : "Save to library"}
      className={`absolute bottom-[68px] right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border bg-[#0a0a0e]/90 backdrop-blur-md transition-all duration-200 ${
        saved
          ? "border-[#7048e8] text-amber-400 opacity-100 shadow-[0_0_10px_rgba(112,72,232,0.3)]"
          : "border-[#1f1f26] text-zinc-400 opacity-0 hover:border-zinc-500 hover:text-white group-hover:opacity-100"
      }`}
    >
      <Bookmark
        size={14}
        fill={saved ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
    </button>
  );
}
