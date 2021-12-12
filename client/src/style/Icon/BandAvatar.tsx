import { Link } from 'react-router-dom'
import { useBands } from 'context/Bands'
import { Icon } from '.'

import './Avatar.scss'

type Props = {
  hideLabel?: boolean
  bandId: number
  labelClass?: string
}

const BandAvatar: React.FC<Props> = ({ hideLabel, bandId, labelClass }) => {
  const { match } = useBands(bandId)
  if (!match) return <></>
  return (
    <div className="Avatar">
      <Link to={`/band/${bandId}`} id={`${match.name}-avatar`}>
        {match.photoUrl && <img src={match.photoUrl} alt={`${match.name}'s avatar`} />}
        {!match.photoUrl && <Icon icon={'drum'} />}
      </Link>
      {!hideLabel && <label className={`${labelClass ? labelClass : ''}`} htmlFor={`${match.name}-avatar`}>{match.name}</label>}
    </div>
  )
}

export default BandAvatar
