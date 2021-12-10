import { useEffect, useState } from 'react'

import CollectionGallery from './CollectionGallery'
import Collection from 'types/Collection'
import Playlist from 'components/Playlist'
import Band from 'types/Band.d'
import AllBandTracks from './AllBandTracks'

const MemberPane: React.FC<{ band: Band }> = ({ band }) => {
  const [selectedCollection, setSelectedCollection] = useState<null | Collection>(null)

  useEffect(() => {
    setSelectedCollection(null)
  }, [band])
  
  return (
    <div>
      {selectedCollection && <Playlist collection={selectedCollection} />}
      <CollectionGallery band={band} onSelectCollection={setSelectedCollection} />
      {band.songList.tracks.length > 0 && <AllBandTracks band={band} />}
    </div>
  )
}

export default MemberPane
