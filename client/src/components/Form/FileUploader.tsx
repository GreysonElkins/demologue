import { useEffect, useState, useCallback } from 'react'
import { uploadFile as cloudinary } from 'scripts/api/cloudinary'

import { Icon } from 'style/Icon'
import Preset from 'types/CloudinaryPresets.d'

type Props = {
  label?: string 
  onUpload: (url: string) => void
  preset: Preset
  disabled?: boolean
}

const FileUploader:React.FC<Props> = ({ children, onUpload, label = "Upload a file", preset, disabled }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const accept = () => {
    switch(preset) {
      case Preset.BAND_IMAGE: 
      case Preset.USER_IMAGE:
        return '.jpg, .png, .gif, .bmp, .tiff, .svg'
      // cloudinary allows: JPG, PNG, GIF, BMP, TIFF, ICO, PDF, EPS, PSD, SVG, WebP, JXR, and WDP
    }
  }

  const uploadFile = useCallback(async () => {
    if (!file) return
    try {
      setUploading(true)
      const response = await cloudinary(file, preset)
      !!response && onUpload(response.url)
    } catch (error) {
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

  if (disabled) return <>{children}</>

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
        accept={accept()}
        onChange={(event) => {
          event.target.files && setFile(event.target.files[0])
        }}
      />
      <label htmlFor="file-upload" className="FileUploader enabled" tabIndex={0}>
        {children}
        <div className="cta">{label}</div>
      </label>
    </>
  )
}

export default FileUploader
