import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBandById } from 'scripts/api/demologue/query/band'
import TestTable from 'components/Table/Band'

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

  const members = data.usersToBands.map(({ user }:any) => user.displayName)
  // console.log(members)

  return (
    <>
      <TestTable />
      <div className="BandProfile">
     
    </div>
    </>
  )
}

export default BandProfile