import { SettingOutlined, SnippetsOutlined } from "@ant-design/icons"
import {
  Button,
  Form,
  Popover,
  Switch,
  Tooltip,
  Modal,
  Row,
  Typography,
  Col,
  Carousel,
} from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  resumeBuilder,
  resumeBuilderSlice,
} from "../../features/resumeBuilder/resumeBuilderSlice"
import styles from "./Settings.module.scss"
import { useState } from "react"
import classNames from "classnames"

const Settings = () => {
  const { form } = useAppSelector(resumeBuilder)
  const dispatch = useAppDispatch()
  const { pageSizeHandler, selectPdfExample } = resumeBuilderSlice.actions
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false)

  const showModal = () => {
    setIsModalOpen(true)
    setIsTemplatesOpen(false)
  }

  return (
    <>
      <Modal
        title={<Typography.Title level={4}>All Templates</Typography.Title>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Row justify={"center"}>
          {form.templates.map((temp) => (
            <Col key={temp.id} span={24}>
              <Typography.Title className={styles.title} level={5}>
                {temp.name}
              </Typography.Title>
              <Carousel className={styles.carousel}>
                {temp.items.map((item) => (
                  <div
                    className={classNames(styles.carouselItem, {
                      active: item.active,
                    })}
                    onClick={() => dispatch(selectPdfExample(item))}
                    key={item.id}
                  >
                    <Typography.Text className={styles.carouselItemTitle}>
                      {item.name}
                    </Typography.Text>
                    <img
                      className={styles.carouselItemImg}
                      src={item.src}
                      alt={item.name}
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
          ))}
        </Row>
      </Modal>
      <Form.Item label={"Settings"}>
        <Popover
          trigger="click"
          open={isTemplatesOpen}
          onOpenChange={() => setIsTemplatesOpen(true)}
          content={
            <>
              <Form.Item label={"Pdf view"}>
                <Tooltip
                  placement="top"
                  title={form.singlePage ? "Pages" : "Single page"}
                >
                  <Switch
                    checked={form.singlePage}
                    onChange={(e) => {
                      dispatch(pageSizeHandler(e))
                    }}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item label="Templates">
                <Button onClick={showModal} icon={<SnippetsOutlined />} />
              </Form.Item>
            </>
          }
        >
          <Button icon={<SettingOutlined />} />
        </Popover>
      </Form.Item>
    </>
  )
}

export default Settings
