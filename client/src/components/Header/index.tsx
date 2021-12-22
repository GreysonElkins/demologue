import { Link } from 'react-router-dom'
import { useViewer } from 'context/Viewer'
import useModal from 'hooks/useModal'

import UserMenu from '../Menu/User'
import SignInCta from './SignInCta'
import { Icon } from 'style/Icon'
import Cta from 'style/button/Cta'
import AddBand from 'components/Cta/AddBand'

import UploadTrack from 'components/Modal/UploadTrack'

import './Header.scss'

const Header: React.FC = () => {
  const { user, signedIn, loading } = useViewer()
  const { toggle, isOpen } = useModal()

  const whichCta = () => {
    if (!signedIn || !user) return <></>
    if (user.bandIds().length > 0) {
      return (
        <Cta ico="⬆" collapse onClick={toggle}>
          Upload a Track
        </Cta>
      )
    } else {
      return <AddBand />
    }
  }

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
              {whichCta()}
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
