import {
  Document, Page, View, Text, Image,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection,
} from "@/types/resume"

// ─── Template 6: Thomas — Elegant All-White PDF ───────────────────────────────
// All sizes in pt (PDF units). No dark column — everything white.

const COLOR = {
  black:    "#111111",
  dark:     "#333333",
  mid:      "#555555",
  light:    "#777777",
  lighter:  "#aaaaaa",
  rule:     "#1a1a1a",
  divider:  "#dddddd",
  bg:       "#ffffff",
  bullet:   "#555555",
} as const

// Square bullet: small filled rectangle
function SquareBullet() {
  return (
    <View style={{
      width: 4.5,
      height: 4.5,
      backgroundColor: COLOR.bullet,
      flexShrink: 0,
      marginRight: 6,
      marginTop: 1.5,
    }} />
  )
}

// Section title style — uppercase, letter-spacing, border-bottom
function SectionTitle({ label, first = false }: { label: string; first?: boolean }) {
  return (
    <View style={{
      borderBottomWidth: 0.75,
      borderBottomColor: COLOR.divider,
      paddingBottom: 3,
      marginBottom: 8,
      marginTop: first ? 0 : 14,
    }}>
      <Text style={{
        fontSize: 6.75,
        fontFamily: "Helvetica-Bold",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: COLOR.dark,
      }}>
        {label}
      </Text>
    </View>
  )
}

export function Template6({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections } = data

  const LEFT_TYPES  = ["skills", "languages", "links"]
  const RIGHT_TYPES = ["about", "experience", "education"]

  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  const fullName = [p.firstName, p.lastName].filter(Boolean).join(" ")

  const contactFields = [
    { label: p.email },
    { label: p.phone },
    { label: p.website },
    { label: [p.city, p.country].filter(Boolean).join(", ") },
  ].filter((f) => f.label)

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          fontSize: 7.5,
          backgroundColor: COLOR.bg,
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 36,
          paddingRight: 36,
        }}
      >

        {/* ══ HEADER ══ */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>

          {/* Left: job title + name */}
          <View style={{ flex: 1, marginRight: 18 }}>
            {p.jobTitle ? (
              <Text style={{
                fontSize: 7.5,
                fontFamily: "Helvetica-Bold",
                letterSpacing: 2.25,
                textTransform: "uppercase",
                color: COLOR.lighter,
                marginBottom: 6,
              }}>
                {p.jobTitle}
              </Text>
            ) : null}
            <Text style={{
              fontSize: 31.5,
              fontFamily: "Helvetica-Bold",
              color: COLOR.black,
              letterSpacing: -0.75,
              lineHeight: 1.05,
            }}>
              {fullName}
            </Text>
          </View>

          {/* Right: circular photo */}
          {p.photo ? (
            <View style={{
              width: 67.5,
              height: 67.5,
              borderRadius: 33.75,
              overflow: "hidden",
              flexShrink: 0,
              borderWidth: 1.5,
              borderColor: "#e8e8e8",
            }}>
              <Image src={p.photo} style={{ width: 67.5, height: 67.5, objectFit: "cover" }} />
            </View>
          ) : (
            <View style={{
              width: 67.5,
              height: 67.5,
              borderRadius: 33.75,
              backgroundColor: "#f0f0f0",
              flexShrink: 0,
              borderWidth: 1.5,
              borderColor: "#e8e8e8",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{ fontSize: 18, color: "#cccccc" }}>◉</Text>
            </View>
          )}
        </View>

        {/* ══ HORIZONTAL RULE ══ */}
        <View style={{
          borderTopWidth: 1.125,
          borderTopColor: COLOR.rule,
          marginBottom: 18,
        }} />

        {/* ══ TWO-COLUMN BODY ══ */}
        <View style={{ flexDirection: "row" }}>

          {/* LEFT COLUMN — ~30% width */}
          <View style={{ width: "30%", marginRight: 24 }}>

            {/* Contact */}
            {contactFields.length > 0 && (
              <View style={{ marginBottom: 14 }}>
                <SectionTitle label="Contact" first />
                {contactFields.map((f, i) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 5.25 }}>
                    <SquareBullet />
                    <Text style={{ fontSize: 7.5, color: COLOR.mid, flex: 1 }}>{f.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Left sections */}
            {leftSections.map((sec, secIdx) => {

              if (sec.type === "skills") {
                const sk = sec as SkillsSection
                if (!sk.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} first={secIdx === 0 && contactFields.length === 0} />
                    {sk.items.map((item) => (
                      <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4.5 }}>
                        <SquareBullet />
                        <Text style={{ fontSize: 7.5, color: "#444444" }}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                )
              }

              if (sec.type === "languages") {
                const lg = sec as LanguagesSection
                if (!lg.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} />
                    {lg.items.map((item) => (
                      <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4.5 }}>
                        <SquareBullet />
                        <Text style={{ fontSize: 7.5, color: "#444444" }}>{item.language}</Text>
                      </View>
                    ))}
                  </View>
                )
              }

              if (sec.type === "links") {
                const lk = sec as LinksSection
                const items = lk.items.filter((i) => i.label || i.url)
                if (!items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} />
                    {items.map((item) => (
                      <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4.5 }}>
                        <SquareBullet />
                        <Text style={{ fontSize: 7.5, color: "#444444", fontFamily: "Helvetica-Bold" }}>
                          {item.label || item.url}
                        </Text>
                      </View>
                    ))}
                  </View>
                )
              }

              return null
            })}
          </View>

          {/* RIGHT COLUMN — ~70% (flex: 1) */}
          <View style={{ flex: 1 }}>
            {rightSections.map((sec, secIdx) => {

              if (sec.type === "about") {
                const a = sec as AboutSection
                if (!a.content) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} first={secIdx === 0} />
                    <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.7 }}>{a.content}</Text>
                  </View>
                )
              }

              if (sec.type === "experience") {
                const e = sec as ExperienceSection
                if (!e.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} first={secIdx === 0} />
                    {e.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: COLOR.black, marginBottom: 2.25 }}>
                          {item.position}
                        </Text>
                        <Text style={{ fontSize: 7.5, color: COLOR.light, marginBottom: 5.25 }}>
                          {[item.company, item.location].filter(Boolean).join(" · ")}
                          {(item.startDate || item.endDate || item.current) && (
                            "  " + item.startDate + (item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : "")
                          )}
                        </Text>
                        {item.description ? (
                          item.description.split("\n").map((line, i) => (
                            <Text key={i} style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.65 }}>{line}</Text>
                          ))
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
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <SectionTitle label={sec.label} first={secIdx === 0} />
                    {e.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: COLOR.black, marginBottom: 2.25 }}>
                          {item.degree}
                        </Text>
                        <Text style={{ fontSize: 7.5, color: COLOR.light, marginBottom: 5.25 }}>
                          {[item.school, item.location].filter(Boolean).join(" · ")}
                          {(item.startDate || item.endDate) && (
                            "  " + item.startDate + (item.endDate ? ` – ${item.endDate}` : "")
                          )}
                        </Text>
                        {item.description ? (
                          <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.65 }}>{item.description}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                )
              }

              return null
            })}
          </View>
        </View>
      </Page>
    </Document>
  )
}
