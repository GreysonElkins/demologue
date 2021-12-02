export type BandRole = "MEMBER" | "SUPPORT" | "GUEST"

export type gqlBand = {
  id: number
  name: string
  photoUrl: string | null
  createdAt: string
  usersToBands: Array<{ role: BandRole; userId: number }>
}

type UserMap = { [key: string]: BandRole } 

class Band {
  id: number
  name: string
  photoUrl: string | null
  createdAt: Date
  members: UserMap
  constructor({ id, name, photoUrl, createdAt, usersToBands }: gqlBand) {
    this.id = id
    this.name = name
    this.photoUrl = photoUrl
    this.createdAt = new Date(createdAt)
    this.members = usersToBands.reduce((map, { role, userId }) => ({ ...map, [userId]: role }), {} as UserMap)
  }
}

export default Band