import type { ResumeData, ResumeSection } from "@/types/resume"
import { displayUrl } from "@/components/pdf/ats"
import type { ExtractedPdf } from "@/lib/ats/extract"

// ─── ATS score: what a parser can read back from the generated PDF ───────────

export type CheckStatus = "pass" | "warn" | "fail"
export type CategoryId  = "parsing" | "contact" | "sections" | "content" | "document"

export interface AtsCheck {
  id: string
  category: CategoryId
  label: string
  status: CheckStatus
  score: number          // 0..1
  detail: string
  missing?: string[]
}

export interface AtsCategory {
  id: CategoryId
  label: string
  weight: number
  score: number          // 0..100
}

export interface AtsReport {
  score: number          // 0..100
  verdict: string
  categories: AtsCategory[]
  checks: AtsCheck[]
  stats: {
    pages: number
    words: number
    keywordsFound: number
    keywordsTotal: number
    sizeKb: number
  }
}

const CATEGORIES: Omit<AtsCategory, "score">[] = [
  { id: "parsing",  label: "Parsing",       weight: 40 },
  { id: "contact",  label: "Contact info",  weight: 15 },
  { id: "sections", label: "Sections",      weight: 15 },
  { id: "content",  label: "Content",       weight: 20 },
  { id: "document", label: "Document",      weight: 10 },
]

// Heading names ATS map to resume fields (EN / DE / RU).
const STANDARD_HEADINGS: Record<string, string[]> = {
  about:      ["about", "about me", "summary", "professional summary", "profile", "career summary", "objective", "profil", "über mich", "zusammenfassung", "о себе", "обо мне", "профиль"],
  experience: ["experience", "work experience", "professional experience", "employment", "employment history", "work history", "career history", "berufserfahrung", "erfahrung", "опыт работы", "опыт"],
  education:  ["education", "education and training", "academic background", "qualifications", "ausbildung", "bildung", "образование"],
  skills:     ["skills", "technical skills", "key skills", "core competencies", "competencies", "expertise", "kenntnisse", "fähigkeiten", "навыки"],
  languages:  ["languages", "language skills", "sprachen", "sprachkenntnisse", "языки"],
  links:      ["links", "profiles", "online profiles", "portfolio", "websites", "social", "ссылки"],
}

const MONTH_DATE = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.? \d{4}$/i
const NUM_DATE   = /^(\d{1,2}[./-])?\d{4}$/

const norm = (s: string) =>
  s.toLowerCase().replace(/\u00ad/g, "").replace(/[\u2010-\u2015]/g, "-").replace(/\s+/g, " ").trim()
const squash = (s: string) => norm(s).replace(/ /g, "")
const digits = (s: string) => s.replace(/\D/g, "")

function statusOf(score: number): CheckStatus {
  return score >= 0.999 ? "pass" : score >= 0.5 ? "warn" : "fail"
}

function check(category: CategoryId, id: string, label: string, score: number, detail: string, missing?: string[]): AtsCheck {
  return { id, category, label, score, status: statusOf(score), detail, missing: missing?.length ? missing : undefined }
}

function hasContent(s: ResumeSection) {
  if (!s.visible) return false
  return s.type === "about" ? !!s.content.trim() : s.items.length > 0
}

