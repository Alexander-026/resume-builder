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
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import LabelItem from "./LabelItem"
import { IFormItem } from "../../types/form"
const { Panel } = Collapse

type ListFolderProps = {
  dataName: string
}

const ListFolder: FC<ListFolderProps> = ({ dataName }) => {
  const { form } = useAppSelector(resumeBuilder)
  const [id, setId] = useState<string | null>(null)
  const [showWindow, setShowWindow] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const { addItem, removeItem, toogleItemLevel, editItem } =
    resumeBuilderSlice.actions

  const data = form.editableData[dataName]

  const removeHandler = () => {
    if (id) {
      dispatch(removeItem({ id, key: dataName }))
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
      <Form.Item
        label={
          <LabelItem
            editableData={form.editableData}
            editableLabelKey={dataName}
          />
        }
      >
        {!!data.items.length && (
          <>
            <Space align="start" direction="horizontal">
              <Typography.Text>Level</Typography.Text>
              <Tooltip
                placement="right"
                title={data.showLevel ? "Hide" : "Show"}
              >
                <Switch
                  size="small"
                  checked={data.showLevel}
                  onChange={() =>
                    dispatch(
                      toogleItemLevel({
                        key: dataName,
                        value: !data.showLevel,
                      }),
                    )
                  }
                />
              </Tooltip>
            </Space>
            <Divider />
            <Collapse
              accordion
              expandIconPosition="end"
              collapsible={!data.visibility ? "disabled" : undefined}
            >
              {data.items.map((item: IFormItem) => (
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
                        if (data.visibility) {
                          if (showWindow) {
                            setId(item.id)
                          } else {
                            dispatch(removeItem({ id: item.id, key: dataName }))
                          }
                        }
                      }}
                    />
                  }
                >
                  <Row justify="space-between" align={"middle"} gutter={0}>
                    <Col span={10}>
                      <Space align="start" direction="vertical">
                        <Typography.Title level={5}>Skill</Typography.Title>
                        <Input
                          allowClear
                          value={item.value}
                          disabled={!data.visibility}
                          onChange={(e) =>
                            dispatch(
                              editItem({
                                type: "value",
                                value: e.target.value,
                                id: item.id,
                                key: dataName,
                              }),
                            )
                          }
                        />
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Space align="start" direction="vertical" size={0}>
                        <Typography.Title level={5}>Level</Typography.Title>
                        <Rate
                          disabled={!data.visibility || !data.showLevel}
                          onChange={(value) =>
                            dispatch(
                              editItem({
                                type: "level",
                                value: `${value || 1}`,
                                id: item.id,
                                key: dataName,
                              }),
                            )
                          }
                          value={
                            !data.visibility || !data.showLevel
                              ? 0
                              : +item.level!
                          }
                        />
                      </Space>
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
            <Divider />
          </>
        )}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => dispatch(addItem(dataName))}
          disabled={!data.visibility}
        >
          Add one more {dataName.substring(0, dataName.length - 1)}
        </Button>
      </Form.Item>
    </Col>
  )
}

export default ListFolder
