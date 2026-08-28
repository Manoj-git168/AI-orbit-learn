"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, PlayCircle, Code, CheckCircle2 } from "lucide-react";
import type { CurriculumModule } from "@/types/resources";

interface CurriculumAccordionProps {
  curriculum: CurriculumModule[];
}

export default function CurriculumAccordion({ curriculum }: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!curriculum || curriculum.length === 0) {
    return (
      <div className="border border-white/[0.08] bg-[#080808] p-8 text-center text-sm text-neutral-500">
        Curriculum details are continuously updated as lessons are released.
      </div>
    );
  }

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getLessonIcon = (type?: string) => {
    switch (type) {
      case "video":
        return <PlayCircle size={14} className="text-neutral-500 shrink-0" />;
      case "project":
        return <Code size={14} className="text-neutral-500 shrink-0" />;
      case "exercise":
        return <CheckCircle2 size={14} className="text-neutral-500 shrink-0" />;
      default:
        return <FileText size={14} className="text-neutral-500 shrink-0" />;
    }
  };

  return (
    <div className="divide-y divide-[#181820] rounded-xl border border-[#1f1f26] bg-[#0c0c10] overflow-hidden">
      {curriculum.map((module, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={module.title} className="transition-colors">
            <button
              onClick={() => toggleModule(idx)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#121217]"
              aria-expanded={isOpen}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7048e8] font-semibold">
                    Module {String(idx + 1).padStart(2, "0")}
                  </span>
                  {module.duration && (
                    <span className="text-xs text-zinc-400">· {module.duration}</span>
                  )}
                </div>
                <h4 className="mt-1 text-sm font-semibold text-white">{module.title}</h4>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <span className="text-xs">{module.lessons.length} lessons</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {isOpen && (
              <div className="divide-y divide-[#15151b] border-t border-[#181820] bg-[#08080b] px-5 py-2">
                {module.lessons.map((lesson, lessonIdx) => (
                  <div
                    key={lesson.title}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 font-mono text-[11px]">
                        {idx + 1}.{lessonIdx + 1}
                      </span>
                      {getLessonIcon(lesson.type)}
                      <span className="text-zinc-200 font-medium">{lesson.title}</span>
                    </div>

                    {lesson.duration && (
                      <span className="text-zinc-400 font-mono">{lesson.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
