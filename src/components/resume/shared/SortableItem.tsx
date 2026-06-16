"use client"
import { useSortable } from "@dnd-kit/sortable"
import { DragDots } from "./DragDots"

export function SortableItem({ id, handleColor, children }: {
  id: string; handleColor: string; children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        opacity: isDragging ? 0.4 : 1,
        display: "flex",
        alignItems: "flex-start",
        gap: 4,
      }}
    >
      <div
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        style={{ paddingTop: 4, flexShrink: 0, cursor: "grab", opacity: 0.35 }}
      >
        <DragDots color={handleColor} small />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
