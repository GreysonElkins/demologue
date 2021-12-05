type gqlTrack = {
  id: number
  bandId: number
  uploadedBy: string | null
  trackUrl: string
  updatedAt: Date
  createdAt: Date
  title: string | null
  workingTitle: string | null
  public: boolean
}

class Track {
  id: number
  bandId: number
  uploadedBy: string | null
  trackUrl: string | null // how to set this null based on permission?
  updatedAt: Date
  createdAt: Date
  title: string | null
  workingTitle: string | null
  public: boolean
  constructor({ id, bandId, uploadedBy, trackUrl, updatedAt, createdAt, title, workingTitle, }: gqlTrack) {
    this.id = id
    this.bandId = bandId
    this.uploadedBy = uploadedBy
    this.trackUrl = trackUrl
    this.updatedAt = new Date(updatedAt)
    this.createdAt = new Date(createdAt)
    this.title = title
    this.workingTitle = workingTitle
    this.public = public 
  }
}