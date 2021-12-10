import { useEffect, useState } from 'react'

import CollectionGallery from './CollectionGallery'
import Collection from 'types/Collection'
import Playlist from 'components/Playlist'
import Band from 'types/Band.d'

const MemberPane: React.FC<{ band: Band }> = ({ band }) => {
  const [selectedCollection, setSelectedCollection] = useState<null | Collection>(null)

  useEffect(() => {
    setSelectedCollection(null)
  }, [band])
  
  return (
    <div>
      {selectedCollection && <Playlist collection={selectedCollection} />}
      <CollectionGallery band={band} onSelectCollection={setSelectedCollection} />
    </div>
  )
}

export default MemberPane
