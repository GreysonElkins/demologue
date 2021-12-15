import { useMemo } from 'react'
import User from 'types/User'
import AddBand from 'components/Cta/AddBand'
import BandAvatar from 'style/Icon/BandAvatar'

import './UserProfile.scss'
import { useViewer } from 'context/Viewer'

const UserBands: React.FC<{ user: User }> = ({ user }) => {
  const { user: viewer } = useViewer()

  const userIsViewer = () => viewer && viewer.uid === user.uid

  const bandIds = useMemo(() => user?.bandIds() || [], [JSON.stringify(user)])
  const bandIcons = () =>
    bandIds.reduce((avatars, id) => {
      if (user.bands[id] === 'MEMBER')
        avatars.push(
          <BandAvatar key={`band-avatar-${id}`} bandId={id} labelClass="pop-out-label" />
        )
      return avatars
    }, [] as JSX.Element[])
  return (
    <div className="UserBands">
      {userIsViewer() && <AddBand />}
      {/* else => invite to band */}
      {bandIcons()}
    </div>
  )
}

export default UserBands
