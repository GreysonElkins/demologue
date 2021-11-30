export type BandRole = "MEMBER" | "SUPPORT" | "GUEST"

type Band = {
  id: number
  name: string
  photoURL?: string | null
}

export default Band