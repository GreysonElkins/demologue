import { Message } from "types/Message"
import { Icon } from "style/Icon"
import { useMessages } from "context/Messages"

import MemberApproval from "./MemberApproval"

import './MessageList.scss'

const Actions:React.FC<{message: Message }> = ({ message }) => {
  const { readMessage } = useMessages()

  const whichActions = () => {
    switch (message.messageType) {
        case ("MEMBER_REQUEST"): return (
          <MemberApproval message={message} />
        )
        default: return <></>  
      }
  }

  return (
    <div className="MessageActions">
      {whichActions()}
      <button id="mark-read" onClick={() => readMessage(message.id, !message.userRead)}>
        <Icon icon={message.userRead ? 'envelope' : 'envelope-open-text'} />
        <label htmlFor="mark-read">{message.userRead ? 'mark as unread' : 'mark as read'}</label>
      </button>
    </div>
  )
}

export default Actions
