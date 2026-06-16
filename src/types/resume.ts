// ─── Skill / Language level 0-5 ─────────────────────────────────────────────
export type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5

// ─── Personal info ───────────────────────────────────────────────────────────
export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  website: string
  photo: string
}

// ─── Section item types ──────────────────────────────────────────────────────
export interface ExperienceItem {
  id: string
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface EducationItem {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface SkillItem {
  id: string
  name: string
  level: SkillLevel
}

export interface LanguageItem {
  id: string
  language: string
  level: SkillLevel
}

export interface LinkItem {
  id: string
  label: string
  url: string
}

// ─── Section union ───────────────────────────────────────────────────────────
export type SectionType =
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "links"
  | "about"

export interface BaseSection {
  id: string
  type: SectionType
  label: string
  visible: boolean
}

export interface AboutSection extends BaseSection {
  type: "about"
  content: string
}

export interface ExperienceSection extends BaseSection {
  type: "experience"
  items: ExperienceItem[]
}

export interface EducationSection extends BaseSection {
  type: "education"
  items: EducationItem[]
}

export interface SkillsSection extends BaseSection {
  type: "skills"
  showLevel: boolean
  items: SkillItem[]
}

export interface LanguagesSection extends BaseSection {
  type: "languages"
  showLevel: boolean
  items: LanguageItem[]
}

export interface LinksSection extends BaseSection {
  type: "links"
  items: LinkItem[]
}

export type ResumeSection =
  | AboutSection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | LanguagesSection
  | LinksSection

// ─── Theme ───────────────────────────────────────────────────────────────────
export interface ThemeSettings {
  leftBgColor: string
  leftTextColor: string
  rightBgColor: string
  rightTextColor: string
  primaryColor: string
  secondaryColor: string
}

// ─── Cover letter ────────────────────────────────────────────────────────────
export interface CoverLetterData {
  firstNameFrom: string
  lastNameFrom: string
  addressFrom: string
  cityFrom: string
  postalCodeFrom: string
  phone: string
  email: string
  firstNameTo: string
  lastNameTo: string
  addressTo: string
  cityTo: string
  postalCodeTo: string
  currentDate: string
  title: string
  subtitle: string
  letter: string
}

// ─── Template ────────────────────────────────────────────────────────────────
export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6

export interface Template {
  id: TemplateId
  name: string
  thumbnail?: string
}

// ─── Full resume store shape ──────────────────────────────────────────────────
export interface ResumeData {
  personalInfo: PersonalInfo
  sections: ResumeSection[]
  activeTemplate: TemplateId
  theme: ThemeSettings
  coverLetter: CoverLetterData
}
