"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  ScanSearch, X, RotateCw, CircleCheck, TriangleAlert, CircleX, LoaderCircle,
} from "lucide-react"
import { useResumeStore } from "@/store/resumeStore"
import { getTemplate } from "@/components/pdf/PdfPreview"
import type { AtsReport, AtsCheck as Check, CheckStatus } from "@/lib/ats/analyze"
import type { ResumeData } from "@/types/resume"

// ─── ATS check: renders the real PDF, reads it back like a parser, scores it ─

const STEPS = [
  "Generating PDF",
  "Extracting text like an ATS parser",
  "Checking keywords & sections",
  "Calculating score",
]
const MIN_STEP_MS = 350   // keeps each step readable — the work itself takes < 1s

type State =
  | { phase: "idle" }
  | { phase: "running"; step: number }
  | { phase: "done"; report: AtsReport; ms: number }
  | { phase: "error"; message: string }

const STATUS_STYLE: Record<CheckStatus, { icon: typeof CircleCheck; color: string }> = {
  pass: { icon: CircleCheck,   color: "text-emerald-500" },
  warn: { icon: TriangleAlert, color: "text-amber-500" },
  fail: { icon: CircleX,       color: "text-red-500" },
}

const scoreColor = (score: number) =>
  score >= 90 ? "text-emerald-500" : score >= 75 ? "text-lime-500" : score >= 60 ? "text-amber-500" : "text-red-500"
