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
        value: `Mit über 4 Jahren Erfahrung als Frontend-Entwickler spezialisiere ich mich auf die Entwicklung skalierbarer und leistungsstarker Webanwendungen. Meine Expertise liegt in der Erstellung dynamischer, responsiver Benutzeroberflächen sowie der Optimierung der Frontend-Performance. Zudem verfüge ich über Erfahrung in der Backend-Entwicklung, wodurch ich Full-Stack-Lösungen realisieren kann.

Ich arbeite mit React, Next.js, TypeScript, Node.js und PostgreSQL und lege besonderen Wert auf sauberen, wartbaren und effizienten Code. Zur Verwaltung des Applikationszustands nutze ich Tools wie Redux und Zustand, um einen reibungslosen Datenfluss und eine hohe Skalierbarkeit der Anwendung zu gewährleisten. Darüber hinaus habe ich Erfahrung in der Optimierung der Datenverarbeitung und Caching-Mechanismen mit Redis zur Leistungssteigerung.

Dank meiner fundierten Kenntnisse in Next.js setze ich serverseitiges Rendering (SSR) und statische Seitengenerierung (SSG) gezielt ein, um die Performance und Suchmaschinenoptimierung (SEO) zu verbessern. Meine Erfahrung umfasst die Arbeit mit RESTful- und GraphQL-APIs, die Beschleunigung von Anwendungen sowie die Implementierung bewährter Methoden der modernen Webentwicklung.

Ich lege großen Wert auf kontinuierliches Lernen und halte mich stets über die neuesten Entwicklungen im Frontend- und Backend-Bereich auf dem Laufenden, um robuste, skalierbare und benutzerfreundliche Lösungen bereitzustellen.`,
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
• Integrierte Zustand und MobX für ein effizientes State-Management, wodurch die Anwendungsreaktionsfähigkeit und Wartbarkeit verbessert wurden.
• Verbesserte die Formularfunktionalität, insbesondere die Validierung und Verarbeitung von Benutzereingaben.
• Erweiterte Tabellenfunktionen, einschließlich optimierter Suche, Filterung und Sortierung.
• Konfigurierte Routing und Modalfenster für eine nahtlose Benutzererfahrung.
• Optimierte die Benutzeroberfläche, um die Benutzerfreundlichkeit und Barrierefreiheit zu verbessern.
• Integrierte externe APIs zur Erweiterung der Anwendungsfunktionen.
• Entwickelte und optimierte Unit- und End-to-End-Tests, um eine hohe Codequalität sicherzustellen.
• Reduzierte die Ladezeiten von Seiten durch Implementierung von partiellem Pre-Rendering und Code-Splitting.
• Fügte Lade-Skelette hinzu, um eine flüssigere Benutzererfahrung während der Datenverarbeitung zu gewährleisten.

Erfolge:
• Refaktorierte das State-Management mit Zustand und MobX, wodurch unnötige Re-Renderings reduziert und die Performance verbessert wurden.
• Optimierte Tabellenfunktionen, was die Such- und Sortiergeschwindigkeit erheblich steigerte.
• Verbesserte Testabdeckung und Stabilität, wodurch die Anzahl der Fehler nach Releases reduziert wurde.
• Erhöhte die Reaktionsfähigkeit der Benutzeroberfläche, was die allgemeine Benutzererfahrung verbesserte.
• Optimierte API-Anfragen und Caching-Strategien, wodurch die Ladezeiten von Daten reduziert wurden.
• Erfolgreich Redis integriert, um das Caching und die Performance zu verbessern.

Eingesetzte Technologien: Next.js, Tailwind CSS, TypeScript, PostgreSQL, Prisma, Redis, Zustand, MobX`,
          },
          {
            id: "Employment History",
            value: "Mittelstufe Frontend-Entwickler React",
            value2: "Lechner Soft",
            value3: "Kharkiv",
            startEnd: ["Nov-2021", "Mar-2023"],
            description: `
           Verantwortlichkeiten:
