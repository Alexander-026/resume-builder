import { z } from "zod"

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().default(""),
  email: z.string().email("Invalid email").or(z.literal("")).default(""),
  phone: z.string().default(""),
  address: z.string().default(""),
  city: z.string().default(""),
  country: z.string().default(""),
  postalCode: z.string().default(""),
  website: z.string().default(""),
  photo: z.string().default(""),
})

export const experienceItemSchema = z.object({
  id: z.string(),
  position: z.string().default(""),
  company: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  description: z.string().default(""),
})

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().default(""),
  school: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.string().default(""),
})

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  level: z.number().min(0).max(5).default(3),
})

export const languageItemSchema = z.object({
  id: z.string(),
  language: z.string().default(""),
  level: z.number().min(0).max(5).default(3),
})

export const linkItemSchema = z.object({
  id: z.string(),
  label: z.string().default(""),
  url: z.string().default(""),
})

export const themeSchema = z.object({
  leftBgColor: z.string().default("#6f6b6b"),
  leftTextColor: z.string().default("#ffffff"),
  rightBgColor: z.string().default("#ffffff"),
  rightTextColor: z.string().default("#000000"),
  primaryColor: z.string().default("#6f6b6b"),
  secondaryColor: z.string().default("#444444"),
})

export const coverLetterSchema = z.object({
  firstNameFrom: z.string().default(""),
  lastNameFrom: z.string().default(""),
  addressFrom: z.string().default(""),
  cityFrom: z.string().default(""),
  postalCodeFrom: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().default(""),
  firstNameTo: z.string().default(""),
  lastNameTo: z.string().default(""),
  addressTo: z.string().default(""),
  cityTo: z.string().default(""),
  postalCodeTo: z.string().default(""),
  currentDate: z.string().default(""),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  letter: z.string().default(""),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>
