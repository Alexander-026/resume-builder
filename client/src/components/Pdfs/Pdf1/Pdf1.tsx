import { Fragment } from "react"
import { Page, View, Document, Image, PDFViewer } from "@react-pdf/renderer"
import { v4 as uuid } from "uuid"
import { useAppSelector } from "../../../app/hooks"
import { resumeBuilder } from "../../../features/resumeBuilder/resumeBuilderSlice"
import { globalStyles } from "../globalSyles"
import Pdf1Header from "./Pdf1Header"
import Pdf1Specification from "./Pdf1Specification"
import Pdf1List from "./Pdf1List"
import { IData, IForm } from "../../../types/form"
import Pdf1Description from "./Pdf1Description"

const Pdf1 = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { data } = form

  const styles = globalStyles(form)

  const renderPdf1Section = (form: IForm, dataItem: IData) => {
    const { type } = dataItem
    switch (type) {
      case "Description":
        return (
          <Pdf1Description key={dataItem.id} form={form} dataItem={dataItem} />
        )
      case "Skills":
        return <Pdf1List form={form} dataItem={dataItem} key={dataItem.id} />
      case "Links":
        return <Pdf1List form={form} dataItem={dataItem} key={dataItem.id} />
      case "Specification":
        return (
          <Pdf1Specification
            key={dataItem.id}
            form={form}
            dataItem={dataItem}
          />
        )
      default:
        return <Fragment key={uuid()}></Fragment>
    }
  }
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.left}>
            <View style={styles.dewider} />
            <Image style={styles.image} src={form.src || " "} />
            <View style={styles.dewider} />
            <View style={{ display: "flex", flexDirection: "column" }}>
              {data.map(
                (dataItem) =>
                  dataItem.section === "Secondary" &&
                  dataItem.visibility &&
                  renderPdf1Section(form, dataItem),
              )}
            </View>
          </View>
          <View style={styles.right}>
            <View fixed style={styles.dewider} />
            <Pdf1Header form={form} />
            {data.map(
              (dataItem) =>
                dataItem.section === "Primary" &&
                dataItem.visibility &&
                renderPdf1Section(form, dataItem),
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Pdf1
