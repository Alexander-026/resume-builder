import { View, Text, StyleSheet } from "@react-pdf/renderer"
import { IData, IForm } from "../../../types/form"
import { FC } from "react"

type Pdf1DescriptionProps = {
  form: IForm
  dataItem: IData
}

const Pdf1CVDescription: FC<Pdf1DescriptionProps> = ({ form, dataItem }) => {
  const styles = StyleSheet.create({
    heading: {
      marginBottom: "26px",
      paddingHorizontal: "20px",
    },
    headingTitle: {
      fontSize: "12px",
      textTransform: "uppercase",
      fontWeight: "extrabold",
      paddingBottom: "5px",
      marginBottom: "10px",
      borderBottom:
        dataItem.section === "Primary"
          ? `1px solid ${form.colorRightSection}`
          : "none",
    },
    headingText: {
      fontSize: "10px",
      textAlign: "left",
    },
  })
  return (
    <View style={styles.heading}>
      <Text style={styles.headingTitle}>{dataItem.label}</Text>
      <Text style={styles.headingText}>{dataItem.value}</Text>
    </View>
  )
}

export default Pdf1CVDescription
