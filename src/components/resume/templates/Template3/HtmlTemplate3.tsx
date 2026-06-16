"use client"

import Image from "next/image"
import { useRef } from "react"
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { ResumeInput } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { SortableItem, ClientDnd, SortableSection } from "@/components/resume/shared"
import type { ResumeSection, AboutSection, ExperienceSection, EducationSection, SkillsSection, LanguagesSection, LinksSection } from "@/types/resume"
import {
  AboutLeft, LinksLeft, HobbiesLeft,
  ExperienceRight, EducationRight, SkillsRight, LanguagesRight,
  buildContactFieldMap,
} from "./sections"
import s from "./HtmlTemplate3.module.scss"

const NO_MODIFIERS: import("@dnd-kit/core").Modifier[] = []
type Mode = "edit" | "view"

export function HtmlTemplate3({ mode }: { mode: Mode }) {
  const { personalInfo, sections, reorderSections, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
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

  const LEFT_TYPES  = ["about", "links"]
  const RIGHT_TYPES = ["experience", "education", "skills", "languages"]
  const leftSections  = sections.filter((sec) => LEFT_TYPES.includes(sec.type)  && (isEdit || sec.visible))
  const rightSections = sections.filter((sec) => RIGHT_TYPES.includes(sec.type) && (isEdit || sec.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const renderLeft = (sec: ResumeSection) => {
    if (sec.type === "about")  return <AboutLeft   key={sec.id} section={sec as AboutSection}  isEdit={isEdit} />
    if (sec.type === "links")  return <LinksLeft   key={sec.id} section={sec as LinksSection}  isEdit={isEdit} />
    if (sec.type === "skills") return <HobbiesLeft key={sec.id} section={sec as SkillsSection} isEdit={isEdit} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    if (sec.type === "experience") return <ExperienceRight key={sec.id} section={sec as ExperienceSection} isEdit={isEdit} />
    if (sec.type === "education")  return <EducationRight  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    if (sec.type === "skills")     return <SkillsRight     key={sec.id} section={sec as SkillsSection}     isEdit={isEdit} />
    if (sec.type === "languages")  return <LanguagesRight  key={sec.id} section={sec as LanguagesSection}  isEdit={isEdit} />
    return null
  }

  const wrapLeft = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#f0f0f0" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#4a4a4a" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  const contactFieldMap = buildContactFieldMap(isEdit, personalInfo, updatePersonalInfo)
  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* ══ LEFT COLUMN ══ */}
      <div className={s.leftCol}>

        {/* Photo */}
        {personalInfo.photo ? (
          <div className={s.photoWrap}>
            <Image src={personalInfo.photo} alt="Profile" fill style={{ objectFit: "cover", objectPosition: "center top" }} unoptimized />
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
          <div className={s.photoPlaceholder}
            onClick={isEdit ? () => fileInputRef.current?.click() : undefined}
            style={{ cursor: isEdit ? "pointer" : "default" }}
          >
            <div className={s.photoPlaceholderIcon}>◉</div>
            {isEdit && <span className={s.photoPlaceholderText}>Click to upload</span>}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />

        {/* Name + job title */}
        {isEdit ? (
          <>
            <ResumeInput variant="dark" value={personalInfo.firstName} placeholder="First name"
              style={{ fontSize: 18, fontWeight: 800, textAlign: "center", color: "#fff", display: "block", marginBottom: 2 }}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
            <ResumeInput variant="dark" value={personalInfo.lastName} placeholder="Last name"
              style={{ fontSize: 18, fontWeight: 800, textAlign: "center", color: "#fff", display: "block", marginBottom: 4 }}
              onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
            <ResumeInput variant="dark" value={personalInfo.jobTitle} placeholder="Job title"
              style={{ fontSize: 10, textAlign: "center", color: "#f0f0f0", opacity: 0.7, marginBottom: 20 }}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
          </>
        ) : (
          <>
            <div className={s.leftName}>{personalInfo.firstName} {personalInfo.lastName}</div>
            {personalInfo.jobTitle && <div className={s.leftJobTitle}>{personalInfo.jobTitle}</div>}
          </>
        )}

        {/* Left sections */}
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

      {/* ══ RIGHT COLUMN ══ */}
      <div className={s.rightCol}>

        {/* Contact row */}
        <div className={s.contactRow}>
          {isEdit ? (
            <ClientDnd modifiers={NO_MODIFIERS} onDragEnd={({ active, over }) => {
                if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
              }}>
              <SortableContext items={visibleContactIds} strategy={horizontalListSortingStrategy}>
                {visibleContactIds.map((id) => (
                  <SortableItem key={id} id={id} handleColor="#4a4a4a">
                    {contactFieldMap[id]}
                  </SortableItem>
                ))}
              </SortableContext>
            </ClientDnd>
          ) : (
            visibleContactIds.map((id) => contactFieldMap[id] ?? null)
          )}
        </div>

        {/* Right sections */}
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
