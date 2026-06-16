"use client"

import { useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Shared base ──────────────────────────────────────────────────────────────
const base =
  "h-auto min-h-0 rounded-sm border-0 border-b shadow-none transition-all focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-px"

// Light variant (right col — white bg): always dark text regardless of parent
const light =
  "bg-black/[0.04] border-black/25 hover:bg-black/[0.07] hover:border-black/45 focus-visible:bg-black/[0.06] focus-visible:border-black/65 text-gray-900! placeholder:text-gray-400! placeholder:opacity-100"

// Dark variant (left col — dark bg): always white text regardless of parent
const dark =
  "bg-white/[0.08] border-white/20 hover:bg-white/[0.13] hover:border-white/40 focus-visible:border-white/70 text-white! placeholder:text-white/40! placeholder:opacity-100"

// ─── ResumeInput ─────────────────────────────────────────────────────────────
interface ResumeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "dark" | "light"
}

export function ResumeInput({ variant = "light", className, ...props }: ResumeInputProps) {
  return (
    <Input
      {...props}
      className={cn(base, variant === "dark" ? dark : light, className)}
    />
  )
}

// ─── ResumeTextarea (auto-resize) ────────────────────────────────────────────
interface ResumeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "dark" | "light"
}

export function ResumeTextarea({ variant = "light", className, value, onChange, ...props }: ResumeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }, [])

  useEffect(resize, [value, resize])

  return (
    <Textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => {
        onChange?.(e)
        resize()
      }}
      className={cn(
        base,
        "resize-none overflow-hidden",
        variant === "dark" ? dark : light,
        className,
      )}
      {...props}
    />
  )
}
