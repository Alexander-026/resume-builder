"use client"

import { useRef } from "react"
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, useSortable,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Upload, Mail, Phone, MapPin, Globe } from "lucide-react"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { AddBtn, RemoveBtn, DragDots, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  ResumeSection, AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, SkillLevel,
  ExperienceItem, EducationItem, PersonalInfo,
} from "@/types/resume"
import s from "./HtmlTemplate1.module.scss"

type Mode = "edit" | "view"

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

// ─── Level dots ───────────────────────────────────────────────────────────────
function LevelDots({ level, color, onChange }: {
  level: SkillLevel; color: string; onChange?: (l: SkillLevel) => void
}) {
  return (
    <div className={s.levelDots}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={s.dot}
          onClick={() => onChange?.((i + 1) as SkillLevel)}
          title={onChange ? `Level ${i + 1}` : undefined}
          style={{
            backgroundColor: i < level ? color : "rgba(255,255,255,0.18)",
            cursor: onChange ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEFT COLUMN SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function SkillsEdit({ section, color }: { section: SkillsSection; color: string }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {section.items.map((item) => (
            <SortableItem key={item.id} id={item.id} handleColor={color}>
              <div className={s.skillItem}>
                <div style={{ flex: 1 }}>
                  <ResumeInput variant="dark" value={item.name} placeholder="Skill"
                    style={{ fontSize: 10.5, color }}
                    onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                  {section.showLevel && (
                    <LevelDots level={item.level} color={color}
                      onChange={(l) => updateSkillItem(section.id, { ...item, level: l })} />
                  )}
                </div>
                <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </ClientDnd>
      <AddBtn onClick={() => addSkillItem(section.id)}>Add skill</AddBtn>
    </div>
  )
}

function SkillsView({ section, color }: { section: SkillsSection; color: string }) {
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {section.items.map((item) => (
        <div key={item.id} style={{ marginBottom: 6 }}>
          <div className={s.skillName}>{item.name}</div>
          {section.showLevel && <LevelDots level={item.level} color={color} />}
        </div>
      ))}
    </div>
  )
}

function LanguagesEdit({ section, color }: { section: LanguagesSection; color: string }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {section.items.map((item) => (
            <SortableItem key={item.id} id={item.id} handleColor={color}>
              <div className={s.skillItem}>
                <div style={{ flex: 1 }}>
                  <ResumeInput variant="dark" value={item.language} placeholder="Language"
                    style={{ fontSize: 10.5, color }}
                    onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                  {section.showLevel && (
                    <LevelDots level={item.level} color={color}
                      onChange={(l) => updateLanguageItem(section.id, { ...item, level: l })} />
                  )}
                </div>
                <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </ClientDnd>
      <AddBtn onClick={() => addLanguageItem(section.id)}>Add language</AddBtn>
    </div>
  )
}

function LanguagesView({ section, color }: { section: LanguagesSection; color: string }) {
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {section.items.map((item) => (
        <div key={item.id} style={{ marginBottom: 6 }}>
          <div className={s.skillName}>{item.language}</div>
          {section.showLevel && <LevelDots level={item.level} color={color} />}
        </div>
      ))}
    </div>
  )
}

function LinksEdit({ section, color }: { section: LinksSection; color: string }) {
  const { addLinkItem, updateLinkItem, removeLinkItem, reorderSectionItems } = useResumeStore()
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {section.items.map((item) => (
            <SortableItem key={item.id} id={item.id} handleColor={color}>
              <div style={{ marginBottom: 8, display: "flex", gap: 4, flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <ResumeInput variant="dark" value={item.label} placeholder="Label (e.g. GitHub)"
                    style={{ fontSize: 10.5, color, fontWeight: 500, marginBottom: 2 }}
                    onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                  <ResumeInput variant="dark" value={item.url} placeholder="https://…"
                    style={{ fontSize: 9, color, opacity: 0.5 }}
                    onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                </div>
                <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </ClientDnd>
      <AddBtn onClick={() => addLinkItem(section.id)}>Add link</AddBtn>
    </div>
  )
}

function LinksView({ section }: { section: LinksSection }) {
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {section.items.filter((i) => i.label || i.url).map((item) => (
        <div key={item.id} className={s.linkItem}>
          <div className={s.linkDot} />
          <a href={item.url || "#"} target="_blank" rel="noopener noreferrer" className={s.linkLabel}>
            {item.label || item.url}
          </a>
        </div>
      ))}
    </div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutEdit({ section }: { section: AboutSection }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <ResumeTextarea variant="dark" value={section.content} placeholder="Professional summary..."
        className={s.aboutText}
        onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
    </div>
  )
}

function AboutView({ section }: { section: AboutSection }) {
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <p className={s.aboutText} style={{ margin: 0 }}>{section.content}</p>
    </div>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceEdit({ section, textColor }: { section: ExperienceSection; textColor: string }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })
  return (
    <div className={s.section}>
      <div className={s.sectionHeading}>
        <span>{section.label}</span>
        <AddBtn onClick={() => addExperienceItem(section.id)}>Add</AddBtn>
      </div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
      {section.items.map((item) => (
        <SortableItem key={item.id} id={item.id} handleColor={textColor}>
        <div className={s.entry}>
          <div className={s.entryTopRow}>
            <ResumeInput value={item.position} placeholder="Position"
              style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
              onChange={(e) => upd(item, "position", e.target.value)} />
            <div className={s.entryDates}>
              <ResumeInput value={item.startDate} placeholder="Start"
                style={{ fontSize: 9, width: 60, textAlign: "right" }}
                onChange={(e) => upd(item, "startDate", e.target.value)} />
              <span>–</span>
              {item.current
                ? <span>Present</span>
                : <ResumeInput value={item.endDate} placeholder="End"
                    style={{ fontSize: 9, width: 60 }}
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
          <div className={s.entrySub}>
            <ResumeInput value={item.company} placeholder="Company"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => upd(item, "company", e.target.value)} />
            <span style={{ opacity: 0.3 }}>·</span>
            <ResumeInput value={item.location} placeholder="Location"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => upd(item, "location", e.target.value)} />
          </div>
          <ResumeTextarea value={item.description} placeholder="Responsibilities &amp; achievements…"
            style={{ fontSize: 10, lineHeight: 1.6 }}
            onChange={(e) => upd(item, "description", e.target.value)} />
        </div>
        </SortableItem>
      ))}
        </SortableContext>
      </ClientDnd>
    </div>
  )
}

function ExperienceView({ section, textColor }: { section: ExperienceSection; textColor: string }) {
  void textColor
  return (
    <div className={s.section}>
      <div className={s.sectionHeading} style={{ display: "block" }}>{section.label}</div>
      {section.items.map((item) => (
        <div key={item.id} className={s.entry}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span className={s.entryTitle}>{item.position}</span>
            <span className={s.entryDates}>
              {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
            </span>
          </div>
          <div className={s.entrySub}>
            {[item.company, item.location].filter(Boolean).join(" · ")}
          </div>
          {item.description && <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>}
        </div>
      ))}
    </div>
  )
}

// ─── Education ────────────────────────────────────────────────────────────────
function EducationEdit({ section, textColor }: { section: EducationSection; textColor: string }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })
  return (
    <div className={s.section}>
      <div className={s.sectionHeading}>
        <span>{section.label}</span>
        <AddBtn onClick={() => addEducationItem(section.id)}>Add</AddBtn>
      </div>
      <ClientDnd onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
        }}>
        <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
      {section.items.map((item) => (
        <SortableItem key={item.id} id={item.id} handleColor={textColor}>
        <div className={s.entry}>
          <div className={s.entryTopRow}>
            <ResumeInput value={item.degree} placeholder="Degree / Certificate"
              style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
              onChange={(e) => upd(item, "degree", e.target.value)} />
            <div className={s.entryDates}>
              <ResumeInput value={item.startDate} placeholder="Start"
                style={{ fontSize: 9, width: 60, textAlign: "right" }}
                onChange={(e) => upd(item, "startDate", e.target.value)} />
              <span>–</span>
              <ResumeInput value={item.endDate} placeholder="End"
                style={{ fontSize: 9, width: 60 }}
                onChange={(e) => upd(item, "endDate", e.target.value)} />
            </div>
            <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
          </div>
          <div className={s.entrySub}>
            <ResumeInput value={item.school} placeholder="School / University"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => upd(item, "school", e.target.value)} />
            <span style={{ opacity: 0.3 }}>·</span>
            <ResumeInput value={item.location} placeholder="City"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => upd(item, "location", e.target.value)} />
          </div>
          {item.description !== "" && (
            <ResumeTextarea value={item.description} placeholder="Description…"
              style={{ fontSize: 10, lineHeight: 1.6 }}
              onChange={(e) => upd(item, "description", e.target.value)} />
          )}
        </div>
        </SortableItem>
      ))}
        </SortableContext>
      </ClientDnd>
    </div>
  )
}

function EducationView({ section, textColor }: { section: EducationSection; textColor: string }) {
  void textColor
  return (
    <div className={s.section}>
      <div className={s.sectionHeading} style={{ display: "block" }}>{section.label}</div>
      {section.items.map((item) => (
        <div key={item.id} className={s.entry}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span className={s.entryTitle}>{item.degree}</span>
            <span className={s.entryDates}>
              {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
            </span>
          </div>
          <div className={s.entrySub}>
            {[item.school, item.location].filter(Boolean).join(" · ")}
          </div>
          {item.description && <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>}
        </div>
      ))}
    </div>
  )
}

// ─── Contact field ────────────────────────────────────────────────────────────
function ContactField({ icon, placeholder, field, isEdit }: {
  icon: React.ReactNode; placeholder: string; field: keyof PersonalInfo; isEdit: boolean
}) {
  const value = useResumeStore((st) => st.personalInfo[field] as string)
  const updatePersonalInfo = useResumeStore((st) => st.updatePersonalInfo)
  if (!value && !isEdit) return null
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ opacity: 0.4, flexShrink: 0, display: "flex", alignItems: "center" }}>
        {icon}
      </div>
      {isEdit ? (
        <ResumeInput variant="dark" value={value} placeholder={placeholder}
          style={{ fontSize: 9, textAlign: "right", minWidth: 90 }}
          onChange={(e) => updatePersonalInfo({ [field]: e.target.value })} />
      ) : (
        <div className={s.contactItem}>{value}</div>
      )}
    </div>
  )
}

// City + Country combined contact field
function LocationField({ isEdit }: { isEdit: boolean }) {
  const city    = useResumeStore((st) => st.personalInfo.city)
  const country = useResumeStore((st) => st.personalInfo.country)
  const updatePersonalInfo = useResumeStore((st) => st.updatePersonalInfo)
  const combined = [city, country].filter(Boolean).join(", ")
  if (!combined && !isEdit) return null
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ opacity: 0.4, flexShrink: 0, display: "flex", alignItems: "center" }}>
        <MapPin size={10} />
      </div>
      {isEdit ? (
        <div style={{ display: "flex", gap: 3 }}>
          <ResumeInput variant="dark" value={city} placeholder="City"
            style={{ fontSize: 9, textAlign: "right", minWidth: 50 }}
            onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
          <span style={{ fontSize: 9, opacity: 0.4 }}>,</span>
          <ResumeInput variant="dark" value={country} placeholder="Country"
            style={{ fontSize: 9, textAlign: "right", minWidth: 60 }}
            onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
        </div>
      ) : (
        <div className={s.contactItem}>{combined}</div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export function HtmlTemplate1({ mode }: { mode: Mode }) {
  const { personalInfo, sections, theme, reorderSections, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
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

  const leftSections  = sections.filter((s) => LEFT_TYPES.includes(s.type)  && (isEdit || s.visible))
  const rightSections = sections.filter((s) => RIGHT_TYPES.includes(s.type) && (isEdit || s.visible))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) reorderSections(String(active.id), String(over.id))
  }

  const primary   = theme.primaryColor   || "#2d2d2d"
  const secondary = theme.secondaryColor || "#555555"

  const cssVars = {
    "--left-text":  theme.leftTextColor,
    "--right-text": theme.rightTextColor,
    "--primary":    primary,
    "--secondary":  secondary,
  } as React.CSSProperties

  const renderLeft = (sec: ResumeSection) => {
    const c = theme.leftTextColor
    if (sec.type === "about")     return <AboutView     section={sec as AboutSection} />
    if (sec.type === "skills")    return <SkillsView    section={sec as SkillsSection}    color={c} />
    if (sec.type === "languages") return <LanguagesView section={sec as LanguagesSection} color={c} />
    if (sec.type === "links")     return <LinksView     section={sec as LinksSection} />
    return null
  }

  const renderLeftEdit = (sec: ResumeSection) => {
    const c = theme.leftTextColor
    if (sec.type === "about")     return <AboutEdit     section={sec as AboutSection} />
    if (sec.type === "skills")    return <SkillsEdit    section={sec as SkillsSection}    color={c} />
    if (sec.type === "languages") return <LanguagesEdit section={sec as LanguagesSection} color={c} />
    if (sec.type === "links")     return <LinksEdit     section={sec as LinksSection}     color={c} />
    return null
  }

  const renderRight = (sec: ResumeSection) => {
    const t = theme.rightTextColor
    if (sec.type === "experience") return <ExperienceView section={sec as ExperienceSection} textColor={t} />
    if (sec.type === "education")  return <EducationView  section={sec as EducationSection}  textColor={t} />
    return null
  }

  const renderRightEdit = (sec: ResumeSection) => {
    const t = theme.rightTextColor
    if (sec.type === "experience") return <ExperienceEdit section={sec as ExperienceSection} textColor={t} />
    if (sec.type === "education")  return <EducationEdit  section={sec as EducationSection}  textColor={t} />
    return null
  }

  const wrapLeft = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={theme.leftTextColor} visible={sec.visible}>
        {renderLeftEdit(sec)}
      </SortableSection>
    ) : (<div key={sec.id}>{renderLeft(sec)}</div>)

  const wrapRight = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor={primary} visible={sec.visible}>
        {renderRightEdit(sec)}
      </SortableSection>
    ) : (<div key={sec.id}>{renderRight(sec)}</div>)

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: (
      <ContactField key="email" icon={<Mail size={10} />} placeholder="Email" field="email" isEdit={isEdit} />
    ),
    phone: (
      <ContactField key="phone" icon={<Phone size={10} />} placeholder="Phone" field="phone" isEdit={isEdit} />
    ),
    website: (
      <ContactField key="website" icon={<Globe size={10} />} placeholder="Website" field="website" isEdit={isEdit} />
    ),
    location: (
      <LocationField key="location" isEdit={isEdit} />
    ),
  }

  // Only include contact fields that have actual data (or are in edit mode so the user can fill them in)
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
      <div className={s.leftCol}
        style={{ backgroundColor: theme.leftBgColor, color: theme.leftTextColor }}>

        {/* Photo — full width */}
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

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />

        {/* Left sections */}
        <div className={s.leftBody}>
          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={leftSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {leftSections.map(wrapLeft)}
              </SortableContext>
            </DndContext>
          ) : (
            leftSections.map(isEdit ? wrapLeft : (sec) => (<div key={sec.id}>{renderLeft(sec)}</div>))
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
