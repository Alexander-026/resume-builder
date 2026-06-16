"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AddBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}
      className="h-6 px-1.5 gap-1 text-[10px] opacity-60 hover:opacity-100 hover:text-white!"
      style={{ color: "inherit" }}>
      <Plus size={10} />{children}
    </Button>
  )
}
