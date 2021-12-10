import SignInCta from 'components/Header/SignInCta'
import { useViewer } from 'context/Viewer'
import { usePlayer } from 'context/Player'

import LinkIcon from 'style/Icon/LinkIcon'
import './MobileNav.scss'

const MobileNav = () => {
  const { signedIn } = useViewer()
  const { isMounted } = usePlayer()
  if (!signedIn) return (
    <nav className="MobileNav loggedOut">
      <SignInCta />
    </nav>
  )
  return (
    <nav className={`MobileNav ${ isMounted ? 'short' : ''}`}>
      <LinkIcon tabIndex={-1} to="/playlists" icon="headphones" title="playlists" />
      <LinkIcon tabIndex={-1} to="/" icon="home" title="home" />
      <LinkIcon tabIndex={-1} to="/user" icon="user" title="user" />
    </nav>
  )
}

export default MobileNav
