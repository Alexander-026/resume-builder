import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import type {
  PersonalInfo, ResumeSection, TemplateId, ThemeSettings,
  CoverLetterData, ExperienceItem, EducationItem,
  SkillItem, LanguageItem, LinkItem,
} from "@/types/resume"

const defaultPersonalInfo: PersonalInfo = {
  firstName: "Alexander",
  lastName:  "Bryndin",
  jobTitle:  "Full Stack Developer",
  email:     "alex.bryndin@gmail.com",
  phone:     "+49 171 749 0736",
  address:   "",
  city:      "Neu-Ulm",
  country:   "Germany",
  postalCode: "",
  website:   "github.com/alexbryndin",
  photo:     "",
}

const defaultSections: ResumeSection[] = [
  {
    id: "about",
    type: "about",
    label: "About Me",
    visible: true,
    content:
      "Full Stack Developer with 6+ years of experience building scalable web applications from concept to deployment. " +
      "Specialized in React / Next.js on the frontend and Node.js / NestJS / PostgreSQL on the backend. " +
      "Comfortable leading small teams, conducting code reviews, and driving architectural decisions. " +
      "Passionate about clean code, developer experience, and shipping products users actually love.",
  },
  {
    id: "experience",
    type: "experience",
    label: "Work Experience",
    visible: true,
    items: [
      {
        id: "exp-1",
        position:    "Senior Full Stack Developer",
        company:     "TechVision GmbH",
        location:    "Berlin, Germany",
        startDate:   "Jan 2023",
        endDate:     "",
        current:     true,
        description:
          "Led development of a SaaS platform serving 50k+ users. " +
          "Architected a micro-frontend system with Next.js 14, reducing time-to-interactive by 40%. " +
          "Built REST & GraphQL APIs in NestJS backed by PostgreSQL and Redis. " +
          "Introduced automated E2E testing with Playwright, cutting regression bugs by 60%. " +
          "Mentored 3 junior developers and led bi-weekly architecture reviews.",
      },
      {
        id: "exp-2",
        position:    "Full Stack Developer",
        company:     "Level99 (Remote)",
        location:    "Remote",
        startDate:   "Apr 2021",
        endDate:     "Dec 2022",
        current:     false,
        description:
          "Developed and maintained a real-time collaboration tool used by 200+ enterprise clients. " +
          "Built WebSocket-powered features with Socket.io and Node.js. " +
          "Implemented state management with Zustand and server-state caching with React Query. " +
          "Migrated legacy REST endpoints to GraphQL, reducing over-fetching by 35%. " +
          "Set up CI/CD pipelines with GitHub Actions and Docker deployments on AWS ECS.",
      },
      {
        id: "exp-3",
        position:    "Frontend Developer",
        company:     "Lechner Soft",
        location:    "Kharkiv, Ukraine",
        startDate:   "Jun 2019",
        endDate:     "Mar 2021",
        current:     false,
        description:
          "Built responsive UI components in React + TypeScript for enterprise dashboards. " +
          "Integrated REST APIs and implemented complex data tables with filtering, sorting, and export. " +
          "Improved Lighthouse performance score from 52 to 91 through code splitting and lazy loading. " +
          "Participated in agile sprints, daily standups, and peer code reviews.",
      },
    ],
  },
  {
    id: "education",
    type: "education",
    label: "Education",
    visible: true,
    items: [
      {
        id: "edu-1",
        degree:    "Bachelor of Computer Science",
        school:    "Kharkiv National University of Radio Electronics",
        location:  "Kharkiv, Ukraine",
        startDate: "Sep 2015",
        endDate:   "Jun 2019",
        description: "Major in Software Engineering. Thesis: Distributed task scheduling using message queues.",
      },
      {
        id: "edu-2",
        degree:    "German Language Course (B2)",
        school:    "VHS Ulm",
        location:  "Ulm, Germany",
        startDate: "Feb 2024",
        endDate:   "Dec 2024",
        description: "",
      },
    ],
  },
  {
    id: "skills",
    type: "skills",
    label: "Skills",
    visible: true,
    showLevel: false,
    items: [
      { id: "sk-1",  name: "TypeScript",     level: 5 },
      { id: "sk-2",  name: "React / Next.js", level: 5 },
      { id: "sk-3",  name: "Node.js / NestJS", level: 5 },
      { id: "sk-4",  name: "PostgreSQL",      level: 4 },
      { id: "sk-5",  name: "GraphQL",         level: 4 },
      { id: "sk-6",  name: "Redis",           level: 4 },
      { id: "sk-7",  name: "Docker / CI-CD",  level: 4 },
      { id: "sk-8",  name: "AWS (ECS, S3)",   level: 3 },
      { id: "sk-9",  name: "Prisma / TypeORM", level: 4 },
      { id: "sk-10", name: "Zustand / RTK",   level: 5 },
      { id: "sk-11", name: "Jest / Playwright", level: 4 },
      { id: "sk-12", name: "Git / GitHub",    level: 5 },
    ] as SkillItem[],
  },
  {
    id: "languages",
    type: "languages",
    label: "Languages",
    visible: true,
    showLevel: true,
    items: [
      { id: "lang-1", language: "English", level: 4 },
      { id: "lang-2", language: "German",  level: 3 },
      { id: "lang-3", language: "Russian", level: 5 },
    ] as LanguageItem[],
  },
  {
    id: "links",
    type: "links",
    label: "Links",
    visible: true,
    items: [
      { id: "link-1", label: "GitHub",    url: "https://github.com/alexbryndin" },
      { id: "link-2", label: "LinkedIn",  url: "https://linkedin.com/in/alexander-bryndin" },
      { id: "link-3", label: "Portfolio", url: "https://alexbryndin.dev" },
    ] as LinkItem[],
  },
]

