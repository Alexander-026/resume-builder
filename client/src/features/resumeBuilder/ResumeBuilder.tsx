import classnames from "classnames"
import { Affix, Col, Row } from "antd"
import styles from "./ResumeBuilder.module.scss"

import FormResume from "../../components/Form/FormResume"
import { useAppSelector } from "../../app/hooks"
import { resumeBuilder } from "./resumeBuilderSlice"
import { ITemplateItem } from "../../types/form"
import Pdf1CV from "../../components/Pdfs/Pdf1CV/Pdf1CV"
import Pdf2CV from "../../components/Pdfs/Pdf2CV/Pdf2CV"
import Pdf3CV from "../../components/Pdfs/Pdf3CV/Pdf3CV"
import Pdf4CV from "../../components/Pdfs/Pdf4CV/Pdf4CV"
import Pdf5CV from "../../components/Pdfs/Pdf5CV/Pdf5CV"
import Pdf6CV from "../../components/Pdfs/Pdf6CV/Pdf6CV"
import Pdf7Letter from "../../components/Pdfs/Pdf7Letter/Pdf7Letter"
import Pdf8Letter from "../../components/Pdfs/Pdf8Letter/Pdf8Letter"
import Pdf9Letter from "../../components/Pdfs/Pdf9Letter/Pdf9Letter"
import Pdf10Letter from "../../components/Pdfs/Pdf10Letter/Pdf10Letter"
import Pdf11Letter from "../../components/Pdfs/Pdf11Letter/Pdf11Letter"
import Pdf12Letter from "../../components/Pdfs/Pdf12Letter/Pdf12Letter"

const ResumeBuilder = () => {
  const { form } = useAppSelector(resumeBuilder)

  const renderSection = (dataItem: ITemplateItem) => {
    const { name, id } = dataItem
    switch (name) {
      case "CV-1":
        return <Pdf1CV key={id} />
      case "CV-2":
        return <Pdf2CV key={id} />
      case "CV-3":
        return <Pdf3CV key={id} />
      case "CV-4":
        return <Pdf4CV key={id} />
      case "CV-5":
        return <Pdf5CV key={id} />
      case "CV-6":
        return <Pdf6CV key={id} />
      case "Letter-1":
        return <Pdf7Letter key={id} />
      case "Letter-2":
        return <Pdf8Letter key={id} />
      case "Letter-3":
        return <Pdf9Letter key={id} />
      case "Letter-4":
        return <Pdf10Letter key={id} />
      case "Letter-5":
        return <Pdf11Letter key={id} />
      case "Letter-6":
        return <Pdf12Letter key={id} />
    }
  }
  const pdf = form.templates
    .find((templates) => templates.items.find((item) => item.active)?.active)
    ?.items.find((item) => item.active)!

  return (
    <Row className={styles.resume}>
      <Col className={classnames(styles.resumeForm)} span={12}>
        <FormResume />
      </Col>
      <Col className={classnames(styles.resumeResult)} span={12}>
        <Affix
          className={classnames(styles.resumeAffix)}
          offsetTop={40}
          offsetBottom={0}
        >
          {renderSection(pdf)}
        </Affix>
      </Col>
    </Row>
  )
}

export default ResumeBuilder
