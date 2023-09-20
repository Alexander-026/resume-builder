import { Button, Col, Divider, Form, Popover, Row } from "antd"
import FixedData from "./FixedData"
import EditableData from "./EditableData"
import AddSection from "./AddSection"
import { AppstoreOutlined } from "@ant-design/icons"
import ViewSections from "../ViewSections/ViewSections"

const FormResume = () => {
  return (
    <Form layout="vertical">
      <FixedData />
      <Row justify="center">
        <Col>
          <Popover content={<ViewSections />} trigger="click">
            <Button icon={<AppstoreOutlined />}>View</Button>
          </Popover>
        </Col>
      </Row>
      <Divider dashed />
      <EditableData />
      <Divider dashed />
      <AddSection />
    </Form>
  )
}

export default FormResume
