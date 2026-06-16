"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { PdfPreview } from "@/components/pdf/PdfPreview"
import { HtmlTemplate1 } from "@/components/resume/templates/Template1/HtmlTemplate1"
import { HtmlTemplate2 } from "@/components/resume/templates/Template2/HtmlTemplate2"
import { HtmlTemplate3 } from "@/components/resume/templates/Template3/HtmlTemplate3"
import { HtmlTemplate4 } from "@/components/resume/templates/Template4/HtmlTemplate4"
import { HtmlTemplate5 } from "@/components/resume/templates/Template5/HtmlTemplate5"
import { HtmlTemplate6 } from "@/components/resume/templates/Template6/HtmlTemplate6"
import { TemplateGallery } from "@/components/resume/TemplateGallery"
import { SectionManager } from "@/components/resume/SectionManager"
import {
  Pencil, Eye, FileText, LayoutTemplate,
  Moon, Sun, ChevronRight, ChevronLeft,
} from "lucide-react"

type MainTab = "html" | "pdf"
type Mode    = "edit" | "view"

const SIDEBAR_MIN = 160
const SIDEBAR_MAX = 340
const SIDEBAR_DEFAULT = 192

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")) }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try { localStorage.setItem("theme", next ? "dark" : "light") } catch {}
  }
  return (
    <button
      onClick={toggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-8 h-8 rounded-md border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}

function TabBtn({ active, onClick, icon, children }: {
  active: boolean; onClick: () => void
  icon: React.ReactNode; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors select-none",
        active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      {icon}{children}
    </button>
  )
}

function renderTemplate(activeTemplate: number, mode: "edit" | "view") {
  switch (activeTemplate) {
    case 2: return <HtmlTemplate2 mode={mode} />
    case 3: return <HtmlTemplate3 mode={mode} />
    case 4: return <HtmlTemplate4 mode={mode} />
    case 5: return <HtmlTemplate5 mode={mode} />
    case 6: return <HtmlTemplate6 mode={mode} />
    default: return <HtmlTemplate1 mode={mode} />
  }
}

export default function HomePage() {
  const activeTemplate = useResumeStore((s) => s.activeTemplate)
  const [tab,  setTab]  = useState<MainTab>("html")
  const [mode, setMode] = useState<Mode>("edit")

  const [sidebarOpen, setSidebarOpen]   = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const widthRef  = useRef(SIDEBAR_DEFAULT)
  const resizing  = useRef(false)
  const startX    = useRef(0)
  const startW    = useRef(SIDEBAR_DEFAULT)

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    resizing.current = true
    startX.current   = e.clientX
    startW.current   = widthRef.current

    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return
      const delta  = startX.current - ev.clientX
      const newW   = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startW.current + delta))
      widthRef.current = newW
      setSidebarWidth(newW)
    }
    const onUp = () => {
      resizing.current = false
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup",   onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup",   onUp)
  }, [])

  useEffect(() => { widthRef.current = sidebarWidth }, [sidebarWidth])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex items-center justify-between px-5 py-2.5 border-b bg-card shadow-sm shrink-0 gap-4">
        <span className="font-semibold text-base tracking-tight whitespace-nowrap select-none text-foreground">
          Resume Builder
        </span>
        <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-muted/40">
          <TabBtn active={tab === "html"} onClick={() => setTab("html")} icon={<LayoutTemplate size={13} />}>
            HTML Resume
          </TabBtn>
          <TabBtn active={tab === "pdf"} onClick={() => setTab("pdf")} icon={<FileText size={13} />}>
            PDF Preview
          </TabBtn>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 border rounded-lg p-0.5 transition-opacity ${tab === "pdf" ? "opacity-30 pointer-events-none" : ""}`}>
            <TabBtn active={mode === "edit"} onClick={() => setMode("edit")} icon={<Pencil size={13} />}>
              Edit
            </TabBtn>
            <TabBtn active={mode === "view"} onClick={() => setMode("view")} icon={<Eye size={13} />}>
              View
            </TabBtn>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto bg-muted/25 flex justify-center py-8 px-6">
          {tab === "html" ? (
            renderTemplate(activeTemplate, mode)
          ) : (
            <div className="w-full h-full">
              <PdfPreview />
            </div>
          )}
        </main>
        <div className="relative shrink-0 flex">
          {sidebarOpen && (
            <div
              onMouseDown={onResizeStart}
              className="w-1 shrink-0 cursor-col-resize hover:bg-primary/30 active:bg-primary/50 transition-colors"
              title="Drag to resize"
            />
          )}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-5 h-8 bg-card border border-r-0 rounded-l-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
          >
            {sidebarOpen ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
          </button>
          <aside
            style={{ width: sidebarOpen ? sidebarWidth : 0 }}
            className="overflow-hidden border-l bg-card transition-[width] duration-200"
          >
            <div style={{ width: sidebarWidth }} className="h-full overflow-y-auto">
              <TemplateGallery />
              <SectionManager />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
