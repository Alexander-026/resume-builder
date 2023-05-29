import {
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Upload,
  Collapse,
  Button,
  Typography,
  Divider,
} from "antd"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import ImgCrop from "antd-img-crop"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import { useState } from "react"
import { beforeUpload, onFileRead, onPreview } from "../../utils/upload"
import Description from "./Description"
import Skills from "./Skills"
import Specification from "./Specification"
import { IData } from "../../types/form"
import LabelItem from "./LabelItem"
const { Panel } = Collapse

const FormResume = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { fixedData, data } = form
  const dispatch = useAppDispatch()

  const { updateInputValue, updateInputVisibility, visibilityHandler } =
    resumeBuilderSlice.actions
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList)
    if (newFileList[0]) {
      const src = await onFileRead(newFileList[0])
      dispatch(updateInputValue({ value: src, key: "src" }))
    }
  }

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

  return (
    <Form layout="vertical">
      <Row justify={"start"} align={"top"} gutter={10}>
        <Col style={{ height: "7rem" }} span={6}>
          <ImgCrop rotationSlider>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              beforeUpload={beforeUpload}
              onPreview={onPreview}
              onRemove={() => {
                dispatch(updateInputValue({ value: "", key: "src" }))
              }}
              accept=".png,.jpg,.jpeg"
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Col>
        <Col span={18}>
          <Form.Item label="Theme">
            <Space>
              <ColorPicker
                format="hex"
                value={form.bgLeftSection}
                onChange={(e) =>
                  dispatch(
                    updateInputValue({
                      value: `#${e.toHex()}`,
                      key: "bgLeftSection",
                    }),
                  )
                }
              />
              <Col>Background</Col>
              <ColorPicker
                format="hex"
                value={form.colorLeftSection}
                onChange={(e) =>
                  dispatch(
                    updateInputValue({
                      value: `#${e.toHex()}`,
                      key: "colorLeftSection",
                    }),
                  )
                }
              />
              <Col>Color</Col>
            </Space>
          </Form.Item>
        </Col>
        {Object.keys(fixedData).map((key) => (
          <Col span={fixedData[key].fieldSize} key={fixedData[key].id}>
            <Form.Item
              label={
                fixedData[key].visitable ? (
                  <Row justify={"center"} align={"middle"} gutter={10}>
                    <Col>{fixedData[key].label}</Col>
                    <Col>
                      <Tooltip
                        placement="right"
                        title={`${
                          fixedData[key].visibility ? "Hide" : "Show"
                        } ${fixedData[key].label}`}
                        trigger={["click", "hover"]}
                      >
                        {fixedData[key].visibility ? (
                          <EyeOutlined
                            onClick={() => {
                              dispatch(
                                updateInputVisibility({
                                  value: false,
                                  key: "fixedData",
                                  innerKey: key,
                                }),
                              )
                            }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            onClick={() => {
                              dispatch(
                                updateInputVisibility({
                                  value: true,
                                  key: "fixedData",
                                  innerKey: key,
                                }),
                              )
                            }}
                          />
                        )}
                      </Tooltip>
                    </Col>
                  </Row>
                ) : (
                  fixedData[key].label
                )
              }
            >
              <Input
                allowClear
                value={fixedData[key].value}
                onChange={(e) =>
                  dispatch(
                    updateInputValue({
                      value: e.target.value,
                      key: "fixedData",
                      innerKey: key,
                    }),
                  )
                }
                disabled={!fixedData[key].visibility}
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row align={"top"} gutter={[0, 20]}>
        <Col span={24}>
          <Divider orientation="center">
            <Typography.Title level={3}>Primary Side</Typography.Title>
          </Divider>
          <Collapse size="large" accordion expandIconPosition="end">
            {data.map(
              (item) =>
                item.section === "Primary" && (
                  <Panel
                    header={<LabelItem dataItem={item} />}
                    key={item.id}
                    collapsible={item.visibility ? undefined : "disabled"}
                    extra={
                      <Tooltip
                        placement="top"
                        title={`${item.visibility ? "Hide" : "Show"} ${
                          item.label
                        }`}
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
                    }
                  >
                    {renderSection(item)}
                  </Panel>
                ),
            )}
          </Collapse>
          <Divider orientation="center">
            <Typography.Title level={4}>Secondary side</Typography.Title>
          </Divider>
          <Collapse size="large" accordion expandIconPosition="end">
            {data.map(
              (item) =>
                item.section === "Secondary" && (
                  <Panel
                    header={<LabelItem dataItem={item} />}
                    key={item.id}
                    collapsible={item.visibility ? undefined : "disabled"}
                    extra={
                      <Tooltip
                        placement="top"
                        title={`${item.visibility ? "Hide" : "Show"} ${
                          item.label
                        }`}
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
                    }
                  >
                    {renderSection(item)}
                  </Panel>
                ),
            )}
          </Collapse>
        </Col>
      </Row>
    </Form>
  )
}

export default FormResume
