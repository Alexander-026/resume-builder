"use client"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}
      className="h-5 w-5 opacity-30 hover:opacity-100 hover:text-red-500! shrink-0"
      style={{ color: "inherit" }}>
      <Trash2 size={10} />
    </Button>
  )
}
