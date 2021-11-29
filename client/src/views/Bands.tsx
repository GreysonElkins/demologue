import { Link } from 'react-router-dom'
import bands from "test/data/bands"

import Cta from "style/button/Cta"

const Bands = () => {
  return (
    <>

      {/* <BandList bands={bands} /> */}
    </>
  )
}

const BandRoute = {
  element: <Bands />,
  title: 'My Bands',
  authRequired: true,
  exact: true,
  path: '/my-bands'
}

export default BandRoute
