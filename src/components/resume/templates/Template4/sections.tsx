"use client"

import {
  SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { ResumeInput, ResumeTextarea } from "@/components/resume/ResumeFields"
import { useResumeStore } from "@/store/resumeStore"
import { AddBtn, RemoveBtn, SortableItem, ClientDnd } from "@/components/resume/shared"
import { Slider } from "@/components/ui/slider"
import type {
  AboutSection, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection,
  SkillLevel, ExperienceItem, EducationItem,
} from "@/types/resume"
import s from "./HtmlTemplate4.module.scss"

export const LEFT_HANDLE_COLOR  = "#f5c518"
export const RIGHT_HANDLE_COLOR = "#1a1a1a"

// ─── Skill bar (view only) ────────────────────────────────────────────────────
export function SkillBar({ level }: { level: number }) {
  const pct = Math.round((level / 5) * 100)
  return (
    <div className={s.skillTrack}>
      <div className={s.skillFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ─── Left: About ──────────────────────────────────────────────────────────────
export function AboutLeft({ section, isEdit }: { section: AboutSection; isEdit: boolean }) {
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
              <SortableItem key={item.id} id={item.id} handleColor={LEFT_HANDLE_COLOR}>
                <div className={s.skillItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ResumeInput variant="dark" value={item.name} placeholder="Skill"
                        style={{ fontSize: 10, color: "#f0ede8", flex: 1 }}
                        onChange={(e) => updateSkillItem(section.id, { ...item, name: e.target.value })} />
                      <RemoveBtn onClick={() => removeSkillItem(section.id, item.id)} />
                    </div>
                    {section.showLevel && (
                      <Slider
                        value={item.level}
                        onValueChange={(v) => updateSkillItem(section.id, { ...item, level: v as SkillLevel })}
                        fillColor="#f5c518"
                        thumbColor="#f5c518"
                        className="mt-1"
                      />
                    )}
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
              <SortableItem key={item.id} id={item.id} handleColor={LEFT_HANDLE_COLOR}>
                <div className={s.skillItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ResumeInput variant="dark" value={item.language} placeholder="Language"
                        style={{ fontSize: 10, color: "#f0ede8", flex: 1 }}
                        onChange={(e) => updateLanguageItem(section.id, { ...item, language: e.target.value })} />
                      <RemoveBtn onClick={() => removeLanguageItem(section.id, item.id)} />
                    </div>
                    {section.showLevel && (
                      <Slider
                        value={item.level}
                        onValueChange={(v) => updateLanguageItem(section.id, { ...item, level: v as SkillLevel })}
                        fillColor="#f5c518"
                        thumbColor="#f5c518"
                        className="mt-1"
                      />
                    )}
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

// ─── Right: Experience ────────────────────────────────────────────────────────
export function ExperienceSection({ section, isEdit }: { section: ExperienceSection; isEdit: boolean }) {
  const { addExperienceItem, updateExperienceItem, removeExperienceItem, reorderSectionItems } = useResumeStore()
  const upd = (item: ExperienceItem, f: keyof ExperienceItem, v: string | boolean) =>
    updateExperienceItem(section.id, { ...item, [f]: v })

  if (!isEdit) return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      {section.items.map((item) => {
        const sub = [item.company, item.location].filter(Boolean).join(" / ")
        const dates = item.startDate
          ? (item.current ? item.startDate + " – Present" : item.endDate ? item.startDate + " – " + item.endDate : item.startDate)
          : ""
        const subFull = sub && dates ? sub + " / " + dates : sub + dates
        return (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.position}</div>
            <div className={s.entrySub}>{subFull}</div>
            {item.description && <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>}
          </div>
        )
      })}
    </div>
  )

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
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <ResumeInput value={item.startDate} placeholder="Start"
                    style={{ fontSize: 9, width: 55, textAlign: "right" }}
                    onChange={(e) => upd(item, "startDate", e.target.value)} />
                  <span style={{ fontSize: 9, opacity: 0.35 }}>—</span>
                  {item.current ? (
                    <span style={{ fontSize: 9, opacity: 0.55 }}>Present</span>
                  ) : (
                    <ResumeInput value={item.endDate} placeholder="End"
                      style={{ fontSize: 9, width: 55 }}
                      onChange={(e) => upd(item, "endDate", e.target.value)} />
                  )}
                  <label style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>
                    <input type="checkbox" checked={item.current}
                      onChange={(e) => upd(item, "current", e.target.checked)}
                      style={{ width: 10, height: 10 }} />
                    <span style={{ fontSize: 8, opacity: 0.5 }}>now</span>
                  </label>
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

// ─── Right: Education ─────────────────────────────────────────────────────────
export function EducationSection({ section, isEdit }: { section: EducationSection; isEdit: boolean }) {
  const { addEducationItem, updateEducationItem, removeEducationItem, reorderSectionItems } = useResumeStore()
  const upd = (item: EducationItem, f: keyof EducationItem, v: string) =>
    updateEducationItem(section.id, { ...item, [f]: v })

  if (!isEdit) return (
    <div className={s.rightSection}>
      <div className={s.sectionHeading}>{section.label}</div>
      {section.items.map((item) => {
        const sub = [item.school, item.location].filter(Boolean).join(" / ")
        const dates = item.startDate
          ? (item.endDate ? item.startDate + " – " + item.endDate : item.startDate)
          : ""
        const subFull = sub && dates ? sub + " / " + dates : sub + dates
        return (
          <div key={item.id} className={s.entryBlock}>
            <div className={s.entryPosition}>{item.degree}</div>
            <div className={s.entrySub}>{subFull}</div>
            {item.description && <p className={s.entryDesc} style={{ margin: 0 }}>{item.description}</p>}
          </div>
        )
      })}
    </div>
  )

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
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <ResumeInput value={item.startDate} placeholder="Start"
                    style={{ fontSize: 9, width: 55, textAlign: "right" }}
                    onChange={(e) => upd(item, "startDate", e.target.value)} />
                  <span style={{ fontSize: 9, opacity: 0.35 }}>—</span>
                  <ResumeInput value={item.endDate} placeholder="End"
                    style={{ fontSize: 9, width: 55 }}
                    onChange={(e) => upd(item, "endDate", e.target.value)} />
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
