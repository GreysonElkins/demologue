export type ParsedFirebaseUser = {
  displayName: string | null
  email: string | null
  emailVerified: boolean
  uid: string
  photoURL: string | null
}