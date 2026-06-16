import {
  Document, Page, View, Text,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection,
} from "@/types/resume"

// Watson — Classic Clean, All-White, No Photo
// Fixed color palette (ignores theme since Watson is always white)

export function Template2({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections } = data

  const LEFT_TYPES  = ["education", "skills", "languages", "links"]
  const RIGHT_TYPES = ["about", "experience"]

  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  // ── Shared styles ──────────────────────────────────────────────────────────
  const leftSectionTitle = {
    fontSize: 6.75,
    fontFamily: "Helvetica-Bold" as const,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#333333",
    textAlign: "center" as const,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    borderTopWidth: 0.5,
    borderTopColor: "#cccccc",
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 7,
    marginTop: 14,
  }

  const leftText = {
    fontSize: 7.5,
    color: "#444444",
    textAlign: "center" as const,
    lineHeight: 1.6,
    marginBottom: 2,
  }

  const rightSectionHeading = {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold" as const,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    color: "#1a1a1a",
    borderBottomWidth: 0.75,
    borderBottomColor: "#dddddd",
    paddingBottom: 3,
    marginBottom: 9,
    marginTop: 14,
  }

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          fontSize: 7.5,
          backgroundColor: "#ffffff",
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 36,
          paddingRight: 36,
          flexDirection: "column",
        }}
      >

        {/* ══ HEADER ══ */}
        <View style={{ alignItems: "center", marginBottom: 4 }}>
          <Text style={{
            fontSize: 30,
            fontFamily: "Helvetica-Bold",
            letterSpacing: 2,
            color: "#000000",
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "center",
          }}>
            {p.firstName} {p.lastName}
          </Text>
          {p.jobTitle ? (
            <Text style={{
              fontSize: 9.75,
              color: "#888888",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginTop: 6,
              textAlign: "center",
            }}>
              {p.jobTitle}
            </Text>
          ) : null}
        </View>

        {/* Header rule */}
        <View style={{ borderBottomWidth: 1.5, borderBottomColor: "#1a1a1a", marginTop: 12, marginBottom: 6 }} />

        {/* ══ BODY: two columns ══ */}
        <View style={{ flexDirection: "row", flex: 1, marginTop: 6 }}>

          {/* LEFT COLUMN — 33% */}
          <View style={{ width: "33%", paddingRight: 18, borderRightWidth: 0.75, borderRightColor: "#e8e8e8" }}>

            {/* Contact */}
            <View style={{ marginBottom: 14, alignItems: "center" }}>
              <Text style={leftSectionTitle}>Contact</Text>
              {p.email ? <Text style={leftText}>{p.email}</Text> : null}
              {p.phone ? <Text style={leftText}>{p.phone}</Text> : null}
              {(p.city || p.country) ? (
                <Text style={leftText}>{[p.city, p.country].filter(Boolean).join(", ")}</Text>
              ) : null}
              {p.website ? <Text style={leftText}>{p.website}</Text> : null}
            </View>

            {leftSections.map((sec) => {

              if (sec.type === "education") {
                const e = sec as EducationSection
                if (!e.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14, alignItems: "center" }}>
                    <Text style={leftSectionTitle}>{sec.label}</Text>
                    {e.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 8, alignItems: "center" }}>
                        <Text style={{ fontSize: 8.25, fontFamily: "Helvetica-Bold", color: "#1a1a1a", textAlign: "center" }}>
                          {item.degree}
                        </Text>
                        <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Oblique" as const, color: "#555555", textAlign: "center" }}>
                          {item.school}
                        </Text>
                        {(item.startDate || item.endDate) ? (
                          <Text style={{ fontSize: 6.75, color: "#888888", textAlign: "center" }}>
                            {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                )
              }

              if (sec.type === "skills") {
                const sk = sec as SkillsSection
                if (!sk.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14, alignItems: "center" }}>
                    <Text style={leftSectionTitle}>{sec.label}</Text>
                    {sk.items.map((item) => (
                      <Text key={item.id} style={{ ...leftText, marginBottom: 3 }}>{item.name}</Text>
                    ))}
                  </View>
                )
              }

              if (sec.type === "languages") {
                const lg = sec as LanguagesSection
                if (!lg.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14, alignItems: "center" }}>
                    <Text style={leftSectionTitle}>{sec.label}</Text>
                    {lg.items.map((item) => (
                      <Text key={item.id} style={{ ...leftText, marginBottom: 3 }}>{item.language}</Text>
                    ))}
                  </View>
                )
              }

              if (sec.type === "links") {
                const lk = sec as LinksSection
                const items = lk.items.filter((i) => i.url || i.label)
                if (!items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14, alignItems: "center" }}>
                    <Text style={leftSectionTitle}>{sec.label}</Text>
                    {items.map((item) => (
                      <Text key={item.id} style={{
                        ...leftText,
                        fontFamily: "Helvetica-Bold",
                        marginBottom: 4,
                      }}>
                        {item.label || item.url}
                      </Text>
                    ))}
                  </View>
                )
              }

              return null
            })}
          </View>

          {/* RIGHT COLUMN — flex 1 */}
          <View style={{ flex: 1, paddingLeft: 18 }}>

            {rightSections.map((sec) => {

              if (sec.type === "about") {
                const a = sec as AboutSection
                if (!a.content) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <Text style={rightSectionHeading}>{sec.label}</Text>
                    <Text style={{ fontSize: 7.5, color: "#333333", lineHeight: 1.65 }}>{a.content}</Text>
                  </View>
                )
              }

              if (sec.type === "experience") {
                const e = sec as ExperienceSection
                if (!e.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 14 }}>
                    <Text style={rightSectionHeading}>{sec.label}</Text>
                    {e.items.map((item, idx) => (
                      <View key={item.id} style={{
                        marginBottom: 10,
                        paddingBottom: 10,
                        borderBottomWidth: idx < e.items.length - 1 ? 0.5 : 0,
                        borderBottomColor: "#f0f0f0",
                      }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 1 }}>
                          <Text style={{
                            fontSize: 8.25,
                            fontFamily: "Helvetica-Bold",
                            letterSpacing: 0.75,
                            textTransform: "uppercase",
                            color: "#1a1a1a",
                            flex: 1,
                            marginRight: 8,
                          }}>
                            {item.position}
                          </Text>
                          <Text style={{ fontSize: 6.75, color: "#666666", fontFamily: "Helvetica-Oblique" }}>
                            {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                          </Text>
                        </View>
                        {(item.company || item.location) ? (
                          <Text style={{ fontSize: 7.5, color: "#666666", fontFamily: "Helvetica-Oblique", marginBottom: 4 }}>
                            {[item.company, item.location].filter(Boolean).join(" · ")}
                          </Text>
                        ) : null}
                        {item.description ? (
                          <Text style={{ fontSize: 7.5, color: "#333333", lineHeight: 1.65 }}>
                            {item.description}
                          </Text>
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
                    <Text style={rightSectionHeading}>{sec.label}</Text>
                    {e.items.map((item, idx) => (
                      <View key={item.id} style={{
                        marginBottom: 10,
                        paddingBottom: 10,
                        borderBottomWidth: idx < e.items.length - 1 ? 0.5 : 0,
                        borderBottomColor: "#f0f0f0",
                      }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 1 }}>
                          <Text style={{
                            fontSize: 8.25,
                            fontFamily: "Helvetica-Bold",
                            letterSpacing: 0.75,
                            textTransform: "uppercase",
                            color: "#1a1a1a",
                            flex: 1,
                            marginRight: 8,
                          }}>
                            {item.degree}
                          </Text>
                          <Text style={{ fontSize: 6.75, color: "#666666", fontFamily: "Helvetica-Oblique" }}>
                            {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
                          </Text>
                        </View>
                        {(item.school || item.location) ? (
                          <Text style={{ fontSize: 7.5, color: "#666666", fontFamily: "Helvetica-Oblique" }}>
                            {[item.school, item.location].filter(Boolean).join(" · ")}
                          </Text>
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
