import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Space, Tooltip, Typography } from "antd"
import { IEditableData } from "../../types/form"
import { FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { resumeBuilderSlice } from "../../features/resumeBuilder/resumeBuilderSlice"

type LabelItemProps = {
  editableData: IEditableData
  editableLabelKey: string
}

const LabelItem: FC<LabelItemProps> = ({ editableData, editableLabelKey }) => {
  const dispatch = useAppDispatch()

  const { updateInputVisibility, editInputLabel } = resumeBuilderSlice.actions
  return (
    <Space align="center">
      <Typography.Title
        type={
          !editableData[editableLabelKey].visibility ? "secondary" : undefined
        }
        level={4}
        editable={
          editableData[editableLabelKey].visibility && {
            onChange: (e) => {
              dispatch(
                editInputLabel({
                  value: e,
                  key: editableLabelKey,
                }),
              )
            },
          }
        }
      >
        {editableData[editableLabelKey].label}
      </Typography.Title>
      <Tooltip
        placement="right"
        title={`${
          editableData[editableLabelKey].visibility ? "Hide" : "Show"
        } ${editableData[editableLabelKey].label}`}
        trigger={["click", "hover"]}
      >
        {editableData[editableLabelKey].visibility ? (
          <EyeOutlined
            onClick={() => {
              dispatch(
                updateInputVisibility({
                  value: false,
                  key: "editableData",
                  innerKey: editableLabelKey,
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
                  key: "editableData",
                  innerKey: editableLabelKey,
                }),
              )
            }}
          />
        )}
      </Tooltip>
    </Space>
  )
}

export default LabelItem
