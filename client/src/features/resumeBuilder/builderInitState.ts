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
        value:
          "Mit über 4 Jahren Erfahrung als Frontend-Entwickler spezialisiere ich mich auf die Erstellung dynamischer und responsiver Benutzeroberflächen unter Verwendung von Technologien wie React, TypeScript und Redux. Ich bin engagiert in kontinuierlichem Lernen und halte mich über die neuesten Trends in der Frontend-Entwicklung auf dem Laufenden.",
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
            id: "JavaScript",
            value: "JavaScript",
            level: "5",
          },
          {
            id: "TypeScript",
            value: "TypeScript",
            level: "5",
          },
          {
            id: "Scss",
            value: "Scss",
            level: "5",
          },
          {
            id: "React",
            value: "React",
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
            id: "Express",
            value: "Express",
            level: "5",
          },
          {
            id: "Node JS",
            value: "Node JS",
            level: "5",
          },
          {
            id: "MUI",
            value: "MUI",
            level: "5",
          },
          {
            id: "Ant Design",
            value: "Ant Design",
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
      {
        id: "Education",
        label: "Bildung",
        type: "Specification",
        section: "Primary",
        draggable: false,
        visibility: true,
        items: [
          {
            id: "Germany",
            value: "Sprachkurs",
            value2: "VHS",
            value3: "Ulm",
            startEnd: ["Feb-2024", "Jul-2024"],
            description: `Abgeschlossener B1-Kurs`,
          },
          // {
          //   id: "Flutter-Dart",
          //   value: "Active learning",
          //   value2: "Flutter-Dart",
          //   value3: "Kharkiv",
          //   startEnd: ["Mar-2023", "Jul-2023"],
          //   description: `Learned the basics of Dart and Flutter`,
          // },
        ],
      },
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
            value: "Mittelstufe Frontend-Entwickler React",
            value2: "Level99",
            value3: "Kharkiv",
            startEnd: ["Apr-2023", "Sep-2023"],
            description: `
            Verantwortlichkeiten:
            • Redux (TRK) integriert.
            • Die Funktionalität von Formularen verbessert.
            • Neue Funktionen in Tabellen hinzugefügt, die Suche und Sortierung optimiert.
            Verwendete Fähigkeiten: React, Apollo-Client, TypeScript, Scss Modules, React-Hook-Form,  Redux-Toolkit,  Material UI.`,
          },
          {
            id: "Employment History",
            value: "Mittelstufe Frontend-Entwickler React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Nov-2021", "Mar-2023"],
            description: `
            Verantwortlichkeiten:
            • Planen und implementieren von Features von Grund auf: Erstellung von Implementierungsdesigns für Features, Aufteilung in Aufgaben, Prozesskontrolle.
            • Neue funktionale Module (Komponenten) für bestehende und neu implementierte Seiten von Grund auf unter Verwendung von React implementiert.
            • REST-API von Grund auf implementiert.
            • Umfangreiche Tests für React-Komponenten geschrieben, um deren Funktionalität und Leistung sicherzustellen.
            • Teilnahme an Code-Review-Prozessen als Reviewer.
            • Teilnahme an Refactoring- und Performance-Optimierungspartys.
            • Erstellen von wartbaren, browserübergreifenden und wiederverwendbaren Webseiten unter Verwendung von HTML/CSS-Features.
            • Evaluierung und Aneignung von Wissen über neue Standards, Technologien und Trends in der Website-Entwicklung.
            Verwendete Fähigkeiten: React, TypeScript, Scss Modules, Webpack, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant-Design, Material UI.`,
          },
          {
            id: "Employment History2",
            value: "Junior-Mittelstufe Frontend-Entwickler React",
            value2: "Kontakt Home",
            value3: "Baku",
            startEnd: ["Jun-2019", "Oct-2021"],
            description: `Verantwortlichkeiten:
            • Implementierung neuer Klassen (Komponenten) für bestehende Seiten und für neue Seiten von Grund auf.
            • Implementierung einer REST-API.
            • Erstellung wartbarer, browserübergreifender und wiederverwendbarer Webseiten mit HTML5/CSS3-Features.
            • Teilnahme an Code-Review-Prozessen.
            • Teilnahme an Refactoring- und Performance-Optimierungsmaßnahmen.
            Verwendete Fähigkeiten: HTML, SCSS, TypeScript, Webpack, jQuery, Jest, Bootstrap.`,
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