const defaultTheme: ThemeSettings = {
  leftBgColor:   "#2d2d2d",
  leftTextColor:  "#f0ede8",
  rightBgColor:  "#ffffff",
  rightTextColor: "#1a1a1a",
  primaryColor:  "#2d2d2d",
  secondaryColor: "#555555",
}

const defaultCoverLetter: CoverLetterData = {
  firstNameFrom: "", lastNameFrom: "", addressFrom: "",
  cityFrom: "", postalCodeFrom: "", phone: "", email: "",
  firstNameTo: "", lastNameTo: "", addressTo: "",
  cityTo: "", postalCodeTo: "", currentDate: "",
  title: "", subtitle: "", letter: "",
}

interface ResumeState {
  personalInfo: PersonalInfo
  sections: ResumeSection[]
  activeTemplate: TemplateId
  theme: ThemeSettings
  coverLetter: CoverLetterData
  contactOrder: string[]

  updatePersonalInfo: (data: Partial<PersonalInfo>) => void
  updateSection: (id: string, data: Partial<ResumeSection>) => void
  addSection: (section: ResumeSection) => void
  removeSection: (id: string) => void
  reorderSections: (activeId: string, overId: string) => void
  reorderSectionItems: (sectionId: string, activeId: string, overId: string) => void
  reorderContactFields: (activeId: string, overId: string) => void
  toggleSectionVisibility: (id: string) => void
  setTemplate: (id: TemplateId) => void
  updateTheme: (data: Partial<ThemeSettings>) => void
  updateCoverLetter: (data: Partial<CoverLetterData>) => void

  addExperienceItem: (sectionId: string) => void
  updateExperienceItem: (sectionId: string, item: ExperienceItem) => void
  removeExperienceItem: (sectionId: string, itemId: string) => void

  addEducationItem: (sectionId: string) => void
  updateEducationItem: (sectionId: string, item: EducationItem) => void
  removeEducationItem: (sectionId: string, itemId: string) => void

  addSkillItem: (sectionId: string) => void
  updateSkillItem: (sectionId: string, item: SkillItem) => void
  removeSkillItem: (sectionId: string, itemId: string) => void

  addLanguageItem: (sectionId: string) => void
  updateLanguageItem: (sectionId: string, item: LanguageItem) => void
  removeLanguageItem: (sectionId: string, itemId: string) => void

  addLinkItem: (sectionId: string) => void
  updateLinkItem: (sectionId: string, item: LinkItem) => void
  removeLinkItem: (sectionId: string, itemId: string) => void
}

