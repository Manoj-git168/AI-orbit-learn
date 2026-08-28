import Link from "next/link";
import { ArrowUpRight, Clock3, Star } from "lucide-react";
import ResourceThumbnail from "@/components/learn/ResourceThumbnail";
import SaveButton from "@/components/learn/SaveButton";
import type { LearningResource } from "@/types/resources";

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#1f1f26] bg-[#0c0c10] p-1.5 transition-all duration-300 hover:border-[#2f2f3a] hover:bg-[#121217] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
      {/* Clickable Card Link */}
      <Link
        href={`/learn/${resource.slug}`}
        className="block flex-1"
        aria-label={`View ${resource.title}`}
      >
        <div className="relative overflow-hidden rounded-lg">
          <ResourceThumbnail resource={resource} />

          {/* Top format badge */}
          <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[9px] font-semibold tracking-[0.14em] text-zinc-200 backdrop-blur-md uppercase">
            {resource.type}
          </span>

          {/* Hover external arrow */}
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-black/80 text-zinc-300 opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:text-white">
            <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* Text Details */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">
            <span className="text-[#7048e8]">{resource.category}</span>
            <span className="text-zinc-400">{resource.level}</span>
          </div>

          <h3 className="mt-2 line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-zinc-100">
            {resource.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {resource.description}
          </p>

          {/* Metadata Row */}
          <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Clock3 size={13} className="text-zinc-500" />
              {resource.duration}
            </span>

            <span className="flex items-center gap-1">
              <Star size={12} fill="currentColor" className="text-amber-400" />
              <span className="text-white font-semibold">{resource.rating}</span>
              <span className="text-zinc-500 font-normal">({resource.reviewCount})</span>
            </span>

            <span className={`ml-auto rounded-md px-2 py-0.5 text-[11px] font-semibold border ${
              resource.price === "Free"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/[0.04] text-zinc-300"
            }`}>
              {resource.price}
            </span>
          </div>

          {/* Provider Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-[#181820] pt-3 text-[11px] text-zinc-400 font-medium">
            <span className="truncate max-w-[180px]">
              {resource.provider}
            </span>
            <span className="text-zinc-500 text-[10px] tracking-wider uppercase">Verified</span>
          </div>
        </div>
      </Link>

      {/* Floating Save Button */}
      <SaveButton
        resourceId={resource.id}
        resourceTitle={resource.title}
      />
    </article>
  );
}
