import { Link } from 'react-router-dom'
import { useViewer } from 'context/Viewer'

import UserAvatar from 'style/Icon/UserAvatar'
import DropdownCta from 'style/button/DropdownCta'

import './UserMenu.scss'

const UserMenu: React.FC = () => {
  const { logout, user } = useViewer()

  if (!user) return <></>

  return (
    <DropdownCta altTrigger={<UserAvatar userId={user.uid} hideLabel />}>
      <nav className="UserMenu">
        <section className="user-section">
          <Link to="/user">{user?.displayName || 'Edit Profile'}</Link>
        </section>
        <Link to="/inbox">Notifications</Link>
        <Link to="/search-bands">Join Bands</Link>
        <section className="log-out-section">
          <button onClick={logout}>Log out</button>
        </section>
      </nav>
    </DropdownCta>
  )
}

export default UserMenu
