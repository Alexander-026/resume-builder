"use client"

import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { ResumeInput } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { SortableSection } from "@/components/resume/shared"
import type { ResumeSection, AboutSection, ExperienceSection, EducationSection, SkillsSection, LanguagesSection, LinksSection } from "@/types/resume"
import {
  ContactSection,
  EducationLeft, SkillsLeft, LanguagesLeft, LinksLeft,
  AboutRight, ExperienceRight, EducationRight,
} from "./sections"
import s from "./HtmlTemplate2.module.scss"

type Mode = "edit" | "view"

export function HtmlTemplate2({ mode }: { mode: Mode }) {
  const { personalInfo, sections, reorderSections, updatePersonalInfo } = useResumeStore()
  const isEdit = mode === "edit"
  const mounted = useMounted()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const LEFT_TYPES  = ["education", "skills", "languages", "links"]
  const RIGHT_TYPES = ["about", "experience"]
  const leftSections  = sections.filter((s) => LEFT_TYPES.includes(s.type)  && (isEdit || s.visible))
  const rightSections = sections.filter((s) => RIGHT_TYPES.includes(s.type) && (isEdit || s.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const renderLeft = (sec: ResumeSection) => {
    if (sec.type === "education")  return <EducationLeft  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    if (sec.type === "skills")     return <SkillsLeft     key={sec.id} section={sec as SkillsSection}     isEdit={isEdit} />
    if (sec.type === "languages")  return <LanguagesLeft  key={sec.id} section={sec as LanguagesSection}  isEdit={isEdit} />
    if (sec.type === "links")      return <LinksLeft      key={sec.id} section={sec as LinksSection}      isEdit={isEdit} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    if (sec.type === "about")      return <AboutRight      key={sec.id} section={sec as AboutSection}      isEdit={isEdit} />
    if (sec.type === "experience") return <ExperienceRight key={sec.id} section={sec as ExperienceSection} isEdit={isEdit} />
    if (sec.type === "education")  return <EducationRight  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    return null
  }

  const wrapLeft = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#333" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#555" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* ══ HEADER ══ */}
      <div className={s.header}>
        {isEdit ? (
          <>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <ResumeInput value={personalInfo.firstName} placeholder="First name"
                style={{ fontSize: 52, fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase",
                  textAlign: "center", color: "#000", fontFamily: "Georgia, serif" }}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
              <ResumeInput value={personalInfo.lastName} placeholder="Last name"
                style={{ fontSize: 52, fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase",
                  textAlign: "center", color: "#000", fontFamily: "Georgia, serif" }}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
            </div>
            <ResumeInput value={personalInfo.jobTitle} placeholder="Job title"
              style={{ fontSize: 13, letterSpacing: "3px", textTransform: "uppercase",
                textAlign: "center", color: "#888", marginTop: 8 }}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
          </>
        ) : (
          <>
            <div className={s.name}>{personalInfo.firstName} {personalInfo.lastName}</div>
            {personalInfo.jobTitle && <div className={s.jobTitle}>{personalInfo.jobTitle}</div>}
          </>
        )}
        <hr className={s.headerRule} />
      </div>

      {/* ══ BODY ══ */}
      <div className={s.body}>
        <div className={s.leftCol}>
          <ContactSection isEdit={isEdit} />
          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={leftSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {leftSections.map(wrapLeft)}
              </SortableContext>
            </DndContext>
          ) : (
            leftSections.map((sec) => <div key={sec.id}>{renderLeft(sec)}</div>)
          )}
        </div>

        <div className={s.rightCol}>
          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={rightSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {rightSections.map(wrapRight)}
              </SortableContext>
            </DndContext>
          ) : (
            rightSections.map((sec) => <div key={sec.id}>{renderRight(sec)}</div>)
          )}
        </div>
      </div>
    </div>
  )
}
