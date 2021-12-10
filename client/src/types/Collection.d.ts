export type gqlCollection = {
  id: number
  name: string | null
  collectionToTracks: Array<{ trackId: number; order?: number | null; dateAdded: Date }>
}

class Collection {
  id: number
  name: string | null
  tracks: Array<{ id: number; order?: number | null; dateAdded: Date }>
  constructor({ id, name, collectionToTracks }: gqlCollection) {
    this.id = id
    this.name = name
    this.tracks = collectionToTracks.map(({ trackId: id, order, dateAdded }) => ({
      id,
      order,
      dateAdded: new Date(dateAdded),
    }))
  }

  getCollectionIds = () => this.tracks.map(({ id }) => id)
}

export default Collection
