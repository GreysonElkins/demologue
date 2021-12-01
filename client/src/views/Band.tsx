import BandProfile from "components/Profile/Band"

const Band = () => <BandProfile />

const BandRoute = {
  element: <Band />,
  title: 'Band Profile',
  exact: true,
  path: '/band/:bandId'
}

export default BandRoute
