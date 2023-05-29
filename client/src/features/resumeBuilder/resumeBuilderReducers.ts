import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ResumeBuilderState } from "./builderInitState"
import { v4 as uuid } from "uuid"
import { IData, IFormItem, INewData, TypeDate } from "../../types/form"

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

export const labelHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ id: string; value: string; innerId?: string }>
> = (state, action) => {
  const { id, value, innerId } = action.payload
  const data = state.form.data
  const item = data.find((item) => item.id === id)

  if (innerId && item) {
    const innerItem = item.items?.find((innerItem) => innerItem.id === innerId)
    if (innerItem) {
      innerItem.label = value
      state.form.data = data
    }
  } else {
    if (item) {
      item.label = value
      state.form.data = data
    }
  }
}
export const visibilityHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ id: string; value: boolean }>
> = (state, action) => {
  const { id, value } = action.payload
  const data = state.form.data
  const item = data.find((item) => item.id === id)

  if (item) {
    item.visibility = value
    state.form.data = data
  }
}
export const visibilityLevelHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ id: string; value: boolean }>
> = (state, action) => {
  const { id, value } = action.payload
  const data = state.form.data
  const item = data.find((item) => item.id === id)

  if (item) {
    item.showLevel = value
    state.form.data = data
  }
}

export const editDataHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{
    id: string
    key: string
    value: string | string[]
    childId?: string
  }>
> = (state, action) => {
  const { id, key, value, childId } = action.payload
  const data = state.form.data
  const item = data.find((item) => item.id === id)

  if (childId && item) {
    const childItem = item.items?.find((childItem) => childItem.id === childId)
    if (childItem) {
      childItem[key] = value
      state.form.data = data
    }
  } else {
    if (item) {
      item[key] = value
      state.form.data = data
    }
  }
}
export const addItemHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{
    id: string
    type: TypeDate
  }>
> = (state, action) => {
  const { id, type } = action.payload
  const data = state.form.data
  const children = data.find((item) => item.id === id)?.items
  const newSkill: IFormItem = {
    id: uuid(),
    value: "Not specified",
    level: "5",
  }
  const newLink: IFormItem = {
    id: uuid(),
    value: "Not specified",
    link: "",
  }
  const newSpecification: IFormItem = {
    id: uuid(),
    value: "",
    value2: "",
    value3: "",
    description: "",
    startEnd: ["", ""],
  }
  switch (type) {
    case "Skills":
      children?.push(newSkill)
      break
    case "Links":
      children?.push(newLink)
      break
    case "Specification":
      children?.push(newSpecification)
      break
    default:
      break
  }
  state.form.data = data
}
export const removeItemHandler: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{
    id: string
    childId: string
  }>
> = (state, action) => {
  const { id, childId } = action.payload
  const newData = state.form.data.map((item) => {
    if (item.id === id) {
      const newChildren = item.items?.filter((child) => child.id !== childId)
      item.items = newChildren
      return item
    } else {
      return item
    }
  })
  state.form.data = newData
}
export const addSectionHanlder: CaseReducer<
  ResumeBuilderState,
  PayloadAction<string>
> = (state, action) => {
  const newData: INewData = {
    description: {
      id: uuid(),
      label: "Not specified",
      type: "Description",
      section: "Primary",
      draggable: true,
      value: "",
      visibility: true,
      removable: true,
    },
    skills: {
      id: uuid(),
      label: "Not specified",
      type: "Skills",
      section: "Primary",
      draggable: true,
      visibility: true,
      showLevel: true,
      removable: true,
      items: [],
    },
    links: {
      id: uuid(),
      label: "Not specified",
      type: "Links",
      section: "Primary",
      draggable: true,
      visibility: true,
      removable: true,
      items: [],
    },
    specification: {
      id: uuid(),
      label: "Not specified",
      type: "Specification",
      section: "Primary",
      draggable: false,
      visibility: true,
      removable: true,
      items: [],
    },
  }

  const data: IData = newData[action.payload]

  if (data) {
    state.form.data.push(data)
  }
}
export const removeSectionHanlder: CaseReducer<
  ResumeBuilderState,
  PayloadAction<string>
> = (state, action) => {
  const id = action.payload
  const newData: IData[] = state.form.data.filter((item) => item.id !== id)
  state.form.data = newData
}
