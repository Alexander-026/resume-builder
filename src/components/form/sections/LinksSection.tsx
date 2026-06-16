"use client"

import { useResumeStore } from "@/store/resumeStore"
import type { LinksSection as LinksSectionType, LinkItem } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props {
  section: LinksSectionType
}

export function LinksSection({ section }: Props) {
  const { addLinkItem, updateLinkItem, removeLinkItem } = useResumeStore()

  const update = (item: LinkItem, field: keyof LinkItem, value: string) => {
    updateLinkItem(section.id, { ...item, [field]: value })
  }

  return (
    <div className="space-y-2">
      {section.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            value={item.label}
            onChange={(e) => update(item, "label", e.target.value)}
            placeholder="Label (e.g. LinkedIn)"
            className="w-32 shrink-0"
          />
          <Input
            value={item.url}
            onChange={(e) => update(item, "url", e.target.value)}
            placeholder="https://..."
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive shrink-0" onClick={() => removeLinkItem(section.id, item.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => addLinkItem(section.id)}>
        <Plus size={14} className="mr-1" /> Add Link
      </Button>
    </div>
  )
}
