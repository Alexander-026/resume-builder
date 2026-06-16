"use client"

export function DragDots({ color = "currentColor", small }: { color?: string; small?: boolean }) {
  const dot = small ? 3 : 4
  const gap = small ? 2 : 3
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(2, ${dot}px)`, gap, cursor: "grab" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: color }} />
      ))}
    </div>
  )
}
