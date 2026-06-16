"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { AboutSection as AboutSectionType } from "@/types/resume"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  section: AboutSectionType
}

export function AboutSection({ section }: Props) {
  const updateSection = useResumeStore((s) => s.updateSection)

  return (
    <div className="space-y-2">
      <Label>About Me</Label>
      <Textarea
        value={section.content}
        onChange={(e) =>
          updateSection(section.id, { content: e.target.value } as Partial<AboutSectionType>)
        }
        rows={5}
        placeholder="Write a short professional summary..."
        className="resize-none"
      />
    </div>
  )
}
