// const getEnumValue = (myEnum: {
//   [key: string]: string
// }, value: string) => {
//     return myEnum[value]
// }

type M = 'NEW_MEMBER' | 'NEW_TRACK'

// const getEnumValue = (enum: { [key: string]: string }, value: string) => enum[value]

class Metadata<T extends M> {
  sender: string
  senderId?: string | number
  trackName: T extends 'NEW_TRACK' ? string : undefined
  trackId: T extends 'NEW_TRACK' ? string : undefined
  constructor(gqlMetadata: string, type: T) {
    const { sender, trackName, trackId } = JSON.parse(gqlMetadata)
    this.sender = sender
    this.trackName = trackName
    this.trackId = trackId
  }
}

const test1 = JSON.stringify({ sender: 'Greyson' })
const test2 = JSON.stringify({ sender: 'Mike', trackName: 'BestSong Ever', trackId: 13 })

// class Message<T extends M> {
//   // metadata: Metadata<T>
//   type: string
//   constructor(gqlMetadata: string, type: string) {
//     // this.metadata = new Metadata(gqlMetadata, getEnumValue(M, type))
//     this.type = getEnumValue(M, type)
//   }
// }
