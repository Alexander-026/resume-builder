import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer"
import { useAppSelector } from "../app/hooks"
import { resumeBuilder } from "../features/resumeBuilder/resumeBuilderSlice"
import { icons } from "../icons/icons"

const Pdf1 = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { fixedData, editableData } = form
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: form.bgLeftSection,
      display: "flex",
      width: "100%",
    },
    left: {
      padding: "20px",
      width: "30%",
      backgroundColor: form.bgLeftSection,
      color: form.colorLeftSection,
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
      paddingTop: "40px",
    },
    rightHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px",
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
      whiteSpace: "wrap",
    },
    rightAboutMe: {
      marginBottom: "26px",
    },
    rightAboutMeTitle: {
      fontSize: "12px",
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
    items: {
      width: "100%",
      marginBottom: "30px",
    },
    itemsTitle: {
      fontWeight: "bold",
      fontSize: "12px",
      textTransform: "uppercase",
      paddingBottom: "5px",
      marginBottom: "10px",
    },
    itemsItem: {
      marginBottom: "10px",
    },
    itemsText: {
      fontSize: "9px",
      textAlign: "left",
      textTransform: "uppercase",
    },
    itemsLevel: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: "5px",
    },
    itemsLevelItem: {
      width: `${100 / 6}%`,
      height: "3px",
      backgroundColor: form.colorLeftSection,
    },
  })

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View fixed style={styles.left}>
            <Image style={styles.image} src={form.src || " "} />

            {editableData.skills.visibility && (
              <View style={styles.items}>
                <Text style={styles.itemsTitle}>
                  {editableData.skills.label}
                </Text>
                {editableData.skills.items.map((item) => (
                  <View style={styles.itemsItem} key={item.id}>
                    <Text style={styles.itemsText} key={item.id}>
                      {item.value || "Not specified"}
                    </Text>
                    <View style={styles.itemsLevel}>
                      {editableData.skills.showLevel &&
                        item.level &&
                        Array(+item.level)
                          .fill(",")
                          .map((l, i) => (
                            <View key={i + 1} style={styles.itemsLevelItem} />
                          ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
            {editableData.languages.visibility && (
              <View style={styles.items}>
                <Text style={styles.itemsTitle}>
                  {editableData.languages.label}
                </Text>
                {editableData.languages.items.map((item) => (
                  <View style={styles.itemsItem} key={item.id}>
                    <Text style={styles.itemsText} key={item.id}>
                      {item.value || "Not specified"}
                    </Text>
                    <View style={styles.itemsLevel}>
                      {editableData.languages.showLevel &&
                        item.level &&
                        Array(+item.level)
                          .fill(",")
                          .map((l, i) => (
                            <View key={i + 1} style={styles.itemsLevelItem} />
                          ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.right}>
            <View fixed style={styles.rightHeader}>
              <View>
                <Text style={styles.fullName}>{fixedData.firstName.value}</Text>
                <Text style={styles.fullName}>{fixedData.lastName.value}</Text>
                <Text style={styles.jobTitle}>{fixedData.jobTitle.value}</Text>
              </View>
              <View>
                <Text style={styles.location}>
                  <Image src={icons.location} /> {fixedData.country.value + " "}
                  {fixedData.city.value + " "}
                  {fixedData.address.value + " "}
                  {fixedData.postalCode.value + " "}
                </Text>
                <Text style={styles.location}>
                  <Image src={icons.gmail} /> {fixedData.email.value}
                </Text>
                {fixedData.phone.visibility && (
                  <Text style={styles.location}>
                    <Image src={icons.phone} /> {fixedData.phone.value}
                  </Text>
                )}
              </View>
            </View>
            {editableData.aboutMe.visibility && (
              <View style={styles.rightAboutMe}>
                <Text style={styles.rightAboutMeTitle}>
                  {editableData.aboutMe.label}
                </Text>
                <Text style={styles.rightAboutMeText}>
                  {editableData.aboutMe.value}
                </Text>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Pdf1
