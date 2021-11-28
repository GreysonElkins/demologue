import { useUser } from 'context/User'

import UserMenu from '../Menu/User'
import SignInCta from './SignInCta'

import './Header.scss'

const Header: React.FC = () => {
  const { signedIn, loading } = useUser()
  return (
    <header>
      <h1>Demologue</h1>
      {!loading && (signedIn ? <UserMenu /> : <SignInCta />)}
    </header>
  )
}

export default Header
