"use client"

import { useRef } from "react"
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, rectSortingStrategy, horizontalListSortingStrategy, useSortable,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Trash2, Plus, Upload, Mail, Phone, MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { AddBtn, RemoveBtn, DragDots, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  ResumeSection, AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, SkillLevel,
  ExperienceItem, EducationItem, PersonalInfo,
} from "@/types/resume"
import s from "./HtmlTemplate3.module.scss"
import Image from "next/image"

type Mode = "edit" | "view"

const NO_MODIFIERS: import("@dnd-kit/core").Modifier[] = []

// ─── Sortable section wrapper ─────────────────────────────────────────────────
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

// ─── Skill progress bar ───────────────────────────────────────────────────────
function SkillBar({ level }: { level: SkillLevel }) {
  const pct = level === 0 ? 0 : (level / 5) * 100
  return (
    <div className={s.skillTrack}>
      <div className={s.skillFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEFT COLUMN SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function AboutLeft({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ResumeTextarea variant="dark" value={section.content} placeholder="About me..."
          className={s.leftText}
          onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
      ) : (
        <p className={s.leftText}>{section.content}</p>
      )}
    </div>
  )
}

function LinksLeft({ section, isEdit }: { section: LinksSection; isEdit: boolean }) {
  const { addLinkItem, updateLinkItem, removeLinkItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addLinkItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#f0f0f0">
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <ResumeInput variant="dark" value={item.label} placeholder="Label"
                      style={{ fontSize: 10, color: "#f0f0f0", fontWeight: 500 }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                    <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
                  </div>
                  <ResumeInput variant="dark" value={item.url} placeholder="https://…"
                    style={{ fontSize: 9, color: "#f0f0f0", opacity: 0.6 }}
                    onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.filter((i) => i.label || i.url).map((item) => (
          <div key={item.id} className={s.leftLinkItem}>
            <a href={item.url || "#"} target="_blank" rel="noopener noreferrer"
              style={{ color: "#f0f0f0", textDecoration: "none", fontWeight: 500 }}>
              {item.label || item.url}
            </a>
          </div>
        ))
      )}
    </div>
  )
}

function HobbiesLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addSkillItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#f0f0f0">
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 4 }}>
                  <ResumeInput variant="dark" value={item.name} placeholder="Hobby / skill"
                    style={{ fontSize: 10, color: "#f0f0f0" }}
                    onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                  <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        <p className={s.leftText}>
          {section.items.map((i) => i.name).filter(Boolean).join(", ")}
        </p>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// RIGHT COLUMN SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })

  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addExperienceItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#4a4a4a">
                <div className={s.timelineEntry}>
                  <div className={s.timelineLeft}>
                    <ResumeInput value={item.company} placeholder="Company"
                      style={{ fontSize: 11, fontWeight: 700, textAlign: "right" }}
                      onChange={(e) => upd(item, "company", e.target.value)} />
                    <ResumeInput value={item.location} placeholder="Location"
                      style={{ fontSize: 9, textAlign: "right", color: "#666" }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                    <div style={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 50, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span style={{ fontSize: 9, color: "#666" }}>–</span>
                      {item.current
                        ? <span style={{ fontSize: 9, color: "#666" }}>Now</span>
                        : <ResumeInput value={item.endDate} placeholder="End"
                            style={{ fontSize: 9, width: 50 }}
                            onChange={(e) => upd(item, "endDate", e.target.value)} />
                      }
                    </div>
                    <label style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", cursor: "pointer" }}>
                      <input type="checkbox" checked={item.current}
                        onChange={(e) => upd(item, "current", e.target.checked)}
                        style={{ width: 10, height: 10 }} />
                      <span style={{ fontSize: 8, opacity: 0.5 }}>now</span>
                    </label>
                  </div>
                  <div className={s.timelineDotWrap} />
                  <div className={s.timelineRight}>
                    <div style={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                      <ResumeInput value={item.position} placeholder="Position"
                        style={{ fontSize: 11, fontWeight: 700, flex: 1 }}
                        onChange={(e) => upd(item, "position", e.target.value)} />
                      <RemoveBtn onClick={() => removeExperienceItem(section.id, item.id)} />
                    </div>
                    <ResumeTextarea value={item.description} placeholder="Bullet points (one per line)…"
                      style={{ fontSize: 10, lineHeight: 1.5 }}
                      onChange={(e) => upd(item, "description", e.target.value)} />
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.timelineEntry}>
            <div className={s.timelineLeft}>
              <div className={s.timelineCompany}>{item.company}</div>
              {item.location && <div className={s.timelineMeta}>{item.location}</div>}
              <div className={s.timelineMeta}>
                {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
              </div>
            </div>
            <div className={s.timelineDotWrap} />
            <div className={s.timelineRight}>
              <div className={s.timelinePosition}>{item.position}</div>
              {item.description && item.description.split("\n").filter(Boolean).map((line, i) => (
                <div key={i} className={s.timelineBullet}>{line}</div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function EducationRight({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })

  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addEducationItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#4a4a4a">
                <div className={s.timelineEntry}>
                  <div className={s.timelineLeft}>
                    <ResumeInput value={item.school} placeholder="School"
                      style={{ fontSize: 11, fontWeight: 700, textAlign: "right" }}
                      onChange={(e) => upd(item, "school", e.target.value)} />
                    <ResumeInput value={item.location} placeholder="City"
                      style={{ fontSize: 9, textAlign: "right", color: "#666" }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                    <div style={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 50, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span style={{ fontSize: 9, color: "#666" }}>–</span>
                      <ResumeInput value={item.endDate} placeholder="End"
                        style={{ fontSize: 9, width: 50 }}
                        onChange={(e) => upd(item, "endDate", e.target.value)} />
                    </div>
                  </div>
                  <div className={s.timelineDotWrap} />
                  <div className={s.timelineRight}>
                    <div style={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                      <ResumeInput value={item.degree} placeholder="Degree / Certificate"
                        style={{ fontSize: 11, fontWeight: 700, flex: 1 }}
                        onChange={(e) => upd(item, "degree", e.target.value)} />
                      <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
                    </div>
                    {item.description ? (
                      <ResumeTextarea value={item.description} placeholder="Description…"
                        style={{ fontSize: 10, lineHeight: 1.5 }}
                        onChange={(e) => upd(item, "description", e.target.value)} />
                    ) : null}
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.timelineEntry}>
            <div className={s.timelineLeft}>
              <div className={s.timelineCompany}>{item.school}</div>
              {item.location && <div className={s.timelineMeta}>{item.location}</div>}
              <div className={s.timelineMeta}>
                {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
              </div>
            </div>
            <div className={s.timelineDotWrap} />
            <div className={s.timelineRight}>
              <div className={s.timelinePosition}>{item.degree}</div>
              {item.description && <p className={s.timelineDesc}>{item.description}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function SkillsRight({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()

  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addSkillItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd modifiers={NO_MODIFIERS} onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className={s.skillsGrid}>
              {section.items.map((item) => (
                <SortableItem key={item.id} id={item.id} handleColor="#4a4a4a">
                  <div className={s.skillItem}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <ResumeInput value={item.name} placeholder="Skill"
                        style={{ fontSize: 10, flex: 1 }}
                        onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                      <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                    </div>
                    {section.showLevel && <SkillBar level={item.level} />}
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </ClientDnd>
      ) : (
        <div className={s.skillsGrid}>
          {section.items.map((item) => (
            <div key={item.id} className={s.skillItem}>
              <div className={s.skillLabel}>{item.name}</div>
              {section.showLevel && <SkillBar level={item.level} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LanguagesRight({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()

  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addLanguageItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#4a4a4a">
                <div className={s.skillItem}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <ResumeInput value={item.language} placeholder="Language"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                    <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                  </div>
                  {section.showLevel && <SkillBar level={item.level} />}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        <div className={s.skillsGrid}>
          {section.items.map((item) => (
            <div key={item.id} className={s.skillItem}>
              <div className={s.skillLabel}>{item.language}</div>
              {section.showLevel && <SkillBar level={item.level} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Contact field (right col header) ────────────────────────────────────────
function ContactField({ icon, placeholder, field, isEdit }: {
  icon: React.ReactNode; placeholder: string; field: keyof PersonalInfo; isEdit: boolean
}) {
  const value = useResumeStore((st) => st.personalInfo[field] as string)
  const updatePersonalInfo = useResumeStore((st) => st.updatePersonalInfo)
  if (!value && !isEdit) return null
  return (
    <div className={s.contactItem}>
      <div style={{ opacity: 0.5, flexShrink: 0, display: "flex", alignItems: "center" }}>
        {icon}
      </div>
      {isEdit ? (
        <ResumeInput value={value} placeholder={placeholder}
          style={{ fontSize: 9, minWidth: 90, color: "#666" }}
          onChange={(e) => updatePersonalInfo({ [field]: e.target.value })} />
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export function HtmlTemplate3({ mode }: { mode: Mode }) {
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

  const LEFT_TYPES  = ["about", "links"]
  const RIGHT_TYPES = ["experience", "education", "skills", "languages"]

  const leftSections  = sections.filter((sec) => LEFT_TYPES.includes(sec.type)  && (isEdit || sec.visible))
  const rightSections = sections.filter((sec) => RIGHT_TYPES.includes(sec.type) && (isEdit || sec.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const renderLeft = (sec: ResumeSection) => {
    if (sec.type === "about")  return <AboutLeft  key={sec.id} section={sec as AboutSection}  isEdit={isEdit} />
    if (sec.type === "links")  return <LinksLeft  key={sec.id} section={sec as LinksSection}  isEdit={isEdit} />
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

  const wrapLeft = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor="#f0f0f0" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderLeft(sec)}</div>
  }

  const wrapRight = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor="#4a4a4a" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderRight(sec)}</div>
  }

  const city    = personalInfo.city
  const country = personalInfo.country
  const location = [city, country].filter(Boolean).join(", ")

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      <ContactField key="email" icon={<Mail size={10} />} placeholder="Email" field="email" isEdit={isEdit} />
    ) : null,
    phone: personalInfo.phone || isEdit ? (
      <ContactField key="phone" icon={<Phone size={10} />} placeholder="Phone" field="phone" isEdit={isEdit} />
    ) : null,
    website: personalInfo.website || isEdit ? (
      <ContactField key="website" icon={<Globe size={10} />} placeholder="Website" field="website" isEdit={isEdit} />
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" className={s.contactItem}>
          <div style={{ opacity: 0.5 }}><MapPin size={10} /></div>
          <ResumeInput value={city} placeholder="City"
            style={{ fontSize: 9, color: "#666", minWidth: 60 }}
            onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
          <ResumeInput value={country} placeholder="Country"
            style={{ fontSize: 9, color: "#666", minWidth: 60 }}
            onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
        </div>
      ) : (
        <div key="location" className={s.contactItem}>
          <div style={{ opacity: 0.5 }}><MapPin size={10} /></div>
          <span>{location}</span>
        </div>
      )
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* ══ LEFT COLUMN ══ */}
      <div className={s.leftCol}>

        {/* Photo */}
        {personalInfo.photo ? (
          <div className={s.photoWrap}>
            <Image src={personalInfo.photo} alt="Profile" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
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
            className={s.photoPlaceholder}
            onClick={isEdit ? () => fileInputRef.current?.click() : undefined}
            style={{ cursor: isEdit ? "pointer" : "default" }}
          >
            <div className={s.photoPlaceholderIcon}>◉</div>
            {isEdit && <span className={s.photoPlaceholderText}>Click to upload</span>}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />

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
          leftSections.map((sec) => (<div key={sec.id}>{renderLeft(sec)}</div>))
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
