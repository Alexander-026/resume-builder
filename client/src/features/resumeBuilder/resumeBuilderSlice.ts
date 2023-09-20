import {
  updateInputValue,
  updateInputVisibility,
  labelHandler,
  visibilityHandler,
  visibilityLevelHandler,
  editDataHandler,
  addItemHandler,
  removeItemHandler,
  addSectionHanlder,
  removeSectionHanlder,
  sortSection,
  pageSizeHandler,
  selectPdfExample,
} from "./resumeBuilderReducers"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { initialState } from "./builderInitState"

export const resumeBuilderSlice = createSlice({
  name: "resume-builder",
  initialState,
  reducers: {
    updateInputValue,
    updateInputVisibility,
    labelHandler,
    visibilityHandler,
    visibilityLevelHandler,
    editDataHandler,
    addItemHandler,
    removeItemHandler,
    addSectionHanlder,
    removeSectionHanlder,
    sortSection,
    pageSizeHandler,
    selectPdfExample,
  },
})

export default resumeBuilderSlice.reducer

export const resumeBuilder = (state: RootState) => state.resumeBuilder
