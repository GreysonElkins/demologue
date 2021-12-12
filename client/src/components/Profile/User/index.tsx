import Header from './Header'

import '../index.scss'
import User from 'types/User'
import UserBands from './UserBands'
import { usePlayer } from 'context/Player'

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const { isMounted } = usePlayer()
  return (
  <div className="Profile">
    <Header user={user} />
    <section className={`user-profile-body ${isMounted ? 'with-player' : ''}`}>
      <UserBands user={user} />
    </section>
  </div>
)}

export default UserProfile