• Geplante und implementierte Funktionen von Grund auf: Konzipierte die Feature-Implementierung, teilte Aufgaben auf und überwachte den Entwicklungsprozess.
• Entwickelte neue funktionale Module (Komponenten) für bestehende und neu implementierte Seiten mit React.
• Entwarf und integrierte REST-API-Endpunkte von Grund auf.
• Schrieb umfassende Tests für React-Komponenten, um deren Funktionalität und Performance sicherzustellen.
• Führte Code-Reviews als Reviewer durch, um hohe Qualitätsstandards zu gewährleisten.
• Beteiligte mich an Refactoring- und Performance-Optimierungsinitiativen.
• Erstellte wartbare, cross-browser-kompatible und wiederverwendbare Webseiten unter Verwendung von HTML/CSS-Technologien.
• Recherchierte und übernahm neue Standards, Technologien und Trends in der Frontend-Entwicklung.

Erfolge:
• Leitete die Entwicklung eines kritischen Projektfeatures, das die Benutzererfahrung erheblich verbesserte und Kundenbeschwerden reduzierte.
• Refaktorierte Legacy-Code, wodurch die Wartbarkeit der Anwendung verbessert und technische Schulden reduziert wurden.
• Optimierte die Performance durch effizienteres Rendering von Komponenten und die Reduzierung unnötiger Re-Renderings.
• Implementierte Best Practices im Testing, verbesserte die Testabdeckung und reduzierte Fehler nach der Veröffentlichung.
• Entwickelte wiederverwendbare UI-Komponenten, wodurch die Feature-Entwicklung beschleunigt und das Design konsistenter wurde.
• Erfolgreich neue Tools und Technologien (React-Hook-Form, React-Testing-Library) eingeführt und integriert, um die Entwicklungseffizienz zu steigern.

Eingesetzte Technologien: React, TypeScript, SCSS Modules, Webpack, Redux-Toolkit, React-Hook-Form, React-Testing-Library, Jest, Ant Design, Material UI.`,
          },
          {
            id: "Employment History2",
            value: "Junior-Mittelstufe Frontend-Entwickler React",
            value2: "Kontakt Home",
            value3: "Baku",
            startEnd: ["Jun-2019", "Oct-2021"],
            description: `Verantwortlichkeiten:
• Entwickelte und wartete wiederverwendbare React-Komponenten sowohl für bestehende als auch für neue Seiten von Grund auf.
• Integrierte REST-API-Endpunkte und optimierte Datenabrufstrategien mit Redux.
• Sicherstellte Cross-Browser-Kompatibilität und Barrierefreiheits-Compliance in Webanwendungen.
• Refaktorierte Legacy-Code zur Verbesserung der Wartbarkeit, Performance und Skalierbarkeit.
• Führte Code-Reviews durch und nahm daran teil, um hohe Codequalität und Best Practices zu gewährleisten.
• Arbeitete eng mit Designern, Backend-Entwicklern und QA-Ingenieuren zusammen, um die UI/UX zu verbessern und Benutzerworkflows zu optimieren.
• Implementierte Unit- und Integrationstests mit Jest, um die Stabilität der Anwendung zu erhöhen.

Erfolge:
• Optimierte das Rendering von React-Komponenten, was zu schnelleren Ladezeiten und verbesserter Performance führte.
• Refaktorierte das State-Management durch die Ablösung veralteter Redux-Muster, wodurch unnötige Re-Renderings reduziert wurden.
• Leitete die Entwicklung einer wiederverwendbaren UI-Komponentenbibliothek, die die Feature-Entwicklung beschleunigte.
• Verbesserte die Testabdeckung, wodurch Produktionsfehler reduziert und die Zuverlässigkeit der Anwendung erhöht wurden.
• Steigerte die Benutzerfreundlichkeit durch verbesserte UI-Konsistenz und Barrierefreiheit, was zu weniger Nutzerbeschwerden führte.
• Erfolgreich ein Projekt von JavaScript auf TypeScript migriert, wodurch die Typensicherheit und Wartbarkeit verbessert wurden.

Eingesetzte Technologien: React, TypeScript, React-Router-Dom, Redux, Jest, Material-UI, SCSS Modules.`,
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
