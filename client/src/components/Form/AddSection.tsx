import { Button, Col, Row, Select, Space, Typography } from "antd"
import {
  IdcardOutlined,
  LinkOutlined,
  SolutionOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import { TypeDate } from "../../types/form"
import { useAppDispatch } from "../../app/hooks"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"

interface IOptions {
  value: string
  label: string
  icon: JSX.Element
}
const options: IOptions[] = [
  {
    value: "description",
    label: "Description",
    icon: <IdcardOutlined />,
  },
  {
    value: "skills",
    label: "Skills",
    icon: <StarOutlined />,
  },
  {
    value: "links",
    label: "Links",
    icon: <LinkOutlined />,
  },
  {
    value: "specification",
    label: "Specification",
    icon: <SolutionOutlined />,
  },
]

const AddSection = () => {
  const [section, setSection] = useState<string>("")
  const { addSectionHanlder } = resumeBuilderSlice.actions
  const dispatch = useAppDispatch()

  const createSection = () => {
    dispatch(addSectionHanlder(section))
    setSection("")
  }

  return (
    <Row gutter={10}>
      <Col span={24}>
        <Typography.Title level={3}>Add Senction</Typography.Title>
      </Col>
      <Col span={12}>
        <Select
          allowClear
          value={section}
          onChange={(value) => setSection(value)}
          placeholder="select section"
          style={{ width: "100%" }}
        >
          {options.map((option) => (
            <Select.Option key={option.value}>
              <Space align="center" size={3}>
                {option.icon} {option.label}
              </Space>
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={12}>
        <Button onClick={createSection} disabled={!section} type="primary">
          Add Senction
        </Button>
      </Col>
    </Row>
  )
}

export default AddSection
