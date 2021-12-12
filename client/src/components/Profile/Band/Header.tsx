import { useMemo } from 'react'
import { useBands } from 'context/Bands'

import BandImage from './BandImage'
import Band from "types/Band"
import UserAvatar from 'style/Icon/UserAvatar'
import { Icon } from 'style/Icon'

const NumberStat = (value: string | number | JSX.Element, title: string) => (
  <div className="number-stat">
    <span>{value}</span> 
    {title}
  </div>
)

const BandHeader: React.FC<{band: Band}> = ({ band }) => {
  const memberIds = useMemo(() => Object.keys(band.members), [JSON.stringify(band)])
  const { changeBandPhoto } = useBands()

  const printMembers = memberIds.map(id => <UserAvatar userId={id} hideLabel key={`user-avatar-${id}`} />)

  return (
    <section className="header">
      <BandImage band={band} onUpload={(url: string) => changeBandPhoto(band.id, url)} />
      <div className="band info">
        <div className="top-line">
          <h3>{band.name}</h3>
          <div className="band-members">
            {printMembers}
          </div>
        </div>
          <div className="band-stats">
            {NumberStat(band.songList.tracks.length, 'tracks')}
            {NumberStat(Object.values(band.members).length, 'members')}
            {NumberStat(<Icon icon="sign-in-alt" />, 'join')}
            {NumberStat(<Icon icon="envelope" />, 'contact')}
          </div>
      </div>
    </section>
  )}


export default BandHeader
