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

  const renderPdf1Section = (form: IForm, dataItem: IData, index: number) => {
    const { type, id } = dataItem
    switch (type) {
      case "Description":
        return (
          <Pdf1Description key={id + index} form={form} dataItem={dataItem} />
        )
      case "Skills":
        return <Pdf1List form={form} dataItem={dataItem} key={id + index} />
      case "Links":
        return <Pdf1List form={form} dataItem={dataItem} key={id + index} />
      case "Specification":
        return (
          <Pdf1Specification key={id + index} form={form} dataItem={dataItem} />
        )
      default:
        return <Fragment key={uuid()}></Fragment>
    }
  }
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page wrap={!form.singlePage} size="A4" style={styles.page}>
          <View style={styles.left}>
            <Image style={styles.image} src={form.src || " "} />
            <View style={styles.dewider} />
            <View style={{ display: "flex", flexDirection: "column" }}>
              {data.map(
                (dataItem, index) =>
                  dataItem.section === "Secondary" &&
                  dataItem.visibility &&
                  renderPdf1Section(form, dataItem, index + 1),
              )}
            </View>
          </View>
          <View style={styles.right}>
            <Pdf1Header form={form} />
            {data.map(
              (dataItem, index) =>
                dataItem.section === "Primary" &&
                dataItem.visibility &&
                renderPdf1Section(form, dataItem, index),
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Pdf1
