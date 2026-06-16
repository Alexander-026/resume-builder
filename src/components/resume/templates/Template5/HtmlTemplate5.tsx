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
import s from "./HtmlTemplate5.module.scss"

type Mode = "edit" | "view"

export function HtmlTemplate5({ mode }: { mode: Mode }) {
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
      <SortableSection key={sec.id} id={sec.id} handleColor="#a0b4c8" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#263447" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* LEFT COLUMN */}
      <div className={s.leftCol}>

        {personalInfo.photo ? (
          <div className={s.photoWrap}>
            <Image src={personalInfo.photo} alt="Profile" fill unoptimized className={s.photo} />
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
              <span className={s.photoPlaceholderIcon}>◉</span>
              {isEdit && (
                <span className={s.photoPlaceholderText}
                  style={{ position: "absolute", bottom: -28, fontSize: 8, opacity: 0.5, whiteSpace: "nowrap" }}>
                  Click to upload
                </span>
              )}
            </div>
            {isEdit && (
              <div className={s.photoOverlay}>
                <Upload size={16} color="white" />
              </div>
            )}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />

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

        <div className={s.rightHeader}>
          {isEdit ? (
            <>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <ResumeInput value={personalInfo.firstName} placeholder="First name"
                  style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", flex: "0 0 auto" }}
                  onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
                <ResumeInput value={personalInfo.lastName} placeholder="Last name"
                  style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", flex: "0 0 auto" }}
                  onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
              </div>
              <ResumeInput value={personalInfo.jobTitle} placeholder="Job title"
                style={{ fontSize: 13, color: "#888", marginTop: 4 }}
                onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
            </>
          ) : (
            <>
              <div className={s.name}>{personalInfo.firstName} {personalInfo.lastName}</div>
              {personalInfo.jobTitle && <div className={s.jobTitle}>{personalInfo.jobTitle}</div>}
            </>
          )}
        </div>

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
  )
}
