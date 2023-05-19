import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface IKeyString {
  [key: string]: string
}

export interface IForm extends IKeyString {
  jobTitle: string
  src: string
  firstName: string
  lastName: string
}

export interface ResumeBuilderState {
  form: IForm
}

const initialState: ResumeBuilderState = {
  form: {
    jobTitle: "",
    src: "",
    firstName: "",
    lastName: "",
  },
}

export const updateFormInput: CaseReducer<
  ResumeBuilderState,
  PayloadAction<{ type: string; value: string }>
> = (state, action) => {
  const { type, value } = action.payload

  state.form[type] = value
}

export const resumeBuilderSlice = createSlice({
  name: "resume-builder",
  initialState,
  reducers: {
    updateFormInput,
  },
})

export default resumeBuilderSlice.reducer

export const resumeBuilder = (state: RootState) => state.resumeBuilder
