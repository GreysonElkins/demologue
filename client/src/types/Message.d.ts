export type MessageType =
  | 'NEW_MEMBER'
  | 'MEMBER_REQUEST'
  | 'REQUEST_ACCEPTED'
  | 'NEW_TRACK'
  | 'UPDATED_TRACK'
  | 'NEW_COMMENT'
  | 'COMMENT_REPLY'
  | 'COMMENT_MENTION'
  | 'BAND_UPDATE'
  | 'SYSTEM_MESSAGE'

export type gqlMessage = {
  createdAt: string
  id: number
  messageType: MessageType
  metadata: string
  userRead: string
}

class Message<T> {
  id: number 
  userId?: string
  bandId?: string
  createdAt: Date
  userRead: boolean
  text?: string
  metaData: T
}
