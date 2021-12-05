import { Icon } from 'style/Icon'
import Band from 'types/Band'

import './BandProfile.scss'

type Props = {
  band: Band
  onSelectCollection: (id: number) => void
}

const CollectionGallery: React.FC<Props> = ({ band, onSelectCollection }) => {
  const showCollections = () =>
    band.collections.map(({ id, name }) => 
      <button onClick={() => onSelectCollection(id)}>
          <Icon icon="layer-group" size="3x" />
          {name}
      </button>
    )
  return (
    <section className="CollectionGallery">
      <h2>Collections</h2>
      <div className="Collections">{showCollections()}</div>
    </section>
  )
}

export default CollectionGallery
