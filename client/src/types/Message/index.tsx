import { Link } from 'react-router-dom'
import { Metadata } from "./Metadata"

export type MessageType =
  | 'NEW_MEMBER' // band
  | 'MEMBER_REQUEST' // band
  | 'REQUEST_ACCEPTED' // user
  | 'NEW_TRACK' // band
  | 'UPDATED_TRACK' // band
  | 'NEW_COMMENT' // band
  | 'COMMENT_REPLY' // user
  | 'COMMENT_MENTION' // band 
  | 'BAND_UPDATE' // band
  | 'SYSTEM_MESSAGE'

export type gqlMessage = {
  createdAt: string
  id: number
  messageType: MessageType
  metadata: string
  userRead: string
}

export interface gqlBandMessage extends gqlMessage {
  band: {
    id: number
    name: string
  }
}

export class Message {
  id: number
  createdAt: Date
  userRead: boolean
  text: string | JSX.Element
  subject: string
  metaData: any
  messageType: MessageType // will use to create actions
  bandName?: string
  bandId?: number
  constructor({ id, createdAt, metadata, userRead, messageType }: gqlMessage, viewerId: string) {
    this.messageType = messageType
    this.metaData = this.parseMetadata(metadata, messageType)
    const { subject, text } = this.parseMessage()
    this.id = id
    this.createdAt = new Date(createdAt)
    this.userRead = !!JSON.parse(userRead)[viewerId] // { id: Date }
    this.text = text
    this.subject = subject
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parseMetadata = <M extends MessageType>(rawMetadata: string, messageType: M) => {
    const data = JSON.parse(rawMetadata) as Metadata<M>
    if (messageType === 'SYSTEM_MESSAGE') data.sender = "Demologue"
    return data
  }

  parseMessage = () => {
    switch (this.messageType) {
      case 'MEMBER_REQUEST':
        return {
          subject: 'New Member Request',
          text: (
            <>
              <Link to={`/user/${this.metaData.senderId}`}>{this.metaData.sender}</Link> wants to
              join the band!
            </>
          ),
        }
      case 'REQUEST_ACCEPTED':
        return {
          subject: 'You were added to the band!',
          text: (
            <>
              <Link to={`/bands/${this.metaData.senderId}`}>{this.metaData.sender}</Link> accepted your request,
              you're in the band!
            </>
          ),
        }
      case 'NEW_MEMBER':
        return {
          subject: `${this.metaData.sender} joined the band`,
          text:  `${this.metaData.approved_by_name} accepted ${this.metaData.sender}'s request to join the band`
        }
      default:
        return {subject: this.messageType, text: this.messageType}
    }
  }
}

export class BandMessage extends Message {
  bandId: number
  bandName: string
  constructor({ band, ...props }: gqlBandMessage, viewerId: string) {
    super(props, viewerId)
    this.bandId = band.id
    this.bandName = band.name
  }
}


