import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBandById } from 'scripts/api/demologue/query/band'

import Loading from 'style/Icon/Loading'
import './BandProfile.scss'

const BandProfile = () => {
  const { bandId } = useParams()
  const { data, isFetched, ...props } = getBandById(Number(bandId))

  useEffect(() => {
    console.log({ data, ...props })
  }, [data])

  if (!isFetched) return <Loading />

  if (isFetched && !data)
    return (
      <div className="missing-band">
        <span>404</span>&nbsp;band not found 
      </div>
    )

  // const members = data.usersToBands.map(({ user }:any) => user.name)
  // console.log(members)

  return (
    <div className="BandProfile">
      <div className="band-header">
        <img src={data.photoUrl} />
        <div className="band-info">
          <h3>{ data.name }</h3>
          {/* {members} */}
        </div>
      </div>
    </div>
  )
}

export default BandProfile