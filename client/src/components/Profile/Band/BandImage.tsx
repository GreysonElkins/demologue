
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
      label={band.photoUrl ? 'Change Photo' : undefined}
      preset={Preset.IMAGE}
      disabled={user?.bands[band.id] !== 'MEMBER'}
    >
      {band.photoUrl ? (
        <img src={band.photoUrl} alt={`${band.name}'s photo'`} />
      ) : (
        <div className="placeholder-avatar">
          <Icon icon="drum" />
        </div>
      )}
    </FileUploader>
  )
}

export default BandImage
