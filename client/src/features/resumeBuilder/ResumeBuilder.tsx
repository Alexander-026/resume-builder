import classnames from "classnames"
import { Affix, Col, Row } from "antd"
import styles from "./ResumeBuilder.module.scss"

import { useAppSelector } from "../../app/hooks"
import { resumeBuilder } from "./resumeBuilderSlice"
import { renderPdfSection } from "../../utils/renderPdfSection"
import { renderFormSection } from "../../utils/renderFormSection"

const ResumeBuilder = () => {
  const { form } = useAppSelector(resumeBuilder)

  const pdf = form.templates
    .find((templates) => templates.items.find((item) => item.active)?.active)
    ?.items.find((item) => item.active)!

  return (
    <Row className={styles.resume}>
      <Col className={classnames(styles.resumeForm)} span={12}>
        {renderFormSection(pdf)}
      </Col>
      <Col className={classnames(styles.resumeResult)} span={12}>
        <Affix
          className={classnames(styles.resumeAffix)}
          offsetTop={40}
          offsetBottom={0}
        >
          {renderPdfSection(pdf)}
        </Affix>
      </Col>
    </Row>
  )
}

export default ResumeBuilder
