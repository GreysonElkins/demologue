import { useMemo } from 'react'
import { useUsers } from "context/Users"
import { useBands } from 'context/Bands'

import BandImage from './BandImage'
import Band from "types/Band"
import { Icon } from 'style/Icon'

const NumberStat = (value: string | number | JSX.Element, title: string) => (
  <div className="number-stat">
    <span>{value}</span> 
    {title}
  </div>
)

const BandHeader: React.FC<{band: Band}> = ({ band }) => {
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
  <section className="band-header">
    <BandImage band={band} onUpload={(url: string) => changeBandPhoto(band.id, url) }/>
    <div className="band-info">
      <h3>{band.name}</h3>
      <ul>{printMembers}</ul>
      <div className="band-stats">
        {NumberStat(band.songList.tracks.length, "tracks")}
        {NumberStat(0, "members")}
        {NumberStat(<Icon icon="sign-in-alt" />, "join")}
        {NumberStat(<Icon icon="envelope" />, "contact")}
      </div>
    </div>
  </section>
)}


export default BandHeader
