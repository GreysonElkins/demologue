import { useUser } from 'context/User'

import UserMenu from '../Menu/User'
import SignInCta from './SignInCta'

import './Header.scss'

const Header: React.FC = () => {
  const { signedIn, loading } = useUser()
  return (
    <header>
      {!loading && (signedIn ? <UserMenu /> : <SignInCta />)}
    </header>
  )
}

export default Header
