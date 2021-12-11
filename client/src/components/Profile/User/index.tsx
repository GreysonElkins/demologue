import Header from './Header'

import '../index.scss'
import User from 'types/User'

const UserProfile:React.FC<{user: User}> = ({ user }) => 
  <div className="Profile"><Header user={user}/></div>

export default UserProfile
