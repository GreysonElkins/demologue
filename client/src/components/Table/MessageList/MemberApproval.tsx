import { Icon } from 'style/Icon'
import { addBandMember } from 'scripts/api/demologue/mutation/band'
import { deleteMessage } from 'scripts/api/demologue/mutation/message'
import { Message } from 'types/Message'
import { toast } from 'react-toastify'
import { useViewer } from 'context/Viewer'
import Loading from 'style/Icon/Loading'

const MemberApproval:React.FC<{message: Message}> = ({ message }) => {
  const { user: viewer } = useViewer()
  const { mutate: addMember } = addBandMember()
  const { mutate: deleteMsg } = deleteMessage()

  if (!viewer) return <Loading />

  const approveMember = async () => {
    if (!message.metaData.senderId || !message.bandId) return console.error('No sender id')
    await addMember({ userId: message.metaData.senderId, bandId: message.bandId, approvedBy: viewer.uid })
    // needs error handling
    toast.success(`${message.metaData.sender} joined the band!`)
    deleteMsg(message.id)
  }

  return (
    <>
      <button id="accept-member-request" onClick={approveMember}>
        <Icon icon="check-circle" />
        <label htmlFor="accept-member-request">Accept</label>
      </button>
      <button id="reject-member-request" onClick={() => deleteMsg(message.id)}>
        <Icon icon="times-circle" />
        <label htmlFor="reject-member-request">Reject</label>
      </button>
    </>
  )
}

export default MemberApproval
