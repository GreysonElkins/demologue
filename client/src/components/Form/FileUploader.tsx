import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { uploadFile as cloudinary } from 'scripts/api/cloudinary'

import { Icon } from 'style/Icon'

type Props = {
  accept?: string
  label?: string 
  type: "image" | "audio"
  onUpload: (url: string) => void
}

const FileUploader:React.FC<Props> = ({ children, accept, type, onUpload, label = "Upload a file"}) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const uploadFile = useCallback(async () => {
    if (!file) return
    try {
      setUploading(true)
      const url = await cloudinary(type, file)
      onUpload(url)
    } catch (error) {
        toast.error(`Something went wrong uploading your ${type}`)
        console.error(error)
    }
    setFile(null)
    setUploading(false)
  }, [file, onUpload])

  useEffect(() => {
    if (file) {
      uploadFile()
    }
  }, [file])

  if (uploading) return (
    <div className="FileUploader">
      {children}
      <div className="uploading">
        <Icon icon="spinner" spin size="4x" />
      </div>
    </div>
  )

  return (
    <>
      <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        onChange={(event) => {
          event.target.files && setFile(event.target.files[0])
        }}
      />
      <label htmlFor="file-upload" className="FileUploader" tabIndex={0}>
        {children}
        <div className="cta">{label}</div>
      </label>
    </>
  )
}

export default FileUploader
