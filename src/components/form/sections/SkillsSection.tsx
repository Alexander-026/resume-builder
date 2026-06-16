"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { SkillsSection as SkillsSectionType, SkillItem, SkillLevel } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props {
  section: SkillsSectionType
}

const levels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficient", "Expert"]

export function SkillsSection({ section }: Props) {
  const { addSkillItem, updateSkillItem, removeSkillItem } = useResumeStore()

  const update = (item: SkillItem, field: keyof SkillItem, value: string | number) => {
    updateSkillItem(section.id, { ...item, [field]: value })
  }

  return (
    <div className="space-y-2">
      {section.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            value={item.name}
            onChange={(e) => update(item, "name", e.target.value)}
            placeholder="Skill name"
            className="flex-1"
          />
          <select
            value={item.level}
            onChange={(e) => update(item, "level", Number(e.target.value) as SkillLevel)}
            className="h-9 w-32 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            {levels.map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
          </select>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive shrink-0" onClick={() => removeSkillItem(section.id, item.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => addSkillItem(section.id)}>
        <Plus size={14} className="mr-1" /> Add Skill
      </Button>
    </div>
  )
}
