import classnames from "classnames"
import { Affix, Col, Row } from "antd"
import styles from "./ResumeBuilder.module.scss"
import Pdf1 from "../../components/Pdfs/Pdf1/Pdf1"
import FormResume from "../../components/Form/FormResume"

const ResumeBuilder = () => {
  return (
    <Row className={styles.resume}>
      <Col className={classnames(styles.resumeForm)} span={12}>
        <FormResume />
      </Col>
      <Col className={classnames(styles.resumeResult)} span={12}>
        <Affix
          className={classnames(styles.resumeAffix)}
          offsetTop={30}
          offsetBottom={0}
        >
          <Pdf1 />
        </Affix>
      </Col>
    </Row>
  )
}

export default ResumeBuilder
