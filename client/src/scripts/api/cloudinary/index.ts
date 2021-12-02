const endpoint = `https://api.cloudinary.com/v1_1/demologue`

export const uploadFile = async (type: 'audio' | 'image', file: any) => {
  try {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'mf1we7tm')
    const response = await fetch(`${endpoint}/${type}/upload`, {
      method: "POST",
      body: data
    })
    const stream = await response.text()
    const { secure_url } = await JSON.parse(stream)
    return secure_url
  } catch (error) {
    console.error(error)
  }
}

export default endpoint
