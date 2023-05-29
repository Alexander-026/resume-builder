import { useState } from "react"
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import { IData } from "../../types/form"
import Description from "./Description"
import Skills from "./Skills"
import Specification from "./Specification"
import LabelItem from "./LabelItem"
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons"

const EditableData = () => {
  const [id, setId] = useState<string | null>(null)
  const [showWindow, setShowWindow] = useState<boolean>(true)
  const { form } = useAppSelector(resumeBuilder)
  const { data } = form
  const dispatch = useAppDispatch()

  const { visibilityHandler, removeSectionHanlder } = resumeBuilderSlice.actions

  const renderSection = (dataItem: IData) => {
    const { type } = dataItem
    switch (type) {
      case "Description":
        return <Description key={dataItem.id} dataItem={dataItem} />
      case "Skills":
        return <Skills key={dataItem.id} dataItem={dataItem} />
      case "Links":
        return <Skills key={dataItem.id} dataItem={dataItem} />
      case "Specification":
        return <Specification key={dataItem.id} dataItem={dataItem} />
      default:
        return <></>
    }
  }

  const removeHandler = () => {
    if (id) {
      dispatch(removeSectionHanlder(id))
      setId(null)
    }
  }
  return (
    <Row align={"top"} gutter={10}>
      <Modal
        title="Delete Entry"
        centered
        open={!!id}
        onCancel={() => setId(null)}
        footer={
          <Row align="middle" justify={"space-between"}>
            <Checkbox onChange={(e) => setShowWindow(e.target.value)}>
              Dont ask me again
            </Checkbox>
            <Space align="center">
              <Button onClick={removeHandler}>Delete</Button>
              <Button onClick={() => setId(null)} type="primary">
                Cancel
              </Button>
            </Space>
          </Row>
        }
      >
        <Typography.Text>
          Are you sure you want to delete this entry?
        </Typography.Text>
      </Modal>
      <Col span={24}>
        <Collapse size="large" accordion expandIconPosition="end">
          {data.map((item) => (
            <Collapse.Panel
              header={<LabelItem dataItem={item} />}
              key={item.id}
              collapsible={item.visibility ? undefined : "disabled"}
              extra={
                item.removable ? (
                  <Tooltip placement="top" title={"Delete"}>
                    <Button
                      size="small"
                      type="text"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (showWindow) {
                          setId(item.id)
                        } else {
                          dispatch(removeSectionHanlder(item.id))
                        }
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    placement="top"
                    title={`${item.visibility ? "Hide" : "Show"} ${item.label}`}
                    trigger={["click", "hover"]}
                  >
                    {item.visibility ? (
                      <Button
                        size="small"
                        type="text"
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            visibilityHandler({
                              id: item.id,
                              value: !item.visibility,
                            }),
                          )
                        }}
                        icon={<EyeOutlined />}
                      />
                    ) : (
                      <Button
                        size="small"
                        icon={<EyeInvisibleOutlined />}
                        type="text"
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            visibilityHandler({
                              id: item.id,
                              value: !item.visibility,
                            }),
                          )
                        }}
                      />
                    )}
                  </Tooltip>
                )
              }
            >
              {renderSection(item)}
            </Collapse.Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}

export default EditableData
