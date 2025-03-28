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
        value: "alexanderbrendin@gmail.com",
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
        value: `With over 4 years of experience as a Frontend Developer, I specialize in building scalable and high-performance web applications. My expertise lies in developing dynamic, responsive user interfaces and optimizing frontend performance. Additionally, I have experience with backend development, allowing me to create full-stack solutions.

        I work with React, Next.js, TypeScript, Node.js, and PostgreSQL, focusing on delivering clean, maintainable, and efficient code. I manage application state using tools like Redux and Zustand, ensuring smooth data flow and scalability across the application. Additionally, I have experience optimizing data handling and caching with Redis to enhance performance.

        With deep knowledge of Next.js, I effectively utilize server-side rendering (SSR) and static site generation (SSG) to enhance performance and SEO. My experience includes working with RESTful and GraphQL APIs, improving application speed, and implementing best practices for modern web development.

        I am committed to continuous learning and staying up-to-date with the latest trends in both frontend and backend development, ensuring that I deliver robust, scalable, and user-friendly solutions.
`,
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
            id: "Redis",
            value: "Redis",
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
            id: "Germany",
            value: "Germany",
            level: "3",
          },
          {
            id: "Russian",
            value: "Russian",
            level: "5",
          },
          {
            id: "Turkish",
            value: "Turkish",
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
• Integrated Zustand and MobX for efficient state management, improving application responsiveness and maintainability.
• Enhanced form functionality, improving validation and user input handling.
• Added new features to tables, including optimized search, filtering, and sorting.
• Configured routing and modal windows for a seamless user experience.
• Optimized the user interface to ensure better usability and accessibility.
• Integrated external APIs to extend application capabilities.
• Wrote and optimized unit and end-to-end tests to maintain high code quality.
• Improved page load times by implementing partial pre-rendering and code-splitting.
• Added loading skeletons to provide a smoother user experience during data processing.

Achievements:
• Refactored state management using Zustand and MobX, reducing unnecessary re-renders and improving performance.
• Implemented table optimizations, significantly improving search and sorting speed.
• Improved test coverage and stability, reducing post-release bugs.
• Enhanced UI responsiveness, leading to a better overall user experience.
• Optimized API requests and caching strategies, reducing data fetching time.
• Successfully integrated Redis for improved data caching and performance.

Skills Used: Next.js, Tailwind CSS, TypeScript, PostgreSQL, Prisma, Redis, Zustand, MobX`,
          },
          {
            id: "Employment History",
            value: "Middle Frontend-Developer React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Nov-2021", "Mar-2023"],
            description: `Responsibilities:
            • Planned and implemented features from scratch: designed feature implementation, split tasks, and controlled the development process.
            • Developed new functional modules (components) for both existing and newly implemented pages using React.
            • Designed and integrated REST API endpoints from scratch.
            • Wrote comprehensive tests for React components to ensure their functionality and performance.
            • Conducted code reviews as a reviewer to maintain high-quality standards.
            • Participated in refactoring and performance optimization initiatives.
            • Created maintainable, cross-browser, and reusable web pages using HTML/CSS features.
            • Researched and adopted new standards, technologies, and trends in frontend development.
          
            Achievements:
            • Led the development of a critical project feature that significantly improved user experience and reduced customer complaints.
            • Refactored legacy code, improving application maintainability and reducing technical debt.
            • Enhanced performance by optimizing component rendering and reducing unnecessary re-renders.
            • Implemented best practices in testing, improving overall test coverage and reducing post-release bugs.
            • Developed reusable UI components, accelerating feature development and improving design consistency.
            • Successfully introduced and integrated new tools and technologies (React-Hook-Form, React-Testing-Library) to improve development efficiency.
            
            Skills utilized: React, TypeScript, SCSS Modules, Webpack, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI.`,
          },
          {
            id: "Employment History2",
            value: "Junior-Middle Frontend-Developer React",
            value2: "LeverX",
            value3: "Remote",
            startEnd: ["Jun-2019", "Oct-2021"],
            description: `Responsibilities:
            • Developed and maintained reusable React components for both existing and new pages from scratch.
            • Integrated REST API endpoints and optimized data fetching strategies using Redux.
            • Ensured cross-browser compatibility and accessibility compliance in web applications.
            • Refactored legacy code to improve maintainability, performance, and scalability.
            • Conducted and participated in code reviews to maintain high code quality and best practices.
            • Collaborated with designers, backend developers, and QA engineers to enhance UI/UX and optimize user workflows.
            • Implemented unit and integration tests using Jest to improve application stability.
          
            Achievements:
            • Optimized React component rendering, leading to faster page load times and improved performance.
            • Refactored state management by replacing outdated Redux patterns, resulting in fewer unnecessary re-renders.
            • Led the development of a reusable UI component library, accelerating feature development.
            • Improved test coverage, reducing production bugs and increasing app reliability.
            • Enhanced the user experience by improving UI consistency and accessibility, leading to fewer user complaints.
            • Successfully migrated a project from JavaScript to TypeScript, improving type safety and maintainability.
            
            Skills utilized: React, TypeScript, React-Router-Dom, Redux, Jest, Material-UI, SCSS Modules.`,
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
