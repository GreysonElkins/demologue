export type BandRole = "MEMBER" | "SUPPORT" | "GUEST"

export type gqlBand = {
  id: number
  name: string
  photoUrl: string | null
  createdAt: string
  usersToBands: Array<{ role: BandRole; userId: number }>
}

type RoleMap = { [key: string]: BandRole } 

class Band {
  id: number
  name: string
  photoUrl: string | null
  createdAt: Date
  members: RoleMap
  constructor({ id, name, photoUrl, createdAt, usersToBands }: gqlBand) {
    this.id = id
    this.name = name
    this.photoUrl = photoUrl
    this.createdAt = new Date(createdAt)
    this.members = usersToBands.reduce((map, { role, userId }) => ({ ...map, [userId]: role }), {} as RoleMap)
  }
}

export default Band