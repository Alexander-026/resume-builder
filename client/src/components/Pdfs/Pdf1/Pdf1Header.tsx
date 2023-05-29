import { View, Text, Image } from "@react-pdf/renderer"
import { FC } from "react"
import { globalStyles } from "../globalSyles"
import { IForm } from "../../../types/form"
import { icons } from "../../../icons/icons"

type Pdf1HeaderProps = {
  form: IForm
}

const Pdf1Header: FC<Pdf1HeaderProps> = ({ form }) => {
  const styles = globalStyles(form)
  const { fixedData } = form
  return (
    <View style={styles.rightHeader}>
      <View>
        <Text style={styles.fullName}>{fixedData.firstName.value}</Text>
        <Text style={styles.fullName}>{fixedData.lastName.value}</Text>
        <Text style={styles.jobTitle}>{fixedData.jobTitle.value}</Text>
      </View>
      <View>
        <Text style={styles.location}>
          <Image src={icons.location} /> {fixedData.country.value + " "}
          {fixedData.city.value + " "}
          {fixedData.address.value + " "}
          {fixedData.postalCode.value + " "}
        </Text>
        <Text style={styles.location}>
          <Image src={icons.gmail} /> {fixedData.email.value}
        </Text>
        {fixedData.phone.visibility && (
          <Text style={styles.location}>
            <Image src={icons.phone} /> {fixedData.phone.value}
          </Text>
        )}
      </View>
    </View>
  )
}

export default Pdf1Header
