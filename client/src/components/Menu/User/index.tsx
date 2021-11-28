import { useUser } from 'context/User'
import DropdownCta from 'style/button/DropdownCta'

import './UserMenu.scss'

const UserMenu: React.FC = () => {
  const { logout } = useUser()

  return (
    <DropdownCta triggerClass="user-icon">
      <nav>
        <button onClick={logout}>Logout</button>
      </nav>
    </DropdownCta>
  )
}

export default UserMenu
