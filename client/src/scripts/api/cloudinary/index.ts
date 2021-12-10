import Preset from "types/CloudinaryPresets.d"
const endpoint = `https://api.cloudinary.com/v1_1/demologue`
import { toast } from 'react-toastify'

export type CloudResponse = {
  url: string
  cloudinaryId: string
}

export const uploadFile = async (file: any, preset: Preset) => {
  const type = preset === Preset.IMAGE ? "image" : "video"
  try {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)
    const response = await fetch(`${endpoint}/${type}/upload`, {
      method: "POST",
      body: data
    })
    const stream = await response.text()
    const { secure_url: url, public_id: cloudinaryId } = await JSON.parse(stream)
    return { url, cloudinaryId } as CloudResponse
  } catch (error) {
    toast.error(`Something went wrong uploading your ${type === "image" ? type : "audio"}, please try again`)
    console.error(error)
  }
}

export default endpoint
