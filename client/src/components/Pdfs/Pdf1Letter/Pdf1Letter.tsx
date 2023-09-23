import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer"
import { useAppSelector } from "../../../app/hooks"
import { resumeBuilder } from "../../../features/resumeBuilder/resumeBuilderSlice"

const Pdf1Letter = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { letterData } = form

  const styles = StyleSheet.create({
    letter: {
      flexDirection: "column",
      display: "flex",
      width: "100%",
      padding: "52px",
      backgroundColor: "#ffffff",
    },
    row: {
      width: "100%",
      display: "flex",
    },
    block: {
      gap: "5px",
      marginBottom: "26px",
    },
    text: {
      color: "#000",
      fontSize: "12px",
    },
    title: {
      color: "#000",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "26px",
    },
    subtitle: {
      color: "#000",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
  })
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page style={styles.letter}>
          <View style={{ ...styles.row, alignItems: "flex-start" }}>
            <View style={styles.block}>
              <Text style={styles.text}>
                {letterData.firstNameFrom.value} {letterData.lastNameFrom.value}
              </Text>
              <Text style={styles.text}>{letterData.addressFrom.value}</Text>
              <Text style={styles.text}>
                {letterData.postalCodeFrom.value} {letterData.cityFrom.value}
              </Text>
              <Text style={styles.text}>Tel: {letterData.phone.value}</Text>
              <Text style={styles.text}>Email: {letterData.email.value}</Text>
            </View>
          </View>
          <View style={{ ...styles.row, alignItems: "flex-start" }}>
            <View style={styles.block}>
              <Text style={styles.text}>
                {letterData.firstNameTo.value} {letterData.lastNameTo.value}
              </Text>
              <Text style={styles.text}>{letterData.addressTo.value}</Text>
              <Text style={styles.text}>
                {letterData.postalCodeTo.value} {letterData.cityTo.value}
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.text}>
              {letterData.cityFrom.value}, {letterData.currentDate.value}
            </Text>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <Text style={styles.title}>{letterData.title.value}</Text>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <Text style={styles.subtitle}>{letterData.title.value}</Text>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.text}>{letterData.letter.value}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Pdf1Letter
