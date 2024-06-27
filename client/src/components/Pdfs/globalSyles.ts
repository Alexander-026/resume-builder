import { StyleSheet } from "@react-pdf/renderer"
import { IForm } from "../../types/form"

export const globalStyles = (form: IForm) => {
  return StyleSheet.create({
    page: {
      flexDirection: "row",
      display: "flex",
      width: "100%",
    },
    dewider: {
      height: "20px",
    },
    left: {
      width: "30%",
      backgroundColor: form.bgLeftSection,
      color: form.colorLeftSection,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    image: {
      height: "180px",
      backgroundColor: "gray",
      objectFit: "cover",
      objectPosition: "50% 50%",
    },
    right: {
      width: "70%",
      backgroundColor: form.bgRightSection,
      color: form.colorRightSection,
    },
    rightHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      height: "180px",
      backgroundColor: form.bgLeftSection,
      paddingHorizontal: "20px",
      color: form.colorLeftSection,
      border: "1px solid black",
    },
    fullName: {
      fontSize: "26px",
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: "1px",
      marginBottom: "5px",
    },
    jobTitle: {
      fontSize: "10px",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    location: {
      fontSize: "10px",
      marginBottom: "5px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      maxWidth: "170px",
      whiteSpace: "wrap",
      gap: "5px",
    },
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
      borderBottom: `1px solid ${form.colorRightSection}`,
    },
    headingText: {
      fontSize: "10px",
      textAlign: "left",
    },
    items: {
      width: "100%",
      marginBottom: "20px",
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
    },
    itemsLink: {
      color: form.colorLeftSection,
      fontSize: "9px",
      textTransform: "uppercase",
    },
  })
}
