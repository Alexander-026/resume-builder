import { FC } from "react"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"

import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd"
import { useState } from "react"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"
import { useAppDispatch } from "../../app/hooks"
import LabelItem from "./LabelItem"
import { IData, IFormItem } from "../../types/form"
const { Panel } = Collapse

type ListFolderProps = {
  dataItem: IData
}

const Skills: FC<ListFolderProps> = ({ dataItem }) => {
  const [id, setId] = useState<string | null>(null)
  const [showWindow, setShowWindow] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const {
    visibilityLevelHandler,
    editDataHandler,
    addItemHandler,
    removeItemHandler,
  } = resumeBuilderSlice.actions

  const link = dataItem.type === "Links"

  const removeHandler = () => {
    if (id) {
      dispatch(removeItemHandler({ id: dataItem.id, childId: id }))
      setId(null)
    }
  }

  return (
    <Col span={24} order={2}>
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
      <Form.Item>
        {!!dataItem.items?.length && (
          <>
            {!link && (
              <>
                <Space align="start" direction="horizontal">
                  <Typography.Text>Don't show experiance level</Typography.Text>
                  <Tooltip
                    placement="right"
                    title={dataItem.showLevel ? "Hide" : "Show"}
                  >
                    <Switch
                      size="small"
                      checked={dataItem.showLevel}
                      disabled={!dataItem.visibility}
                      onChange={() =>
                        dispatch(
                          visibilityLevelHandler({
                            id: dataItem.id,
                            value: !dataItem.showLevel,
                          }),
                        )
                      }
                    />
                  </Tooltip>
                </Space>
                <Divider />
              </>
            )}

            <Collapse
              accordion
              expandIconPosition="end"
              collapsible={!dataItem.visibility ? "disabled" : undefined}
            >
              {dataItem.items.map((item: IFormItem) => (
                <Panel
                  key={item.id}
                  header={
                    <Typography.Title style={{ marginBottom: 0 }} level={5}>
                      {item.value || "Not specified"}
                    </Typography.Title>
                  }
                  extra={
                    <DeleteOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        if (dataItem.visibility) {
                          if (showWindow) {
                            setId(item.id)
                          } else {
                            dispatch(
                              removeItemHandler({
                                id: dataItem.id,
                                childId: item.id,
                              }),
                            )
                          }
                        }
                      }}
                    />
                  }
                >
                  <Row justify="space-between" align={"middle"} gutter={0}>
                    <Col span={10}>
                      <Space align="start" direction="vertical" size={0}>
                        <Typography.Title level={5}>Label</Typography.Title>
                        <Input
                          allowClear
                          value={item.value}
                          disabled={!dataItem.visibility}
                          onChange={(e) =>
                            dispatch(
                              editDataHandler({
                                id: dataItem.id,
                                key: "value",
                                value: e.target.value,
                                childId: item.id,
                              }),
                            )
                          }
                        />
                      </Space>
                    </Col>
                    {(link || dataItem.showLevel) && (
                      <Col span={link ? 14 : 6}>
                        <Space.Compact block direction="vertical">
                          <Typography.Title level={5}>
                            {link ? "Link" : "Level"}
                          </Typography.Title>
                          {link ? (
                            <Input
                              allowClear
                              value={item.link}
                              disabled={!dataItem.visibility}
                              onChange={(e) =>
                                dispatch(
                                  editDataHandler({
                                    id: dataItem.id,
                                    key: "link",
                                    value: e.target.value,
                                    childId: item.id,
                                  }),
                                )
                              }
                            />
                          ) : (
                            <Rate
                              onChange={(e) =>
                                dispatch(
                                  editDataHandler({
                                    id: dataItem.id,
                                    key: "level",
                                    value: e + "",
                                    childId: item.id,
                                  }),
                                )
                              }
                              value={
                                !dataItem.visibility || !dataItem.showLevel
                                  ? 0
                                  : +item.level!
                              }
                            />
                          )}
                        </Space.Compact>
                      </Col>
                    )}
                  </Row>
                </Panel>
              ))}
            </Collapse>
            <Divider />
          </>
        )}
        <Button
          size="small"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            dispatch(addItemHandler({ id: dataItem.id, type: dataItem.type }))
          }
          disabled={!dataItem.visibility}
        >
          Add one more item
        </Button>
      </Form.Item>
    </Col>
  )
}

export default Skills
