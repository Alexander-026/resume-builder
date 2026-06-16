"use client"

import { useRef } from "react"
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, useSortable, horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Upload, Mail, Phone, MapPin, Globe } from "lucide-react"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { AddBtn, RemoveBtn, DragDots, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  ResumeSection, AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection,
  ExperienceItem, EducationItem,
} from "@/types/resume"
import s from "./HtmlTemplate4.module.scss"

type Mode = "edit" | "view"

// Sortable section wrapper
function SortableSection({ id, handleColor, visible, children }: {
  id: string; handleColor: string; visible: boolean; children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        opacity: isDragging ? 0.4 : visible ? 1 : 0.4,
      }}
      className={s.sortable}
    >
      <div className={s.dragHandle} {...attributes} {...listeners} title="Drag to reorder">
        <DragDots color={handleColor} />
      </div>
      {children}
    </div>
  )
}

// Skill bar
function SkillBar({ level }: { level: number }) {
  const pct = Math.round((level / 5) * 100)
  return (
    <div className={s.skillTrack}>
      <div className={s.skillFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

// Handle colors
const LEFT_HANDLE_COLOR = "#f5c518"
const RIGHT_HANDLE_COLOR = "#1a1a1a"

// LEFT COLUMN SECTIONS

function AboutLeft({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ResumeTextarea variant="dark" value={section.content} placeholder="Professional summary..."
          className={s.aboutText}
          onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
      ) : (
        <p className={s.aboutText} style={{ margin: 0 }}>{section.content}</p>
      )}
    </div>
  )
}

function SkillsLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={LEFT_HANDLE_COLOR}>
                <div className={s.skillItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ResumeInput variant="dark" value={item.name} placeholder="Skill"
                        style={{ fontSize: 10, color: "#f0ede8", flex: 1 }}
                        onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                      <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                    </div>
                    {section.showLevel && <SkillBar level={item.level} />}
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillItem}>
            <div style={{ flex: 1 }}>
              <div className={s.skillLabel}>{item.name}</div>
              {section.showLevel && <SkillBar level={item.level} />}
            </div>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addSkillItem(section.id)}>Add skill</AddBtn>}
    </div>
  )
}

function LanguagesLeft({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={LEFT_HANDLE_COLOR}>
                <div className={s.skillItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ResumeInput variant="dark" value={item.language} placeholder="Language"
                        style={{ fontSize: 10, color: "#f0ede8", flex: 1 }}
                        onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                      <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                    </div>
                    {section.showLevel && <SkillBar level={item.level} />}
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillItem}>
            <div style={{ flex: 1 }}>
              <div className={s.skillLabel}>{item.language}</div>
              {section.showLevel && <SkillBar level={item.level} />}
            </div>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLanguageItem(section.id)}>Add language</AddBtn>}
    </div>
  )
}

