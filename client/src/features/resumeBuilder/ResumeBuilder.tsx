import React, { useState } from "react"
import classnames from "classnames"
import ImgCrop from "antd-img-crop"
import { Col, Input, Form, Row, Upload } from "antd"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import styles from "./ResumeBuilder.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resumeBuilder, resumeBuilderSlice } from "./resumeBuilderSlice"

const ResumeBuilder = () => {
  const { form } = useAppSelector(resumeBuilder)
  const dispatch = useAppDispatch()
  const { updateFormInput } = resumeBuilderSlice.actions

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList)
    const src = await onFileRead(newFileList[0])
    dispatch(updateFormInput({ type: "src", value: src }))
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
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    accept=".png,.jpg,.jpeg"
                  >
                    {fileList.length < 1 && "+ Upload"}
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
