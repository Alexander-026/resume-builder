import { Divider, Form } from "antd"
import FixedData from "./FixedData"
import EditableData from "./EditableData"
import AddSection from "./AddSection"

const FormResume = () => {
  return (
    <Form layout="vertical">
      <FixedData />
      <Divider dashed />
      <EditableData />
      <Divider dashed />
      <AddSection />
    </Form>
  )
}

export default FormResume
