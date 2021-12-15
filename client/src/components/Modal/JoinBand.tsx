import Modal, { ModalProps } from '.'
import { useBands } from 'context/Bands'
import { useViewer } from 'context/Viewer'
import Cta from 'style/button/Cta'

import './index.scss'
import Loading from 'style/Icon/Loading'

interface Props extends ModalProps {
  selectedBand: number
}

const JoinBand: React.FC<Props> = ({ selectedBand, ...props }) => {
  const { match } = useBands(selectedBand)
  const { user } = useViewer()

  if (!match || !user)
    // !user could use better handling but shouldn't really be accessible
    return (
      <Modal {...props}>
        <Loading />
      </Modal>
    )

  if (match.members[user.uid] === 'REQUEST')
    return (
      <Modal {...props}>
        You've already requested to join this band. A member of the band needs to accept your
        request.
      </Modal>
    )

  const joinBand = () => {
    if (match.members[user.uid] === 'INVITE') {
      console.log(' change the users role to member ') // role handling can be refined here
    } else {
      console.log('set the relationship as REQUEST')
    }
  }

  return (
    <Modal {...props}>
      <div>
        Are you sure you'd like to join {match.name}?
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
