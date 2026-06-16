"use client"

import Image from "next/image"
import { useRef } from "react"
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Upload } from "lucide-react"
import { ResumeInput } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { SortableSection } from "@/components/resume/shared"
import type { ResumeSection, AboutSection, ExperienceSection, EducationSection, SkillsSection, LanguagesSection, LinksSection } from "@/types/resume"
import {
  ContactLeft, SkillsLeft, LanguagesLeft, LinksLeft,
  AboutRight, ExperienceRight, EducationRight,
} from "./sections"
import s from "./HtmlTemplate6.module.scss"

type Mode = "edit" | "view"

export function HtmlTemplate6({ mode }: { mode: Mode }) {
  const { personalInfo, sections, reorderSections, updatePersonalInfo } = useResumeStore()
  const isEdit = mode === "edit"
  const mounted = useMounted()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => updatePersonalInfo({ photo: ev.target?.result as string })
    reader.readAsDataURL(file)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const LEFT_TYPES  = ["skills", "languages", "links"]
  const RIGHT_TYPES = ["about", "experience", "education"]
  const leftSections  = sections.filter((sec) => LEFT_TYPES.includes(sec.type)  && (isEdit || sec.visible))
  const rightSections = sections.filter((sec) => RIGHT_TYPES.includes(sec.type) && (isEdit || sec.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const renderLeft = (sec: ResumeSection) => {
    if (sec.type === "skills")    return <SkillsLeft    key={sec.id} section={sec as SkillsSection}    isEdit={isEdit} />
    if (sec.type === "languages") return <LanguagesLeft key={sec.id} section={sec as LanguagesSection} isEdit={isEdit} />
    if (sec.type === "links")     return <LinksLeft     key={sec.id} section={sec as LinksSection}     isEdit={isEdit} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    if (sec.type === "about")      return <AboutRight      key={sec.id} section={sec as AboutSection}      isEdit={isEdit} />
    if (sec.type === "experience") return <ExperienceRight key={sec.id} section={sec as ExperienceSection} isEdit={isEdit} />
    if (sec.type === "education")  return <EducationRight  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    return null
  }

  const wrapLeft = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  const fullName = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(" ")

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* ══ HEADER ══ */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          {isEdit ? (
            <ResumeInput variant="light" value={personalInfo.jobTitle} placeholder="Job Title"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
          ) : (
            personalInfo.jobTitle && <div className={s.jobTitleSmall}>{personalInfo.jobTitle}</div>
          )}

          {isEdit ? (
            <div style={{ display: "flex", gap: 10 }}>
              <ResumeInput variant="light" value={personalInfo.firstName} placeholder="First name"
                style={{ fontSize: 42, fontWeight: 900, color: "#111", letterSpacing: "-1px", lineHeight: "1.05" }}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
              <ResumeInput variant="light" value={personalInfo.lastName} placeholder="Last name"
                style={{ fontSize: 42, fontWeight: 900, color: "#111", letterSpacing: "-1px", lineHeight: "1.05" }}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
            </div>
          ) : (
            <div className={s.name}>{fullName}</div>
          )}
        </div>

        {personalInfo.photo ? (
          <div className={s.photoWrap}>
            <Image src={personalInfo.photo} alt="Profile" fill unoptimized className={s.photoImg} />
            {isEdit && (
              <div className={s.photoOverlay}>
                <label className={s.photoBtn}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
                  Replace
                </label>
                <button className={s.photoBtn} onClick={() => updatePersonalInfo({ photo: "" })}>Remove</button>
              </div>
            )}
          </div>
        ) : (
          <div className={s.photoWrap}
            onClick={isEdit ? () => fileInputRef.current?.click() : undefined}
            title={isEdit ? "Click to upload photo" : undefined}
          >
            <div className={s.photoPlaceholder}>
              <div className={s.photoPlaceholderIcon}>◉</div>
              {isEdit && <span className={s.photoPlaceholderText}>Upload photo</span>}
            </div>
            {isEdit && (
              <div className={s.photoOverlay}>
                <Upload size={16} color="white" />
                <span>Upload</span>
              </div>
            )}
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
      <hr className={s.headerRule} />

      {/* ══ TWO-COLUMN BODY ══ */}
      <div className={s.twoCol}>

        {/* LEFT COLUMN */}
        <div className={s.leftCol}>
          <ContactLeft isEdit={isEdit} />

          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={leftSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {leftSections.map(wrapLeft)}
              </SortableContext>
            </DndContext>
          ) : (
            leftSections.map(wrapLeft)
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className={s.rightCol}>
          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={rightSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {rightSections.map(wrapRight)}
              </SortableContext>
            </DndContext>
          ) : (
            rightSections.map(wrapRight)
          )}
        </div>
      </div>
    </div>
  )
}
