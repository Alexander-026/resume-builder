"use client"

import { nanoid } from "nanoid"
import { Plus, X } from "lucide-react"
import { useResumeStore } from "@/store/resumeStore"
import type { SectionType, ResumeSection } from "@/types/resume"

const SECTION_DEFS: {
  type: SectionType
  label: string
  emoji: string
  make: () => ResumeSection
}[] = [
  {
    type: "about",
    label: "Summary",
    emoji: "📝",
    make: () => ({ id: nanoid(), type: "about", label: "About Me", visible: true, content: "" }),
  },
  {
    type: "experience",
    label: "Experience",
    emoji: "💼",
    make: () => ({
      id: nanoid(), type: "experience", label: "Employment History", visible: true,
      items: [{ id: nanoid(), position: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }],
    }),
  },
  {
    type: "education",
    label: "Education",
    emoji: "🎓",
    make: () => ({
      id: nanoid(), type: "education", label: "Education", visible: true,
      items: [{ id: nanoid(), degree: "", school: "", location: "", startDate: "", endDate: "", description: "" }],
    }),
  },
  {
    type: "skills",
    label: "Skills",
    emoji: "⚡",
    make: () => ({
      id: nanoid(), type: "skills", label: "Skills", visible: true, showLevel: false,
      items: [{ id: nanoid(), name: "", level: 3 }],
    }),
  },
  {
    type: "languages",
    label: "Languages",
    emoji: "🌐",
    make: () => ({
      id: nanoid(), type: "languages", label: "Languages", visible: true, showLevel: true,
      items: [{ id: nanoid(), language: "", level: 3 }],
    }),
  },
  {
    type: "links",
    label: "Links",
    emoji: "🔗",
    make: () => ({
      id: nanoid(), type: "links", label: "Links", visible: true,
      items: [{ id: nanoid(), label: "", url: "" }],
    }),
  },
]

export function SectionManager() {
  const sections      = useResumeStore((s) => s.sections)
  const addSection    = useResumeStore((s) => s.addSection)
  const removeSection = useResumeStore((s) => s.removeSection)

  // Types that are already present — these can't be added again
  const existingTypes = new Set(sections.map((s) => s.type))
  const available = SECTION_DEFS.filter((d) => !existingTypes.has(d.type))

  return (
    <div className="p-3 border-t">

      {/* Current sections */}
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1 mb-2">
        Sections
      </p>
      <div className="space-y-1 mb-4">
        {sections.map((sec) => {
          const def = SECTION_DEFS.find((d) => d.type === sec.type)
          return (
            <div
              key={sec.id}
              className="flex items-center justify-between px-2 py-1 rounded-md bg-muted/40 text-xs group/item"
            >
              <span className="flex items-center gap-1.5 text-foreground/80 min-w-0">
                <span className="shrink-0">{def?.emoji ?? "📄"}</span>
                <span className="truncate">{sec.label}</span>
              </span>
              <button
                onClick={() => removeSection(sec.id)}
                title="Remove section"
                className="opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0 ml-1"
              >
                <X size={11} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Add missing sections */}
      {available.length > 0 && (
        <>
          <p className="text-[9px] uppercase tracking-wide text-muted-foreground px-1 mb-1.5">
            Add section
          </p>
          <div className="flex flex-col gap-0.5">
            {available.map((def) => (
              <button
                key={def.type}
                onClick={() => addSection(def.make() as ResumeSection)}
                className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded-md text-xs text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Plus size={10} className="shrink-0" />
                <span>{def.emoji} {def.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {available.length === 0 && (
        <p className="text-[10px] text-muted-foreground/60 px-1 italic">
          All sections added
        </p>
      )}
    </div>
  )
}
