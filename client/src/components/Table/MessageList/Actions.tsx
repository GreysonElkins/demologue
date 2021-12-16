import { Message } from "types/Message"
import { Icon } from "style/Icon"

import './MessageList.scss'

const Actions:React.FC<{message: Message }> = ({ message }) => {

  const whichActions = () => {
    switch (message.messageType) {
        case ("MEMBER_REQUEST"): return (
          <>
            <button id="accept-member-request">
              <Icon icon="check-circle" />
              <label htmlFor="accept-member-request">
                Accept
              </label>
            </button>
            <button id="reject-member-request">
              <Icon icon="times-circle" />
              <label htmlFor="reject-member-request">
                Reject
              </label>
            </button>
          </>
        )
        default: return <></>  
      }
  }

  return (
    <div className="MessageActions">
      {whichActions()}
      <button id="mark-read">
        <Icon icon={message.userRead ? 'envelope' : 'envelope-open-text'} />
        <label htmlFor="mark-read">{message.userRead ? 'mark as unread' : 'mark as read'}</label>
      </button>
    </div>
  )
}

export default Actions
