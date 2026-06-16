"use client"

import {
  SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Mail, Phone, Globe, MapPin } from "lucide-react"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { AddBtn, RemoveBtn, SortableItem, ClientDnd } from "@/components/resume/shared"
import type {
  AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, SkillLevel,
  ExperienceItem, EducationItem, PersonalInfo,
} from "@/types/resume"
import s from "./HtmlTemplate1.module.scss"

// ─── Level dots ───────────────────────────────────────────────────────────────
export function LevelDots({ level, color, onChange }: {
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

// ─── Contact fields ───────────────────────────────────────────────────────────
export function ContactField({ icon, placeholder, field, isEdit }: {
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

export function LocationField({ isEdit }: { isEdit: boolean }) {
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

export function buildContactFieldMap(isEdit: boolean): Record<string, React.ReactNode> {
  return {
    email:    <ContactField key="email"    icon={<Mail  size={10} />} placeholder="Email"   field="email"   isEdit={isEdit} />,
    phone:    <ContactField key="phone"    icon={<Phone size={10} />} placeholder="Phone"   field="phone"   isEdit={isEdit} />,
    website:  <ContactField key="website"  icon={<Globe size={10} />} placeholder="Website" field="website" isEdit={isEdit} />,
    location: <LocationField key="location" isEdit={isEdit} />,
  }
}

// ─── Left: About ──────────────────────────────────────────────────────────────
export function AboutEdit({ section }: { section: AboutSection }) {
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

export function AboutView({ section }: { section: AboutSection }) {
  return (
    <div className={s.leftSection}>
      <div className={s.leftSectionTitle}>{section.label}</div>
      <p className={s.aboutText} style={{ margin: 0 }}>{section.content}</p>
    </div>
  )
}

// ─── Left: Skills ─────────────────────────────────────────────────────────────
export function SkillsEdit({ section, color }: { section: SkillsSection; color: string }) {
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

export function SkillsView({ section, color }: { section: SkillsSection; color: string }) {
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

// ─── Left: Languages ──────────────────────────────────────────────────────────
export function LanguagesEdit({ section, color }: { section: LanguagesSection; color: string }) {
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

export function LanguagesView({ section, color }: { section: LanguagesSection; color: string }) {
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

// ─── Left: Links ──────────────────────────────────────────────────────────────
export function LinksEdit({ section, color }: { section: LinksSection; color: string }) {
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

export function LinksView({ section }: { section: LinksSection }) {
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

// ─── Right: Experience ────────────────────────────────────────────────────────
export function ExperienceEdit({ section, textColor }: { section: ExperienceSection; textColor: string }) {
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

export function ExperienceView({ section }: { section: ExperienceSection }) {
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

// ─── Right: Education ─────────────────────────────────────────────────────────
export function EducationEdit({ section, textColor }: { section: EducationSection; textColor: string }) {
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

export function EducationView({ section }: { section: EducationSection }) {
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
