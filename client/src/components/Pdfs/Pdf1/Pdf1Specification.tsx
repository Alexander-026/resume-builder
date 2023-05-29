import { FC } from "react"
import { IData, IForm, IFormItem } from "../../../types/form"
import { globalStyles } from "../globalSyles"
import { View, Text, StyleSheet } from "@react-pdf/renderer"
import dayjs from "dayjs"

type Pdf1HeaderProps = {
  form: IForm
  dataItem: IData
}

const Pdf1Specification: FC<Pdf1HeaderProps> = ({ form, dataItem }) => {
  const { editableData } = form

  const global = globalStyles(form)

  const styles = StyleSheet.create({
    specification: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    data: {
      width: "110px",
      textAlign: "left",
      alignSelf: "stretch",
      paddingRight: "5px",
    },
    description: {
      flex: 1,
      textAlign: "left",
      position: "relative",
      paddingLeft: "10px",
      borderLeft: "1px solid black",
      alignSelf: "stretch",
      paddingBottom: "20px",
    },
    dot: {
      position: "absolute",
      width: "10px",
      height: "10px",
      backgroundColor: "black",
      borderRadius: "50%",
      top: "0",
      left: "-5.5px",
    },
    title: {
      fontWeight: "bold",
      fontSize: "11px",
      marginBottom: "4px",
    },
    text: {
      fontSize: "10px",
      color: "gray",
      marginBottom: "4px",
    },
  })

  if (!editableData.employmenthistory.visibility) {
    return <></>
  }
  return (
    <View style={global.heading}>
      <Text style={global.headingTitle}>{dataItem.label}</Text>
      {dataItem.items?.map((item: IFormItem) => (
        <View wrap={false} style={styles.specification} key={item.id}>
          <View style={styles.data}>
            <Text style={{ ...styles.title, textTransform: "uppercase" }}>
              {item.value2}
            </Text>
            <Text style={styles.text}>{item.value3}</Text>
            <Text style={styles.text}>
              {item.startEnd?.[0]
                ? `${dayjs(item.startEnd?.[0], "MMM-YYYY").format(
                    "MMM-YYYY",
                  )} - `
                : ""}
              {item.startEnd?.[1]
                ? dayjs(item.startEnd?.[1], "MMM-YYYY").format("MMM-YYYY")
                : `${item.startEnd?.[0] ? "Present" : ""}`}
            </Text>
          </View>
          <View style={styles.description}>
            <View style={styles.dot} />
            <Text style={{ ...styles.title, marginBottom: "10px" }}>
              {item.value}
            </Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Pdf1Specification
