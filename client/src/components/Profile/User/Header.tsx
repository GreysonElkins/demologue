import User from 'types/User'
import UserImage from './UserImage'

import './UserProfile.scss'

const Header: React.FC<{ user: User }> = ({ user }) => (
  <section className="header user">
    <UserImage user={user} />
    <div className="info">
      <div className="top-line">
        <h3>{user.displayName}</h3>
      </div>
    </div>
  </section>
)


export default Header
