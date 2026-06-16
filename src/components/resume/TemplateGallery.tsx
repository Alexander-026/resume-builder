"use client"

import * as React from "react"
import { useResumeStore } from "@/store/resumeStore"
import type { TemplateId } from "@/types/resume"
import { ChevronUp, ChevronDown } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

function Thumbnail1() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" />
      <rect width="36" height="80" fill="#6f6b6b" />
      <circle cx="18" cy="14" r="8" fill="rgba(255,255,255,0.25)" />
      <rect x="5" y="28" width="22" height="2.5" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="42" y="8" width="52" height="4" rx="1" fill="rgba(0,0,0,0.22)" />
    </svg>
  )
}

function Thumbnail2() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" />
      <rect x="20" y="8" width="80" height="5" rx="1" fill="rgba(0,0,0,0.22)" />
    </svg>
  )
}

function Thumbnail3() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" />
      <rect width="34" height="80" fill="#4b5563" />
    </svg>
  )
}

function Thumbnail4() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" />
      <rect width="40" height="80" fill="#111827" />
      <rect width="40" height="4" fill="#eab308" />
    </svg>
  )
}

function Thumbnail5() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" />
      <rect width="36" height="80" fill="#1e3a5f" />
    </svg>
  )
}

function Thumbnail6() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="120" height="80" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" />
      <rect x="8" y="8" width="60" height="5" rx="1" fill="rgba(0,0,0,0.22)" />
    </svg>
  )
}

const THUMBNAIL_MAP: Record<number, () => React.ReactElement> = {
  1: Thumbnail1,
  2: Thumbnail2,
  3: Thumbnail3,
  4: Thumbnail4,
  5: Thumbnail5,
  6: Thumbnail6,
}

const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: 1, name: "Classic" },
  { id: 2, name: "Watson" },
  { id: 3, name: "Sherlock" },
  { id: 4, name: "Bronson" },
  { id: 5, name: "Max Johnson" },
  { id: 6, name: "Thomas" },
]

export function TemplateGallery() {
  const activeTemplate = useResumeStore((s) => s.activeTemplate)
  const setTemplate = useResumeStore((s) => s.setTemplate)

  const [api, setApi] = React.useState<CarouselApi>(undefined)
  const [current, setCurrent] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (!api) return
    const idx = TEMPLATES.findIndex((t) => t.id === activeTemplate)
    if (idx !== -1 && idx !== api.selectedScrollSnap()) {
      api.scrollTo(idx)
    }
  }, [api, activeTemplate])

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  return (
    <div className="p-3 flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-1">
        Templates
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-7 w-7 rounded-full border bg-background flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
          aria-label="Previous template"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      <Carousel
        orientation="vertical"
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="mt-0" style={{ height: 110 }}>
          {TEMPLATES.map((t, idx) => {
            const active = activeTemplate === t.id
            const ThumbComponent = THUMBNAIL_MAP[t.id]
            return (
              <CarouselItem key={t.id} className="pt-0 basis-full">
                <button
                  onClick={() => {
                    setTemplate(t.id)
                    api?.scrollTo(idx)
                  }}
                  className={cn(
                    "w-full rounded-lg border-2 p-2 text-left transition-all hover:shadow-md",
                    active
                      ? "border-primary shadow-sm bg-primary/5"
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <div className="w-full rounded overflow-hidden mb-1.5" style={{ height: 64 }}>
                    <ThumbComponent />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{t.name}</span>
                    {active && (
                      <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center">
        <button
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-7 w-7 rounded-full border bg-background flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
          aria-label="Next template"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-center gap-1.5">
        {TEMPLATES.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => api?.scrollTo(idx)}
            aria-label={"Go to " + t.name}
            className={cn(
              "rounded-full transition-all",
              idx === current
                ? "w-4 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
          />
        ))}
      </div>
    </div>
  )
}
