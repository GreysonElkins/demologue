import { useParams } from 'react-router-dom'
import { useBands } from 'context/Bands'

import Loading from 'style/Icon/Loading'
import Header from './Header'
import './BandProfile.scss'

const BandProfile = () => {
  const { bandId } = useParams()
  const id = Number(bandId)
  const { match } = useBands(id)

  if (!match) return <Loading />

  return (
    <div className="BandProfile">
      <Header band={match} />
    </div>
  )
}

export default BandProfile