import Collection, { gqlCollection } from './Collection.d'
export type BandRole = "MEMBER" | "SUPPORT" | "GUEST"

export type gqlBand = {
  id: number
  name: string
  photoUrl: string | null
  createdAt: string
  usersToBands: Array<{ role: BandRole; userId: number }>
  collectionsByCreatedByBand: gqlCollection[]
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
  tracks: Array<{ id: number; updatedAt: string }>
  constructor({
    id,
    name,
    photoUrl,
    createdAt,
    usersToBands,
    collectionsByCreatedByBand,
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
    this.collections = collectionsByCreatedByBand.map((collection) => new Collection(collection))
    this.tracks = tracks
  }
}

export default Band