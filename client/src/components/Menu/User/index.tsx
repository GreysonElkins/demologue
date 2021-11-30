import { Link } from 'react-router-dom'
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
          <Link to="/user">{user?.displayName || 'Edit Profile'}</Link>
        </section>
        {/* <Link to="/my-bands">Bands</Link> */}
        {/* <button>Playlists</button> */}
        <section className="log-out-section">
          <button onClick={logout}>Log out</button>
        </section>
      </nav>
    </DropdownCta>
  )
}

export default UserMenu
