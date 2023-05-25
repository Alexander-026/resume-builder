import { Col, Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import LabelItem from "./LabelItem"

const AbotMeFolder = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { editableData } = form
  const dispatch = useAppDispatch()

  const { updateInputValue } = resumeBuilderSlice.actions
  return (
    <Col
      span={editableData.aboutMe.fieldSize}
      order={editableData.aboutMe.order || 1}
    >
      <Form.Item
        label={
          <LabelItem editableData={editableData} editableLabelKey="aboutMe" />
        }
      >
        <Input.TextArea
          maxLength={2000}
          showCount
          allowClear
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={editableData.aboutMe.value}
          disabled={!editableData.aboutMe.visibility}
          onChange={(e) =>
            dispatch(
              updateInputValue({
                value: e.target.value,
                key: "editableData",
                innerKey: "aboutMe",
              }),
            )
          }
        />
      </Form.Item>
    </Col>
  )
}

export default AbotMeFolder
