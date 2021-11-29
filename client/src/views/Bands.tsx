import bands from "test/data/bands"
import BandList from "components/Table/BandList"

const Bands = () => {
  return <BandList bands={bands} />
}

const BandRoute = {
  element: <Bands />,
  title: 'My Bands',
  authRequired: true,
  exact: true,
  path: '/my-bands'
}

export default BandRoute
