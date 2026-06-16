import {
  Document, Page, View, Text, Image, Svg, Path, Circle,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection, SkillLevel,
} from "@/types/resume"

// Sherlock — Dark gray left, circular photo, timeline experience

// ─── Timeline constants (mirrors HtmlTemplate3.module.scss) ───────────────────
const TL_DOT_SIZE = 7.5
const TL_DOT_LEFT = 3
const TL_DOT_TOP  = 2.25
const TL_LINE_W   = 1.5
const TL_GAP      = 12

const TL_LINE_LEFT = TL_DOT_LEFT + TL_DOT_SIZE / 2 - TL_LINE_W / 2
const TL_LINE_TOP  = TL_DOT_TOP + TL_DOT_SIZE
const TL_LINE_BOT  = -(TL_GAP + TL_DOT_TOP)

// ─── PDF Icons ────────────────────────────────────────────────────────────────
function IconMail({ size = 8, color = "#666" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconPhone({ size = 8, color = "#666" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconMapPin({ size = 8, color = "#666" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconGlobe({ size = 8, color = "#666" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}

// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ level }: { level: SkillLevel }) {
  const pct = level === 0 ? 0 : (level / 5) * 100
  return (
    <View style={{ height: 3, backgroundColor: "#e0e0e0", borderRadius: 1.5, marginTop: 2 }}>
      <View style={{ height: 3, width: `${pct}%`, backgroundColor: "#4a4a4a", borderRadius: 1.5 }} />
    </View>
  )
}

export function Template3({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections } = data
  const LEFT_TYPES  = ["about", "links"]
  const RIGHT_TYPES = ["experience", "education", "skills", "languages"]
  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  const leftSectionTitle = {
    fontSize: 6,
    fontFamily: "Helvetica-Bold" as const,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#a3a3a3",
    borderBottomWidth: 0.5,
    borderBottomColor: "#5e5e5e",
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 8,
  }
  const leftBodyText = { fontSize: 7.5, color: "#d8d8d8", lineHeight: 1.6 }
  const rightSectionTitle = {
    fontSize: 8.25,
    fontFamily: "Helvetica-Bold" as const,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#333333",
    borderBottomWidth: 1.5,
    borderBottomColor: "#4a4a4a",
    paddingBottom: 3.75,
    marginTop: 15,
    marginBottom: 10.5,
  }
  const location = [p.city, p.country].filter(Boolean).join(", ")

  return (
    <Document>
      <Page size="A4" style={{ flexDirection: "row", fontFamily: "Helvetica", fontSize: 7.5, backgroundColor: "#ffffff" }}>

        {/* LEFT COLUMN */}
        <View style={{ width: "28%", backgroundColor: "#4a4a4a", paddingLeft: 14, paddingRight: 14, paddingTop: 21, paddingBottom: 21 }}>
          {p.photo ? (
            <View style={{ width: 75, height: 75, borderRadius: 37.5, overflow: "hidden", marginBottom: 12, alignSelf: "center", borderWidth: 1.5, borderColor: "#7a7a7a" }}>
              <Image src={p.photo} style={{ width: 75, height: 75, objectFit: "cover" }} />
            </View>
          ) : (
            <View style={{ width: 75, height: 75, borderRadius: 37.5, backgroundColor: "#575757", alignSelf: "center", marginBottom: 12, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#7a7a7a" }}>
              <Text style={{ fontSize: 18, color: "#6d6d6d" }}>O</Text>
            </View>
          )}
          <Text style={{ fontSize: 13.5, fontFamily: "Helvetica-Bold", color: "#ffffff", textAlign: "center", marginBottom: 3, lineHeight: 1.2 }}>
            {p.firstName} {p.lastName}
          </Text>
          {p.jobTitle ? (
            <Text style={{ fontSize: 7.5, color: "#bcbcbc", textAlign: "center", marginBottom: 15 }}>{p.jobTitle}</Text>
          ) : null}
          {leftSections.map((sec) => {
            if (sec.type === "about") {
              const a = sec as AboutSection
              if (!a.content) return null
              return (
                <View key={sec.id}>
                  <Text style={leftSectionTitle}>{sec.label}</Text>
                  <Text style={leftBodyText}>{a.content}</Text>
                </View>
              )
            }
            if (sec.type === "links") {
              const lk = sec as LinksSection
              const items = lk.items.filter((i) => i.url || i.label)
              if (!items.length) return null
              return (
                <View key={sec.id}>
                  <Text style={leftSectionTitle}>{sec.label}</Text>
                  {items.map((item) => (
                    <Text key={item.id} style={{ ...leftBodyText, fontFamily: "Helvetica-Bold", marginBottom: 3 }}>
                      {item.label || item.url}
                    </Text>
                  ))}
                </View>
              )
            }
            return null
          })}
        </View>

        {/* RIGHT COLUMN */}
        <View style={{ flex: 1, paddingLeft: 21, paddingRight: 21, paddingTop: 21, paddingBottom: 21 }}>
          {/* Contacts */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 15 }}>
            {p.email ? (
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12, marginBottom: 3 }}>
                <View style={{ opacity: 0.5, marginRight: 3 }}><IconMail /></View>
                <Text style={{ fontSize: 6.75, color: "#666666" }}>{p.email}</Text>
              </View>
            ) : null}
            {p.phone ? (
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12, marginBottom: 3 }}>
                <View style={{ opacity: 0.5, marginRight: 3 }}><IconPhone /></View>
                <Text style={{ fontSize: 6.75, color: "#666666" }}>{p.phone}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12, marginBottom: 3 }}>
                <View style={{ opacity: 0.5, marginRight: 3 }}><IconMapPin /></View>
                <Text style={{ fontSize: 6.75, color: "#666666" }}>{location}</Text>
              </View>
            ) : null}
            {p.website ? (
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12, marginBottom: 3 }}>
                <View style={{ opacity: 0.5, marginRight: 3 }}><IconGlobe /></View>
                <Text style={{ fontSize: 6.75, color: "#666666" }}>{p.website}</Text>
              </View>
            ) : null}
          </View>

          {/* Sections */}
          {rightSections.map((sec) => {
            if (sec.type === "experience") {
              const e = sec as ExperienceSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: 4 }}>
                  <Text style={rightSectionTitle}>{sec.label}</Text>
                  {e.items.map((item, idx, arr) => {
                    const isLast = idx === arr.length - 1
                    const dateStr = item.startDate ? `${item.startDate}${item.current ? " - Present" : item.endDate ? ` - ${item.endDate}` : ""}` : ""
                    const bullets = item.description ? item.description.split("\n").filter(Boolean) : []
                    return (
                      <View key={item.id} style={{ flexDirection: "row", marginBottom: TL_GAP }}>
                        <View style={{ width: 82, flexShrink: 0, paddingRight: 9, alignItems: "flex-end" }}>
                          <Text style={{ fontSize: 8.25, fontFamily: "Helvetica-Bold", color: "#1a1a1a", textAlign: "right" }}>{item.company}</Text>
                          {item.location ? <Text style={{ fontSize: 6.75, color: "#666666", textAlign: "right" }}>{item.location}</Text> : null}
                          {dateStr ? <Text style={{ fontSize: 6.75, color: "#666666", fontFamily: "Helvetica-Oblique" as const, textAlign: "right" }}>{dateStr}</Text> : null}
                        </View>
                        <View style={{ flex: 1, paddingLeft: TL_DOT_LEFT + TL_DOT_SIZE + 9, position: "relative" }}>
                          <View style={{ position: "absolute", top: TL_DOT_TOP, left: TL_DOT_LEFT, width: TL_DOT_SIZE, height: TL_DOT_SIZE, borderRadius: TL_DOT_SIZE / 2, backgroundColor: "#4a4a4a", zIndex: 1 }} />
                          {!isLast && <View style={{ position: "absolute", top: TL_LINE_TOP, left: TL_LINE_LEFT, bottom: TL_LINE_BOT, width: TL_LINE_W, backgroundColor: "#d2d2d2" }} />}
                          <Text style={{ fontSize: 8.25, fontFamily: "Helvetica-Bold", color: "#1a1a1a", marginBottom: 3 }}>{item.position}</Text>
                          {bullets.length > 0
                            ? bullets.map((line, i) => (
                                <View key={i} style={{ flexDirection: "row", marginBottom: 1.5 }}>
                                  <Text style={{ fontSize: 7.5, color: "#444444", marginRight: 4 }}>-</Text>
                                  <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.5, flex: 1 }}>{line}</Text>
                                </View>
                              ))
                            : item.description ? <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.5 }}>{item.description}</Text> : null
                          }
                        </View>
                      </View>
                    )
                  })}
                </View>
              )
            }
            if (sec.type === "education") {
              const e = sec as EducationSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: 4 }}>
                  <Text style={rightSectionTitle}>{sec.label}</Text>
                  {e.items.map((item, idx, arr) => {
                    const isLast = idx === arr.length - 1
                    const dateStr = item.startDate ? `${item.startDate}${item.endDate ? ` - ${item.endDate}` : ""}` : ""
                    return (
                      <View key={item.id} style={{ flexDirection: "row", marginBottom: TL_GAP }}>
                        <View style={{ width: 82, flexShrink: 0, paddingRight: 9, alignItems: "flex-end" }}>
                          <Text style={{ fontSize: 8.25, fontFamily: "Helvetica-Bold", color: "#1a1a1a", textAlign: "right" }}>{item.school}</Text>
                          {item.location ? <Text style={{ fontSize: 6.75, color: "#666666", textAlign: "right" }}>{item.location}</Text> : null}
                          {dateStr ? <Text style={{ fontSize: 6.75, color: "#666666", fontFamily: "Helvetica-Oblique" as const, textAlign: "right" }}>{dateStr}</Text> : null}
                        </View>
                        <View style={{ flex: 1, paddingLeft: TL_DOT_LEFT + TL_DOT_SIZE + 9, position: "relative" }}>
                          <View style={{ position: "absolute", top: TL_DOT_TOP, left: TL_DOT_LEFT, width: TL_DOT_SIZE, height: TL_DOT_SIZE, borderRadius: TL_DOT_SIZE / 2, backgroundColor: "#4a4a4a", zIndex: 1 }} />
                          {!isLast && <View style={{ position: "absolute", top: TL_LINE_TOP, left: TL_LINE_LEFT, bottom: TL_LINE_BOT, width: TL_LINE_W, backgroundColor: "#d2d2d2" }} />}
                          <Text style={{ fontSize: 8.25, fontFamily: "Helvetica-Bold", color: "#1a1a1a", marginBottom: 3 }}>{item.degree}</Text>
                          {item.description ? <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.5 }}>{item.description}</Text> : null}
                        </View>
                      </View>
                    )
                  })}
                </View>
              )
            }
            if (sec.type === "skills") {
              const sk = sec as SkillsSection
              if (!sk.items.length) return null
              const rows: (typeof sk.items)[] = []
              for (let i = 0; i < sk.items.length; i += 2) rows.push(sk.items.slice(i, i + 2))
              return (
                <View key={sec.id} style={{ marginBottom: 4 }}>
                  <Text style={rightSectionTitle}>{sec.label}</Text>
                  {rows.map((row, ri) => (
                    <View key={ri} style={{ flexDirection: "row", marginBottom: 6 }}>
                      {row.map((item) => (
                        <View key={item.id} style={{ flex: 1, marginRight: 12 }}>
                          <Text style={{ fontSize: 7.5, color: "#1a1a1a", marginBottom: 2 }}>{item.name}</Text>
                          {sk.showLevel && <SkillBar level={item.level} />}
                        </View>
                      ))}
                      {row.length === 1 && <View style={{ flex: 1 }} />}
                    </View>
                  ))}
                </View>
              )
            }
            if (sec.type === "languages") {
              const lg = sec as LanguagesSection
              if (!lg.items.length) return null
              const rows: (typeof lg.items)[] = []
              for (let i = 0; i < lg.items.length; i += 2) rows.push(lg.items.slice(i, i + 2))
              return (
                <View key={sec.id} style={{ marginBottom: 4 }}>
                  <Text style={rightSectionTitle}>{sec.label}</Text>
                  {rows.map((row, ri) => (
                    <View key={ri} style={{ flexDirection: "row", marginBottom: 6 }}>
                      {row.map((item) => (
                        <View key={item.id} style={{ flex: 1, marginRight: 12 }}>
                          <Text style={{ fontSize: 7.5, color: "#1a1a1a", marginBottom: 2 }}>{item.language}</Text>
                          {lg.showLevel && <SkillBar level={item.level} />}
                        </View>
                      ))}
                      {row.length === 1 && <View style={{ flex: 1 }} />}
                    </View>
                  ))}
                </View>
              )
            }
            return null
          })}
        </View>

      </Page>
    </Document>
  )
}
