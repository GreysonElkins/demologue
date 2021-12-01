import { useParams } from 'react-router-dom'
import { useBands } from 'context/Bands'
import TestTable from 'components/Table/Band'

import Loading from 'style/Icon/Loading'
import './BandProfile.scss'

const BandProfile = () => {
  const { bandId } = useParams()
  const id = Number(bandId)
  const { bands } = useBands(id)

  if (!bands[id]) return <Loading />

  return (
    <>
      <TestTable />
      <div className="BandProfile">
      {bands[id].name}
    </div>
    </>
  )
}

export default BandProfile