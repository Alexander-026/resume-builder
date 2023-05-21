import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface IKeyString {
  [key: string]: string
}

export interface IFixedData extends IKeyString {
  src: string
  firstName: string
  lastName: string
  jobTitle: string
  location: string
  city: string
  email: string
  phone: string
}

export interface IForm extends IKeyString {
  jobTitle: string
  src: string
  bgLeftSection: string
  colorLeftSection: string
  bgRightSection: string
  colorRightSection: string
  firstName: string
  lastName: string
  location: string
  city: string
  email: string
  phone: string
  aboutMe: string
}

export interface ResumeBuilderState {
  form: IForm
}

const initialState: ResumeBuilderState = {
  form: {
    jobTitle: "Frontend Developer",
    src: "",
    bgLeftSection: "#6f6b6b",
    colorLeftSection: "#ffffff",
    bgRightSection: "#ffffff",
    colorRightSection: "#000000",
    firstName: "Alexander",
    lastName: "Bryndin",
    location: "Ukraine ",
    city: "Kharkiv Yuvileyniy moskovskiy 32A",
    email: "alexanderbrendin@gmail.com",
    phone: "+38 097 375 79 00",
    aboutMe:
      "As a frontend developer with over 3 years of experience, I specialize in creating dynamic and responsive user interfaces using a variety of technologies. Throughout my career, I have connuously sought to expand my knowledge and skills in frontend development, staying up-to-date with the latest technologies and best pracces.",
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
