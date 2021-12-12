import { Link } from 'react-router-dom'
import { useUsers } from 'context/Users'
import { Icon } from '.'

import './Avatar.scss'

type Props = {
  hideLabel?: boolean
  userId: string
}

const UserAvatar: React.FC<Props> = ({ hideLabel, userId }) => {
  const { match } = useUsers(userId)
  if (!match) return <></>
  return (
    <div className="Avatar">
      <Link to={`/user/${userId}`} id={`${match.displayName}-avatar`}>
        {match.photoUrl && <img src={match.photoUrl} alt={`${match.displayName}'s avatar`} />}
        {!match.photoUrl && <Icon icon={'user'} />}
      </Link>
      {!hideLabel && <label htmlFor={`${match.displayName}-avatar`}>{match.displayName}</label>}
    </div>
  )
}

export default UserAvatar