export function analyzeAts(data: ResumeData, pdf: ExtractedPdf): AtsReport {
  const { personalInfo: p, sections } = data
  const text      = pdf.text
  const textNorm  = norm(text)
  const textFlat  = squash(text)
  const found     = (s: string) => textNorm.includes(norm(s)) || textFlat.includes(squash(s))
  const visible   = sections.filter(hasContent)
  const byType    = <T extends ResumeSection["type"]>(t: T) =>
    visible.filter((s): s is Extract<ResumeSection, { type: T }> => s.type === t)

  const experience = byType("experience").flatMap((s) => s.items)
  const education  = byType("education").flatMap((s) => s.items)
  const skills     = byType("skills").flatMap((s) => s.items).filter((i) => i.name.trim())
  const languages  = byType("languages").flatMap((s) => s.items).filter((i) => i.language.trim())
  const links      = byType("links").flatMap((s) => s.items).filter((i) => i.url.trim())
  const about      = byType("about")[0]
  const fullName   = [p.firstName, p.lastName].filter(Boolean).join(" ")
  const checks: AtsCheck[] = []

  // ── Parsing ────────────────────────────────────────────────────────────────
  const chars = text.replace(/\s/g, "").length
  checks.push(check("parsing", "text-layer", "Selectable text layer",
    chars > 200 ? 1 : 0,
    chars > 200 ? `${chars.toLocaleString("en-US")} characters extracted` : "Almost no text could be extracted — ATS will see an empty resume"))

  const keywords = [
    p.firstName, p.lastName, p.jobTitle,
    ...visible.map((s) => s.label),
    ...experience.flatMap((e) => [e.position, e.company, e.startDate, e.current ? "Present" : e.endDate]),
    ...education.flatMap((e) => [e.degree, e.school, e.startDate, e.endDate]),
    ...skills.map((s) => s.name),
    ...languages.map((l) => l.language),
    ...links.map((l) => displayUrl(l.url)),
  ].map((k) => k?.trim()).filter((k): k is string => !!k)
  const uniqueKeywords = [...new Set(keywords)]
  const missingKeywords = uniqueKeywords.filter((k) => !found(k))
  const kwFound = uniqueKeywords.length - missingKeywords.length
  checks.push(check("parsing", "keywords", "Keywords readable",
    uniqueKeywords.length ? kwFound / uniqueKeywords.length : 0,
    `${kwFound} of ${uniqueKeywords.length} titles, companies, dates, skills and headings parsed`,
    missingKeywords))

  // Long words from free text. Found only once hyphens/spaces are dropped → split
  // by hyphenation or letter-spacing; not found at all → the template doesn't
  // print that field or the font can't render it.
  const prose = [about?.content ?? "", ...experience.map((e) => e.description), ...education.map((e) => e.description)].join(" ")
  const longWords = [...new Set(prose.match(/\p{L}{8,}/gu) ?? [])]
  const unhyphenated = textFlat.replace(/-/g, "")
  const notFound     = longWords.filter((w) => !found(w))
  const brokenWords  = notFound.filter((w) => unhyphenated.includes(w.toLowerCase()))
  const absentWords  = notFound.filter((w) => !brokenWords.includes(w))
  checks.push(check("parsing", "words-intact", "Words intact (no hyphenation splits)",
    longWords.length ? 1 - brokenWords.length / longWords.length : 1,
    brokenWords.length ? `${brokenWords.length} words are split across lines` : `All ${longWords.length} long words read as whole tokens`,
    brokenWords.slice(0, 12)))
  checks.push(check("parsing", "coverage", "All content included",
    longWords.length ? 1 - absentWords.length / longWords.length : 1,
    absentWords.length
      ? `${absentWords.length} words from your text are not in the PDF — this template hides that field or the font can't render it`
      : "Everything you wrote is in the PDF",
    absentWords.slice(0, 12)))

  const junk = text.match(/[\uFFFD\uE000-\uF8FF\u0000-\u0008\u000B\u000E-\u001F]/g) ?? []
  checks.push(check("parsing", "encoding", "Clean character encoding",
    junk.length === 0 ? 1 : junk.length < 5 ? 0.5 : 0,
    junk.length ? `${junk.length} unreadable characters (missing glyphs or broken font mapping)` : "Every character maps to Unicode"))

  const spaced = text.match(/(?:\b\p{L} {1,3}){3,}\p{L}\b/gu) ?? []
  checks.push(check("parsing", "letter-spacing", "No letter-spaced text",
    spaced.length === 0 ? 1 : 0,
    spaced.length ? `Read as separate letters: ${spaced.slice(0, 3).map((s) => `"${s}"`).join(", ")}` : "Headings read as whole words",
    spaced))

  const topLines = text.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 4).join(" ")
  const nameOnTop = fullName && (norm(topLines).includes(norm(fullName)) || norm(topLines).includes(norm(p.lastName)))
  const datedItems = experience.filter((e) => e.position && e.startDate)
  // A title can repeat (e.g. the headline) — any occurrence with its date nearby counts.
  const datesNearTitle = datedItems.filter((e) => {
    const title = norm(e.position)
    for (let i = textNorm.indexOf(title); i >= 0; i = textNorm.indexOf(title, i + 1)) {
      const nearby = textNorm.slice(Math.max(0, i - 120), i + title.length + (e.company?.length ?? 0) + 120)
      if (nearby.includes(norm(e.startDate))) return true
    }
    return false
  })
  const orderScore = ((nameOnTop ? 1 : 0) + (datedItems.length ? datesNearTitle.length / datedItems.length : 1)) / 2
  checks.push(check("parsing", "reading-order", "Logical reading order",
    orderScore,
    [
      nameOnTop ? "Name is read first" : "Name is not at the top of the text",
      datedItems.length ? `dates stay with ${datesNearTitle.length}/${datedItems.length} job titles` : "",
    ].filter(Boolean).join("; ")))

  // ── Contact ────────────────────────────────────────────────────────────────
  checks.push(check("contact", "name", "Full name",
    fullName && found(fullName) ? 1 : fullName ? 0.5 : 0,
    !fullName ? "Add your name" : found(fullName) ? fullName : "Name is split or reordered in the text"))

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)
  checks.push(check("contact", "email", "Email address",
    emailOk && found(p.email) ? 1 : 0,
    !p.email ? "Add an email address" : !emailOk ? "Email address looks invalid" : found(p.email) ? p.email : "Email is not readable in the PDF"))

  const phoneDigits = digits(p.phone)
  const phoneFound = phoneDigits.length >= 7 && digits(text).includes(phoneDigits)
  checks.push(check("contact", "phone", "Phone number",
    phoneFound ? 1 : 0,
    !p.phone ? "Add a phone number" : phoneFound ? p.phone : "Phone number is not readable in the PDF"))

  const location = [p.city, p.country].filter(Boolean).join(", ")
  checks.push(check("contact", "location", "Location",
    location ? (found(p.city || p.country) ? 1 : 0.5) : 0.5,
    location ? location : "Add city and country — many ATS filter candidates by location"))

  const linkedin = [...links.map((l) => l.url), p.website].find((u) => /linkedin\.com/i.test(u ?? ""))
  checks.push(check("contact", "linkedin", "LinkedIn profile",
    linkedin ? (found(displayUrl(linkedin)) ? 1 : 0.5) : 0.5,
    linkedin ? displayUrl(linkedin) : "Add your LinkedIn URL to Links"))

  // ── Sections ───────────────────────────────────────────────────────────────
  checks.push(check("sections", "experience", "Work experience",
    experience.length ? 1 : 0,
    experience.length ? `${experience.length} positions` : "Add a work experience section"))

  checks.push(check("sections", "education", "Education",
    education.length ? 1 : 0.5,
    education.length ? `${education.length} entries` : "Add an education section"))

  checks.push(check("sections", "skills", "Skills",
    skills.length >= 6 ? 1 : skills.length >= 3 ? 0.5 : 0,
    skills.length >= 6 ? `${skills.length} skills listed` : `Only ${skills.length} skills — list at least 6 relevant ones`))

  checks.push(check("sections", "summary", "Summary",
    about ? 1 : 0.5,
    about ? "Summary present" : "Add a short professional summary"))

  const nonStandard = visible.filter((s) => !STANDARD_HEADINGS[s.type]?.includes(norm(s.label))).map((s) => s.label)
  checks.push(check("sections", "headings", "Standard headings",
    visible.length ? 1 - nonStandard.length / visible.length : 0,
    nonStandard.length ? "Rename to a standard heading so ATS map the section correctly" : "All headings are recognised by ATS",
    nonStandard))

  // ── Content ────────────────────────────────────────────────────────────────
  const completeJobs = experience.filter((e) => e.position && e.company && e.startDate && (e.current || e.endDate))
  checks.push(check("content", "job-details", "Complete job entries",
    experience.length ? completeJobs.length / experience.length : 0,
    `${completeJobs.length}/${experience.length} jobs have title, company and dates`,
    experience.filter((e) => !completeJobs.includes(e)).map((e) => e.position || e.company || "Untitled")))

  const dates = [...experience, ...education].flatMap((e) => [e.startDate, e.endDate]).filter(Boolean)
  const badDates = dates.filter((d) => !MONTH_DATE.test(d.trim()) && !NUM_DATE.test(d.trim()))
  checks.push(check("content", "date-format", "Parseable dates",
    dates.length ? 1 - badDates.length / dates.length : 1,
    badDates.length ? 'Use "Jan 2023", "01/2023" or "2023"' : 'All dates use a format like "Jan 2023"',
    badDates))

  const described = experience.filter((e) => e.description.trim().length >= 80)
  checks.push(check("content", "descriptions", "Job descriptions",
    experience.length ? described.length / experience.length : 0,
    `${described.length}/${experience.length} jobs have a meaningful description`,
    experience.filter((e) => !described.includes(e)).map((e) => e.position || e.company || "Untitled")))

  const metrics = experience.flatMap((e) => e.description.match(/\d+(?:[.,]\d+)?\s?(?:%|k\b|\+|x\b)|[$€£]\s?\d+|\b\d{2,}\b/gi) ?? [])
  checks.push(check("content", "metrics", "Quantified achievements",
    metrics.length >= 3 ? 1 : metrics.length > 0 ? 0.5 : 0,
    metrics.length ? `${metrics.length} numbers / metrics in experience` : "Add numbers: %, users, revenue, time saved"))

  const aboutLen = about?.content.trim().length ?? 0
  checks.push(check("content", "summary-length", "Summary length",
    aboutLen >= 150 && aboutLen <= 1000 ? 1 : aboutLen ? 0.5 : 0,
    !aboutLen ? "No summary" : aboutLen < 150 ? `${aboutLen} characters — aim for 150–1000` : aboutLen > 1000 ? `${aboutLen} characters — keep it under 1000` : `${aboutLen} characters`))

  const langSections = byType("languages")
  if (langSections.length) {
    const levelled = langSections.every((s) => s.showLevel)
    checks.push(check("content", "language-levels", "Language levels",
      levelled ? 1 : 0.5,
      levelled ? "Levels are written as text" : "Enable levels so ATS see your proficiency"))
  }

  // ── Document ───────────────────────────────────────────────────────────────
  checks.push(check("document", "pages", "Length",
    pdf.pageCount <= 2 ? 1 : pdf.pageCount === 3 ? 0.5 : 0,
    `${pdf.pageCount} page${pdf.pageCount === 1 ? "" : "s"}${pdf.pageCount > 2 ? " — keep it to 1–2" : ""}`))

  checks.push(check("document", "metadata", "Document title",
    pdf.title ? 1 : 0.5,
    pdf.title ? pdf.title : "PDF has no title metadata"))

  const sizeKb = Math.round(pdf.sizeBytes / 1024)
  checks.push(check("document", "size", "File size",
    sizeKb <= 2048 ? 1 : sizeKb <= 5120 ? 0.5 : 0,
    `${sizeKb.toLocaleString("en-US")} KB${sizeKb > 2048 ? " — many portals reject large files, compress the photo" : ""}`))

  // ── Score ──────────────────────────────────────────────────────────────────
  const categories: AtsCategory[] = CATEGORIES.map((c) => {
    const own = checks.filter((ch) => ch.category === c.id)
    const avg = own.length ? own.reduce((sum, ch) => sum + ch.score, 0) / own.length : 1
    return { ...c, score: Math.round(avg * 100) }
  })
  const totalWeight = categories.reduce((s, c) => s + c.weight, 0)
  const score = Math.round(categories.reduce((s, c) => s + c.score * c.weight, 0) / totalWeight)

  return {
    score,
    verdict: score >= 90 ? "Excellent — highly ATS-friendly"
      : score >= 75 ? "Good — minor improvements possible"
      : score >= 60 ? "Fair — several issues may hurt parsing"
      : "Needs work — ATS may misread this resume",
    categories,
    checks,
    stats: {
      pages: pdf.pageCount,
      words: (text.match(/\S+/g) ?? []).length,
      keywordsFound: kwFound,
      keywordsTotal: uniqueKeywords.length,
      sizeKb,
    },
  }
}
