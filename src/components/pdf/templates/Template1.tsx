import {
  Document, Page, View, Text, Image, Svg, Path, Circle,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection, SkillLevel,
} from "@/types/resume"
import { fontSize as fs, spacing as sp, lineHeight as lh, misc } from "@/styles/resume-tokens"


// ─── PDF Icon components (Svg paths, works in react-pdf) ─────────────────────
function IconMail({ size = 9, color = "#000" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke={color} strokeWidth="2" fill="none" />
      <Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconPhone({ size = 9, color = "#000" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconMapPin({ size = 9, color = "#000" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}
function IconGlobe({ size = 9, color = "#000" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  )
}

// ─── Two-column PDF — mirrors HtmlTemplate1 exactly ──────────────────────────
// All sizes imported from resume-tokens.ts (same source as HTML SCSS vars).

function LevelDots({ level, color }: { level: SkillLevel; color: string }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} style={{
          width: misc.dotSizePdf,
          height: misc.dotSizePdf,
          borderRadius: misc.dotSizePdf / 2,
          backgroundColor: i < level ? color : "rgba(255,255,255,0.22)",
          marginRight: i < 4 ? misc.dotGap * 0.75 : 0,
        }} />
      ))}
    </View>
  )
}

export function Template1({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections, theme } = data

  const leftBg    = theme.leftBgColor    || "#6f6b6b"
  const leftText  = theme.leftTextColor  || "#ffffff"
  const rightBg   = theme.rightBgColor   || "#ffffff"
  const rightText = theme.rightTextColor || "#1a1a1a"
  const primary   = theme.primaryColor   || "#6f6b6b"
  const secondary = theme.secondaryColor || "#444444"

  const LEFT_TYPES  = ["about", "skills", "languages", "links"]
  const RIGHT_TYPES = ["experience", "education"]

  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  // Shared style builders
  const leftTitle = {
    fontSize: fs.pdf.small,
    fontFamily: "Helvetica-Bold" as const,
    letterSpacing: 0.75,
    color: leftText,
    opacity: 0.65,
    textTransform: "uppercase" as const,
    marginBottom: 5,
  }

  const sectionHeading = {
    fontSize: fs.pdf.sectionHd,
    fontFamily: "Helvetica-Bold" as const,
    color: primary,
    borderBottomWidth: 1.5,
    borderBottomColor: primary,
    paddingBottom: 3,
    marginBottom: 7,
    marginTop: 3,
  }

  const contactFields = [
    { key: "email",   icon: <IconMail  color={leftText} />, value: p.email,   href: p.email ? `mailto:${p.email}` : undefined },
    { key: "phone",   icon: <IconPhone color={leftText} />, value: p.phone },
    { key: "loc",     icon: <IconMapPin color={leftText} />, value: [p.city, p.country].filter(Boolean).join(", ") },
    { key: "website", icon: <IconGlobe color={leftText} />, value: p.website, href: p.website ? (p.website.startsWith("http") ? p.website : `https://${p.website}`) : undefined },
  ].filter((f) => f.value)

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "row",
          fontFamily: "Helvetica",
          fontSize: fs.pdf.body,
          backgroundColor: rightBg,
        }}
      >

        {/* ══ LEFT COLUMN ══ */}
        <View style={{
          width: "34%",
          backgroundColor: leftBg,
          paddingBottom: sp.pdf.leftPadV,
        }}>

          {/* Photo — full width, full image visible (mirrors HTML) */}
          <View style={{ width: "100%", height: 150, backgroundColor: leftBg, marginBottom: 15 }}>
            {p.photo ? (
              <Image src={p.photo} style={{ width: "100%", height: 150, objectFit: "cover", objectPosition: "center top" }} />
            ) : (
              <View style={{
                width: "100%", height: 150,
                backgroundColor: "rgba(255,255,255,0.08)",
                alignItems: "center", justifyContent: "center",
              }}>
                <Text style={{ fontSize: 22, color: "rgba(255,255,255,0.2)" }}>◉</Text>
              </View>
            )}
          </View>

          {/* Content below photo — with horizontal padding */}
          <View style={{ paddingLeft: sp.pdf.leftPadH, paddingRight: sp.pdf.leftPadH }}>

          {/* Left sections */}
          {leftSections.map((sec) => {

            if (sec.type === "about") {
              const a = sec as AboutSection
              if (!a.content) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={leftTitle}>{sec.label}</Text>
                  <Text style={{ fontSize: fs.pdf.body - 0.5, color: leftText, lineHeight: 1.5, opacity: 0.85 }}>{a.content}</Text>
                </View>
              )
            }

            if (sec.type === "skills") {
              const sk = sec as SkillsSection
              if (!sk.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={leftTitle}>{sec.label}</Text>
                  {sk.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: sp.pdf.lineGap }}>
                      <Text style={{ fontSize: fs.pdf.body, color: leftText }}>{item.name}</Text>
                      {sk.showLevel && <LevelDots level={item.level} color={leftText} />}
                    </View>
                  ))}
                </View>
              )
            }

            if (sec.type === "languages") {
              const lg = sec as LanguagesSection
              if (!lg.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={leftTitle}>{sec.label}</Text>
                  {lg.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: sp.pdf.lineGap }}>
                      <Text style={{ fontSize: fs.pdf.body, color: leftText }}>{item.language}</Text>
                      {lg.showLevel && <LevelDots level={item.level} color={leftText} />}
                    </View>
                  ))}
                </View>
              )
            }

            if (sec.type === "links") {
              const lk = sec as LinksSection
              const items = lk.items.filter((i) => i.url)
              if (!items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={leftTitle}>{sec.label}</Text>
                  {items.map((item) => (
                    <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: sp.pdf.lineGap + 2 }}>
                      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: leftText, opacity: 0.4, marginRight: 6 }} />
                      <Text style={{ fontSize: fs.pdf.body, color: leftText, fontFamily: "Helvetica-Bold" }}>
                        {item.label || item.url.replace(/^https?:\/\/(www\.)?/, "")}
                      </Text>
                    </View>
                  ))}
                </View>
              )
            }

            return null
          })}
          </View>{/* end content padding wrapper */}
        </View>

        {/* ══ RIGHT COLUMN ══ */}
        <View style={{
          flex: 1,
          backgroundColor: rightBg,
          paddingBottom: sp.pdf.rightPadV,
        }}>

          {/* Header — dark bg, same height as photo (150pt) */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: leftBg,
            height: 150,
            paddingLeft: sp.pdf.rightPadH,
            paddingRight: sp.pdf.rightPadH,
            marginBottom: sp.pdf.rightPadV,
          }}>

            {/* Name + job title */}
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={{
                fontFamily: "Helvetica-Bold",
                fontSize: fs.pdf.name + 3,
                color: leftText,
                lineHeight: lh.tight,
              }}>
                {p.firstName}
              </Text>
              <Text style={{
                fontFamily: "Helvetica-Bold",
                fontSize: fs.pdf.name + 3,
                color: leftText,
                lineHeight: lh.tight,
                marginBottom: 3,
              }}>
                {p.lastName}
              </Text>
              {p.jobTitle ? (
                <Text style={{ fontSize: fs.pdf.jobTitle + 2, color: leftText, opacity: 0.65 }}>
                  {p.jobTitle}
                </Text>
              ) : null}
            </View>

            {/* Contact fields */}
            <View style={{ flexShrink: 0, alignItems: "flex-start" }}>
              {contactFields.map(({ key, icon, value }) => (
                <View key={key} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <View style={{ opacity: 0.4, marginRight: 5, justifyContent: "center" }}>
                    {icon}
                  </View>
                  <Text style={{ fontSize: fs.pdf.small, color: leftText, opacity: 0.8 }}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right sections */}
          <View style={{ paddingLeft: sp.pdf.rightPadH, paddingRight: sp.pdf.rightPadH }}>
          {rightSections.map((sec) => {

            if (sec.type === "experience") {
              const e = sec as ExperienceSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={sectionHeading}>{sec.label}</Text>
                  {e.items.map((item, idx) => (
                    <View key={item.id} style={{
                      marginBottom: sp.pdf.itemGap,
                      paddingBottom: 7,
                      borderBottomWidth: idx < e.items.length - 1 ? 0.75 : 0,
                      borderBottomColor: "rgba(0,0,0,0.07)",
                      borderStyle: "dashed",
                    }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: fs.pdf.sectionHd, color: rightText, flex: 1, marginRight: 6 }}>
                          {item.position}
                        </Text>
                        <Text style={{ fontSize: fs.pdf.small, color: "#888888" }}>
                          {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                        </Text>
                      </View>
                      {(item.company || item.location) ? (
                        <Text style={{ fontSize: fs.pdf.body, color: "#666666", marginBottom: 3 }}>
                          {[item.company, item.location].filter(Boolean).join(" · ")}
                        </Text>
                      ) : null}
                      {item.description ? (
                        <Text style={{ fontSize: fs.pdf.body, color: "#444444", lineHeight: lh.body }}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
            }

            if (sec.type === "education") {
              const e = sec as EducationSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: sp.pdf.sectionGap }}>
                  <Text style={sectionHeading}>{sec.label}</Text>
                  {e.items.map((item, idx) => (
                    <View key={item.id} style={{
                      marginBottom: sp.pdf.itemGap,
                      paddingBottom: 7,
                      borderBottomWidth: idx < e.items.length - 1 ? 0.75 : 0,
                      borderBottomColor: "rgba(0,0,0,0.07)",
                      borderStyle: "dashed",
                    }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: fs.pdf.sectionHd, color: rightText, flex: 1, marginRight: 6 }}>
                          {item.degree}
                        </Text>
                        <Text style={{ fontSize: fs.pdf.small, color: "#888888" }}>
                          {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
                        </Text>
                      </View>
                      {(item.school || item.location) ? (
                        <Text style={{ fontSize: fs.pdf.body, color: "#666666", marginBottom: 3 }}>
                          {[item.school, item.location].filter(Boolean).join(" · ")}
                        </Text>
                      ) : null}
                      {item.description ? (
                        <Text style={{ fontSize: fs.pdf.body, color: "#444444", lineHeight: lh.body }}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
            }

            return null
          })}
          </View>{/* end sections padding */}
        </View>
      </Page>
    </Document>
  )
}
