import {
  updateInputValue,
  updateInputVisibility,
  editInputLabel,
  addItem,
  removeItem,
  toogleItemLevel,
  editItem,
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
    editInputLabel,
    addItem,
    removeItem,
    toogleItemLevel,
    editItem,
  },
})

export default resumeBuilderSlice.reducer

export const resumeBuilder = (state: RootState) => state.resumeBuilder
