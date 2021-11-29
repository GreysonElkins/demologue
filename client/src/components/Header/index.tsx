import { Link } from 'react-router-dom'
import { useUser } from 'context/User'

import UserMenu from '../Menu/User'
import SignInCta from './SignInCta'
import { Icon } from 'style/Icon'

import './Header.scss'

const Header: React.FC = () => {
  const { signedIn, loading } = useUser()
  return (
    <header>
      <h1><Link to="/"><Icon icon="save" />Demologue</Link></h1>
      {!loading && (signedIn ? <UserMenu /> : <SignInCta />)}
    </header>
  )
}

export default Header
