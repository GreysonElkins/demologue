import Modal, { ModalProps } from '.'
import { useBands } from 'context/Bands'
import { useViewer } from 'context/Viewer'
import Cta from 'style/button/Cta'
import { requestBandAccess, addBandMember } from 'scripts/api/demologue/mutation/band'

import './index.scss'
import Loading from 'style/Icon/Loading'

interface Props extends ModalProps {
  selectedBand: number
}

const JoinBand: React.FC<Props> = ({ selectedBand, ...props }) => {
  const { match, updateBandMemberRole } = useBands(selectedBand)
  const { user } = useViewer()
  const { mutate: request } = requestBandAccess()
  const { mutate: join } = addBandMember()

  if (!match || !user)
    // !user could use better handling but shouldn't really be accessible
    return (
      <Modal {...props}>
        <Loading />
      </Modal>
    )

  const currentRole = match.members[user.uid]

  if (currentRole === 'REQUEST')
    return (
      <Modal {...props}>
        You've already requested to join this band. A member of the band needs to accept your
        request.
      </Modal>
    )

  const joinBand = async () => {
    if (currentRole === 'INVITE') {
      await join({ userId: user.uid, bandId: match.id })
      // this may need to be set in the bands context so it can also update the band in state
      updateBandMemberRole(match.id, user.uid, 'MEMBER')
    } else {
      await request({ userId: user.uid, bandId: match.id })
      updateBandMemberRole(match.id, user.uid, 'REQUEST')
    }
    props.toggle()
  }

  return (
    <Modal {...props}>
      <div>
        {currentRole === 'INVITE'
          ? `You were already invited to ${match.name}, would you like to join?`
          : `Are you sure you'd like to join ${match.name}?`}
        <div className="modal-options">
          <Cta cta="Two" onClick={joinBand} tabIndex={1}>
            Yes!
          </Cta>
          <Cta cta="Three" onClick={joinBand} tabIndex={1}>
            Cancel
          </Cta>
        </div>
      </div>
    </Modal>
  )
}

export default JoinBand
