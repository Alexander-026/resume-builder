import { View, Text, Image } from "@react-pdf/renderer"
import { FC } from "react"
import { globalStyles } from "../globalSyles"
import { IForm } from "../../../types/form"
import { icons } from "../../../icons/icons"

type Pdf1CVHeaderProps = {
  form: IForm
}

const Pdf1CVHeader: FC<Pdf1CVHeaderProps> = ({ form }) => {
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
        <View style={styles.location}>
          <Image style={{ width: "12px" }} src={icons.location} />
          <Text>
            {fixedData.country.value + " "}
            {fixedData.city.value + " "}
            {fixedData.address.value + " "}
          </Text>
        </View>
        <View style={styles.location}>
          <Image style={{ width: "12px" }} src={icons.post} />
          <Text>{fixedData.postalCode.value + " "}</Text>
        </View>
        <View style={styles.location}>
          <Image style={{ width: "12px" }} src={icons.gmail} />
          <Text> {fixedData.email.value}</Text>
        </View>
        {fixedData.phone.visibility && (
          <View style={styles.location}>
            <Image style={{ width: "12px" }} src={icons.phone} />
            <Text>{fixedData.phone.value}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Pdf1CVHeader