function LinksLeft({ section, isEdit }: { section: LinksSection; isEdit: boolean }) {
  const { addLinkItem, updateLinkItem, removeLinkItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={LEFT_HANDLE_COLOR}>
                <div style={{ marginBottom: 8, display: "flex", gap: 4, flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <ResumeInput variant="dark" value={item.label} placeholder="Label"
                      style={{ fontSize: 10, color: "#f0ede8", marginBottom: 2 }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                    <ResumeInput variant="dark" value={item.url} placeholder="https://..."
                      style={{ fontSize: 9, color: "#f0ede8", opacity: 0.5 }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                  </div>
                  <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} style={{ marginBottom: 8 }}>
            <div className={s.skillLabel}>{item.label || item.url}</div>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLinkItem(section.id)}>Add link</AddBtn>}
    </div>
  )
}

// RIGHT COLUMN SECTIONS

function ExperienceEdit({ section }: { section: ExperienceSection }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })
  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {section.items.map((item) => (
            <SortableItem key={item.id} id={item.id} handleColor={RIGHT_HANDLE_COLOR}>
              <div className={s.entryBlock}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                  <ResumeInput value={item.position} placeholder="Position"
                    style={{ fontSize: 11, fontWeight: 700, flex: 1 }}
                    onChange={(e) => upd(item, "position", e.target.value)} />
                  <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0, fontSize: 9 }}>
                    <ResumeInput value={item.startDate} placeholder="Start"
                      style={{ fontSize: 9, width: 55, textAlign: "right" }}
                      onChange={(e) => upd(item, "startDate", e.target.value)} />
                    <span>-</span>
                    {item.current
                      ? <span style={{ fontSize: 9, opacity: 0.6 }}>Present</span>
                      : <ResumeInput value={item.endDate} placeholder="End"
                          style={{ fontSize: 9, width: 55 }}
                          onChange={(e) => upd(item, "endDate", e.target.value)} />
                    }
                    <label style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>
                      <input type="checkbox" checked={item.current}
                        onChange={(e) => upd(item, "current", e.target.checked)}
                        style={{ width: 10, height: 10 }} />
                      <span style={{ fontSize: 8, opacity: 0.5 }}>now</span>
                    </label>
                  </div>
                  <RemoveBtn onClick={() => removeExperienceItem(section.id, item.id)} />
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                  <ResumeInput value={item.company} placeholder="Company"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => upd(item, "company", e.target.value)} />
                  <span style={{ opacity: 0.3 }}>&middot;</span>
                  <ResumeInput value={item.location} placeholder="Location"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => upd(item, "location", e.target.value)} />
                </div>
                <ResumeTextarea value={item.description} placeholder="Responsibilities &amp; achievements"
                  style={{ fontSize: 10, lineHeight: 1.65, marginTop: 4 }}
                  onChange={(e) => upd(item, "description", e.target.value)} />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </ClientDnd>
      <AddBtn onClick={() => addExperienceItem(section.id)}>Add experience</AddBtn>
    </div>
  )
}

