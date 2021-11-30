import type { BandRole } from './Band'

export type gqlUser = {
  displayName: string
  email: string | null
  emailVerified: boolean
  photoUrl: string | null
  uid: string
  usersToBands: Array<{ role: BandRole; bandId: number }>
}

class User {
    uid: string
    displayName: string
    photoUrl: string | null
    email: string | null // may be null with certain types of auth?
    bands: Array<{
      [key:number]: BandRole
    }>
    constructor ({ displayName, email, photoUrl, uid, usersToBands }: gqlUser) {
      this.uid = uid
      this.displayName = displayName
      this.photoUrl = photoUrl
      this.email = email
      this.bands = usersToBands.map(({ bandId, role }) => ({ [bandId]: role }))
    }
}

export default User
