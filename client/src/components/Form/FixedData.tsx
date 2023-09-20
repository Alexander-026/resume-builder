import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import {
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
} from "antd"
import ImgCrop from "antd-img-crop"
import { beforeUpload, onFileRead, onPreview } from "../../utils/upload"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import Settings from "./Settings"

const FixedData = () => {
  const { form } = useAppSelector(resumeBuilder)
  const { fixedData } = form
  const dispatch = useAppDispatch()
  const { updateInputValue, updateInputVisibility } = resumeBuilderSlice.actions
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
      <Col span={15}>
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
      <Col span={3}>
        <Settings />
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
                      title={`${fixedData[key].visibility ? "Hide" : "Show"} ${
                        fixedData[key].label
                      }`}
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
  )
}

export default FixedData