function ExperienceView({ section }: { section: ExperienceSection }) {
  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      {section.items.map((item) => {
        const sub = [item.company, item.location].filter(Boolean).join(" / ")
        const dates = item.startDate
          ? (item.current
              ? item.startDate + " - Present"
              : item.endDate
                ? item.startDate + " - " + item.endDate
                : item.startDate)
          : ""
        const subFull = sub && dates ? sub + " / " + dates : sub + dates
        return (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.position}</div>
            <div className={s.entrySub}>{subFull}</div>
            {item.description && (
              <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function EducationEdit({ section }: { section: EducationSection }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })
  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {section.items.map((item) => (
            <SortableItem key={item.id} id={item.id} handleColor={RIGHT_HANDLE_COLOR}>
              <div className={s.entryBlock}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                  <ResumeInput value={item.degree} placeholder="Degree / Certificate"
                    style={{ fontSize: 11, fontWeight: 700, flex: 1 }}
                    onChange={(e) => upd(item, "degree", e.target.value)} />
                  <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                    <ResumeInput value={item.startDate} placeholder="Start"
                      style={{ fontSize: 9, width: 55, textAlign: "right" }}
                      onChange={(e) => upd(item, "startDate", e.target.value)} />
                    <span>-</span>
                    <ResumeInput value={item.endDate} placeholder="End"
                      style={{ fontSize: 9, width: 55 }}
                      onChange={(e) => upd(item, "endDate", e.target.value)} />
                  </div>
                  <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                  <ResumeInput value={item.school} placeholder="School / University"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => upd(item, "school", e.target.value)} />
                  <span style={{ opacity: 0.3 }}>&middot;</span>
                  <ResumeInput value={item.location} placeholder="City"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => upd(item, "location", e.target.value)} />
                </div>
                {item.description !== "" && (
                  <ResumeTextarea value={item.description} placeholder="Description"
                    style={{ fontSize: 10, lineHeight: 1.65, marginTop: 4 }}
                    onChange={(e) => upd(item, "description", e.target.value)} />
                )}
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </ClientDnd>
      <AddBtn onClick={() => addEducationItem(section.id)}>Add education</AddBtn>
    </div>
  )
}

function EducationView({ section }: { section: EducationSection }) {
  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      {section.items.map((item) => {
        const sub = [item.school, item.location].filter(Boolean).join(" / ")
        const dates = item.startDate
          ? (item.endDate ? item.startDate + " - " + item.endDate : item.startDate)
          : ""
        const subFull = sub && dates ? sub + " / " + dates : sub + dates
        return (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.degree}</div>
            <div className={s.entrySub}>{subFull}</div>
            {item.description && (
              <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// MAIN COMPONENT
export function HtmlTemplate4({ mode }: { mode: Mode }) {
  const { personalInfo, sections, reorderSections, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
  const isEdit = mode === "edit"
  const mounted = useMounted()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      updatePersonalInfo({ photo: ev.target?.result as string })
    }
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
    if (sec.type === "experience") {
      return isEdit
        ? <ExperienceEdit key={sec.id} section={sec as ExperienceSection} />
        : <ExperienceView key={sec.id} section={sec as ExperienceSection} />
    }
    if (sec.type === "education") {
      return isEdit
        ? <EducationEdit key={sec.id} section={sec as EducationSection} />
        : <EducationView key={sec.id} section={sec as EducationSection} />
    }
    return null
  }

  const wrapLeft = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor={LEFT_HANDLE_COLOR} visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderLeft(sec)}</div>
  }

  const wrapRight = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor={RIGHT_HANDLE_COLOR} visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderRight(sec)}</div>
  }

  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      isEdit ? (
        <ResumeInput key="email" value={personalInfo.email} placeholder="Email"
          style={{ fontSize: 10, color: "#888" }}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
      ) : (
        <div key="email" className={s.contactLine}>{personalInfo.email}</div>
      )
    ) : null,
    phone: personalInfo.phone || isEdit ? (
      isEdit ? (
        <ResumeInput key="phone" value={personalInfo.phone} placeholder="Phone"
          style={{ fontSize: 10, color: "#888" }}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
      ) : (
        <div key="phone" className={s.contactLine}>{personalInfo.phone}</div>
      )
    ) : null,
    website: personalInfo.website || isEdit ? (
      isEdit ? (
        <ResumeInput key="website" value={personalInfo.website} placeholder="Website"
          style={{ fontSize: 10, color: "#888" }}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
      ) : (
        <div key="website" className={s.contactLine}>{personalInfo.website}</div>
      )
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" style={{ display: "flex", gap: 4 }}>
          <ResumeInput value={personalInfo.city} placeholder="City"
            style={{ fontSize: 10, color: "#888", flex: 1 }}
            onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
          <ResumeInput value={personalInfo.country} placeholder="Country"
            style={{ fontSize: 10, color: "#888", flex: 1 }}
            onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
        </div>
      ) : (
        <div key="location" className={s.contactLine}>{location}</div>
      )
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* LEFT COLUMN */}
      <div className={s.leftCol}>

        {/* Full-width photo */}
        {personalInfo.photo ? (
          <div className={s.photoWrap}>
            <img src={personalInfo.photo} alt="Profile" className={s.photo} />
            {isEdit && (
              <div className={s.photoOverlay}>
                <label className={s.photoBtn}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
                  Replace
                </label>
                <button className={s.photoBtn} onClick={() => updatePersonalInfo({ photo: "" })}>
                  Remove
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className={s.photoWrap}
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

        <input ref={fileInputRef} type="file" accept="image/*"
          style={{ display: "none" }} onChange={handlePhotoUpload} />

        {/* Left body */}
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
            <>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <ResumeInput value={personalInfo.firstName} placeholder="First name"
                  style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1, flex: "0 0 auto" }}
                  onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} />
                <ResumeInput value={personalInfo.lastName} placeholder="Last name"
                  style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1, flex: "0 0 auto" }}
                  onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} />
              </div>
            </>
          ) : (
            <div className={s.name}>
              {personalInfo.firstName} {personalInfo.lastName}
            </div>
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
