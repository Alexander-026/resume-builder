"use client"

import { useState } from "react"
import { useResumeStore } from "@/store/resumeStore"
import type { ResumeSection } from "@/types/resume"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"
import { AboutSection } from "@/components/form/sections/AboutSection"
import { ExperienceSection } from "@/components/form/sections/ExperienceSection"
import { EducationSection } from "@/components/form/sections/EducationSection"
import { SkillsSection } from "@/components/form/sections/SkillsSection"
import { LanguagesSection } from "@/components/form/sections/LanguagesSection"
import { LinksSection } from "@/components/form/sections/LinksSection"

interface Props {
  section: ResumeSection
}

export function SectionCard({ section }: Props) {
  const [expanded, setExpanded] = useState(true)
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility)

  const renderContent = () => {
    switch (section.type) {
      case "about":
        return <AboutSection section={section} />
      case "experience":
        return <ExperienceSection section={section} />
      case "education":
        return <EducationSection section={section} />
      case "skills":
        return <SkillsSection section={section} />
      case "languages":
        return <LanguagesSection section={section} />
      case "links":
        return <LinksSection section={section} />
      default:
        return null
    }
  }

  return (
    <Card className={`transition-opacity ${!section.visible ? "opacity-50" : ""}`}>
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{section.label}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => toggleSectionVisibility(section.id)}
              title={section.visible ? "Hide in PDF" : "Show in PDF"}
            >
              {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="px-4 pb-4">
          {renderContent()}
        </CardContent>
      )}
    </Card>
  )
}
