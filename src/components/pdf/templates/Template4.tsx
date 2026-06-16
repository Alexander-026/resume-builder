import {
  Document, Page, View, Text, Image,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection,
} from "@/types/resume"

// ─── Template 4: Bronson — dark left, yellow accent, rectangular photo ────────

export function Template4({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections } = data

  const LEFT_TYPES  = ["about", "skills", "languages", "links"]
  const RIGHT_TYPES = ["experience", "education"]

  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  const location = [p.address, p.city, p.country].filter(Boolean).join(", ")

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "row",
          fontFamily: "Helvetica",
          fontSize: 8,
          backgroundColor: "#ffffff",
        }}
      >

        {/* ══ LEFT COLUMN ══ */}
        <View style={{
          width: "34%",
          backgroundColor: "#1c1c1c",
          flexDirection: "column",
        }}>

          {/* Full-width photo */}
          <View style={{ width: "100%", height: 165, flexShrink: 0 }}>
            {p.photo ? (
              <Image
                src={p.photo}
                style={{ width: "100%", height: 165, objectFit: "cover", objectPosition: "center top" }}
              />
            ) : (
              <View style={{
                width: "100%", height: 165,
                backgroundColor: "rgba(255,255,255,0.05)",
                alignItems: "center", justifyContent: "center",
              }}>
                <Text style={{ fontSize: 22, color: "rgba(255,255,255,0.15)" }}>◉</Text>
              </View>
            )}
          </View>

          {/* Left body */}
          <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 18, paddingBottom: 18 }}>

            {leftSections.map((sec) => {

              const titleStyle = {
                fontSize: 6,
                fontFamily: "Helvetica-Bold" as const,
                letterSpacing: 1.5,
                textTransform: "uppercase" as const,
                color: "#f0ede8",
                opacity: 0.45,
                marginBottom: 8,
                marginTop: 14,
              }

              if (sec.type === "about") {
                const a = sec as AboutSection
                if (!a.content) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 18 }}>
                    <Text style={titleStyle}>{sec.label}</Text>
                    <Text style={{ fontSize: 7.5, color: "#f0ede8", lineHeight: 1.65, opacity: 0.85 }}>
                      {a.content}
                    </Text>
                  </View>
                )
              }

              if (sec.type === "skills") {
                const sk = sec as SkillsSection
                if (!sk.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 18 }}>
                    <Text style={titleStyle}>{sec.label}</Text>
                    {sk.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 7.5, color: "#f0ede8", marginBottom: 3 }}>{item.name}</Text>
                        {sk.showLevel && (
                          <View style={{ height: 2, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
                            <View style={{
                              height: 2,
                              width: `${Math.round((item.level / 5) * 100)}%`,
                              backgroundColor: "rgba(255,255,255,0.65)",
                              borderRadius: 1,
                            }} />
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )
              }

              if (sec.type === "languages") {
                const lg = sec as LanguagesSection
                if (!lg.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 18 }}>
                    <Text style={titleStyle}>{sec.label}</Text>
                    {lg.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 7.5, color: "#f0ede8", marginBottom: 3 }}>{item.language}</Text>
                        {lg.showLevel && (
                          <View style={{ height: 2, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
                            <View style={{
                              height: 2,
                              width: `${Math.round((item.level / 5) * 100)}%`,
                              backgroundColor: "rgba(255,255,255,0.65)",
                              borderRadius: 1,
                            }} />
                          </View>
                        )}
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
                  <View key={sec.id} style={{ marginBottom: 18 }}>
                    <Text style={titleStyle}>{sec.label}</Text>
                    {items.map((item) => (
                      <Text key={item.id}
                        style={{ fontSize: 7.5, color: "#f0ede8", marginBottom: 4 }}>
                        {item.label || item.url}
                      </Text>
                    ))}
                  </View>
                )
              }

              return null
            })}
          </View>
        </View>

        {/* ══ RIGHT COLUMN ══ */}
        <View style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 27,
          paddingBottom: 27,
        }}>

          {/* Header */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{
              fontSize: 36,
              fontFamily: "Helvetica-Bold",
              color: "#1a1a1a",
              letterSpacing: -0.75,
              lineHeight: 1.0,
            }}>
              {p.firstName} {p.lastName}
            </Text>

            {/* Yellow accent line */}
            <View style={{ width: 45, height: 3, backgroundColor: "#f5c518", marginTop: 6, marginBottom: 12 }} />

            {/* Contact lines */}
            {location ? (
              <Text style={{ fontSize: 7.5, color: "#888888", marginBottom: 2 }}>{location}</Text>
            ) : null}
            {p.phone ? (
              <Text style={{ fontSize: 7.5, color: "#888888", marginBottom: 2 }}>{p.phone}</Text>
            ) : null}
            {p.email ? (
              <Text style={{ fontSize: 7.5, color: "#888888", marginBottom: 2 }}>{p.email}</Text>
            ) : null}
          </View>

          {/* Right sections */}
          {rightSections.map((sec) => {

            const headingStyle = {
              fontSize: 13.5,
              fontFamily: "Helvetica" as const,
              letterSpacing: 3,
              textTransform: "uppercase" as const,
              color: "#1a1a1a",
              marginTop: 21,
              marginBottom: 12,
            }

            if (sec.type === "experience") {
              const e = sec as ExperienceSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: 6 }}>
                  <Text style={headingStyle}>{sec.label}</Text>
                  {e.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 15 }}>
                      <Text style={{
                        fontSize: 8.25,
                        fontFamily: "Helvetica-Bold",
                        letterSpacing: 0.75,
                        textTransform: "uppercase",
                        color: "#1a1a1a",
                        marginBottom: 3,
                      }}>
                        {item.position}
                      </Text>
                      <Text style={{ fontSize: 7.5, color: "#888888", marginBottom: 6 }}>
                        {[item.company, item.location].filter(Boolean).join(" · ")}
                        {(item.company || item.location) && (item.startDate || item.endDate) ? " · " : ""}
                        {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                      </Text>
                      {item.description ? (
                        <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.65 }}>{item.description}</Text>
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
                <View key={sec.id} style={{ marginBottom: 6 }}>
                  <Text style={headingStyle}>{sec.label}</Text>
                  {e.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 15 }}>
                      <Text style={{
                        fontSize: 8.25,
                        fontFamily: "Helvetica-Bold",
                        letterSpacing: 0.75,
                        textTransform: "uppercase",
                        color: "#1a1a1a",
                        marginBottom: 3,
                      }}>
                        {item.degree}
                      </Text>
                      <Text style={{ fontSize: 7.5, color: "#888888", marginBottom: 6 }}>
                        {[item.school, item.location].filter(Boolean).join(" · ")}
                        {(item.school || item.location) && (item.startDate || item.endDate) ? " · " : ""}
                        {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
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
      </Page>
    </Document>
  )
}
