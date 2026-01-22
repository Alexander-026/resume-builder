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
        value: "Frontend-Entwickler",
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
        // value: "",
        fieldSize: 8,
        visibility: true,
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
        label: "Über mich",
        type: "Description",
        section: "Secondary",
        draggable: true,
        value: `Frontend- / Full-Stack-Entwickler mit über 4 Jahren Erfahrung in der Entwicklung skalierbarer, leistungsstarker Webanwendungen mit React, Next.js und TypeScript. Fundierte Erfahrung in der State-Verwaltung (Redux, Zustand), GraphQL und Node.js, mit Fokus auf saubere Architektur, Performance und SEO.`,
        visibility: true,
      },
      {
        id: "Skills",
        label: "Fähigkeiten",
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
            id: "GraphQL",
            value: "GraphQL",
            level: "5",
          },
          {
            id: "MongoDB",
            value: "MongoDB",
            level: "5",
          },
          {
            id: "MySQL",
            value: "MySQL",
            level: "5",
          },
          {
            id: "Redis",
            value: "Redis",
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
        label: "SPRACHEN",
        type: "Skills",
        section: "Secondary",
        draggable: true,
        visibility: true,
        showLevel: true,
        items: [
          {
            id: "English",
            value: "Englisch",
            level: "3",
          },
          {
            id: "Germany",
            value: "Deutsch",
            level: "3",
          },
          {
            id: "Russian",
            value: "Russisch",
            level: "5",
          },
          {
            id: "Turkish",
            value: "Türkisch",
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
      //   label: "Bildung",
      //   type: "Specification",
      //   section: "Primary",
      //   draggable: false,
      //   visibility: false,
      //   items: [
      //     {
      //       id: "Germany",
      //       value: "Sprachkurs",
      //       value2: "VHS",
      //       value3: "Ulm",
      //       startEnd: ["Feb-2024", "Jul-2024"],
      //       description: `Abgeschlossener B1-Kurs`,
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
        label: "Berufserfahrung",
        type: "Specification",
        section: "Primary",
        draggable: false,
        visibility: true,
        items: [
          {
            id: "Employment History1",
            value: "Mittelstufe Frontend-Entwickler React Node.js",
            value2: "Level99",
            value3: "Kharkiv",
            startEnd: ["Apr-2023"],
            description: `
            Verantwortlichkeiten:

            • Entwicklung skalierbarer Frontend-Lösungen mit Next.js und TypeScript.
            • Verwaltung des State mit Zustand, um vorhersehbare Datenflüsse und Performance sicherzustellen.
            • Entwicklung und Pflege komplexer UI-Komponenten (Formulare, Tabellen, Modals).
            • Optimierung der Anwendung durch Code-Splitting, Teil-Pre-Rendering und Caching.
            • Integration und Wartung von REST- und GraphQL-APIs.
            • Verbesserung der Codequalität durch Refactoring, Tests und Code Reviews.
            • Verbesserung von Usability und Barrierefreiheit, Implementierung responsiver Layouts und Ladezustände.

            Erfolge:

            • Leitete die Entwicklung kritischer Features, verbesserte UX und reduzierte Bugs.
            • Refactoring von Legacy-Code zur Reduzierung technischer Schulden.
            • Entwicklung wiederverwendbarer UI-Komponenten, Beschleunigung der Feature-Entwicklung.
            • Einführung neuer Tools wie React-Hook-Form und React-Testing-Library zur Effizienzsteigerung.

            Tech Stack:
            
            Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Redis, Zustand`,
          },
          {
            id: "Employment History",
            value: "Mittelstufe Frontend-Entwickler React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Nov-2021", "Mar-2023"],
            description: `
            Verantwortlichkeiten:

            • Entwicklung von React + TypeScript Komponenten und Modulen für neue und bestehende Seiten.
            • Integration von REST-APIs und Optimierung der Datenverarbeitung.
            • Sicherstellung der Cross-Browser-Kompatibilität und Barrierefreiheit.
            • Refactoring von Legacy-Code zur Verbesserung von Performance und Wartbarkeit.
            • Schreiben von Unit- und Integrationstests, Teilnahme an Code Reviews.

            Erfolge:

            • Optimierung des Komponenten-Renderings, Verbesserung der Ladezeiten.
            • Reduzierung unnötiger Re-Renders durch verbessertes State-Management.
            • Entwicklung wiederverwendbarer UI-Komponenten zur Beschleunigung der Feature-Entwicklung.
            • Migration eines Projekts von JavaScript zu TypeScript, Steigerung der Typensicherheit.

            Tech Stack:

            React, TypeScript, SCSS Modules, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI
`,
          },
          {
            id: "Employment History2",
            value: "Junior-Mittelstufe Frontend-Entwickler React",
            value2: "Kontakt Home",
            value3: "Baku",
            startEnd: ["Jun-2019", "Oct-2021"],
            description: `Verantwortlichkeiten:

            • Entwicklung und Pflege wiederverwendbarer React-Komponenten für neue und bestehende Seiten.
            • Integration von REST-APIs und Optimierung der Datenabfrage mit Redux.
            • Sicherstellung der Cross-Browser-Kompatibilität und Barrierefreiheit.
            • Refactoring von Legacy-Code zur Verbesserung von Performance, Skalierbarkeit und Wartbarkeit.
            • Schreiben von Unit- und Integrationstests und Teilnahme an Code Reviews.
            • Zusammenarbeit mit Designern, Backend-Entwicklern und QA zur Optimierung von UI/UX.

            Erfolge:

            • Optimierung des Komponenten-Renderings, Verbesserung der Performance und Ladezeiten.
            • Refactoring des State-Managements, Reduzierung unnötiger Re-Renders.
            • Entwicklung einer wiederverwendbaren UI-Komponentenbibliothek, Beschleunigung der Feature-Entwicklung.
            • Migration eines Projekts von JavaScript zu TypeScript, Verbesserung der Typensicherheit.
            • Verbesserung der Testabdeckung und UI-Konsistenz, Steigerung der App-Stabilität.

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
