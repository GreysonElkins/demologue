import { useMemo } from 'react'
import { useUsers } from "context/Users"

import Band from "types/Band"
import { Icon } from 'style/Icon'

const PlaceHolderAvatar = (
  <div className="placeholder-avatar">
    <Icon icon="drum" />
  </div>
)

const NumberStat = (value: string | number | JSX.Element, title: string) => (
  <div className="number-stat">
    <span>{value}</span> 
    {title}
  </div>
)

const BandHeader: React.FC<{band: Band}>= ({ band }) => {
  const memberIds = useMemo(() => Object.keys(band.members), [JSON.stringify(band)])
  const { match } = useUsers(memberIds)

  if (!match) return <></>

  const printMembers = match.map(({ displayName }, i) => (
    <li key={`member-${i}`}>
      {i !== 0 && <span>•</span>}
      <span>{displayName}</span>
    </li>
  ))

  return (
  <div className="band-header">
    {band.photoUrl ? <img src={band.photoUrl} /> : PlaceHolderAvatar}
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
