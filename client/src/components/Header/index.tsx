import { Link } from 'react-router-dom'
import { useViewer } from 'context/Viewer'
import useModal from 'hooks/useModal'

import UserMenu from '../Menu/User'
import SignInCta from './SignInCta'
import { Icon } from 'style/Icon'
import Cta from 'style/button/Cta'

import UploadTrack from 'components/Modal/UploadTrack'

import './Header.scss'

const Header: React.FC = () => {
  const { signedIn, loading } = useViewer()
  const { toggle, isOpen } = useModal()
  return (
    <>
      <UploadTrack toggle={toggle} isOpen={isOpen} />
      <header>
        <h1>
          <Link to="/">
            <Icon icon="save" />
            Demologue
          </Link>
        </h1>
        {!loading &&
          (signedIn ? (
            <div className="right">
                <Cta ico="⬆" className="CtaOne collapse" onClick={toggle}>
                  Upload a Track
                </Cta>
              <UserMenu />
            </div>
          ) : (
            <SignInCta />
          ))}
      </header>
    </>
  )
}

export default Header
