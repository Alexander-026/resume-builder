// ─── Resume Design Tokens ─────────────────────────────────────────────────────
// Single source of truth for both HTML (SCSS) and PDF (@react-pdf/renderer).
// PDF sizes are HTML sizes × PDF_SCALE (72dpi / 96dpi = 0.75).
//
// Usage:
//   HTML/SCSS  → variables are mirrored in resume.scss (must stay in sync)
//   PDF        → import { pdf } from "@/styles/resume-tokens"

export const PDF_SCALE = 0.75

// ── Font sizes (px for HTML, pt for PDF) ─────────────────────────────────────
export const fontSize = {
  // HTML (px)
  name:       26,
  jobTitle:   13,
  sectionHd:  12,
  body:       11,
  small:       9,
  micro:       8,

  // PDF (pt) — derived, kept as explicit values for clarity
  pdf: {
    name:       19.5,
    jobTitle:    9.75,
    sectionHd:   9,
    body:        8.25,
    small:       6.75,
    micro:       6,
  },
} as const

// ── Spacing (px for HTML, pt for PDF) ────────────────────────────────────────
export const spacing = {
  // Left column
  leftPadH:   22,   // horizontal padding
  leftPadV:   26,   // vertical padding

  // Right column
  rightPadH:  34,
  rightPadV:  30,

  sectionGap: 18,   // between sections
  itemGap:    13,   // between entries (experience, education)
  lineGap:     5,   // between small items (skills, languages)

  // PDF (pt)
  pdf: {
    leftPadH:   17,
    leftPadV:   20,
    rightPadH:  25,
    rightPadV:  22,
    sectionGap: 10,
    itemGap:    10,
    lineGap:     4,
  },
} as const

// ── Typographic ───────────────────────────────────────────────────────────────
export const lineHeight = {
  body:    1.55,
  about:   1.6,
  tight:   1.1,
} as const

// ── Left column static colors (fallback when no theme) ───────────────────────
export const defaultTheme = {
  leftBg:    "#6f6b6b",
  leftText:  "#ffffff",
  rightBg:   "#ffffff",
  rightText: "#1a1a1a",
  primary:   "#6f6b6b",
  secondary: "#444444",
} as const

// ── Misc ─────────────────────────────────────────────────────────────────────
export const misc = {
  photoSize:      96,   // px
  photoSizePdf:   72,   // pt
  sectionHdOpacity: 0.65,
  dotSize:         7,   // skill/lang level dot px
  dotSizePdf:      5,   // pt
  dotGap:          3,
  dotBorderRadius: "50%",
  leftDividerOpacity: 0.18,
  entryDividerOpacity: 0.07,
  resumeWidth:    794,  // px (A4 at 96dpi)
  editOutline:    "2px solid rgba(99,102,241,0.25)",
} as const
