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
  AboutLeft, SkillsLeft, LanguagesLeft, LinksLeft,
  ExperienceSection as ExperienceSec, EducationSection as EducationSec,
  LEFT_HANDLE_COLOR, RIGHT_HANDLE_COLOR,
} from "./sections"
import s from "./HtmlTemplate4.module.scss"

type Mode = "edit" | "view"

export function HtmlTemplate4({ mode }: { mode: Mode }) {
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

  const LEFT_TYPES  = ["about", "skills", "languages", "links"]
  const RIGHT_TYPES = ["experience", "education"]
  const leftSections  = sections.filter((sec) => LEFT_TYPES.includes(sec.type)  && (isEdit || sec.visible))
  const rightSections = sections.filter((sec) => RIGHT_TYPES.includes(sec.type) && (isEdit || sec.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const renderLeft = (sec: ResumeSection) => {
    if (sec.type === "about")     return <AboutLeft     key={sec.id} section={sec as AboutSection}     isEdit={isEdit} />
    if (sec.type === "skills")    return <SkillsLeft    key={sec.id} section={sec as SkillsSection}    isEdit={isEdit} />
    if (sec.type === "languages") return <LanguagesLeft key={sec.id} section={sec as LanguagesSection} isEdit={isEdit} />
    if (sec.type === "links")     return <LinksLeft     key={sec.id} section={sec as LinksSection}     isEdit={isEdit} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    if (sec.type === "experience") return <ExperienceSec key={sec.id} section={sec as ExperienceSection} isEdit={isEdit} />
    if (sec.type === "education")  return <EducationSec  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    return null
  }

  const wrapLeft = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={LEFT_HANDLE_COLOR} visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderLeft(sec)}</div>

  const wrapRight = (sec: ResumeSection): React.ReactElement =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={RIGHT_HANDLE_COLOR} visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : <div key={sec.id}>{renderRight(sec)}</div>

  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      isEdit
        ? <ResumeInput key="email" value={personalInfo.email} placeholder="Email" style={{ fontSize: 10, color: "#888" }} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
        : <div key="email" className={s.contactLine}>{personalInfo.email}</div>
    ) : null,
    phone: personalInfo.phone || isEdit ? (
      isEdit
        ? <ResumeInput key="phone" value={personalInfo.phone} placeholder="Phone" style={{ fontSize: 10, color: "#888" }} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
        : <div key="phone" className={s.contactLine}>{personalInfo.phone}</div>
    ) : null,
    website: personalInfo.website || isEdit ? (
      isEdit
        ? <ResumeInput key="website" value={personalInfo.website} placeholder="Website" style={{ fontSize: 10, color: "#888" }} onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
        : <div key="website" className={s.contactLine}>{personalInfo.website}</div>
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" style={{ display: "flex", gap: 4 }}>
          <ResumeInput value={personalInfo.city} placeholder="City" style={{ fontSize: 10, color: "#888", flex: 1 }} onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
          <ResumeInput value={personalInfo.country} placeholder="Country" style={{ fontSize: 10, color: "#888", flex: 1 }} onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
        </div>
      ) : <div key="location" className={s.contactLine}>{location}</div>
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

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
              <div className={s.photoPlaceholderIcon}>&#9689;</div>
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
            leftSections.map(wrapLeft)
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className={s.rightCol}>

        {/* Header */}
        <div className={s.rightHeader}>
          {isEdit ? (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <ResumeInput value={personalInfo.firstName} placeholder="First name"
                style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1, flex: "0 0 auto" }}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
              <ResumeInput value={personalInfo.lastName} placeholder="Last name"
                style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1, flex: "0 0 auto" }}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
            </div>
          ) : (
            <div className={s.name}>{personalInfo.firstName} {personalInfo.lastName}</div>
          )}
          <div className={s.yellowAccent} />
          {isEdit ? (
            <>
              <ResumeInput value={personalInfo.address} placeholder="Address"
                style={{ fontSize: 10, color: "#888", marginBottom: 3 }}
                onChange={(e) => updatePersonalInfo({ address: e.target.value })} />
              <ClientDnd onDragEnd={({ active, over }) => {
                  if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
                }}>
                <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
                  {visibleContactIds.map((id) => (
                    <SortableItem key={id} id={id} handleColor="#888">
                      {contactFieldMap[id]}
                    </SortableItem>
                  ))}
                </SortableContext>
              </ClientDnd>
            </>
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
