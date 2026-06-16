"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value: number
  onValueChange: (value: number) => void
  className?: string
  /** Color of the filled portion of the track */
  fillColor?: string
  /** Color of the thumb */
  thumbColor?: string
}

export function Slider({
  min = 0,
  max = 5,
  step = 1,
  value,
  onValueChange,
  className,
  fillColor = "#f5c518",
  thumbColor = "#f5c518",
}: SliderProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div className={cn("relative flex items-center w-full select-none", className)} style={{ height: 20 }}>
      {/* Track background */}
      <div className="relative w-full rounded-full" style={{ height: 3, backgroundColor: "rgba(255,255,255,0.18)" }}>
        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: fillColor }}
        />
      </div>

      {/* Thumb */}
      <div
        className="absolute rounded-full border-2 border-white shadow pointer-events-none"
        style={{
          width: 12,
          height: 12,
          left: `calc(${pct}% - 6px)`,
          backgroundColor: thumbColor,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      {/* Native range — transparent overlay for interaction */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        style={{ margin: 0, height: "100%" }}
      />
    </div>
  )
}
