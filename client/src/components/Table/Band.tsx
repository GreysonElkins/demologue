import { useMemo } from 'react'
import { PartialBand } from 'types/Band'

import Table from '.'
import Avatar from 'style/Icon/BandAvatar'

const BandList: React.FC<{bands?: PartialBand[]}> = ({ bands }) => {
  const data = useMemo(
    () =>
      bands?.map((band) => ({
        col1: <Avatar partialBand={band} hideLabel/>,
        col2: band.name,
        col3: band.tracksConnection.totalCount,
        col4: band.usersToBandsConnection.totalCount
        
      })) || [],
    [bands]
  )
  const columns = useMemo(() => [{
      Header: '',
      accessor: 'col1',
    }, {
      Header: 'Name',
      accessor: 'col2',
      defaultCanSort: true
    }, {
      Header: 'Uploaded Demos',
      accessor: 'col3',
      defaultCanSort: true
    }, {
      Header: 'Members',
      accessor: 'col4',
      defaultCanSort: true
    }, {
      Header: '',
      accessor: 'col5',
    }

  ], [])

  return <Table data={data} columns={columns}/>  
}

export default BandList
