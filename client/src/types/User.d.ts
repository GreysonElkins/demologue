import type { BandRole } from './Band'

export type gqlUser = {
  displayName: string
  email: string | null
  emailVerified: boolean
  photoUrl: string | null
  uid: string
  usersToBands: Array<{ role: BandRole; bandId: number }>
}

type RoleMap = { [key: number]: BandRole }

class User {
    uid: string
    displayName: string
    photoUrl: string | null
    email: string | null // may be null with certain types of auth?
    bands: RoleMap
    constructor ({ displayName, email, photoUrl, uid, usersToBands }: gqlUser) {
      this.uid = uid
      this.displayName = displayName
      this.photoUrl = photoUrl
      this.email = email
      this.bands = usersToBands.reduce(
        (bands, { bandId, role }) => ({ ...bands, [bandId]: role }),
        {} as RoleMap
      )
    }

    bandIds = () => Object.keys(this.bands).map(id => Number(id))
}

export default User
