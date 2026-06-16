"use client"

import {
  SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { AddBtn, RemoveBtn, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection,
  ExperienceItem, EducationItem,
} from "@/types/resume"
import s from "./HtmlTemplate6.module.scss"

// ─── Square bullet ────────────────────────────────────────────────────────────
export function SquareBullet() {
  return <span className={s.squareBullet} />
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export function ContactLeft({ isEdit }: { isEdit: boolean }) {
  const { personalInfo, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      isEdit ? (
        <div key="email" className={s.contactItem}>
          <SquareBullet />
          <ResumeInput variant="light" value={personalInfo.email} placeholder="Email"
            style={{ fontSize: 10, color: "#555" }}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
        </div>
      ) : (
        <div key="email" className={s.contactItem}>
          <SquareBullet />
          <span>{personalInfo.email}</span>
        </div>
      )
    ) : null,
    phone: personalInfo.phone || isEdit ? (
      isEdit ? (
        <div key="phone" className={s.contactItem}>
          <SquareBullet />
          <ResumeInput variant="light" value={personalInfo.phone} placeholder="Phone"
            style={{ fontSize: 10, color: "#555" }}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
        </div>
      ) : (
        <div key="phone" className={s.contactItem}>
          <SquareBullet />
          <span>{personalInfo.phone}</span>
        </div>
      )
    ) : null,
    website: personalInfo.website || isEdit ? (
      isEdit ? (
        <div key="website" className={s.contactItem}>
          <SquareBullet />
          <ResumeInput variant="light" value={personalInfo.website} placeholder="Website"
            style={{ fontSize: 10, color: "#555" }}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
        </div>
      ) : (
        <div key="website" className={s.contactItem}>
          <SquareBullet />
          <span>{personalInfo.website}</span>
        </div>
      )
    ) : null,
    location: location || isEdit ? (
      isEdit ? (
        <div key="location" className={s.contactItem}>
          <SquareBullet />
          <div style={{ display: "flex", gap: 3 }}>
            <ResumeInput variant="light" value={personalInfo.city} placeholder="City"
              style={{ fontSize: 10, color: "#555", minWidth: 50 }}
              onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
            <span style={{ fontSize: 10, color: "#aaa" }}>,</span>
            <ResumeInput variant="light" value={personalInfo.country} placeholder="Country"
              style={{ fontSize: 10, color: "#555", minWidth: 60 }}
              onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
          </div>
        </div>
      ) : (
        <div key="location" className={s.contactItem}>
          <SquareBullet />
          <span>{location}</span>
        </div>
      )
    ) : null,
  }

  const visibleContactIds = contactOrder.filter((id) => contactFieldMap[id] != null)

  return (
    <div>
      <div className={s.sectionTitle} style={{ marginTop: 0 }}>Contact</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
          }}>
          <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
            {visibleContactIds.map((id) => (
              <SortableItem key={id} id={id} handleColor="#999">
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

// ─── Left: Skills ─────────────────────────────────────────────────────────────
export function SkillsLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
  const { addSkillItem, updateSkillItem, removeSkillItem, reorderSectionItems } = useResumeStore()
  return (
    <div>
      <div className={s.sectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#999">
                <div className={s.skillItem}>
                  <ResumeInput variant="light" value={item.name} placeholder="Skill"
                    style={{ fontSize: 10, color: "#444", flex: 1 }}
                    onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                  <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillItem}>
            <SquareBullet />
            <span>{item.name}</span>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addSkillItem(section.id)}>Add skill</AddBtn>}
    </div>
  )
}

// ─── Left: Languages ──────────────────────────────────────────────────────────
export function LanguagesLeft({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
  const { addLanguageItem, updateLanguageItem, removeLanguageItem, reorderSectionItems } = useResumeStore()
  return (
    <div>
      <div className={s.sectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#999">
                <div className={s.skillItem}>
                  <ResumeInput variant="light" value={item.language} placeholder="Language"
                    style={{ fontSize: 10, color: "#444", flex: 1 }}
                    onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                  <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.skillItem}>
            <SquareBullet />
            <span>{item.language}</span>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLanguageItem(section.id)}>Add language</AddBtn>}
    </div>
  )
}

// ─── Left: Links ──────────────────────────────────────────────────────────────
export function LinksLeft({ section, isEdit }: { section: LinksSection; isEdit: boolean }) {
  const { addLinkItem, updateLinkItem, removeLinkItem, reorderSectionItems } = useResumeStore()
  return (
    <div>
      <div className={s.sectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#999">
                <div style={{ marginBottom: 8, display: "flex", gap: 4 }}>
                  <div style={{ flex: 1 }}>
                    <ResumeInput variant="light" value={item.label} placeholder="Label"
                      style={{ fontSize: 10, color: "#444", fontWeight: 500, marginBottom: 2 }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, label: e.target.value })} />
                    <ResumeInput variant="light" value={item.url} placeholder="https://…"
                      style={{ fontSize: 9, color: "#888" }}
                      onChange={(e) => updateLinkItem(section.id, { ...item, url: e.target.value })} />
                  </div>
                  <RemoveBtn onClick={() => removeLinkItem(section.id, item.id)} />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.filter((i) => i.label || i.url).map((item) => (
          <div key={item.id} className={s.skillItem}>
            <SquareBullet />
            <a href={item.url || "#"} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 10, color: "#444", fontWeight: 500 }}>
              {item.label || item.url}
            </a>
          </div>
        ))
      )}
      {isEdit && <AddBtn onClick={() => addLinkItem(section.id)}>Add link</AddBtn>}
    </div>
  )
}

