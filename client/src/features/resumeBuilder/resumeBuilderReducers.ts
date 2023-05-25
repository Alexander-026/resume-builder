import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ResumeBuilderState } from "./builderInitState"
import { v4 as uuid } from "uuid"
import { IFormItem } from "../../types/form"

export const updateInputValue: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ value: string; key: string; innerKey?: string }>
> = (state, action) => {
  const { value, key, innerKey } = action.payload
  if (innerKey) {
    state.form[key][innerKey].value = value
  } else {
    state.form[key] = value
  }
}
export const updateInputVisibility: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ value: boolean; key: string; innerKey: string }>
> = (state, action) => {
  const { value, key, innerKey } = action.payload
  state.form[key][innerKey].visibility = value
}
export const editInputLabel: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ value: string; key: string }>
> = (state, action) => {
  const { value, key } = action.payload
  state.form.editableData[key].label = value
}

export const addItem: CaseReducer<ResumeBuilderState, PayloadAction<string>> = (
  state,
  action,
) => {
  state.form.editableData[action.payload].items.push({
    id: uuid(),
    value: "Not specified",
    level: "5",
  })
}
export const removeItem: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ id: string; key: string }>
> = (state, action) => {
  const { id, key } = action.payload
  const items = state.form.editableData[key].items
  state.form.editableData[key].items = items.filter(
    (item: IFormItem) => item.id !== id,
  )
}
export const toogleItemLevel: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ key: string; value: boolean }>
> = (state, action) => {
  const { key, value } = action.payload
  state.form.editableData[key].showLevel = value
}

export const editItem: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{
    type: "value" | "level"
    value: string
    id: string
    key: string
  }>
> = (state, action) => {
  const { type, value, id, key } = action.payload
  const data = state.form.editableData[key]
  const items = data.items
  const item = items.find((item: IFormItem) => item.id === id)
  switch (type) {
    case "value":
      if (item) {
        item.value = value
        data.items = items
      }
      break
    case "level":
      if (item) {
        item.level = value
        data.items = items
      }
      break
    default:
      break
  }
}
