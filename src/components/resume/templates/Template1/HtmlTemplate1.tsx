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
import { SortableItem, ClientDnd, SortableSection } from "@/components/resume/shared"
import type { ResumeSection, AboutSection, ExperienceSection, EducationSection, SkillsSection, LanguagesSection, LinksSection } from "@/types/resume"
import {
  AboutEdit, AboutView,
  SkillsEdit, SkillsView,
  LanguagesEdit, LanguagesView,
  LinksEdit, LinksView,
  ExperienceEdit, ExperienceView,
  EducationEdit, EducationView,
  buildContactFieldMap,
} from "./sections"
import s from "./HtmlTemplate1.module.scss"

type Mode = "edit" | "view"

export function HtmlTemplate1({ mode }: { mode: Mode }) {
  const { personalInfo, sections, theme, reorderSections, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
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

  const LEFT_TYPES  = ["about", "skills", "languages", "links"]
  const RIGHT_TYPES = ["experience", "education"]
  const leftSections  = sections.filter((s) => LEFT_TYPES.includes(s.type)  && (isEdit || s.visible))
  const rightSections = sections.filter((s) => RIGHT_TYPES.includes(s.type) && (isEdit || s.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const primary   = theme.primaryColor   || "#2d2d2d"
  const secondary = theme.secondaryColor || "#555555"
  void secondary

  const cssVars = {
    "--left-text":  theme.leftTextColor,
    "--right-text": theme.rightTextColor,
    "--primary":    primary,
  } as React.CSSProperties

  const renderLeft = (sec: ResumeSection) => {
    const c = theme.leftTextColor
    if (sec.type === "about")     return isEdit ? <AboutEdit     section={sec as AboutSection} />     : <AboutView     section={sec as AboutSection} />
    if (sec.type === "skills")    return isEdit ? <SkillsEdit    section={sec as SkillsSection}    color={c} /> : <SkillsView    section={sec as SkillsSection}    color={c} />
    if (sec.type === "languages") return isEdit ? <LanguagesEdit section={sec as LanguagesSection} color={c} /> : <LanguagesView section={sec as LanguagesSection} color={c} />
    if (sec.type === "links")     return isEdit ? <LinksEdit     section={sec as LinksSection}     color={c} /> : <LinksView     section={sec as LinksSection} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    const t = theme.rightTextColor
    if (sec.type === "experience") return isEdit ? <ExperienceEdit section={sec as ExperienceSection} textColor={t} /> : <ExperienceView section={sec as ExperienceSection} />
    if (sec.type === "education")  return isEdit ? <EducationEdit  section={sec as EducationSection}  textColor={t} /> : <EducationView  section={sec as EducationSection} />
    return null
  }

  const wrapLeft = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={theme.leftTextColor} visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={primary} visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  const contactFieldMap = buildContactFieldMap(isEdit)

  const visibleContactIds = contactOrder.filter((id) => {
    if (id === "location") return isEdit || !!(personalInfo.city || personalInfo.country)
    if (id === "email")    return isEdit || !!personalInfo.email
    if (id === "phone")    return isEdit || !!personalInfo.phone
    if (id === "website")  return isEdit || !!personalInfo.website
    return false
  })

  return (
    <div
      className={[s.resume, isEdit ? s.editMode : ""].join(" ")}
      style={{ ...cssVars, backgroundColor: theme.rightBgColor, color: theme.rightTextColor }}
    >
      {/* ══ LEFT COLUMN ══ */}
      <div className={s.leftCol} style={{ backgroundColor: theme.leftBgColor, color: theme.leftTextColor }}>

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
              <div className={s.photoPlaceholderIcon}>◉</div>
              {isEdit && <span className={s.photoPlaceholderText}>Click to upload photo</span>}
            </div>
            {isEdit && (
              <div className={s.photoOverlay}>
                <Upload size={20} color="white" />
                <span>Upload photo</span>
              </div>
            )}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />

        <div className={s.leftBody}>
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
      </div>

      {/* ══ RIGHT COLUMN ══ */}
      <div className={s.rightCol} style={{ backgroundColor: theme.rightBgColor }}>

        {/* Header */}
        <div className={s.headerRow} style={{ backgroundColor: theme.leftBgColor, color: theme.leftTextColor }}>
          <div className={s.headerLeft}>
            {isEdit ? (
              <>
                <ResumeInput variant="dark" value={personalInfo.firstName} placeholder="First name"
                  style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", display: "block" }}
                  onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
                <ResumeInput variant="dark" value={personalInfo.lastName} placeholder="Last name"
                  style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", display: "block" }}
                  onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
                <ResumeInput variant="dark" value={personalInfo.jobTitle} placeholder="Job title"
                  style={{ fontSize: 13, marginTop: 5, opacity: 0.65 }}
                  onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
              </>
            ) : (
              <>
                <div className={s.name}>{personalInfo.firstName}</div>
                <div className={s.name}>{personalInfo.lastName}</div>
                <div className={s.jobTitle}>{personalInfo.jobTitle}</div>
              </>
            )}
          </div>

          <div className={s.headerRight}>
            {isEdit ? (
              <ClientDnd onDragEnd={({ active, over }) => {
                  if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
                }}>
                <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
                  {visibleContactIds.map((id) => (
                    <SortableItem key={id} id={id} handleColor={theme.leftTextColor}>
                      {contactFieldMap[id]}
                    </SortableItem>
                  ))}
                </SortableContext>
              </ClientDnd>
            ) : (
              visibleContactIds.map((id) => contactFieldMap[id] ?? null)
            )}
          </div>
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
