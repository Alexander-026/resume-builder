"use client"

import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, useSortable,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { useMounted } from "@/hooks/useMounted"
import { AddBtn, RemoveBtn, DragDots, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  ResumeSection, AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection,
  ExperienceItem, EducationItem,
} from "@/types/resume"
import s from "./HtmlTemplate2.module.scss"

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

// ═══════════════════════════════════════════════════════════════════════════════
// LEFT COLUMN SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ContactSection({ isEdit }: { isEdit: boolean }) {
  const { personalInfo, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
  const p = personalInfo
  const location = [p.city, p.country].filter(Boolean).join(", ")

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: p.email || isEdit ? (
      isEdit ? (
        <ResumeInput key="email" value={p.email} placeholder="Email"
          style={{ fontSize: 10, textAlign: "center", color: "#444", marginBottom: 3 }}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
      ) : (
        <div key="email" className={s.contactItem}>{p.email}</div>
      )
    ) : null,
    phone: p.phone || isEdit ? (
      isEdit ? (
        <ResumeInput key="phone" value={p.phone} placeholder="Phone"
          style={{ fontSize: 10, textAlign: "center", color: "#444", marginBottom: 3 }}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
      ) : (
        <div key="phone" className={s.contactItem}>{p.phone}</div>
      )
    ) : null,
    website: p.website || isEdit ? (
      isEdit ? (
        <ResumeInput key="website" value={p.website} placeholder="Website"
          style={{ fontSize: 10, textAlign: "center", color: "#444", marginBottom: 3 }}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
      ) : (
        <div key="website" className={s.contactItem}>{p.website}</div>
      )
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" style={{ display: "flex", gap: 3, justifyContent: "center" }}>
          <ResumeInput value={p.city} placeholder="City"
            style={{ fontSize: 10, textAlign: "center", color: "#444", marginBottom: 3 }}
            onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
          <ResumeInput value={p.country} placeholder="Country"
            style={{ fontSize: 10, textAlign: "center", color: "#444", marginBottom: 3 }}
            onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
        </div>
      ) : (
        <div key="location" className={s.contactItem}>{location}</div>
      )
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>Contact</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
          }}>
          <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
            {visibleContactIds.map((id) => (
              <SortableItem key={id} id={id} handleColor="#333">
                {contactFieldMap[id]}
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        visibleContactIds.map((id) => contactFieldMap[id] ?? null)
      )}
    </div>
  )
}

function EducationLeft({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })

  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addEducationItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
                    <ResumeInput value={item.degree} placeholder="Degree"
                      style={{ fontSize: 11, fontWeight: 700, textAlign: "center", color: "#1a1a1a" }}
                      onChange={(e) => upd(item, "degree", e.target.value)} />
                    <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
                  </div>
                  <ResumeInput value={item.school} placeholder="School"
                    style={{ fontSize: 10, fontStyle: "italic", textAlign: "center", color: "#555" }}
                    onChange={(e) => upd(item, "school", e.target.value)} />
                  <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>
                    <ResumeInput value={item.startDate} placeholder="Start"
                      style={{ fontSize: 9, textAlign: "center", color: "#888" }}
                      onChange={(e) => upd(item, "startDate", e.target.value)} />
                    <span style={{ fontSize: 9, color: "#888" }}>-</span>
                    <ResumeInput value={item.endDate} placeholder="End"
                      style={{ fontSize: 9, textAlign: "center", color: "#888" }}
                      onChange={(e) => upd(item, "endDate", e.target.value)} />
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <div className={s.eduDegree}>{item.degree}</div>
            <div className={s.eduSchool}>{item.school}</div>
            <div className={s.eduDates}>
              {item.startDate}{item.endDate ? ` - ${item.endDate}` : ""}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function SkillsLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
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
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  <ResumeInput value={item.name} placeholder="Skill"
                    style={{ fontSize: 10, textAlign: "center", color: "#444" }}
                    onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                  <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillName}>{item.name}</div>
        ))
      )}
    </div>
  )
}

function LanguagesLeft({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()

  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addLanguageItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  <ResumeInput value={item.language} placeholder="Language"
                    style={{ fontSize: 10, textAlign: "center", color: "#444" }}
                    onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                  <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillName}>{item.language}</div>
        ))
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
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div style={{ marginBottom: 6, textAlign: "center" }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                    <ResumeInput value={item.label} placeholder="Label"
                      style={{ fontSize: 10, textAlign: "center", fontWeight: 500, color: "#444" }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                    <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
                  </div>
                  <ResumeInput value={item.url} placeholder="https://..."
                    style={{ fontSize: 9, textAlign: "center", color: "#888" }}
                    onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.filter((i) => i.label || i.url).map((item) => (
          <div key={item.id} className={s.contactItem}>
            <a href={item.url || "#"} target="_blank" rel="noopener noreferrer"
              style={{ color: "#444", textDecoration: "none", fontWeight: 500 }}>
              {item.label || item.url}
            </a>
          </div>
        ))
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// RIGHT COLUMN SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function AboutRight({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      {isEdit ? (
        <ResumeTextarea value={section.content} placeholder="Professional summary..."
          className={s.aboutText}
          onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
      ) : (
        <p className={s.aboutText}>{section.content}</p>
      )}
    </div>
  )
}

