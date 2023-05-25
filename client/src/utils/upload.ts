import { UploadFile, message } from "antd"
import { RcFile } from "antd/es/upload"

export const onFileRead = async (file: UploadFile): Promise<string> => {
  let src = file.url as string
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj as RcFile)
      reader.onload = () => resolve(reader.result as string)
    })
  }
  return src || ""
}

export const onPreview = async (file: UploadFile) => {
  const src = await onFileRead(file)
  const image = new Image()
  image.src = src
  const imgWindow = window.open(src)
  imgWindow?.document.write(image.outerHTML)
}

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}
