import {
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Upload,
} from "antd"
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import ImgCrop from "antd-img-crop"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import { useState } from "react"
import { beforeUpload, onFileRead, onPreview } from "../../utils/upload"
import AbotMeFolder from "./AbotMeFolder"
import ListFolder from "./ListFolder"

const FormResume = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { fixedData, editableData } = form
  const dispatch = useAppDispatch()

  const { updateInputValue, updateInputVisibility, editInputLabel } =
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

  return (
    <Form layout="vertical">
      <Row justify={"center"} align={"middle"} gutter={10}>
        <Col span={24}>
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
        {/* <Col span={9}>
          <Form.Item label="Left side">
            <Space>
              <ColorPicker
                format="hex"
                value={form.bgLeftSection}
                onChange={(e) =>
                  dispatch(
                    updateFormInput({
                      type: "bgLeftSection",
                      value: `#${e.toHex()}`,
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
                    updateFormInput({
                      type: "colorLeftSection",
                      value: `#${e.toHex()}`,
                    }),
                  )
                }
              />
              <Col>Color</Col>
            </Space>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Right side">
            <Space>
              <ColorPicker
                format="hex"
                value={form.bgRightSection}
                onChange={(e) =>
                  dispatch(
                    updateFormInput({
                      type: "bgRightSection",
                      value: `#${e.toHex()}`,
                    }),
                  )
                }
              />
              <Col>Background</Col>
              <ColorPicker
                format="hex"
                value={form.colorRightSection}
                onChange={(e) =>
                  dispatch(
                    updateFormInput({
                      type: "colorRightSection",
                      value: `#${e.toHex()}`,
                    }),
                  )
                }
              />
              <Col>Color</Col>
            </Space>
          </Form.Item>
        </Col> */}
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
      <Row justify={"center"} align={"middle"} gutter={[0, 20]}>
        <AbotMeFolder />
        <ListFolder dataName="skills" />
        <ListFolder dataName="languages" />
      </Row>
    </Form>
  )
}

export default FormResume
