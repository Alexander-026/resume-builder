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
import { Upload } from "lucide-react"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { AddBtn, RemoveBtn, DragDots, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  ResumeSection, AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection,
  ExperienceItem, EducationItem,
} from "@/types/resume"
import s from "./HtmlTemplate5.module.scss"

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

// ─── LEFT COLUMN SECTIONS ─────────────────────────────────────────────────────

function ContactLeft({ isEdit }: { isEdit: boolean }) {
  const { personalInfo, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")

  if (!isEdit && !location && !personalInfo.phone && !personalInfo.email && !personalInfo.website) return null

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      isEdit ? (
        <div key="email" className={s.contactItem}>
          <div className={s.contactLabel}>Email</div>
          <ResumeInput variant="dark" value={personalInfo.email} placeholder="Email"
            style={{ fontSize: 10 }}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
        </div>
      ) : (
        <div key="email" className={s.contactItem}>
          <div className={s.contactLabel}>Email</div>
          <div className={s.contactValue}>{personalInfo.email}</div>
        </div>
      )
    ) : null,
    phone: personalInfo.phone || isEdit ? (
      isEdit ? (
        <div key="phone" className={s.contactItem}>
          <div className={s.contactLabel}>Phone</div>
          <ResumeInput variant="dark" value={personalInfo.phone} placeholder="Phone"
            style={{ fontSize: 10 }}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
        </div>
      ) : (
        <div key="phone" className={s.contactItem}>
          <div className={s.contactLabel}>Phone</div>
          <div className={s.contactValue}>{personalInfo.phone}</div>
        </div>
      )
    ) : null,
    website: personalInfo.website || isEdit ? (
      isEdit ? (
        <div key="website" className={s.contactItem}>
          <div className={s.contactLabel}>Website</div>
          <ResumeInput variant="dark" value={personalInfo.website} placeholder="https://…"
            style={{ fontSize: 10 }}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
        </div>
      ) : (
        <div key="website" className={s.contactItem}>
          <div className={s.contactLabel}>Website</div>
          <div className={s.contactValue}>{personalInfo.website}</div>
        </div>
      )
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" className={s.contactItem}>
          <div className={s.contactLabel}>City, Country</div>
          <div style={{ display: "flex", gap: 4 }}>
            <ResumeInput variant="dark" value={personalInfo.city} placeholder="City"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
            <ResumeInput variant="dark" value={personalInfo.country} placeholder="Country"
              style={{ fontSize: 10, flex: 1 }}
              onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
          </div>
        </div>
      ) : (
        <div key="location" className={s.contactItem}>
          <div className={s.contactLabel}>Location</div>
          <div className={s.contactValue}>{location}</div>
        </div>
      )
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>Contact</div>
      {isEdit ? (
        <>
          <div className={s.contactItem}>
            <div className={s.contactLabel}>Address</div>
            <ResumeInput variant="dark" value={personalInfo.address} placeholder="Address"
              style={{ fontSize: 10 }}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })} />
          </div>
          <ClientDnd onDragEnd={({ active, over }) => {
              if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
            }}>
            <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
              {visibleContactIds.map((id) => (
                <SortableItem key={id} id={id} handleColor="#a0b4c8">
                  {contactFieldMap[id]}
                </SortableItem>
              ))}
            </SortableContext>
          </ClientDnd>
        </>
      ) : (
        <>
          {personalInfo.address && (
            <div className={s.contactItem}>
              <div className={s.contactLabel}>Address</div>
              <div className={s.contactValue}>{personalInfo.address}</div>
            </div>
          )}
          {visibleContactIds.map((id) => contactFieldMap[id] ?? null)}
        </>
      )}
    </div>
  )
}

function SkillsLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()
  const handleColor = "#a0b4c8"
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={handleColor}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <span className={s.bulletDot}>•</span>
                  <ResumeInput variant="dark" value={item.name} placeholder="Skill"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                  <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.bulletItem}>
            <span>{`• ${item.name}`}</span>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addSkillItem(section.id)}>Add skill</AddBtn>}
    </div>
  )
}

function LanguagesLeft({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()
  const handleColor = "#a0b4c8"
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={handleColor}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <span className={s.bulletDot}>•</span>
                  <ResumeInput variant="dark" value={item.language} placeholder="Language"
                    style={{ fontSize: 10, flex: 1 }}
                    onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                  <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.bulletItem}>
            <span>{`• ${item.language}`}</span>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLanguageItem(section.id)}>Add language</AddBtn>}
    </div>
  )
}

