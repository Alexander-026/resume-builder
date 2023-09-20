import { IForm } from "../../types/form"

export interface ResumeBuilderState {
  form: IForm
}

export const initialState: ResumeBuilderState = {
  form: {
    bgLeftSection: "#6f6b6b",
    colorLeftSection: "#ffffff",
    src: "",
    singlePage: false,
    fixedData: {
      firstName: {
        id: "fixedData-1",
        label: "First Name",
        value: "Alexander",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      lastName: {
        id: "fixedData-2",
        label: "Last Name",
        value: "Bryndin",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      jobTitle: {
        id: "fixedData-3",
        label: "Wanted Job Title",
        value: "Frontend Developer",
        fieldSize: 8,
        visibility: true,
        visitable: false,
      },
      country: {
        id: "fixedData-4",
        label: "Country",
        value: "Ukraine ",
        fieldSize: 6,
        visibility: true,
        visitable: false,
      },
      city: {
        id: "fixedData-5",
        label: "City",
        value: "Kharkiv",
        fieldSize: 6,
        visibility: true,
        visitable: false,
      },
      address: {
        id: "fixedData-8",
        label: "Address",
        value: "avenue Yuvileinyi,building 26,Housing B",
        fieldSize: 12,
        visibility: true,
        visitable: false,
      },
      postalCode: {
        id: "fixedData-9",
        label: "Postal Code",
        value: "262626",
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
        value: "+00 000 000 00 00",
        fieldSize: 8,
        visibility: true,
        visitable: true,
      },
    },
    data: [
      {
        id: "About Me",
        label: "About me",
        type: "Description",
        section: "Secondary",
        draggable: true,
        value:
          "As a frontend developer with over 3 years of experience, I specialize in creating dynamic and responsive user interfaces using a variety of technologies. Throughout my career, I have connuously sought to expand my knowledge and skills in frontend development, staying up-to-date with the latest technologies and best pracces.",
        visibility: true,
      },
      {
        id: "Skills",
        label: "Skills",
        type: "Skills",
        section: "Secondary",
        draggable: true,
        visibility: true,
        showLevel: true,
        items: [
          {
            id: "blababla",
            value: "JavaScript",
            level: "4",
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
            id: "blababla",
            value: "English",
            level: "4",
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
          {
            id: "gggg",
            value: "Github",
            link: "https://github.com/Alexander-026/",
          },
        ],
      },
      {
        id: "employmenthistory",
        label: "Employment History",
        type: "Specification",
        section: "Primary",
        draggable: false,
        visibility: true,
        items: [
          {
            id: "Employment History",
            value: "Middle Frontend-Developer React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Oct-2021", "Mar-2023"],
            description: `Responsibilities:
            • Plan and implement features from the scratch: create feature implementation design, split into tasks, control process.
            • Implemented new functional modules (components) for the existing pages and for the new implemented pages (from scratch) using React.
            • Implemented REST API (from scratch).
            • Wrote comprehensive tests for React components 
            to ensure their functionality and performance.
            • Participation in Code Review processes as a reviewer.
            • Participation in Refactoring and Performance optimization parties.
            • Created maintainable, cross browsers and reusing web pages using HTML/CSS features.
            • Evaluated and became knowledgeable in new standards, technologies and trends in website development.
            Used Skills: React, TypeScript, Scss Modules, Webpack, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI.`,
          },
          {
            id: "Employment History2",
            value: "Junior-Middle Frontend-Developer React",
            value2: "Kontakt Home",
            value3: "Baku",
            startEnd: ["Nov-2021", "Dec-2023"],
            description: `Responsibilities:
            • Plan and implement features from the scratch: create feature implementation design, split into tasks, control process.
            • Implemented new functional modules (components) for the existing pages and for the new implemented pages (from scratch) using React.
            • Implemented REST API (from scratch).
            • Wrote comprehensive tests for React components 
            to ensure their functionality and performance.
            • Participation in Code Review processes as a reviewer.
            • Participation in Refactoring and Performance optimization parties.
            • Created maintainable, cross browsers and reusing web pages using HTML/CSS features.
            • Evaluated and became knowledgeable in new standards, technologies and trends in website development.
            Used Skills: React, TypeScript, Scss Modules, Webpack, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI.`,
          },
        ],
      },
      {
        id: "Education",
        label: "Education",
        type: "Specification",
        section: "Primary",
        draggable: false,
        visibility: true,
        items: [
          {
            id: "Education",
            value: "NTUXPI",
            value2: "Higher education",
            value3: "Kharkiv",
            startEnd: ["Sep-2013", "Jun-2017"],
            description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo ipsa reiciendis ullam optio! Est, aut. Reiciendis, quidem soluta. Ratione harum illum incidunt in voluptas animi architecto fugit, quaerat odio accusamus!
            `,
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
            name: "Example-1",
            src: "",
          },
          {
            id: "letter-2",
            name: "Example-2",
            src: "",
          },
          {
            id: "letter-3",
            name: "Example-3",
            src: "",
          },
          {
            id: "letter-4",
            name: "Example-4",
            src: "",
          },
          {
            id: "letter-5",
            name: "Example-5",
            src: "",
          },
        ],
      },
      {
        id: "temp-cv",
        name: "CV",
        items: [
          { id: "temp-cv-1", name: "Template-1", src: "./my-cv-1.png" },
          { id: "temp-cv-2", name: "Template-2", src: "./my-cv-2.png" },
          { id: "temp-cv-3", name: "Template-3", src: "./my-cv-3.png" },
          { id: "temp-cv-4", name: "Template-4", src: "./my-cv-4.png" },
          { id: "temp-cv-5", name: "Template-5", src: "./my-cv-5.png" },
          { id: "temp-cv-6", name: "Template-6", src: "./my-cv-6.png" },
        ],
      },
    ],
  },
}
