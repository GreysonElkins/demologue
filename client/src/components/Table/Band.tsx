import { useMemo } from 'react'
import Band from 'types/Band'

import Table from '.'
import Avatar from 'style/Icon/Avatar'
import test from 'test/data/bands'

const BandList: React.FC<{bands?: Band[]}> = ({ bands = test }) => {
  const data = useMemo(
    () =>
      bands.map(({ name, photoURL }) => ({
        col1: <Avatar src={photoURL} className="avatar-squared" defaultIcon="drum" size="3x" noAction />,
        col2: name,
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
    }], [])

  return <Table data={data} columns={columns}/>  
}

export default BandList
