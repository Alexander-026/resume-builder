import FormCVResume from "../components/Form/FormCVResume"
import FormLetterResume from "../components/Form/FormLetterResume"
import { ITemplateItem } from "../types/form"

export const renderFormSection = (dataItem: ITemplateItem): JSX.Element => {
  const { type } = dataItem
  switch (type) {
    case "CV":
      return <FormCVResume />
    case "Letter":
      return <FormLetterResume />
  }
}
