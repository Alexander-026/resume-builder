import React, { FC } from "react"
import { IData, IForm } from "../../../types/form"
import { View, Text, Link, StyleSheet } from "@react-pdf/renderer"

type Pdf1CVListPRops = {
  form: IForm
  dataItem: IData
}

const Pdf1CVList: FC<Pdf1CVListPRops> = ({ form, dataItem }) => {
  const styles = StyleSheet.create({
    items: {
      width: "100%",
      marginBottom: "20px",
      paddingHorizontal: "20px",
    },
    itemsTitle: {
      fontWeight: "bold",
      fontSize: "12px",
      textTransform: "uppercase",
      paddingBottom: "5px",
      marginBottom: "10px",
      borderBottom: dataItem.section === "Primary" ? "1px solid black" : "none",
    },
    itemsContainer: {
      width: "100%",
      display: "flex",
      flexDirection:
        dataItem.section === "Primary" && dataItem.type === "Links"
          ? "row"
          : "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap:
        dataItem.section === "Primary" && dataItem.type === "Links"
          ? "10px"
          : "10px",
      flexWrap:
        dataItem.section === "Primary" && dataItem.type === "Links"
          ? "wrap"
          : "nowrap",
    },
    itemsItem: {
      width:
        dataItem.section === "Primary" && dataItem.type === "Links"
          ? "auto"
          : "100%",
      display: "flex",
      gap: dataItem.section === "Primary" ? "20px" : "10px",
      flexDirection:
        dataItem.section === "Primary" && dataItem.type !== "Links"
          ? "row"
          : "column",
      justifyContent:
        dataItem.section === "Primary" ? "space-between" : "flex-start",
      alignItems: dataItem.section === "Primary" ? "center" : "flex-start",
    },
    itemsText: {
      fontSize: "10px",
      textAlign: "left",
      textTransform: "capitalize",
    },
    itemsLevel: {
      width: dataItem.section === "Primary" ? "30%" : "100%",
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    itemsLevelItem: {
      width: `${100 / 6}%`,
      height: "3px",
      gap: "10px",
    },
    itemsLink: {
      color: dataItem.section === "Primary" ? "black" : form.colorLeftSection,
      fontSize: "10px",
      textAlign: "left",
      textTransform: "capitalize",
    },
  })
  return (
    <View style={styles.items}>
      <Text style={styles.itemsTitle}>{dataItem.label}</Text>
      <View style={styles.itemsContainer}>
        {dataItem.items?.map((item) =>
          dataItem.type === "Links" ? (
            <View style={styles.itemsItem} key={item.id}>
              {!!item.value && !!item.link ? (
                <Link style={styles.itemsLink} src={item.link}>
                  {item.value}
                </Link>
              ) : (
                <Text style={styles.itemsText}>Not specified</Text>
              )}
            </View>
          ) : (
            <View style={styles.itemsItem} key={item.id}>
              <Text style={styles.itemsText}>
                {item.value || "Not specified"}
              </Text>
              {dataItem.showLevel && item.level && (
                <View style={styles.itemsLevel}>
                  {Array(5)
                    .fill(",")
                    .map((l, i) => (
                      <View
                        key={i + 1}
                        style={{
                          ...styles.itemsLevelItem,
                          backgroundColor:
                            Number(item.level || 0) - i + 1 > 1
                              ? dataItem.section === "Primary"
                                ? "black"
                                : form.colorLeftSection
                              : "gray",
                        }}
                      />
                    ))}
                </View>
              )}
            </View>
          ),
        )}
      </View>
    </View>
  )
}

export default Pdf1CVList
