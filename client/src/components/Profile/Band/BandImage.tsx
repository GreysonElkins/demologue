
import { useViewer } from 'context/Viewer'

import FileUploader from 'components/Form/FileUploader'
import Band from 'types/Band'
import Preset from 'types/CloudinaryPresets.d'
import { Icon } from 'style/Icon'

const BandImage: React.FC<{ band: Band; onUpload: (url: string) => void }> = ({
  band,
  onUpload,
}) => {
  const { user } = useViewer()
  return (
    <FileUploader
      onUpload={onUpload}
      label={band.photoUrl ? 'Change Photo' : "Upload a Photo"}
      preset={Preset.BAND_IMAGE}
      disabled={user?.bands[band.id] !== 'MEMBER'}
    >
      {band.photoUrl ? (
        <img className="avatar" src={band.photoUrl} alt={`${band.name}'s photo'`} />
      ) : (
        <div className="avatar placeholder">
          <Icon icon="drum" />
        </div>
      )}
    </FileUploader>
  )
}

export default BandImage
