import { IForm } from "../../types/form"

export interface ResumeBuilderState {
  form: IForm
}

export const initialState: ResumeBuilderState = {
  form: {
    bgLeftSection: "#6f6b6b",
    colorLeftSection: "#ffffff",
    bgRightSection: "#ffffff",
    colorRightSection: "#000000",
    src: "",
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
    editableData: {
      aboutMe: {
        id: "aboutMe-10",
        order: 1,
        label: "About me",
        value:
          "As a frontend developer with over 3 years of experience, I specialize in creating dynamic and responsive user interfaces using a variety of technologies. Throughout my career, I have connuously sought to expand my knowledge and skills in frontend development, staying up-to-date with the latest technologies and best pracces.",
        editLabel: false,
        fieldSize: 24,
        visibility: true,
        visitable: true,
      },
      skills: {
        label: "Skills",
        visibility: true,
        showLevel: true,
        items: [
          {
            id: "blababla",
            value: "JavaScript",
            level: "5",
          },
        ],
      },
      languages: {
        label: "Languages",
        visibility: true,
        showLevel: true,
        items: [
          {
            id: "blababla",
            value: "English",
            level: "5",
          },
        ],
      },
    },
  },
}
