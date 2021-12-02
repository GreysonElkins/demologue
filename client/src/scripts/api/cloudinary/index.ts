import Preset from "types/CloudinaryPresets"
const endpoint = `https://api.cloudinary.com/v1_1/demologue`
import { toast } from 'react-toastify'

export const uploadFile = async (file: any, preset: Preset) => {
  const type = Preset.IMAGE ? "image" : "audio"
  try {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)
    const response = await fetch(`${endpoint}/${type}/upload`, {
      method: "POST",
      body: data
    })
    const stream = await response.text()
    const { secure_url } = await JSON.parse(stream)
    return secure_url
  } catch (error) {
    toast.error(`Something went wrong uploading your ${type}, please try again`)
    console.error(error)
  }
}

export default endpoint