// ─── Right: About ─────────────────────────────────────────────────────────────
export function AboutRight({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
  const updateSection = useResumeStore((st) => st.updateSection)
  return (
    <div>
      <div className={s.sectionTitle} style={{ marginTop: 0 }}>{section.label}</div>
      {isEdit ? (
        <ResumeTextarea variant="light" value={section.content} placeholder="Professional summary..."
          className={s.aboutText}
          onChange={(e) => updateSection(section.id, { content: e.target.value } as Partial<AboutSection>)} />
      ) : (
        <p className={s.aboutText}>{section.content}</p>
      )}
    </div>
  )
}

// ─── Right: Experience ────────────────────────────────────────────────────────
export function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })

  return (
    <div>
      <div className={s.sectionTitle} style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{section.label}</span>
        {isEdit && <AddBtn onClick={() => addExperienceItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#999">
                <div className={s.entry}>
                  <div className={s.entryTopRow}>
                    <ResumeInput variant="light" value={item.position} placeholder="Position"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1, color: "#111" }}
                      onChange={(e) => upd(item, "position", e.target.value)} />
                    <div className={s.entryDates}>
                      <ResumeInput variant="light" value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 60, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>–</span>
                      {item.current
                        ? <span>Present</span>
                        : <ResumeInput variant="light" value={item.endDate} placeholder="End"
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
                  <div className={s.entrySubRow}>
                    <ResumeInput variant="light" value={item.company} placeholder="Company"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "company", e.target.value)} />
                    <span style={{ opacity: 0.3 }}>·</span>
                    <ResumeInput variant="light" value={item.location} placeholder="Location"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                  <ResumeTextarea variant="light" value={item.description} placeholder="Responsibilities & achievements…"
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
            <div className={s.entryPosition}>{item.position}</div>
            <div className={s.entrySub}>
              {[item.company, item.location].filter(Boolean).join(" · ")}
              {(item.startDate || item.endDate || item.current) && (
                <span style={{ marginLeft: 6, opacity: 0.8 }}>
                  {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                </span>
              )}
            </div>
            {item.description && (
              <p className={s.entryDesc}>
                {item.description.split("\n").map((line, i) => (
                  <span key={i}>{line}{i < item.description.split("\n").length - 1 && <br />}</span>
                ))}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

// ─── Right: Education ─────────────────────────────────────────────────────────
export function EducationRight({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })

  return (
    <div>
      <div className={s.sectionTitle} style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{section.label}</span>
        {isEdit && <AddBtn onClick={() => addEducationItem(section.id)}>Add</AddBtn>}
      </div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor="#999">
                <div className={s.entry}>
                  <div className={s.entryTopRow}>
                    <ResumeInput variant="light" value={item.degree} placeholder="Degree / Certificate"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1, color: "#111" }}
                      onChange={(e) => upd(item, "degree", e.target.value)} />
                    <div className={s.entryDates}>
                      <ResumeInput variant="light" value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 60, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>–</span>
                      <ResumeInput variant="light" value={item.endDate} placeholder="End"
                        style={{ fontSize: 9, width: 60 }}
                        onChange={(e) => upd(item, "endDate", e.target.value)} />
                    </div>
                    <RemoveBtn onClick={() => removeEducationItem(section.id, item.id)} />
                  </div>
                  <div className={s.entrySubRow}>
                    <ResumeInput variant="light" value={item.school} placeholder="School / University"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "school", e.target.value)} />
                    <span style={{ opacity: 0.3 }}>·</span>
                    <ResumeInput variant="light" value={item.location} placeholder="City"
                      style={{ fontSize: 10, flex: 1 }}
                      onChange={(e) => upd(item, "location", e.target.value)} />
                  </div>
                  {item.description !== "" && (
                    <ResumeTextarea variant="light" value={item.description} placeholder="Description…"
                      style={{ fontSize: 10, lineHeight: 1.65 }}
                      onChange={(e) => upd(item, "description", e.target.value)} />
                  )}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </ClientDnd>
      ) : (
        section.items.map((item) => (
          <div key={item.id} className={s.entry}>
            <div className={s.entryPosition}>{item.degree}</div>
            <div className={s.entrySub}>
              {[item.school, item.location].filter(Boolean).join(" · ")}
              {(item.startDate || item.endDate) && (
                <span style={{ marginLeft: 6, opacity: 0.8 }}>
                  {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
                </span>
              )}
            </div>
            {item.description && <p className={s.entryDesc}>{item.description}</p>}
          </div>
        ))
      )}
    </div>
  )
}
