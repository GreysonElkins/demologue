
import Modal, { ModalProps } from '.'
import CreateTrack from 'components/Form/CreateTrack'

import './index.scss'

interface Props extends ModalProps {
  skipOptions?: boolean
}

const UploadTrack: React.FC<Props> = ({ ...props }) => {
  return (
  <Modal {...props}>
    <CreateTrack />
  </Modal>
)}

export default UploadTrack
