export type BaseCollection = {
  id: number
  name: string | null
}

interface GqlCollection extends BaseCollection {
  collectionToTracks: Array<{ trackId: number; order?: number | null; dateAdded: Date }>
}

interface TrackList extends BaseCollection {
  tracks: Array<{ id: number, dateAdded?: Date }>
}

class Collection {
  id: number
  name: string | null
  tracks: Array<{ id: number; order?: number | null; dateAdded: Date }>
  constructor({ id, name, collectionToTracks, tracks }: GqlCollection | TrackList) {
    this.id = id
    this.name = name
    this.tracks = collectionToTracks?.map(({ trackId: id, order, dateAdded }) => ({
      id,
      order,
      dateAdded: new Date(dateAdded),
    })) || tracks
  }

  getCollectionIds = () => this.tracks.map(({ id }) => id)
}

export default Collection
