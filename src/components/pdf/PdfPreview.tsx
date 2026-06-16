"use client"

import dynamic from "next/dynamic"
import { useResumeStore } from "@/store/resumeStore"
import { useShallow } from "zustand/react/shallow"
import { Template1 } from "@/components/pdf/templates/Template1"
import { Template2 } from "@/components/pdf/templates/Template2"
import { Template3 } from "@/components/pdf/templates/Template3"
import { Template4 } from "@/components/pdf/templates/Template4"
import { Template5 } from "@/components/pdf/templates/Template5"
import { Template6 } from "@/components/pdf/templates/Template6"
import type { ResumeData } from "@/types/resume"

// Only load PDFViewer on the client — it uses browser APIs
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false, loading: () => <PdfSkeleton /> }
)

function PdfSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/30">
      <div className="text-center text-muted-foreground">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm">Rendering PDF...</p>
      </div>
    </div>
  )
}

function getTemplate(data: ResumeData) {
  switch (data.activeTemplate) {
    case 2: return <Template2 data={data} />
    case 3: return <Template3 data={data} />
    case 4: return <Template4 data={data} />
    case 5: return <Template5 data={data} />
    case 6: return <Template6 data={data} />
    default: return <Template1 data={data} />
  }
}

export function PdfPreview() {
  const data = useResumeStore(useShallow((s) => ({
    personalInfo:   s.personalInfo,
    sections:       s.sections,
    activeTemplate: s.activeTemplate,
    theme:          s.theme,
    coverLetter:    s.coverLetter,
  })))

  return (
    <PDFViewer width="100%" height="100%" showToolbar>
      {getTemplate(data)}
    </PDFViewer>
  )
}
