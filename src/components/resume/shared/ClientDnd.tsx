"use client"
import { useState, useEffect } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

export function ClientDnd({ children, onDragEnd, modifiers = [restrictToVerticalAxis] }: {
  children: React.ReactNode
  onDragEnd: (e: import("@dnd-kit/core").DragEndEvent) => void
  modifiers?: import("@dnd-kit/core").Modifier[]
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const sensors = useSensors(useSensor(PointerSensor))
  if (!mounted) return <>{children}</>
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}
      modifiers={modifiers} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  )
}
