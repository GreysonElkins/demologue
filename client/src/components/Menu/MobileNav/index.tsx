import SignInCta from 'components/Header/SignInCta'
import { useUser } from 'context/User'

import LinkIcon from 'style/Icon/LinkIcon'
import './MobileNav.scss'

const MobileNav = () => {
  const { signedIn } = useUser()
  if (!signedIn) return (
    <nav className="MobileNav loggedOut">
      <SignInCta />
    </nav>
  )
  return (
    <nav className="MobileNav">
      <LinkIcon tabIndex={-1} to="/playlists" icon="headphones" size="2x" title="playlists" />
      <LinkIcon tabIndex={-1} to="/" icon="home" size="2x" title="home" />
      <LinkIcon tabIndex={-1} to="/user" icon="user" size="2x" title="user" />
    </nav>
  )
}

export default MobileNav