function LinksLeft({ section, isEdit }: { section: LinksSection; isEdit: boolean }) {
  const { addLinkItem, updateLinkItem, removeLinkItem, reorderSectionItems } = useResumeStore()
  const handleColor = "#a0b4c8"
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={handleColor}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={s.bulletDot}>•</span>
                    <ResumeInput variant="dark" value={item.label} placeholder="Label"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                    <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
                  </div>
                  <ResumeInput variant="dark" value={item.url} placeholder="https://…"
                    style={{ fontSize: 9, opacity: 0.5, marginLeft: 14 }}
                    onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.bulletItem}>
            <span>{`• ${item.label || item.url}`}</span>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLinkItem(section.id)}>Add link</AddBtn>}
    </div>
  )
}

// ─── RIGHT COLUMN SECTIONS ────────────────────────────────────────────────────

function AboutRight({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ResumeTextarea value={section.content} placeholder="Professional summary..."
          style={{ fontSize: 10, lineHeight: 1.65, color: "#444" }}
          onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
      ) : (
        <p className={s.aboutText} style={{ margin: 0 }}>{section.content}</p>
      )}
    </div>
  )
}

function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })
  const handleColor = "#263447"
  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={handleColor}>
                <div className={s.entryBlock}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                    <ResumeInput value={item.position} placeholder="Position"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
                      onChange={(e) => upd(item, "position", e.target.value)} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 55, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>–</span>
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
                    <span style={{ opacity: 0.3 }}>·</span>
                    <ResumeInput value={item.location} placeholder="Location"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                  <ResumeTextarea value={item.description} placeholder="Responsibilities & achievements…"
                    style={{ fontSize: 10, lineHeight: 1.5, marginTop: 6 }}
                    onChange={(e) => upd(item, "description", e.target.value)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.position}</div>
            <div className={s.entrySub}>
              {[item.company, item.location].filter(Boolean).join(" · ")}
              {(item.company || item.location) && (item.startDate || item.endDate) ? " · " : ""}
              {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
            </div>
            {item.description && item.description.split("\n").filter(Boolean).map((line, i) => (
              <div key={i} className={s.descBullet}>{`• ${line}`}</div>
            ))}
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addExperienceItem(section.id)}>Add experience</AddBtn>}
    </div>
  )
}

function EducationRight({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })
  const handleColor = "#263447"
  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={handleColor}>
                <div className={s.entryBlock}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                    <ResumeInput value={item.degree} placeholder="Degree / Certificate"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
                      onChange={(e) => upd(item, "degree", e.target.value)} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 55, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>–</span>
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
                    <span style={{ opacity: 0.3 }}>·</span>
                    <ResumeInput value={item.location} placeholder="City"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                  {item.description !== "" && (
                    <ResumeTextarea value={item.description} placeholder="Description..."
                      style={{ fontSize: 10, lineHeight: 1.5, marginTop: 6 }}
                      onChange={(e) => upd(item, "description", e.target.value)} />
                  )}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.degree}</div>
            <div className={s.entrySub}>
              {[item.school, item.location].filter(Boolean).join(" · ")}
              {(item.school || item.location) && (item.startDate || item.endDate) ? " · " : ""}
              {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
            </div>
            {item.description && (
              <p className={s.aboutText} style={{ margin: 0 }}>{item.description}</p>
            )}
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addEducationItem(section.id)}>Add education</AddBtn>}
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export function HtmlTemplate5({ mode }: { mode: Mode }) {
  const { personalInfo, sections, reorderSections, updatePersonalInfo } = useResumeStore()
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

  const wrapLeft = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor="#a0b4c8" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderLeft(sec)}</div>
  }

  const wrapRight = (sec: ResumeSection): React.ReactElement => {
    if (isEdit) return (
      <SortableSection key={sec.id} id={sec.id} handleColor="#263447" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    )
    return <div key={sec.id}>{renderRight(sec)}</div>
  }

  return (
    <div className={[s.resume, isEdit ? s.editMode : ""].join(" ")}>

      {/* LEFT COLUMN */}
      <div className={s.leftCol}>

        {/* Circular photo */}
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
              <span className={s.photoPlaceholderIcon}>◉</span>
              {isEdit && <span className={s.photoPlaceholderText} style={{ position: "absolute", bottom: -28, fontSize: 8, opacity: 0.5, whiteSpace: "nowrap" }}>Click to upload</span>}
            </div>
            {isEdit && (
              <div className={s.photoOverlay}>
                <Upload size={16} color="white" />
              </div>
            )}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*"
          style={{ display: "none" }} onChange={handlePhotoUpload} />

        {/* Contact section always shown in left */}
        <ContactLeft isEdit={isEdit} />

        {/* Other left sections with section-level DnD */}
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

        {/* Header */}
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
