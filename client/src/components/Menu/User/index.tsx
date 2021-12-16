import { Link } from 'react-router-dom'
import { useViewer } from 'context/Viewer'
import { useMessages } from 'context/Messages'

import UserAvatar from 'style/Icon/UserAvatar'
import DropdownCta from 'style/button/DropdownCta'

import './UserMenu.scss'

const Trigger: React.FC<{uid: string}> = ({ uid }) => {
  const { hasUnread } = useMessages()
  return (
    <div className={`user-menu-trigger${hasUnread ? ' unread' : ''}`}>
      <div className="alert-pill" />
      <UserAvatar userId={uid} hideLabel />
    </div>
  )
}

const UserMenu: React.FC = () => {
  const { logout, user } = useViewer()
  const { hasUnread } = useMessages()

  if (!user) return <></>

  return (
    <DropdownCta altTrigger={<Trigger uid={user.uid} />}>
      <nav className="UserMenu">
        <section className="user-section">
          <Link to="/user">{user?.displayName || 'Edit Profile'}</Link>
        </section>
        <div className={`user-notifications${hasUnread ? ' unread' : ''}`}>
          <div className="alert-pill" />
          <Link to="/inbox">Notifications</Link>
        </div>
        <Link to="/search-bands">Join Bands</Link>
        <section className="log-out-section">
          <button onClick={logout}>Log out</button>
        </section>
      </nav>
    </DropdownCta>
  )
}

export default UserMenu
