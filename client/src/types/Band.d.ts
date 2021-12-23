import Collection, { gqlCollection } from './Collection.d'
export type BandRole = "MEMBER" | "SUPPORT" | "GUEST" | "REQUEST" | "INVITE"

export type PartialBand = {
  name: string
  id: number
  photoUrl: string | null
  tracksConnection: {
    totalCount: number
  }
  usersToBandsConnection: {
    totalCount: number
  }
}

export type gqlBand = {
  id: number
  name: string
  photoUrl: string | null
  createdAt: string
  usersToBands: Array<{ role: BandRole; userId: number }>
  playlistsByCreatedByBand: gqlCollection[]
  tracks: Array<{ id: number, updatedAt: string }>
}

type RoleMap = { [key: string]: BandRole } 

class Band {
  id: number
  name: string
  photoUrl: string | null
  createdAt: Date
  members: RoleMap
  collections: Collection[]
  songList: Collection
  constructor({
    id,
    name,
    photoUrl,
    createdAt,
    usersToBands,
    playlistsByCreatedByBand,
    tracks,
  }: gqlBand) {
    this.id = id
    this.name = name
    this.photoUrl = photoUrl
    this.createdAt = new Date(createdAt)
    this.members = usersToBands.reduce(
      (map, { role, userId }) => ({ ...map, [userId]: role }),
      {} as RoleMap
    )
    this.collections = playlistsByCreatedByBand.map((collection) => new Collection(collection))
    this.songList = new Collection({ tracks, id: 0, name: `${name}'s Tracks`})
  }
}

export default Band