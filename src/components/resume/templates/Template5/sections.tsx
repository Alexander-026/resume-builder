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
import s from "./HtmlTemplate5.module.scss"

const HANDLE_COLOR = "#a0b4c8"

// ─── Left: Contact ────────────────────────────────────────────────────────────
export function ContactLeft({ isEdit }: { isEdit: boolean }) {
  const { personalInfo, updatePersonalInfo, contactOrder, reorderContactFields } = useResumeStore()
  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")

  if (!isEdit && !location && !personalInfo.phone && !personalInfo.email && !personalInfo.website) return null

  const contactFieldMap: Record<string, React.ReactNode> = {
    email: personalInfo.email || isEdit ? (
      isEdit ? (
        <div key="email" className={s.contactItem}>
          <div className={s.contactLabel}>Email</div>
          <ResumeInput variant="dark" value={personalInfo.email} placeholder="Email"
            style={{ fontSize: 10 }} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
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
            style={{ fontSize: 10 }} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
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
            style={{ fontSize: 10 }} onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
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
              style={{ fontSize: 10, flex: 1 }} onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
            <ResumeInput variant="dark" value={personalInfo.country} placeholder="Country"
              style={{ fontSize: 10, flex: 1 }} onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
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
              style={{ fontSize: 10 }} onChange={(e) => updatePersonalInfo({ address: e.target.value })} />
          </div>
          <ClientDnd onDragEnd={({ active, over }) => {
              if (over && active.id !== over.id) reorderContactFields(String(active.id), String(over.id))
            }}>
            <SortableContext items={visibleContactIds} strategy={verticalListSortingStrategy}>
              {visibleContactIds.map((id) => (
                <SortableItem key={id} id={id} handleColor={HANDLE_COLOR}>
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

// ─── Left: Skills ─────────────────────────────────────────────────────────────
export function SkillsLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
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
              <SortableItem key={item.id} id={item.id} handleColor={HANDLE_COLOR}>
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
          <div key={item.id} className={s.bulletItem}><span>{`• ${item.name}`}</span></div>
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
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={HANDLE_COLOR}>
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
          <div key={item.id} className={s.bulletItem}><span>{`• ${item.language}`}</span></div>
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
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={HANDLE_COLOR}>
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
          <div key={item.id} className={s.bulletItem}><span>{`• ${item.label || item.url}`}</span></div>
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

// ─── Right: Experience ────────────────────────────────────────────────────────
export function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })
  const rightHandleColor = "#263447"
  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={rightHandleColor}>
                <div className={s.entryBlock}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                    <ResumeInput value={item.position} placeholder="Position"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
                      onChange={(e) => upd(item, "position", e.target.value)} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 60, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span>–</span>
                      {item.current
                        ? <span style={{ fontSize: 9, opacity: 0.6 }}>Present</span>
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

// ─── Right: Education ─────────────────────────────────────────────────────────
export function EducationRight({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })
  const rightHandleColor = "#263447"
  return (
    <div className={s.rightSection}>
      <div className={s.rightSectionTitle}>{section.label}</div>
      {isEdit ? (
        <ClientDnd onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) reorderSectionItems(section.id, String(active.id), String(over.id))
          }}>
          <SortableContext items={section.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id} handleColor={rightHandleColor}>
                <div className={s.entryBlock}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                    <ResumeInput value={item.degree} placeholder="Degree / Certificate"
                      style={{ fontSize: 12, fontWeight: 700, flex: 1 }}
                      onChange={(e) => upd(item, "degree", e.target.value)} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
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
