import { BaseMetadata, gqlMetadata } from "./Metadata"

type Constructor = new (...args: any[]) => any

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

type parsedGqlMeta = {
  sender: string
  senderId?: string
  exclude?: string[]
}

class BaseMeta {
  sender: string
  constructor({ sender }: parsedGqlMeta) {
    this.sender = sender
  }
}

const Excludes = <T extends Constructor>(Base: T) => {
  return class Excluding extends Base {
    constructor(...args: any[]) {
      super(args)  
      this.exclude = args[0].exclude || []
    }
  }
}
const IdentifiedSender = <T extends Constructor>(Base: T) => {
  return class WithSenderId extends Base {
    constructor(...args: any[]) {
      super(args)  
      this.senderId = args[0].senderId || ''
    }
  }
}

// ;({ sender: user[0].display_name, senderId: user_id })

const parseMeta = <T extends Constructor>(Meta: T) => {
  return class  {
    constructor(data: gqlMetadata) {
    //   this.metadata = new Meta(JSON.parse(data.metadata))
    }
  }
}

class Message<T extends Constructor> {
  metadata: any
  constructor(data: gqlMessage) {
      const metaConstructor = parseMeta(BaseMeta)
      this.metadata = new metaConstructor(JSON.parse(data.metadata))
  }
}

const parseMessage = (data: gqlMessage) => {
  let Constructor
  switch (data.messageType) {
    case 'NEW_MEMBER':
    //   Constructor = createMessage(Excludes(BaseMetadata))
      break;
    case 'MEMBER_REQUEST':
    //   Constructor = createMessage(IdentifiedSender(BaseMetadata))
      break;
    default:
    //   Constructor = createMessage(BaseMeta)
  }
//   return new Constructor(data)
}

const test = {
  createdAt: new Date().toString(),
  id: 9,
  messageType: "MEMBER_REQUEST" as MessageType,
  metadata: JSON.stringify({
    exclude: ['34lkjar'], sender: 'aser;j', senderId: 'aserl;kj'
  }),
  userRead: JSON.stringify({})
}

const tested = parseMessage(test)

// console.log(tested.metadata)

// export default createMessage
