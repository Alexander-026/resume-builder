import { Col, Form, Input, Row, DatePicker } from "antd"
import Settings from "./Settings"
import { useAppSelector } from "../../app/hooks"
import { resumeBuilder } from "../../features/resumeBuilder/resumeBuilderSlice"
import { ILetterItemData } from "../../types/form"
import dayjs from "dayjs"

const { TextArea } = Input

const FormLetterResume = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { letterData } = form

  const renderField = (item: ILetterItemData): JSX.Element => {
    switch (item.type) {
      case "text":
        return <Input allowClear value={item.value} onChange={(e) => {}} />
      case "date":
        return (
          <DatePicker
            allowClear
            value={dayjs(item.value, "DD.MM.YYYY")}
            onChange={(e) => {}}
            style={{ width: "100%" }}
          />
        )
      case "letter":
        return (
          <TextArea
            value={item.value}
            onChange={(e) => {}}
            maxLength={5000}
            showCount
            allowClear
            autoSize={{ minRows: 3, maxRows: 15 }}
          />
        )
    }
  }

  return (
    <Form layout="vertical">
      <Row justify={"start"} align={"top"} gutter={5}>
        <Col span={24}>
          <Settings />
        </Col>
        {Object.keys(letterData).map((key) => (
          <Col span={letterData[key].fieldSize} key={letterData[key].id}>
            <Form.Item label={letterData[key].label}>
              {renderField(letterData[key])}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export default FormLetterResume
