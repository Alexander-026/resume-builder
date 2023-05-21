import React, { useState } from "react"
import classnames from "classnames"
import ImgCrop from "antd-img-crop"
import {
  Col,
  Input,
  Form,
  Row,
  Upload,
  message,
  ColorPicker,
  Space,
} from "antd"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import styles from "./ResumeBuilder.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resumeBuilder, resumeBuilderSlice } from "./resumeBuilderSlice"
import Pdf1 from "../../components/Pdf1"

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}

const ResumeBuilder = () => {
  const { form } = useAppSelector(resumeBuilder)
  const dispatch = useAppDispatch()
  const { updateFormInput } = resumeBuilderSlice.actions

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList)
    if (newFileList[0]) {
      const src = await onFileRead(newFileList[0])
      dispatch(updateFormInput({ type: "src", value: src }))
    }
  }

  const onFileRead = async (file: UploadFile): Promise<string> => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    return src || ""
  }
  const onPreview = async (file: UploadFile) => {
    const src = await onFileRead(file)
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <Row className={styles.resume} align={"stretch"}>
      <Col className={classnames(styles.resumeForm)} span={12}>
        <Form layout="vertical">
          <Row justify={"center"} align={"middle"} gutter={10}>
            <Col span={6}>
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  beforeUpload={beforeUpload}
                  onPreview={onPreview}
                  onRemove={() => {
                    dispatch(updateFormInput({ type: "src", value: "" }))
                  }}
                  accept=".png,.jpg,.jpeg"
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
            <Col span={9}>
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
            </Col>
            <Col span={8}>
              <Form.Item label="First Name">
                <Input
                  value={form.firstName}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "firstName",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name">
                <Input
                  value={form.lastName}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "lastName",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Wanted Job Title">
                <Input
                  value={form.jobTitle}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "jobTitle",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Location">
                <Input
                  value={form.location}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "location",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="City">
                <Input
                  value={form.city}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "city",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "phone",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="About Me">
                <Input.TextArea
                  maxLength={2000}
                  showCount
                  allowClear
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  value={form.aboutMe}
                  onChange={(e) =>
                    dispatch(
                      updateFormInput({
                        type: "aboutMe",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span={12}>
        <Pdf1 />
      </Col>
    </Row>
  )
}

export default ResumeBuilder
