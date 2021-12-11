import { useMemo } from 'react'
import User from 'types/User'
import UserImage from './UserImage'
import BandAvatar from 'style/Icon/BandAvatar'

import './UserProfile.scss'

const Header: React.FC<{ user: User }> = ({ user }) => {
  const bandIds = useMemo(() => user?.bandIds() || [], [JSON.stringify(user)])
  const bandIcons = () => bandIds.map(id => <BandAvatar key={`band-avatar-${id}`} bandId={id} hideLabel />)
  return (
    <section className="header user">
      <UserImage user={user} />
      <div className="info">
        <div className="top-line">
          <h3>{user.displayName}</h3>
        </div>
        <h4>Bands:</h4>
        <div className="user-bands">
          {bandIcons()}
        </div>
      </div>
    </section>
  )
}

export default Header
