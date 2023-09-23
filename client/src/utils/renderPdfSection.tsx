import Pdf1CV from "../components/Pdfs/Pdf1CV/Pdf1CV"
import Pdf1Letter from "../components/Pdfs/Pdf1Letter/Pdf1Letter"
import Pdf2CV from "../components/Pdfs/Pdf2CV/Pdf2CV"
import Pdf2Letter from "../components/Pdfs/Pdf2Letter/Pdf2Letter"
import Pdf3CV from "../components/Pdfs/Pdf3CV/Pdf3CV"
import Pdf3Letter from "../components/Pdfs/Pdf3Letter/Pdf3Letter"
import Pdf4CV from "../components/Pdfs/Pdf4CV/Pdf4CV"
import Pdf4Letter from "../components/Pdfs/Pdf4Letter/Pdf4Letter"
import Pdf5CV from "../components/Pdfs/Pdf5CV/Pdf5CV"
import Pdf5Letter from "../components/Pdfs/Pdf5Letter/Pdf5Letter"
import Pdf6CV from "../components/Pdfs/Pdf6CV/Pdf6CV"
import Pdf6Letter from "../components/Pdfs/Pdf6Letter/Pdf6Letter"
import { ITemplateItem } from "../types/form"

export const renderPdfSection = (dataItem: ITemplateItem): JSX.Element => {
  const { name, id } = dataItem
  switch (name) {
    case "CV-1":
      return <Pdf1CV key={id} />
    case "CV-2":
      return <Pdf2CV key={id} />
    case "CV-3":
      return <Pdf3CV key={id} />
    case "CV-4":
      return <Pdf4CV key={id} />
    case "CV-5":
      return <Pdf5CV key={id} />
    case "CV-6":
      return <Pdf6CV key={id} />
    case "Letter-1":
      return <Pdf1Letter key={id} />
    case "Letter-2":
      return <Pdf2Letter key={id} />
    case "Letter-3":
      return <Pdf3Letter key={id} />
    case "Letter-4":
      return <Pdf4Letter key={id} />
    case "Letter-5":
      return <Pdf5Letter key={id} />
    case "Letter-6":
      return <Pdf6Letter key={id} />
  }
}
