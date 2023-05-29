import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd"
import { FC, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"
import LabelItem from "./LabelItem"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { IData, IFormItem } from "../../types/form"
import dayjs from "dayjs"
const { Panel } = Collapse
const { RangePicker } = DatePicker

type SpecificationProps = {
  dataItem: IData
  label1?: string
  label2?: string
  label3?: string
  label4?: string
  label5?: string
}

const Specification: FC<SpecificationProps> = ({
  dataItem,
  label1,
  label2,
  label3,
  label4,
  label5,
}) => {
  const [id, setId] = useState<string | null>(null)
  const [showWindow, setShowWindow] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const { editDataHandler, addItemHandler, removeItemHandler } =
    resumeBuilderSlice.actions
  const removeHandler = () => {
    if (id) {
      dispatch(removeItemHandler({ id: dataItem.id, childId: id }))
      setId(null)
    }
  }
  return (
    <Col span={24} order={3}>
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
            <Collapse
              accordion
              expandIconPosition="end"
              collapsible={!dataItem.visibility ? "disabled" : undefined}
            >
              {dataItem.items.map((item: IFormItem) => (
                <Panel
                  key={item.id}
                  header={
                    <Space direction="vertical" size={0}>
                      <Typography.Title style={{ marginBottom: 0 }} level={5}>
                        {item.value || item.value2
                          ? `${item.value} ${
                              item.value && item.value2 && "at"
                            } ${item.value2}`
                          : "Not specified"}
                      </Typography.Title>
                      <Typography.Text>
                        {item.startEnd?.[0]
                          ? `${dayjs(item.startEnd?.[0], "MMM-YYYY").format(
                              "MMM-YYYY",
                            )} - `
                          : ""}
                        {item.startEnd?.[1]
                          ? dayjs(item.startEnd?.[1], "MMM-YYYY").format(
                              "MMM-YYYY",
                            )
                          : `${item.startEnd?.[0] ? "Present" : ""}`}
                      </Typography.Text>
                    </Space>
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
                  <Row
                    justify="space-between"
                    align={"middle"}
                    gutter={[10, 10]}
                  >
                    <Col span={12}>
                      <Space.Compact block direction="vertical">
                        <Typography.Title level={5}>
                          {label1 ? label1 : "Job Title"}
                        </Typography.Title>
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
                      </Space.Compact>
                    </Col>
                    <Col span={12}>
                      <Space.Compact block direction="vertical">
                        <Typography.Title level={5}>
                          {label2 ? label2 : "Employer"}
                        </Typography.Title>
                        <Input
                          allowClear
                          value={item.value2}
                          disabled={!dataItem.visibility}
                          onChange={(e) =>
                            dispatch(
                              editDataHandler({
                                id: dataItem.id,
                                key: "value2",
                                value: e.target.value,
                                childId: item.id,
                              }),
                            )
                          }
                        />
                      </Space.Compact>
                    </Col>
                    <Col span={12}>
                      <Space.Compact block direction="vertical">
                        <Typography.Title level={5}>
                          {label3 ? label3 : "Start & End Date"}
                        </Typography.Title>
                        <RangePicker
                          disabled={!dataItem.visibility}
                          value={
                            item.startEnd?.[0] && item.startEnd?.[1]
                              ? [
                                  dayjs(item.startEnd?.[0], "MMM-YYYY"),
                                  dayjs(item.startEnd?.[1], "MMM-YYYY"),
                                ]
                              : undefined
                          }
                          onChange={(e, d) => {
                            dispatch(
                              editDataHandler({
                                id: dataItem.id,
                                key: "startEnd",
                                value: d,
                                childId: item.id,
                              }),
                            )
                          }}
                          format="MMM-YYYY"
                          picker="month"
                          allowEmpty={[true, true]}
                        />
                      </Space.Compact>
                    </Col>
                    <Col span={12}>
                      <Space.Compact block direction="vertical">
                        <Typography.Title level={5}>
                          {label4 ? label4 : "City"}
                        </Typography.Title>
                        <Input
                          allowClear
                          value={item.value3}
                          disabled={!dataItem.visibility}
                          onChange={(e) =>
                            dispatch(
                              editDataHandler({
                                id: dataItem.id,
                                key: "value3",
                                value: e.target.value,
                                childId: item.id,
                              }),
                            )
                          }
                        />
                      </Space.Compact>
                    </Col>
                    <Col span={24}>
                      <Space.Compact block direction="vertical">
                        <Typography.Title level={5}>
                          {label5 ? label5 : "Description"}
                        </Typography.Title>
                        <Input.TextArea
                          allowClear
                          autoSize={{ minRows: 10, maxRows: 10 }}
                          value={item.description}
                          disabled={!dataItem.visibility}
                          onChange={(e) =>
                            dispatch(
                              editDataHandler({
                                id: dataItem.id,
                                key: "description",
                                value: e.target.value,
                                childId: item.id,
                              }),
                            )
                          }
                        />
                      </Space.Compact>
                    </Col>
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

export default Specification
