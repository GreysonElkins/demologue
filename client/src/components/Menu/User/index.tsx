import { useUser } from 'context/User'

import DropdownCta from 'style/button/DropdownCta'
import Avatar from 'style/Icon/Avatar'

import './UserMenu.scss'

const UserMenu: React.FC = () => {
  const { logout, user } = useUser()

  return (
    <DropdownCta altTrigger={<Avatar className="trigger" src={user?.photoURL} tabIndex={-1} />}>
      <nav className="UserMenu">
          <section className="user-section">
            <button tabIndex={0} onClick={logout}>
              {user?.displayName || 'Edit Profile'}
            </button>
          </section>
          <button tabIndex={0}>Bands</button>
          <button tabIndex={0}>Playlists</button>
          <section className="log-out-section">
            <button tabIndex={0} onClick={logout}>Log out</button>
          </section>
      </nav>
    </DropdownCta>
  )
}

export default UserMenu
