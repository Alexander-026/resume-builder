// ─── PDF → plain text, the way an ATS parser sees it ─────────────────────────
// Text is read in content-stream order (like most ATS / pdftotext -raw), so
// column order, broken words and letter-spaced headings surface here exactly
// as they would for a recruiter's system.

export interface ExtractedPdf {
  text: string
  pageCount: number
  title: string
  author: string
  sizeBytes: number
}

export interface TextItemLike {
  str: string
  transform: number[]   // [a, b, c, d, x, y]
  width: number
  height: number
  hasEOL?: boolean
}

// Joins pdf.js text items into lines: a jump in y starts a new line,
// a horizontal gap inserts a space.
export function textFromItems(items: TextItemLike[]): string {
  let out = ""
  let prev: { endX: number; y: number; h: number } | null = null

  for (const it of items) {
    if (!("str" in it)) continue
    const x = it.transform[4]
    const y = it.transform[5]
    const h = it.height || Math.abs(it.transform[3]) || 1

    if (prev) {
      if (Math.abs(y - prev.y) > Math.max(prev.h, h) * 0.5) {
        if (!out.endsWith("\n")) out += "\n"
      } else if (x - prev.endX > h * 0.15 && !/\s$/.test(out) && !/^\s/.test(it.str)) {
        out += " "
      }
    }
    out += it.str
    if (it.hasEOL && !out.endsWith("\n")) out += "\n"
    if (it.str) prev = { endX: x + it.width, y, h }
  }
  return out
}

export async function extractPdf(data: ArrayBuffer): Promise<ExtractedPdf> {
  // Loading the worker module on the main thread lets pdf.js run without a
  // separate worker file — instant for a 1–2 page resume, no bundler setup.
  // The legacy build is used for older Safari / Firefox support.
  await import("pdfjs-dist/legacy/build/pdf.worker.mjs")
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")

  const sizeBytes = data.byteLength
  const task = pdfjs.getDocument({ data: new Uint8Array(data) })
  const doc = await task.promise
  try {
    const pages: string[] = []
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      pages.push(textFromItems(content.items as TextItemLike[]))
    }
    const { info } = await doc.getMetadata() as { info: { Title?: string; Author?: string } }
    return {
      text: pages.join("\n"),
      pageCount: doc.numPages,
      title: info?.Title ?? "",
      author: info?.Author ?? "",
      sizeBytes,
    }
  } finally {
    await task.destroy()
  }
}
