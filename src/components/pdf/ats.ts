import { Font } from "@react-pdf/renderer"
import type { DocumentProps } from "@react-pdf/renderer"
import type { LanguageItem, PersonalInfo, ResumeSection } from "@/types/resume"
import { LANGUAGE_LEVEL_LABELS } from "@/types/resume"

// ─── ATS helpers shared by all PDF templates ─────────────────────────────────
// ATS parsers read a hyphenated line break ("applica-" / "tions") as two
// tokens, so keywords stop matching. Never split words — wrap them whole.
Font.registerHyphenationCallback((word) => [word])

// Built-in Helvetica only covers Windows-1252: Cyrillic, Polish etc. come out
// blank and unreadable for ATS. Arimo is metric-compatible with Helvetica, so
// layouts stay the same. Families mirror the Helvetica / -Bold / -Oblique names.
// react-pdf fetches only absolute URLs (a bare path is read from disk).
const fontUrl = (file: string) =>
  `${typeof window === "undefined" ? "" : window.location.origin}/fonts/${file}`

Font.register({ family: "Arimo",         src: fontUrl("Arimo-Regular.ttf") })
Font.register({ family: "Arimo-Bold",    src: fontUrl("Arimo-Bold.ttf") })
Font.register({ family: "Arimo-Oblique", src: fontUrl("Arimo-Italic.ttf") })

// Title/Author/Keywords are indexed by some ATS and used as the file title.
export function documentMeta(p: PersonalInfo, sections: ResumeSection[]): DocumentProps {
  const name   = [p.firstName, p.lastName].filter(Boolean).join(" ")
  const skills = sections.flatMap((s) => s.visible && s.type === "skills" ? s.items.map((i) => i.name) : [])
  return {
    title:    [name, p.jobTitle].filter(Boolean).join(" – ") || "Resume",
    author:   name || undefined,
    subject:  p.jobTitle ? `Resume – ${p.jobTitle}` : "Resume",
    keywords: skills.filter(Boolean).join(", ") || undefined,
    creator:  "Resume Builder",
    producer: "Resume Builder",
  }
}

// Visible URL text — ATS extract profile links from text, not from link labels.
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
export const toHref     = (url: string) => (/^[a-z]+:/i.test(url) ? url : `https://${url}`)

// Level dots/bars are invisible to ATS — spell the level out: "German (Intermediate)".
export const languageLabel = (item: LanguageItem, showLevel: boolean) =>
  showLevel && item.level > 0 ? `${item.language} (${LANGUAGE_LEVEL_LABELS[item.level]})` : item.language
