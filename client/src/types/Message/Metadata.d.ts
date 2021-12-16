import { MessageType } from '.'

type BaseMetadata = {
  sender: string
  senderId?: string
}

interface MemberRequest extends BaseMetadata {
  senderId: string
}

export type Metadata<T extends MessageType> = T extends 'BAND_UPDATE' | 'REQUEST_ACCEPTED'
  ? BaseMetadata
  : T extends 'MEMBER_REQUEST'
  ? MemberRequest
  : {
      error: 'An unidentified MessageType was parsed'
      sender: 'unknown'
      senderId: ''
    }
