import BandProfile from "components/Profile/Band"

const Band = () => <BandProfile />

const BandRoute = {
  element: <Band />,
  title: 'Band Profile',
  authRequired: true,
  exact: true,
  path: '/band/:bandId'
}

export default BandRoute
