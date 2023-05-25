export interface IKeyString {
  [key: string]: any
}

export interface IFormItem {
  id: string
  value: string
  fieldSize?: number
  label?: string
  editLabel?: boolean
  visitable?: boolean
  visibility?: boolean
  order?: number
  level?: string
}

export interface IFixedData extends IKeyString {
  firstName: IFormItem
  lastName: IFormItem
  jobTitle: IFormItem
  country: IFormItem
  city: IFormItem
  email: IFormItem
  phone: IFormItem
  address: IFormItem
  postalCode: IFormItem
}
export interface ISkills extends IKeyString {
  label: string
  visibility: boolean
  showLevel: boolean
  items: IFormItem[]
}

export interface IEditableData extends IKeyString {
  aboutMe: IFormItem
  skills: ISkills
  languages: ISkills
}
export interface ITheme extends IKeyString {
  bgLeftSection: string
  colorLeftSection: string
  bgRightSection: string
  colorRightSection: string
}

export interface IForm extends IKeyString {
  bgLeftSection: string
  colorLeftSection: string
  bgRightSection: string
  colorRightSection: string
  src: string
  fixedData: IFixedData
  editableData: IEditableData
}
