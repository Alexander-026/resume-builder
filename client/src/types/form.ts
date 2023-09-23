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

export type ItemType = "text" | "letter" | "date"

export interface ILetterItemData extends IKeyString {
  id: string
  label: string
  value: string
  fieldSize: number
  type: ItemType
}

export interface ILetterData extends IKeyString {
  firstNameFrom: ILetterItemData
  lastNameFrom: ILetterItemData
  postalCodeFrom: ILetterItemData
  addressFrom: ILetterItemData
  cityFrom: ILetterItemData
  phone: ILetterItemData
  email: ILetterItemData
  firstNameTo: ILetterItemData
  lastNameTo: ILetterItemData
  addressTo: ILetterItemData
  cityTo: ILetterItemData
  postalCodeTo: ILetterItemData
  currentDate: ILetterItemData
  title: ILetterItemData
  subtitle: ILetterItemData
  letter: ILetterItemData
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
  singlePage: boolean
  fixedData: IFixedData
  letterData: ILetterData
  data: IData[]
  templates: ITemplate[]
}

export interface INewData extends IKeyString {
  description: IData
  skills: IData
  links: IData
  specification: IData
}

export type TemplateItemName =
  | "Letter-1"
  | "Letter-2"
  | "Letter-3"
  | "Letter-4"
  | "Letter-5"
  | "Letter-6"
  | "CV-1"
  | "CV-2"
  | "CV-3"
  | "CV-4"
  | "CV-5"
  | "CV-6"

export type TemplateItemType = "CV" | "Letter"
export interface ITemplateItem extends IKeyString {
  id: string
  name: TemplateItemName
  src: string
  active: boolean
  type: TemplateItemType
}

export interface ITemplate extends IKeyString {
  id: string
  name: string
  items: ITemplateItem[]
}
