import { useParams } from 'react-router-dom'
import { useBands } from 'context/Bands'
import MemberPane from './MemberPane'

import Loading from 'style/Icon/Loading'
import Header from './Header'
import './BandProfile.scss'
import '../index.scss'

const BandProfile = () => {
  const { bandId } = useParams()
  const id = Number(bandId)
  const { match } = useBands(id)

  if (!match) return <Loading />

  return (
    <div className="Profile">
      <Header band={match} />
      {/* OWNER SECTIONS */}
      <div>
        <MemberPane band={match} />
      </div>
    </div>
  )
}

export default BandProfile