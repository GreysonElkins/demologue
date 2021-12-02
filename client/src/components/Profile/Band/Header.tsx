import { useMemo } from 'react'
import { useUsers } from "context/Users"
import { useViewer } from 'context/Viewer'

import FileUploader from 'components/Form/FileUploader'
import Band from "types/Band"
import { Icon } from 'style/Icon'
import { useBands } from 'context/Bands'
import Preset from 'types/CloudinaryPresets.d'

const AvatarUploader: React.FC<{ band: Band; onUpload: (url: string) => void }> = ({
  band,
  onUpload,
}) => {
  const { user } = useViewer()
  return (
  <FileUploader
    onUpload={onUpload}
    label={band.photoUrl ? 'Change Photo' : undefined}
    preset={Preset.IMAGE}
    disabled={user?.bands[band.id] !== "MEMBER"}
  >
    {band.photoUrl ? (
      <img src={band.photoUrl} alt={`${band.name}'s photo'`} />
    ) : (
      <div className="placeholder-avatar">
        <Icon icon="drum" />
      </div>
    )}
  </FileUploader>
)}

const NumberStat = (value: string | number | JSX.Element, title: string) => (
  <div className="number-stat">
    <span>{value}</span> 
    {title}
  </div>
)

const BandHeader: React.FC<{band: Band}>= ({ band }) => {
  const memberIds = useMemo(() => Object.keys(band.members), [JSON.stringify(band)])
  const { match } = useUsers(memberIds)
  const { changeBandPhoto } = useBands()

  if (!match) return <></>

  const printMembers = match.map(({ displayName }, i) => (
    <li key={`member-${i}`}>
      {i !== 0 && <span>•</span>}
      <span>{displayName}</span>
    </li>
  ))

  return (
  <div className="band-header">
    <AvatarUploader band={band} onUpload={(url: string) => changeBandPhoto(band.id, url) }/>
    {/* don't forget about permissions for upload */}
    <div className="band-info">
      <h3>{band.name}</h3>
      <ul>{printMembers}</ul>
      <div className="band-stats">
        {NumberStat(4, "tracks")}
        {NumberStat(0, "collaborators")}
        {NumberStat(<Icon icon="sign-in-alt" />, "join")}
        {NumberStat(<Icon icon="envelope" />, "contact")}
      </div>
    </div>
  </div>
)}


export default BandHeader
