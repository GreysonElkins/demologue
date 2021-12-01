import { useMemo } from 'react'
import Band from 'types/Band'

import Table from '.'
import Avatar from 'style/Icon/Avatar'
import test from 'test/data/bands'

const BandList: React.FC<{bands?: Band[]}> = ({ bands = test }) => {
  const data = useMemo(
    () =>
      bands.map(({ name, photoUrl }) => ({
        col1: <Avatar src={photoUrl} className="avatar-squared" defaultIcon="drum" size="3x" noAction />,
        col2: name,
        col3: "testData",
        col4: <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinclipart.com%2Fpindetail%2FThwhxi_sound-wave-clipart-soud-audio-sound-wave-png%2F&psig=AOvVaw0PmiznWuyJDReBGAkCOWoU&ust=1638386044401000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjl0uTlwPQCFQAAAAAdAAAAABAK" />

      })),
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
      Header: 'test',
      accessor: 'col3'
    }, {
      Header: 'test',
      accessor: 'col4'
    }
  ], [])

  return <Table data={data} columns={columns}/>  
}

export default BandList
