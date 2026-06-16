"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { ExperienceSection as ExperienceSectionType, ExperienceItem } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus } from "lucide-react"

interface Props {
  section: ExperienceSectionType
}

export function ExperienceSection({ section }: Props) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem } = useResumeStore()

  const update = (item: ExperienceItem, field: keyof ExperienceItem, value: string | boolean) => {
    updateExperienceItem(section.id, { ...item, [field]: value })
  }

  return (
    <div className="space-y-4">
      {section.items.map((item, idx) => (
        <div key={item.id} className="space-y-3">
          {idx > 0 && <Separator />}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Entry {idx + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => removeExperienceItem(section.id, item.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Position</Label>
              <Input value={item.position} onChange={(e) => update(item, "position", e.target.value)} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Company</Label>
              <Input value={item.company} onChange={(e) => update(item, "company", e.target.value)} placeholder="Company name" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Location</Label>
              <Input value={item.location} onChange={(e) => update(item, "location", e.target.value)} placeholder="City or Remote" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Date</Label>
              <Input value={item.startDate} onChange={(e) => update(item, "startDate", e.target.value)} placeholder="e.g. Jan 2022" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Date</Label>
              <Input value={item.endDate} onChange={(e) => update(item, "endDate", e.target.value)} placeholder="e.g. Mar 2024" disabled={item.current} />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id={`current-${item.id}`}
                checked={item.current}
                onChange={(e) => update(item, "current", e.target.checked)}
                className="h-4 w-4 rounded border"
              />
              <Label htmlFor={`current-${item.id}`} className="text-xs cursor-pointer">Current</Label>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              value={item.description}
              onChange={(e) => update(item, "description", e.target.value)}
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              className="resize-none text-sm"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={() => addExperienceItem(section.id)}>
        <Plus size={14} className="mr-1" /> Add Experience
      </Button>
    </div>
  )
}
