import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Eye,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
  Workflow,
  Compass,
} from "lucide-react";

import type { LearningResource } from "@/types/resources";

interface ResourceThumbnailProps {
  resource: LearningResource;
  large?: boolean;
}

const iconMap: Record<string, any> = {
  "Prompt Engineering": Sparkles,
  "AI Agents": Bot,
  "Generative AI": BrainCircuit,
  LLMs: Network,
  "Computer Vision": Eye,
  Automation: Workflow,
  "AI Coding": Code2,
  "Machine Learning": Cpu,
  "AI Engineering": Database,
  "AI Strategy": Compass,
};

export default function ResourceThumbnail({
  resource,
  large = false,
}: ResourceThumbnailProps) {
  const Icon = iconMap[resource.category] || Layers3;

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden border border-white/[0.08] bg-[#090909] transition-colors group-hover:border-white/[0.16] ${
        large ? "aspect-[16/8]" : "aspect-[16/9]"
      }`}
    >
      {/* Background Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: large ? "48px 48px" : "36px 36px",
        }}
      />

      {/* Central Visual Orb */}
      <div className="relative flex flex-col items-center">
        <div
          className={`flex items-center justify-center rounded-full border border-white/[0.12] bg-[#0c0c0c] shadow-inner transition-transform duration-300 group-hover:scale-105 ${
            large ? "h-24 w-24" : "h-16 w-16"
          }`}
        >
          <Icon
            size={large ? 36 : 24}
            strokeWidth={1.2}
            className="text-neutral-400 group-hover:text-white transition-colors"
          />
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span className="h-1 w-8 bg-neutral-800" />
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
        </div>

        <span className="mt-3 text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-600">
          {resource.category}
        </span>
      </div>

      {/* Technical Corner Annotations */}
      <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.18em] text-neutral-700">
        AI / {String(resource.id).padStart(2, "0")}
      </span>

      <span className="absolute bottom-4 right-4 text-[9px] font-medium tracking-[0.18em] text-neutral-700 uppercase">
        {resource.type}
      </span>
    </div>
  );
}
