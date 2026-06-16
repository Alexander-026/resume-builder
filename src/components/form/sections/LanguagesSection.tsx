"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { LanguagesSection as LanguagesSectionType, LanguageItem, SkillLevel } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props {
  section: LanguagesSectionType
}

const levels = ["No knowledge", "Basic", "Conversational", "Intermediate", "Advanced", "Native"]

export function LanguagesSection({ section }: Props) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem } = useResumeStore()

  const update = (item: LanguageItem, field: keyof LanguageItem, value: string | number) => {
    updateLanguageItem(section.id, { ...item, [field]: value })
  }

  return (
    <div className="space-y-2">
      {section.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            value={item.language}
            onChange={(e) => update(item, "language", e.target.value)}
            placeholder="Language"
            className="flex-1"
          />
          <select
            value={item.level}
            onChange={(e) => update(item, "level", Number(e.target.value) as SkillLevel)}
            className="h-9 w-36 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            {levels.map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
          </select>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive shrink-0" onClick={() => removeLanguageItem(section.id, item.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => addLanguageItem(section.id)}>
        <Plus size={14} className="mr-1" /> Add Language
      </Button>
    </div>
  )
}
