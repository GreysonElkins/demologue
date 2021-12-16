import { Link } from 'react-router-dom'
import { Metadata } from "./Metadata"

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
  metaData: Metadata<MessageType>
  messageType: MessageType // will use to create actions
  bandName?: string
  constructor({ id, createdAt, metadata, userRead, messageType }: gqlMessage) {
    this.messageType = messageType
    this.metaData = this.parseMetadata(metadata, messageType)
    const { subject, text } = this.parseMessage()
    this.id = id
    this.createdAt = new Date(createdAt)
    this.userRead = !!JSON.parse(userRead)[id] // { id: Date }
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
        return {subject: 'New Member Request', text: <><Link to={`/user/${this.metaData.senderId}`}>{this.metaData.sender}</Link> wants to join the band!</>}
      default:
        return {subject: this.messageType, text: this.messageType}
    }
  }
}

export class BandMessage extends Message {
  bandId: number
  bandName: string
  constructor({ band, ...props }: gqlBandMessage) {
    super(props)
    this.bandId = band.id
    this.bandName = band.name
  }
}
