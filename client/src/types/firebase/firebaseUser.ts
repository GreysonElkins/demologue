export type ParsedFirebaseUser = {
  [key: string]: any
  displayName: string | null
  email: string | null
  emailVerified: boolean
  uid: string
  photoURL: string | null
}