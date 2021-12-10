import { Icon } from 'style/Icon'
import Band from 'types/Band'
import Collection from 'types/Collection'

import '../BandProfile.scss'

type Props = {
  band: Band
  onSelectCollection: (collection: Collection) => void
}

const CollectionGallery: React.FC<Props> = ({ band, onSelectCollection }) => {

  const showCollections = () => 
    band.collections.map((collection) => 
      <button onClick={() => onSelectCollection(collection)} key={`collection-${collection.id}`}>
          <Icon icon="layer-group" size="3x" />
          {collection.name}
      </button>
    )

  if (band.songList.tracks.length === 0) return <></>

  return (
    <section className="CollectionGallery">
      <h2>Collections</h2>
      <div className="Collections">
        {/* <button onClick={() => }>
          <Icon icon="layer-group" size="3x" />
          All Tracks
        </button> */}
        {showCollections()}
      </div>
    </section>
  )
}

export default CollectionGallery
