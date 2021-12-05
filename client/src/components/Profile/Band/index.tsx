import { useParams } from 'react-router-dom'
import { useBands } from 'context/Bands'

import Loading from 'style/Icon/Loading'
import Header from './Header'
import './BandProfile.scss'
import CollectionGallery from './CollectionGallery'

const BandProfile = () => {
  const { bandId } = useParams()
  const id = Number(bandId)
  const { match } = useBands(id)

  if (!match) return <Loading />

  return (
    <div className="BandProfile">
      <Header band={match} />
      {/* OWNER SECTIONS */}
      <div>
        <CollectionGallery band={match} onSelectCollection={(id) => console.log(id)}/>
      </div>
    </div>
  )
}

export default BandProfile