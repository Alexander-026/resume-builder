export interface IKeyString {
  [key: string]: any
}

export interface IFormItem extends IKeyString {
  id: string
  value?: string
  value2?: string
  value3?: string
  startEnd?: string[]
  description?: string
  fieldSize?: number
  label?: string
  editLabel?: boolean
  visitable?: boolean
  visibility?: boolean
  level?: string
  link?: string
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
export interface IList extends IKeyString {
  label: string
  visibility: boolean
  showLevel?: boolean
  items: IFormItem[]
}

export type TypeDate = "Description" | "Skills" | "Links" | "Specification"
export type Section = "Primary" | "Secondary"

export interface IData extends Omit<IFormItem, "id">, IKeyString {
  id: string
  type: TypeDate
  section: Section
  label: string
  visibility: boolean
  draggable: boolean
  showLevel?: boolean
  removable?: boolean
  items?: IFormItem[]
}

export interface IEditableData extends IKeyString {
  aboutMe: IFormItem
  skills: IList
  languages: IList
  links: IList
  employmenthistory: IList
  education: IList
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
  src: string
  fixedData: IFixedData
  data: IData[]
}

export interface INewData extends IKeyString {
  description: IData
  skills: IData
  links: IData
  specification: IData
}
