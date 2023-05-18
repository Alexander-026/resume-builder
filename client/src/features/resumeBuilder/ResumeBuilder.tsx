import React, { useState } from "react"
import classnames from "classnames"
import ImgCrop from "antd-img-crop"
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { Col, Input, Form, Row, Upload, Avatar, message, Tooltip } from "antd"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import type { UploadChangeParam } from "antd/es/upload"
import styles from "./ResumeBuilder.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resumeBuilder, resumeBuilderSlice } from "./resumeBuilderSlice"

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  // console.log("img", img)
  if (img) {
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
}

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

  const [loading, setLoading] = useState(false)

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        dispatch(updateFormInput({ type: "url", value: url }))
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div>
      <Row className={styles.resume} align={"stretch"}>
        <Col className={classnames(styles.resumeForm)} span={12}>
          <Form layout="vertical">
            <Row justify={"center"} gutter={10}>
              <Col span={8}>
                <Form.Item label="Documen Name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"} align={"middle"} gutter={10}>
              <Col span={12}>
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
              <Col flex={1} span={12}>
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {form.url ? (
                      <Tooltip
                        placement="right"
                        title={
                          <div
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            style={{
                              height: "100%",
                              width: "100%",
                              border: "1px solid white",
                            }}
                          >
                            <DeleteOutlined
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            />{" "}
                            <EditOutlined
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            />
                          </div>
                        }
                      >
                        <Avatar
                          src={form.url}
                          alt="avatar"
                          shape="square"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Tooltip>
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </ImgCrop>
              </Col>
              <Col span={12}>
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
              <Col span={12}>
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
            </Row>
          </Form>
        </Col>
        <Col className={classnames(styles.resumePDF)} span={12}>
          one
        </Col>
      </Row>
    </div>
  )
}

export default ResumeBuilder
