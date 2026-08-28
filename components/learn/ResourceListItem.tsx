"use client";

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
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-4 transition-all duration-300 hover:border-[#2f2f3a] hover:bg-[#121217] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:flex-row sm:items-center">
      {/* Left Info */}
      <Link
        href={`/learn/${resource.slug}`}
        className="flex flex-1 items-start gap-4"
        aria-label={`View ${resource.title}`}
      >
        <div className="w-24 shrink-0 overflow-hidden rounded-lg sm:w-28">
          <ResourceThumbnail resource={resource} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-300">
              {resource.type}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#7048e8] font-semibold">
              {resource.category}
            </span>
            <span className="text-[10px] text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">{resource.level}</span>
          </div>

          <h3 className="mt-1.5 text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-zinc-100">
            {resource.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-400 sm:line-clamp-2">
            {resource.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <span className="text-zinc-400 font-medium">By {resource.provider}</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock3 size={12} className="text-zinc-500" />
              {resource.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} fill="currentColor" className="text-amber-400" />
              <span className="text-white font-semibold">{resource.rating}</span>
              <span className="text-zinc-500">({resource.reviewCount})</span>
            </span>
            <span className={`ml-auto sm:ml-0 rounded-md px-2 py-0.5 text-[11px] font-semibold border ${
              resource.price === "Free"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/[0.04] text-zinc-300"
            }`}>
              {resource.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-[#181820] pt-3 sm:mt-0 sm:border-t-0 sm:pt-0 sm:pl-4">
        <SaveButton
          resourceId={resource.id}
          resourceTitle={resource.title}
          variant="button"
        />

        <Link
          href={`/learn/${resource.slug}`}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-[#1f1f26] bg-[#121217] px-3.5 text-xs font-semibold text-zinc-200 transition-all hover:border-[#2f2f3a] hover:bg-[#181820] hover:text-white"
        >
          <span>Explore</span>
          <ArrowUpRight size={13} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}
