"use client"

import { useSortable } from "@dnd-kit/sortable"
import { DragDots } from "./DragDots"
import s from "./SortableSection.module.scss"

export function SortableSection({ id, handleColor = "#999", visible, children }: {
  id: string
  handleColor?: string
  visible: boolean
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        opacity: isDragging ? 0.4 : visible ? 1 : 0.4,
      }}
      className={s.sortable}
    >
      <div className={s.dragHandle} {...attributes} {...listeners} title="Drag to reorder">
        <DragDots color={handleColor} />
      </div>
      {children}
    </div>
  )
}