const barColor = (score: number) =>
  score >= 90 ? "bg-emerald-500" : score >= 75 ? "bg-lime-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function AtsCheckButton() {
  const [open, setOpen]   = useState(false)
  const [state, setState] = useState<State>({ phase: "idle" })
  const runId = useRef(0)

  const run = useCallback(async () => {
    const id = ++runId.current
    const started = performance.now()
    let stepStarted = started
    const step = async (n: number) => {
      await sleep(Math.max(0, MIN_STEP_MS - (performance.now() - stepStarted)))
      stepStarted = performance.now()
      if (runId.current === id) setState({ phase: "running", step: n })
    }

    setState({ phase: "running", step: 0 })
    try {
      const s = useResumeStore.getState()
      const data: ResumeData = {
        personalInfo:   s.personalInfo,
        sections:       s.sections,
        activeTemplate: s.activeTemplate,
        theme:          s.theme,
        coverLetter:    s.coverLetter,
      }
      const [{ pdf }, { extractPdf }, { analyzeAts }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/ats/extract"),
        import("@/lib/ats/analyze"),
      ])

      const blob = await pdf(getTemplate(data)).toBlob()
      await step(1)
      const extracted = await extractPdf(await blob.arrayBuffer())
      await step(2)
      const report = analyzeAts(data, extracted)
      await step(3)
      await sleep(MIN_STEP_MS)
      if (runId.current === id) setState({ phase: "done", report, ms: performance.now() - started })
    } catch (e) {
      console.error(e)
      if (runId.current === id) setState({ phase: "error", message: e instanceof Error ? e.message : String(e) })
    }
  }, [])

  const close = useCallback(() => {
    runId.current++   // drop results of a run still in flight
    setOpen(false)
    setState({ phase: "idle" })
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <>
      <button
        onClick={() => { setOpen(true); run() }}
        title="Check how applicant tracking systems read your PDF"
        className="flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors select-none"
      >
        <ScanSearch size={14} />
        ATS Check
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ats-title"
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-2">
                <ScanSearch size={16} className="text-muted-foreground" />
                <h2 id="ats-title" className="text-sm font-semibold">ATS Compatibility Report</h2>
              </div>
              <button
                onClick={close}
                title="Close"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="overflow-y-auto">
              {state.phase === "running" && <Progress step={state.step} />}
              {state.phase === "error" && <ErrorView message={state.message} onRetry={run} />}
              {state.phase === "done" && <ReportView report={state.report} ms={state.ms} onRetry={run} />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Loading ─────────────────────────────────────────────────────────────────

function Progress({ step }: { step: number }) {
  const pct = Math.round(((step + 0.5) / STEPS.length) * 100)
  return (
    <div className="px-8 py-10">
      <div className="mb-6 flex flex-col items-center gap-3">
        <LoaderCircle size={36} className="animate-spin text-muted-foreground" />
        <p className="text-sm font-medium">Analyzing your resume…</p>
      </div>
      <div className="mx-auto mb-6 h-1.5 max-w-sm overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mx-auto max-w-sm space-y-2">
        {STEPS.map((label, i) => (
          <li key={label} className={`flex items-center gap-2.5 text-sm ${i > step ? "text-muted-foreground/60" : ""}`}>
            {i < step ? (
              <CircleCheck size={15} className="shrink-0 text-emerald-500" />
            ) : i === step ? (
              <LoaderCircle size={15} className="shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <span className="mx-0.75 h-2.25 w-2.25 shrink-0 rounded-full border border-current" />
            )}
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 px-8 py-12 text-center">
      <CircleX size={32} className="text-red-500" />
      <p className="text-sm font-medium">The check could not be completed</p>
      <p className="max-w-md text-xs text-muted-foreground wrap-break-word">{message}</p>
      <RetryButton onClick={onRetry} />
    </div>
  )
}

function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs font-medium hover:bg-muted transition-colors"
    >
      <RotateCw size={13} />
      Run again
    </button>
  )
}

// ─── Report ──────────────────────────────────────────────────────────────────

function useCountUp(target: number, ms = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, ms])
  return value
}

function ScoreRing({ score }: { score: number }) {
  const shown = useCountUp(score)
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60" cy="60" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          className={`${scoreColor(score)} stroke-current`}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold tabular-nums ${scoreColor(score)}`}>{shown}%</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">ATS score</span>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2">
      <div className="text-sm font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  )
}

function ReportView({ report, ms, onRetry }: { report: AtsReport; ms: number; onRetry: () => void }) {
  const { score, verdict, categories, checks, stats } = report
  const passed = checks.filter((c) => c.status === "pass").length
  const issues = checks.filter((c) => c.status !== "pass").length

  return (
    <div className="space-y-6 px-5 py-5">
      {/* Score + verdict */}
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <ScoreRing score={score} />
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <p className={`text-lg font-semibold ${scoreColor(score)}`}>{verdict}</p>
            <p className="text-xs text-muted-foreground">
              Based on the text an ATS parser extracts from your generated PDF.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Checks passed" value={`${passed}/${checks.length}`} />
            <Stat label="Keywords parsed" value={`${stats.keywordsFound}/${stats.keywordsTotal}`} />
            <Stat label="Issues" value={String(issues)} />
            <Stat label="Pages" value={String(stats.pages)} />
            <Stat label="Words" value={stats.words.toLocaleString("en-US")} />
            <Stat label="File size" value={`${stats.sizeKb} KB`} />
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <section className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breakdown</h3>
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0">{c.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${barColor(c.score)} transition-[width] duration-700`} style={{ width: `${c.score}%` }} />
            </div>
            <span className="w-10 shrink-0 text-right tabular-nums text-muted-foreground">{c.score}%</span>
            <span className="hidden w-16 shrink-0 text-right text-[11px] text-muted-foreground sm:inline">weight {c.weight}%</span>
          </div>
        ))}
      </section>

      {/* Checks per category, issues first */}
      {categories.map((cat) => {
        const own = checks
          .filter((c) => c.category === cat.id)
          .sort((a, b) => a.score - b.score)
        return (
          <section key={cat.id} className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.label}</h3>
            <ul className="divide-y rounded-lg border">
              {own.map((c) => <CheckRow key={c.id} check={c} />)}
            </ul>
          </section>
        )
      })}

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-[11px] text-muted-foreground">Checked in {(ms / 1000).toFixed(1)}s · runs locally, nothing is uploaded</span>
        <RetryButton onClick={onRetry} />
      </div>
    </div>
  )
}

function CheckRow({ check }: { check: Check }) {
  const { icon: Icon, color } = STATUS_STYLE[check.status]
  const shown = check.missing?.slice(0, 8) ?? []
  const more  = (check.missing?.length ?? 0) - shown.length
  return (
    <li className="flex gap-2.5 px-3 py-2.5">
      <Icon size={16} className={`mt-0.5 shrink-0 ${color}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium">{check.label}</span>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{Math.round(check.score * 100)}%</span>
        </div>
        <p className="text-xs text-muted-foreground wrap-break-word">{check.detail}</p>
        {shown.length > 0 && check.status !== "pass" && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {shown.map((m) => (
              <span key={m} className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground break-all">{m}</span>
            ))}
            {more > 0 && <span className="px-1 py-0.5 text-[11px] text-muted-foreground">+{more} more</span>}
          </div>
        )}
      </div>
    </li>
  )
}