function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })

  return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addExperienceItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div className={s.entry}>
                  <div className={s.entryTopRow}>
                    <ResumeInput value={item.position} placeholder="Position"
                      style={{ fontSize: 11, fontWeight: 700, flex: 1, textTransform: "uppercase", letterSpacing: "1px" }}
                      onChange={(e) => upd(item, "position", e.target.value)} />
                    <div className={s.entryDates}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 55 }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>-</span>
                      {item.current
                        ? <span>Present</span>
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
                  <div className={s.entrySub}>
                    <ResumeInput value={item.company} placeholder="Company"
                      style={{ fontSize: 10, fontStyle: "italic" }}
                      onChange={(e) => upd(item, "company", e.target.value)} />
                    <span style={{ opacity: 0.3 }}>.</span>
                    <ResumeInput value={item.location} placeholder="Location"
                      style={{ fontSize: 10, fontStyle: "italic" }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                  <ResumeTextarea value={item.description} placeholder="Responsibilities &amp; achievements..."
                    style={{ fontSize: 10, lineHeight: 1.65 }}
                    onChange={(e) => upd(item, "description", e.target.value)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.entry}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
              <span className={s.entryPosition}>{item.position}</span>
              <span className={s.entryDates} style={{ fontSize: 9, color: "#666", fontStyle: "italic" }}>
                {item.startDate}{item.current ? " - Present" : item.endDate ? ` - ${item.endDate}` : ""}
              </span>
            </div>
            <div className={s.entrySub}>
              {[item.company, item.location].filter(Boolean).join(" · ")}
            </div>
            {item.description && <p className={s.entryDesc}>{item.description}</p>}
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
      <div className={s.sectionHeading}>
        {section.label}
        {isEdit && <AddBtn onClick={() => addEducationItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#333">
                <div className={s.entry}>
                  <div className={s.entryTopRow}>
                    <ResumeInput value={item.degree} placeholder="Degree"
                      style={{ fontSize: 11, fontWeight: 700, flex: 1 }}
                      onChange={(e) => upd(item, "degree", e.target.value)} />
                    <div className={s.entryDates}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 55 }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>-</span>
                      <ResumeInput value={item.endDate} placeholder="End"
                        style={{ fontSize: 9, width: 55 }}
                        onChange={(e) => upd(item, "endDate", e.target.value)} />
                    </div>
                    <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
                  </div>
                  <div className={s.entrySub}>
                    <ResumeInput value={item.school} placeholder="School"
                      style={{ fontSize: 10, fontStyle: "italic" }}
                      onChange={(e) => upd(item, "school", e.target.value)} />
                    <span style={{ opacity: 0.3 }}>.</span>
                    <ResumeInput value={item.location} placeholder="Location"
                      style={{ fontSize: 10, fontStyle: "italic" }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.entry}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
              <span className={s.entryPosition}>{item.degree}</span>
              <span className={s.entryDates} style={{ fontSize: 9, color: "#666", fontStyle: "italic" }}>
                {item.startDate}{item.endDate ? ` - ${item.endDate}` : ""}
              </span>
            </div>
            <div className={s.entrySub}>
              {[item.school, item.location].filter(Boolean).join(" · ")}
            </div>
            {item.description && <p className={s.entryDesc}>{item.description}</p>}
          </div>
        ))
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
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
    if (sec.type === "about")      return <AboutRight     key={sec.id} section={sec as AboutSection}      isEdit={isEdit} />
    if (sec.type === "experience") return <ExperienceRight key={sec.id} section={sec as ExperienceSection} isEdit={isEdit} />
    if (sec.type === "education")  return <EducationRight  key={sec.id} section={sec as EducationSection}  isEdit={isEdit} />
    return null
  }

  const wrapLeft = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#333" visible={sec.visible}>
        {renderLeft(sec)}
      </SortableSection>
    ) : (<div key={sec.id}>{renderLeft(sec)}</div>)

  const wrapRight = (sec: ResumeSection) =>
    isEdit ? (
      <SortableSection key={sec.id} id={sec.id} handleColor="#555" visible={sec.visible}>
        {renderRight(sec)}
      </SortableSection>
    ) : (<div key={sec.id}>{renderRight(sec)}</div>)

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
            <div className={s.name}>
              {personalInfo.firstName} {personalInfo.lastName}
            </div>
            {personalInfo.jobTitle && <div className={s.jobTitle}>{personalInfo.jobTitle}</div>}
          </>
        )}
        <hr className={s.headerRule} />
      </div>

      {/* ══ BODY ══ */}
      <div className={s.body}>

        {/* LEFT */}
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
            leftSections.map((sec) => (<div key={sec.id}>{renderLeft(sec)}</div>))
          )}
        </div>

        {/* RIGHT */}
        <div className={s.rightCol}>
          {isEdit && mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter}
              onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={rightSections.map((sec) => sec.id)} strategy={verticalListSortingStrategy}>
                {rightSections.map(wrapRight)}
              </SortableContext>
            </DndContext>
          ) : (
            rightSections.map((sec) => (<div key={sec.id}>{renderRight(sec)}</div>))
          )}
        </div>
      </div>
    </div>
  )
}
