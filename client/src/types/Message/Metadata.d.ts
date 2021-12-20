import { MessageType } from '.'

type BaseMetadata = {
  sender: string
  senderId?: string
}

interface MemberRequest extends BaseMetadata {
  senderId: string
}

interface NewTrack extends BaseMetadata {
  exclude: string[]
  senderId: number
  trackId: number
  trackName?: string
  uploadedBy: string
}

export type Metadata<T extends MessageType> = T extends 'BAND_UPDATE' | 'REQUEST_ACCEPTED'
  ? BaseMetadata
  : T extends 'MEMBER_REQUEST'
  ? MemberRequest
  : T extends 'NEW_TRACK' 
  ? NewTrack 
  : {
      error: 'An unidentified MessageType was parsed'
      sender: 'unknown'
      senderId: ''
    }
