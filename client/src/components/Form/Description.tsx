import { FC } from "react"
import { Col, Form, Input } from "antd"
import { useAppDispatch } from "../../app/hooks"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"
import LabelItem from "./LabelItem"
import { IData } from "../../types/form"

type DescriptionProps = {
  dataItem: IData
}

const Description: FC<DescriptionProps> = ({ dataItem }) => {
  const dispatch = useAppDispatch()

  const { editDataHandler } = resumeBuilderSlice.actions
  return (
    <Col span={24} order={1}>
      <Form.Item>
        <Input.TextArea
          maxLength={2000}
          showCount
          allowClear
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={dataItem.value}
          disabled={!dataItem.visibility}
          onChange={(e) =>
            dispatch(
              editDataHandler({
                id: dataItem.id,
                key: "value",
                value: e.target.value,
              }),
            )
          }
        />
      </Form.Item>
    </Col>
  )
}

export default Description
