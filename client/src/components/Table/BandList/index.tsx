import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PartialBand } from 'types/Band'

import Table from '..'
import Avatar from 'style/Icon/BandAvatar'
import './BandList.scss'

const BandList: React.FC<{bands?: PartialBand[]}> = ({ bands }) => {
  const navigate = useNavigate()
  const data = useMemo(
    () =>
      bands?.map((band) => ({
        col1: <Avatar partialBand={band} hideLabel/>,
        col2: band.name,
        col3: band.tracksConnection.totalCount,
        col4: band.usersToBandsConnection.totalCount,
        id: band.id
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

  const setRowProps = ({ original: { id } }: { [key: string]: any }) => ({
    onClick: () => navigate(`/band/${id}`),
    // onKeyDown: (event: KeyboardEvent) => event.code === 'Enter' && (id),
    tabIndex: 0,
  })

  return <Table className="BandList" data={data} columns={columns} getRowProps={setRowProps} />  
}

export default BandList
