import Search from "components/Form/Search"
import { searchBands } from "scripts/api/demologue/query/band"
import BandList from 'components/Table/Band'

const SearchBands = () => {
  return (
    <Search queryFn={searchBands} placeholder="search bands!">
      {({ results }) => <BandList bands={results} />}
    </Search>
  )
}

const SearchBandRoute = {
  element: <SearchBands />,
  title: 'Search Bands',
  authRequired: false,
  exact: true,
  path: '/search-bands',
}

export default SearchBandRoute
