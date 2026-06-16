"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { EducationSection as EducationSectionType, EducationItem } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus } from "lucide-react"

interface Props {
  section: EducationSectionType
}

export function EducationSection({ section }: Props) {
  const { addEducationItem, updateEducationItem, removeEducationItem } = useResumeStore()

  const update = (item: EducationItem, field: keyof EducationItem, value: string) => {
    updateEducationItem(section.id, { ...item, [field]: value })
  }

  return (
    <div className="space-y-4">
      {section.items.map((item, idx) => (
        <div key={item.id} className="space-y-3">
          {idx > 0 && <Separator />}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Entry {idx + 1}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeEducationItem(section.id, item.id)}>
              <Trash2 size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Degree / Course</Label>
              <Input value={item.degree} onChange={(e) => update(item, "degree", e.target.value)} placeholder="e.g. Bachelor of Computer Science" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">School / University</Label>
              <Input value={item.school} onChange={(e) => update(item, "school", e.target.value)} placeholder="Institution name" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Location</Label>
              <Input value={item.location} onChange={(e) => update(item, "location", e.target.value)} placeholder="City" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Date</Label>
              <Input value={item.startDate} onChange={(e) => update(item, "startDate", e.target.value)} placeholder="e.g. Sep 2018" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Date</Label>
              <Input value={item.endDate} onChange={(e) => update(item, "endDate", e.target.value)} placeholder="e.g. Jun 2022" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea value={item.description} onChange={(e) => update(item, "description", e.target.value)} rows={3} placeholder="Notable achievements or coursework..." className="resize-none text-sm" />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={() => addEducationItem(section.id)}>
        <Plus size={14} className="mr-1" /> Add Education
      </Button>
    </div>
  )
}
