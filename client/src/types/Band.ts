export type BandRole = "MEMBER" | "SUPPORT" | "GUEST"

export type gqlBand = {
  id: number
  name: string
  photoUrl: string | null
  createdAt: string
  usersToBands: Array<{ role: BandRole; userId: number }>
}

class Band {
  id: number
  name: string
  photoUrl: string | null
  createdAt: Date
  members: Array<{ [key: string]: BandRole }>
  constructor({ id, name, photoUrl, createdAt, usersToBands }: gqlBand) {
    this.id = id
    this.name = name
    this.photoUrl = photoUrl
    this.createdAt = new Date(createdAt)
    this.members = usersToBands.map(({ role, userId }) => ({ [userId]: role }))
  }
}

export default Band