export const useResumeStore = create<ResumeState>()(
  persist(
    immer((set) => ({
      personalInfo:   defaultPersonalInfo,
      sections:       defaultSections,
      activeTemplate: 1,
      theme:          defaultTheme,
      coverLetter:    defaultCoverLetter,
      contactOrder:   ["email", "phone", "website", "location"] as string[],

      updatePersonalInfo: (data) =>
        set((state) => { Object.assign(state.personalInfo, data) }),

      updateSection: (id, data) =>
        set((state) => {
          const idx = state.sections.findIndex((s) => s.id === id)
          if (idx !== -1) Object.assign(state.sections[idx], data)
        }),

      addSection: (section) =>
        set((state) => { state.sections.push(section) }),

      removeSection: (id) =>
        set((state) => { state.sections = state.sections.filter((s) => s.id !== id) }),

      reorderSections: (activeId, overId) =>
        set((state) => {
          const oldIdx = state.sections.findIndex((s) => s.id === activeId)
          const newIdx = state.sections.findIndex((s) => s.id === overId)
          if (oldIdx === -1 || newIdx === -1) return
          const [moved] = state.sections.splice(oldIdx, 1)
          state.sections.splice(newIdx, 0, moved)
        }),

      reorderContactFields: (activeId, overId) =>
        set((state) => {
          const order = [...state.contactOrder]
          const oldIdx = order.indexOf(activeId)
          const newIdx = order.indexOf(overId)
          if (oldIdx === -1 || newIdx === -1) return state
          order.splice(oldIdx, 1)
          order.splice(newIdx, 0, activeId)
          return { contactOrder: order }
        }),

      reorderSectionItems: (sectionId, activeId, overId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId) as { items?: { id: string }[] } | undefined
          if (!sec || !Array.isArray(sec.items)) return
          const oldIdx = sec.items.findIndex((i) => i.id === activeId)
          const newIdx = sec.items.findIndex((i) => i.id === overId)
          if (oldIdx === -1 || newIdx === -1) return
          const [moved] = sec.items.splice(oldIdx, 1)
          sec.items.splice(newIdx, 0, moved)
        }),

      toggleSectionVisibility: (id) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === id)
          if (sec) sec.visible = !sec.visible
        }),

      setTemplate: (id) =>
        set((state) => { state.activeTemplate = id }),

      updateTheme: (data) =>
        set((state) => { Object.assign(state.theme, data) }),

      updateCoverLetter: (data) =>
        set((state) => { Object.assign(state.coverLetter, data) }),

      addExperienceItem: (sectionId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "experience")
          if (sec && sec.type === "experience")
            sec.items.push({ id: nanoid(), position: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" })
        }),

      updateExperienceItem: (sectionId, item) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "experience")
          if (sec && sec.type === "experience") {
            const idx = sec.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) sec.items[idx] = item
          }
        }),

      removeExperienceItem: (sectionId, itemId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "experience")
          if (sec && sec.type === "experience")
            sec.items = sec.items.filter((i) => i.id !== itemId)
        }),

      addEducationItem: (sectionId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "education")
          if (sec && sec.type === "education")
            sec.items.push({ id: nanoid(), degree: "", school: "", location: "", startDate: "", endDate: "", description: "" })
        }),

      updateEducationItem: (sectionId, item) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "education")
          if (sec && sec.type === "education") {
            const idx = sec.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) sec.items[idx] = item
          }
        }),

      removeEducationItem: (sectionId, itemId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "education")
          if (sec && sec.type === "education")
            sec.items = sec.items.filter((i) => i.id !== itemId)
        }),

      addSkillItem: (sectionId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "skills")
          if (sec && sec.type === "skills")
            sec.items.push({ id: nanoid(), name: "", level: 3 })
        }),

      updateSkillItem: (sectionId, item) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "skills")
          if (sec && sec.type === "skills") {
            const idx = sec.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) sec.items[idx] = item
          }
        }),

      removeSkillItem: (sectionId, itemId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "skills")
          if (sec && sec.type === "skills")
            sec.items = sec.items.filter((i) => i.id !== itemId)
        }),

      addLanguageItem: (sectionId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "languages")
          if (sec && sec.type === "languages")
            sec.items.push({ id: nanoid(), language: "", level: 3 })
        }),

      updateLanguageItem: (sectionId, item) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "languages")
          if (sec && sec.type === "languages") {
            const idx = sec.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) sec.items[idx] = item
          }
        }),

      removeLanguageItem: (sectionId, itemId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "languages")
          if (sec && sec.type === "languages")
            sec.items = sec.items.filter((i) => i.id !== itemId)
        }),

      addLinkItem: (sectionId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "links")
          if (sec && sec.type === "links")
            sec.items.push({ id: nanoid(), label: "", url: "" })
        }),

      updateLinkItem: (sectionId, item) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "links")
          if (sec && sec.type === "links") {
            const idx = sec.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) sec.items[idx] = item
          }
        }),

      removeLinkItem: (sectionId, itemId) =>
        set((state) => {
          const sec = state.sections.find((s) => s.id === sectionId && s.type === "links")
          if (sec && sec.type === "links")
            sec.items = sec.items.filter((i) => i.id !== itemId)
        }),
    })),
    { name: "resume-store" }
  )
)
