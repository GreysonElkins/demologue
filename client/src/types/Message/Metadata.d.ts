import { MessageType } from '.'

type gqlMetadata = {
  [key: string]: any
}

class BaseMetadata {
  sender: string
  
  constructor(gqlMetadata: string | gqlMetadata) {
    const { senderId, exclude, sender } = typeof gqlMetadata === "string" ? JSON.parse(gqlMetadata) : gqlMetadata
    this.senderId = senderId || ''
    this.exclude = exclude || []
    this.sender = sender || ''
  }
}

class MemberApproved extends BaseMetadata {
  senderId: string
  exclude: string[]
  approved_by_name: string
  constructor (gqlMetadata: string) {
    const { approved_by_name, ...meta } = JSON.parse(gqlMetadata)
    super(meta)
    this.approved_by_name = approved_by_name
  }
}

export const parseMetadata = (data: string, type: MessageType) => {
  switch (type) {
    case "MEMBER_APPROVED":
      return new MemberApproved(data) 
    case "MEMBER_REQUEST": 
    case "REQUEST_ACCEPTED":
    default: 
        return new BaseMetadata(data)
    }
}