"use client"

import {
  SortableContext, verticalListSortingStrategy, rectSortingStrategy,
} from "@dnd-kit/sortable"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { AddBtn, RemoveBtn, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, SkillLevel,
  ExperienceItem, EducationItem, PersonalInfo,
} from "@/types/resume"
import s from "./HtmlTemplate3.module.scss"

const NO_MODIFIERS: import("@dnd-kit/core").Modifier[] = []

// ─── Skill progress bar ───────────────────────────────────────────────────────
export function SkillBar({ level }: { level: SkillLevel }) {
  const pct = level === 0 ? 0 : (level / 5) * 100
  return (
    <div className={s.skillTrack}>
      <div className={s.skillFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ─── Contact field (right col header) ────────────────────────────────────────
export function ContactField({ icon, placeholder, field, isEdit }: {
  icon: React.ReactNode; placeholder: string; field: keyof PersonalInfo; isEdit: boolean
}) {
  const value = useResumeStore((st) => st.personalInfo[field] as string)
  const updatePersonalInfo = useResumeStore((st) => st.updatePersonalInfo)
  if (!value && !isEdit) return null
  return (
    <div className={s.contactItem}>
      <div style={{ opacity: 0.5, flexShrink: 0, display: "flex", alignItems: "center" }}>{icon}</div>
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

export function buildContactFieldMap(isEdit: boolean, personalInfo: PersonalInfo, updatePersonalInfo: (p: object) => void) {
  const location = [personalInfo.city, personalInfo.country].filter(Boolean).join(", ")
  return {
    email:    personalInfo.email || isEdit
      ? <ContactField key="email"   icon={<Mail  size={10} />} placeholder="Email"   field="email"   isEdit={isEdit} />
      : null,
    phone:    personalInfo.phone || isEdit
      ? <ContactField key="phone"   icon={<Phone size={10} />} placeholder="Phone"   field="phone"   isEdit={isEdit} />
      : null,
    website:  personalInfo.website || isEdit
      ? <ContactField key="website" icon={<Globe size={10} />} placeholder="Website" field="website" isEdit={isEdit} />
      : null,
    location: location || isEdit
      ? isEdit ? (
          <div key="location" className={s.contactItem}>
            <div style={{ opacity: 0.5 }}><MapPin size={10} /></div>
            <ResumeInput value={personalInfo.city} placeholder="City"
              style={{ fontSize: 9, color: "#666", minWidth: 60 }}
              onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
            <ResumeInput value={personalInfo.country} placeholder="Country"
              style={{ fontSize: 9, color: "#666", minWidth: 60 }}
              onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
          </div>
        ) : (
          <div key="location" className={s.contactItem}>
            <div style={{ opacity: 0.5 }}><MapPin size={10} /></div>
            <span>{location}</span>
          </div>
        )
      : null,
  } as Record<string, React.ReactNode>
}

// ─── Left: About ──────────────────────────────────────────────────────────────
export function AboutLeft({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
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

// ─── Left: Links ──────────────────────────────────────────────────────────────
export function LinksLeft({ section, isEdit }: { section: LinksSection; isEdit: boolean }) {
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

// ─── Left: Hobbies (reuses skills store) ─────────────────────────────────────
export function HobbiesLeft({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
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

// ─── Right: Experience ────────────────────────────────────────────────────────
export function ExperienceRight({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
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
                    <div style={{ display: "flex", gap: 2, justifyContent: "flex-end", alignItems: "center" }}>
                      <ResumeInput value={item.startDate} placeholder="Start"
                        style={{ fontSize: 9, width: 60, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span style={{ fontSize: 9, color: "#666" }}>–</span>
                      {item.current
                        ? <span style={{ fontSize: 9, color: "#666" }}>Now</span>
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

// ─── Right: Education ─────────────────────────────────────────────────────────
export function EducationRight({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
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
                        style={{ fontSize: 9, width: 60, textAlign: "right" }}
                        onChange={(e) => upd(item, "startDate", e.target.value)} />
                      <span style={{ fontSize: 9, color: "#666" }}>–</span>
                      <ResumeInput value={item.endDate} placeholder="End"
                        style={{ fontSize: 9, width: 60 }}
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
              <div className={s.timelineMeta}>{item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}</div>
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

// ─── Right: Skills ────────────────────────────────────────────────────────────
export function SkillsRight({ section, isEdit }: { section: SkillsSection; isEdit: boolean }) {
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

// ─── Right: Languages ─────────────────────────────────────────────────────────
export function LanguagesRight({ section, isEdit }: { section: LanguagesSection; isEdit: boolean }) {
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
