import { useState, useRef, useCallback, useEffect } from "react"
import { EditOutlined } from "@ant-design/icons"
import { Button, Col, Input, InputRef, Row, Tooltip, Typography } from "antd"
import { IData } from "../../types/form"
import { FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"

type LabelItemProps = {
  dataItem: IData
}

const LabelItem: FC<LabelItemProps> = ({ dataItem }) => {
  const [editable, setEditable] = useState<boolean>(false)
  const refInput = useRef<InputRef>(null)
  const dispatch = useAppDispatch()

  const setFocus = useCallback(() => {
    if (editable && refInput.current) {
      refInput.current.focus()
    }
  }, [editable])

  useEffect(() => {
    setFocus()
  }, [setFocus])

  const { labelHandler } = resumeBuilderSlice.actions
  const visibility = dataItem.visibility

  return (
    <Row align={"middle"} justify={"start"}>
      <Col>
        {editable ? (
          <Input
            ref={refInput}
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingLeft: 0,
              fontSize: "20px",
              fontWeight: 600,
              border: "none",
              borderRadius: 0,
              outline: 0,
              boxShadow: "none",
              borderBottom: "1px solid #d9d9d9",
              background: "transparent",
            }}
            value={dataItem.label}
            onBlur={(e) => {
              e.stopPropagation()
              setEditable(false)
            }}
            onPressEnter={(e) => {
              e.preventDefault()
              setEditable(false)
            }}
            onChange={(e) =>
              dispatch(labelHandler({ id: dataItem.id, value: e.target.value }))
            }
          />
        ) : (
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            {dataItem.label}
            <Tooltip
              placement="top"
              title={`Edit`}
              trigger={["click", "hover"]}
            >
              <Button
                disabled={!visibility}
                style={{ marginLeft: "0.5rem", padding: 0 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditable(true)
                }}
                type="ghost"
              >
                <EditOutlined style={{ fontSize: "20px" }} />
              </Button>
            </Tooltip>
          </Typography.Title>
        )}
      </Col>
    </Row>
  )
}

export default LabelItem
