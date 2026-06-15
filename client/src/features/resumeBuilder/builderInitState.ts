import { icons } from "../../icons/icons"
import { IForm } from "../../types/form"

export interface ResumeBuilderState {
  form: IForm
}

export const initialState: ResumeBuilderState = {
  form: {
    bgLeftSection: "#6f6b6b",
    colorLeftSection: "#ffffff",
    src: icons.avatar,
    singlePage: true,
    fixedData: {
      firstName: {
        id: "fixedData-1",
        label: "First Name",
        value: "Aleksandr",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      lastName: {
        id: "fixedData-2",
        label: "Last Name",
        value: "Brindin",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      jobTitle: {
        id: "fixedData-3",
        label: "Wanted Job Title",
        value: "FrontEnd Developer",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      country: {
        id: "fixedData-4",
        label: "Country",
        value: "Germany",
        fieldSize: 6,
        visibility: true,
        visitable: false,
      },
      city: {
        id: "fixedData-5",
        label: "City",
        value: "Neu-Ulm",
        fieldSize: 6,
        visibility: true,
        visitable: false,
      },
      address: {
        id: "fixedData-8",
        label: "Address",
        // value: "Ludwig Str. 56",
        value: "",
        fieldSize: 12,
        visibility: true,
        visitable: false,
      },
      postalCode: {
        id: "fixedData-9",
        label: "Postal Code",
        // value: "89231",
        value: "",
        fieldSize: 6,
        visibility: true,
        visitable: false,
      },
      email: {
        id: "fixedData-6",
        label: "Email",
        value: "alexanderbrendin@gmail.com",
        fieldSize: 10,
        visibility: true,
        visitable: false,
      },
      phone: {
        id: "fixedData-7",
        label: "Phone",
        value: "+49 1717490736",
        fieldSize: 8,
        visibility: false,
        visitable: true,
      },
    },
    letterData: {
      firstNameFrom: {
        id: "First-Name-From",
        label: "First Name From",
        value: "Aleksandr",
        fieldSize: 8,
        type: "text",
      },
      lastNameFrom: {
        id: "Last-Name-From",
        label: "Last Name From",
        value: "Brindin",
        fieldSize: 8,
        type: "text",
      },
      postalCodeFrom: {
        id: "Postal-Code-From",
        label: "Postal-Code-From",
        value: "262626",
        fieldSize: 8,
        type: "text",
      },
      addressFrom: {
        id: "address from",
        label: "Address From",
        value: "Muller Strasse 26",
        fieldSize: 8,
        type: "text",
      },
      cityFrom: {
        id: "city from",
        label: "City From",
        value: "Musterdorf",
        fieldSize: 8,
        type: "text",
      },
      currentDate: {
        id: "current date",
        label: "Current Date",
        value: "26.10.2023",
        fieldSize: 8,
        type: "date",
      },
      phone: {
        id: "Phone",
        label: "Phone",
        value: "26262626",
        fieldSize: 8,
        type: "text",
      },
      firstNameTo: {
        id: "First Name To",
        label: "First Name To",
        value: "Anna",
        fieldSize: 8,
        type: "text",
      },
      lastNameTo: {
        id: "Last Name To",
        label: "Last Name To",
        value: "Muster",
        fieldSize: 8,
        type: "text",
      },
      cityTo: {
        id: "city to",
        label: "City to",
        value: "Musterstadt",
        fieldSize: 8,
        type: "text",
      },
      addressTo: {
        id: "address to",
        label: "Address to",
        value: "Muller Strasse ",
        fieldSize: 8,
        type: "text",
      },
      postalCodeTo: {
        id: "Postal Code To",
        label: "Postal Code To",
        value: "626262",
        fieldSize: 8,
        type: "text",
      },

      email: {
        id: "email",
        label: "Email",
        value: "alexanderbrendin@gmail.commm",
        fieldSize: 16,
        type: "text",
      },
      title: {
        id: "title",
        label: "Title",
        value: "Bewerbung auf die Stelle als Mitarbeiter",
        fieldSize: 24,
        type: "text",
      },
      subtitle: {
        id: "subtitle",
        label: "Subtitle",
        value: "Sehr geehrte Frau Muster",
        fieldSize: 24,
        type: "text",
      },
      letter: {
        id: "letter",
        label: "Letter",
        value:
          "BlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablalBlablalbalblablal",
        fieldSize: 24,
        type: "letter",
      },
    },
    data: [
      {
        id: "About Me",
        label: "About me",
        type: "Description",
        section: "Secondary",
        draggable: true,
        value: `Frontend / Full-Stack Developer with 4+ years of experience building scalable, high-performance web applications using React, Next.js, and TypeScript. Strong experience with state management (Redux, Zustand), GraphQL, and Node.js, focused on clean architecture, performance, and SEO.`,
        visibility: true,
      },
      {
        id: "Skills",
        label: "Skills",
        type: "Skills",
        section: "Secondary",
        draggable: true,
        visibility: true,
        showLevel: false,
        items: [
          {
            id: "TypeScript",
            value: "TypeScript",
            level: "5",
          },
          {
            id: "React",
            value: "React",
            level: "5",
          },
          {
            id: "Next.js",
            value: "Next.js",
            level: "5",
          },
          {
            id: "Redux (RTK)",
            value: "Redux (RTK)",
            level: "5",
          },
          {
            id: "MobX",
            value: "MobX",
            level: "5",
          },
          {
            id: "Zustand",
            value: "Zustand",
            level: "5",
          },
          {
            id: "GraphQL",
            value: "GraphQL",
            level: "5",
          },
          {
            id: "Prisma",
            value: "Prisma",
            level: "5",
          },
          {
            id: "MongoDB",
            value: "MongoDB",
            level: "5",
          },
          {
            id: "AWS",
            value: "AWS",
            level: "5",
          },
          {
            id: "MySQL",
            value: "MySQL",
            level: "5",
          },
          {
            id: "Express",
            value: "Express",
            level: "5",
          },
          {
            id: "Node JS",
            value: "Node JS",
            level: "5",
          },
        ],
      },
      {
        id: "Languages",
        label: "Languages",
        type: "Skills",
        section: "Secondary",
        draggable: true,
        visibility: true,
        showLevel: true,
        items: [
          {
            id: "English",
            value: "English",
            level: "3",
          },
          {
            id: "German",
            value: "German",
            level: "3",
          },
          {
            id: "Russian",
            value: "Russian",
            level: "5",
          },
        ],
      },
      {
        id: "Links",
        label: "Links",
        type: "Links",
        section: "Secondary",
        draggable: true,
        visibility: true,
        items: [
          {
            id: "blababla",
            value: "Linkedin",
            link: "https://www.linkedin.com/in/alexander-bryndin-1127a4203/",
          },
          // {
          //   id: "gggg",
          //   value: "Github",
          //   link: "https://github.com/Alexander-026/",
          // },
        ],
      },
      // {
      //   id: "Education",
      //   label: "Education",
      //   type: "Specification",
      //   section: "Primary",
      //   draggable: false,
      //   visibility: true,
      //   items: [
      //     {
      //       id: "Germany",
      //       value: "Sprachkurs",
      //       value2: "VHS",
      //       value3: "Ulm",
      //       startEnd: ["Feb-2024"],
      //       description: `Ich studiere und praktiziere täglich die deutsche Sprache.`,
      //     },
      //     {
      //       id: "Flutter-Dart",
      //       value: "Active learning",
      //       value2: "Flutter-Dart",
      //       value3: "Kharkiv",
      //       startEnd: ["Mar-2023", "Jul-2023"],
      //       description: `Learned the basics of Dart and Flutter`,
      //     },
      //   ],
      // },
      {
        id: "employmenthistory",
        label: "Employment History",
        type: "Specification",
        section: "Primary",
        draggable: false,
        visibility: true,
        items: [
          {
            id: "Employment History1",
            value: "Middle Frontend-Developer React Node.js",
            value2: "Level99",
            value3: "Remote",
            startEnd: ["Apr-2023"],
            description: `
            Responsibilities:

          • Designed and maintained scalable frontend solutions using Next.js and TypeScript.
          • Implemented predictable and performant state management with Zustand.
          • Developed and maintained complex UI components, including forms, data tables, modals, and routing.
          • Optimized application performance using code-splitting, partial pre-rendering, and caching strategies.
          • Integrated and maintained REST and GraphQL APIs, ensuring data reliability and consistency.
          • Improved code quality through refactoring, testing, and code reviews.
          • Enhanced usability and accessibility, implementing responsive layouts and loading states.

          Tech Stack:
          Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Redis, Zustand
          `,
          },
          {
            id: "Employment History",
            value: "Middle Frontend-Developer React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Nov-2021", "Mar-2023"],
            description: `Responsibilities:

            • Developed React + TypeScript components and modules for new and existing pages.
            • Implemented REST API endpoints and integrated with frontend.
            • Wrote unit and integration tests for components.
            • Participated in code reviews, refactoring, and performance optimization.
            • Built maintainable, cross-browser, and reusable UI using SCSS Modules.

            Achievements:

            • Delivered critical features improving UX and reducing bugs.
            • Refactored legacy code, reducing technical debt.
            • Developed reusable UI components, speeding up development.
            • Introduced React-Hook-Form and React-Testing-Library for better efficiency.

            Tech Stack:

            React, TypeScript, SCSS Modules, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI
            `,
          },
          {
            id: "Employment History2",
            value: "Junior-Middle Frontend-Developer React",
            value2: "LeverX",
            value3: "Remote",
            startEnd: ["Jun-2019", "Oct-2021"],
            description: `Responsibilities:
            • Developed and maintained reusable React components for new and existing pages.
            • Integrated REST APIs and optimized data fetching with Redux.
            • Ensured cross-browser compatibility and accessibility compliance.
            • Refactored legacy code to improve performance, scalability, and maintainability.
            • Wrote unit and integration tests with Jest and participated in code reviews.
            • Collaborated with designers, backend developers, and QA to enhance UI/UX.

            Achievements:

            • Optimized component rendering, improving page load times and performance.
            • Refactored state management, reducing unnecessary re-renders.
            • Developed a reusable UI component library, accelerating feature development.
            • Migrated a project from JavaScript to TypeScript, improving type safety.
            • Improved test coverage and UI consistency, enhancing app reliability and UX.

            Tech Stack:

            React, TypeScript, Redux, React-Router-Dom, Jest, Material-UI, SCSS Modules`,
          },
        ],
      },
    ],
    templates: [
      {
        id: "temp-cover-letter",
        name: "Cover Letters",
        items: [
          {
            id: "letter-1",
            name: "Letter-1",
            src: "",
            active: false,
            type: "Letter",
          },
          {
            id: "letter-2",
            name: "Letter-2",
            src: "",
            active: false,
            type: "Letter",
          },
          {
            id: "letter-3",
            name: "Letter-3",
            src: "",
            active: false,
            type: "Letter",
          },
          {
            id: "letter-4",
            name: "Letter-4",
            src: "",
            active: false,
            type: "Letter",
          },
          {
            id: "letter-5",
            name: "Letter-5",
            src: "",
            active: false,
            type: "Letter",
          },
          {
            id: "letter-6",
            name: "Letter-6",
            src: "",
            active: false,
            type: "Letter",
          },
        ],
      },
      {
        id: "temp-cv",
        name: "CV",
        items: [
          {
            id: "temp-cv-1",
            name: "CV-1",
            src: "./my-cv-1.png",
            active: true,
            type: "CV",
          },
          {
            id: "temp-cv-2",
            name: "CV-2",
            src: "./my-cv-2.png",
            active: false,
            type: "CV",
          },
          {
            id: "temp-cv-3",
            name: "CV-3",
            src: "./my-cv-3.png",
            active: false,
            type: "CV",
          },
          {
            id: "temp-cv-4",
            name: "CV-4",
            src: "./my-cv-4.png",
            active: false,
            type: "CV",
          },
          {
            id: "temp-cv-5",
            name: "CV-5",
            src: "./my-cv-5.png",
            active: false,
            type: "CV",
          },
          {
            id: "temp-cv-6",
            name: "CV-6",
            src: "./my-cv-6.png",
            active: false,
            type: "CV",
          },
        ],
      },
    ],
  },
}
