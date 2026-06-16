"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useResumeStore } from "@/store/resumeStore"
import { SortableSection } from "@/components/dnd/SortableSection"
import { SectionCard } from "@/components/form/SectionCard"

export function SectionList() {
  const sections = useResumeStore((s) => s.sections)
  const reorderSections = useResumeStore((s) => s.reorderSections)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderSections(String(active.id), String(over.id))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 pl-6">
          {sections.map((section) => (
            <SortableSection key={section.id} id={section.id}>
              <SectionCard section={section} />
            </SortableSection>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
