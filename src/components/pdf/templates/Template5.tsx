import {
  Document, Page, View, Text, Image,
} from "@react-pdf/renderer"
import type {
  ResumeData, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, LinksSection, AboutSection,
} from "@/types/resume"

// ─── Template 5: Max Johnson — dark navy left, circular photo ─────────────────

export function Template5({ data }: { data: ResumeData }) {
  const { personalInfo: p, sections } = data

  const LEFT_TYPES  = ["skills", "languages", "links"]
  const RIGHT_TYPES = ["about", "experience", "education"]

  const leftSections  = sections.filter((s) => s.visible && LEFT_TYPES.includes(s.type))
  const rightSections = sections.filter((s) => s.visible && RIGHT_TYPES.includes(s.type))

  const location = [p.city, p.country].filter(Boolean).join(", ")

  const leftTitleStyle = {
    fontSize: 9.75,
    fontFamily: "Helvetica-Bold" as const,
    color: "#ffffff",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderStyle: "solid" as const,
    paddingBottom: 4,
    marginTop: 15,
    marginBottom: 9,
  }

  const contactLabelStyle = {
    fontSize: 6,
    color: "#f0f4f8",
    opacity: 0.5,
    textTransform: "uppercase" as const,
    letterSpacing: 0.75,
    marginBottom: 1.5,
  }

  const contactValueStyle = {
    fontSize: 7.5,
    color: "#f0f4f8",
    opacity: 0.85,
  }

  const bulletStyle = {
    fontSize: 7.5,
    color: "#f0f4f8",
    opacity: 0.85,
    marginBottom: 3.75,
  }

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
          width: "30%",
          backgroundColor: "#263447",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 21,
          paddingBottom: 21,
          flexDirection: "column",
          alignItems: "center",
        }}>

          {/* Circular photo */}
          {p.photo ? (
            <Image
              src={p.photo}
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                marginBottom: 18,
              }}
            />
          ) : (
            <View style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: "rgba(255,255,255,0.1)",
              marginBottom: 18,
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{ fontSize: 20, color: "rgba(255,255,255,0.15)" }}>◉</Text>
            </View>
          )}

          {/* Content aligned to left within the column */}
          <View style={{ width: "100%" }}>

            {/* Contact section */}
            {(p.address || p.city || p.country || p.phone || p.email || p.website) && (
              <View style={{ marginBottom: 4 }}>
                <Text style={leftTitleStyle}>Contact</Text>
                {p.address ? (
                  <View style={{ marginBottom: 7.5 }}>
                    <Text style={contactLabelStyle}>Address</Text>
                    <Text style={contactValueStyle}>{p.address}</Text>
                  </View>
                ) : null}
                {location ? (
                  <View style={{ marginBottom: 7.5 }}>
                    <Text style={contactLabelStyle}>Location</Text>
                    <Text style={contactValueStyle}>{location}</Text>
                  </View>
                ) : null}
                {p.phone ? (
                  <View style={{ marginBottom: 7.5 }}>
                    <Text style={contactLabelStyle}>Phone</Text>
                    <Text style={contactValueStyle}>{p.phone}</Text>
                  </View>
                ) : null}
                {p.email ? (
                  <View style={{ marginBottom: 7.5 }}>
                    <Text style={contactLabelStyle}>Email</Text>
                    <Text style={contactValueStyle}>{p.email}</Text>
                  </View>
                ) : null}
                {p.website ? (
                  <View style={{ marginBottom: 7.5 }}>
                    <Text style={contactLabelStyle}>Website</Text>
                    <Text style={contactValueStyle}>{p.website}</Text>
                  </View>
                ) : null}
              </View>
            )}

            {/* Left sections */}
            {leftSections.map((sec) => {

              if (sec.type === "skills") {
                const sk = sec as SkillsSection
                if (!sk.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 4 }}>
                    <Text style={leftTitleStyle}>{sec.label}</Text>
                    {sk.items.map((item) => (
                      <Text key={item.id} style={bulletStyle}>{`• ${item.name}`}</Text>
                    ))}
                  </View>
                )
              }

              if (sec.type === "languages") {
                const lg = sec as LanguagesSection
                if (!lg.items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 4 }}>
                    <Text style={leftTitleStyle}>{sec.label}</Text>
                    {lg.items.map((item) => (
                      <Text key={item.id} style={bulletStyle}>{`• ${item.language}`}</Text>
                    ))}
                  </View>
                )
              }

              if (sec.type === "links") {
                const lk = sec as LinksSection
                const items = lk.items.filter((i) => i.url)
                if (!items.length) return null
                return (
                  <View key={sec.id} style={{ marginBottom: 4 }}>
                    <Text style={leftTitleStyle}>{sec.label}</Text>
                    {items.map((item) => (
                      <Text key={item.id} style={bulletStyle}>
                        {`• ${item.label || item.url}`}
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
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 24,
          paddingBottom: 24,
        }}>

          {/* Header */}
          <View style={{ marginBottom: 21 }}>
            <Text style={{
              fontSize: 24,
              fontFamily: "Helvetica-Bold",
              color: "#1a1a1a",
              letterSpacing: -0.375,
              marginBottom: 3,
            }}>
              {p.firstName} {p.lastName}
            </Text>
            {p.jobTitle ? (
              <Text style={{ fontSize: 9.75, color: "#888888" }}>{p.jobTitle}</Text>
            ) : null}
          </View>

          {/* Right sections */}
          {rightSections.map((sec) => {

            const rightTitleStyle = {
              fontSize: 10.5,
              fontFamily: "Helvetica-Bold" as const,
              color: "#263447",
              borderBottomWidth: 1.5,
              borderBottomColor: "#263447",
              borderStyle: "solid" as const,
              paddingBottom: 3,
              marginTop: 18,
              marginBottom: 10.5,
            }

            if (sec.type === "about") {
              const a = sec as AboutSection
              if (!a.content) return null
              return (
                <View key={sec.id} style={{ marginBottom: 6 }}>
                  <Text style={rightTitleStyle}>{sec.label}</Text>
                  <Text style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.65 }}>{a.content}</Text>
                </View>
              )
            }

            if (sec.type === "experience") {
              const e = sec as ExperienceSection
              if (!e.items.length) return null
              return (
                <View key={sec.id} style={{ marginBottom: 6 }}>
                  <Text style={rightTitleStyle}>{sec.label}</Text>
                  {e.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 13.5 }}>
                      <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1a1a1a", marginBottom: 2.25 }}>
                        {item.position}
                      </Text>
                      <Text style={{ fontSize: 7.5, color: "#777777", marginBottom: 6 }}>
                        {[item.company, item.location].filter(Boolean).join(" · ")}
                        {(item.company || item.location) && (item.startDate || item.endDate) ? " · " : ""}
                        {item.startDate}{item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                      </Text>
                      {item.description ? item.description.split("\n").filter(Boolean).map((line, i) => (
                        <Text key={i} style={{ fontSize: 7.5, color: "#444444", lineHeight: 1.5, marginBottom: 1.5 }}>
                          {`• ${line}`}
                        </Text>
                      )) : null}
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
                  <Text style={rightTitleStyle}>{sec.label}</Text>
                  {e.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 13.5 }}>
                      <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1a1a1a", marginBottom: 2.25 }}>
                        {item.degree}
                      </Text>
                      <Text style={{ fontSize: 7.5, color: "#777777", marginBottom: 6 }}>
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
