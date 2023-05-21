import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Path,
  PDFViewer,
} from "@react-pdf/renderer"
import { useAppSelector } from "../app/hooks"
import { resumeBuilder } from "../features/resumeBuilder/resumeBuilderSlice"
import { icons } from "../icons/icons"

const Pdf1 = () => {
  const { form } = useAppSelector(resumeBuilder)
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: form.bgLeftSection,
      display: "flex",
      width: "100%",
    },
    left: {
      paddingVertical: "20px",
      width: "30%",
      backgroundColor: form.bgLeftSection,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "26px",
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "gray",
    },
    right: {
      width: "70%",
      paddingHorizontal: "20px",
      backgroundColor: form.bgRightSection,
      color: form.colorRightSection,
    },
    rightHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "30px",
      paddingVertical: "40px",
    },
    fullName: {
      fontSize: "16px",
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: "1px",
      marginBottom: "5px",
    },
    jobTitle: {
      fontSize: "8px",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    location: {
      fontSize: "10px",
      marginBottom: "5px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "150px",
      // overflowWrap: "break-word",
      whiteSpace: "wrap",
    },
    rightAboutMe: {
      marginBottom: "26px",
    },
    rightAboutMeTitle: {
      fontSize: "10px",
      textTransform: "uppercase",
      fontWeight: "extrabold",
      paddingBottom: "5px",
      marginBottom: "10px",
      borderBottom: `1px solid ${form.colorRightSection}`,
    },
    rightAboutMeText: {
      fontSize: "10px",
      textAlign: "left",
    },
  })

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document
      // title="Alexander Bryndin"
      // author="Alexander Bryndin"
      // creator="Resume Builder"
      // producer="Alexander Bryndin"
      >
        <Page size="A4" style={styles.page}>
          <View fixed style={styles.left}>
            <Image style={styles.image} src={form.src || " "} />
          </View>
          <View style={styles.right}>
            <View fixed style={styles.rightHeader}>
              <View>
                <Text style={styles.fullName}>{form.firstName}</Text>
                <Text style={styles.fullName}>{form.lastName}</Text>
                <Text style={styles.jobTitle}>{form.jobTitle}</Text>
              </View>
              <View>
                <Text style={styles.location}>
                  <Image src={icons.location} /> {form.location}, {form.city}
                </Text>
                <Text style={styles.location}>
                  <Image src={icons.gmail} /> {form.email}
                </Text>
                <Text style={styles.location}>
                  <Image src={icons.phone} /> {form.phone}
                </Text>
              </View>
            </View>

            <View style={styles.rightAboutMe}>
              <Text style={styles.rightAboutMeTitle}>About me</Text>

              <Text style={styles.rightAboutMeText}>{form.aboutMe}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Pdf1
