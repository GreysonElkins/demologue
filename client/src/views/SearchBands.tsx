const SearchBands = () => {
  return <>{/* <BandList bands={bands} /> */}</>
}

const SearchBandRoute = {
  element: <SearchBands />,
  title: 'Search Bands',
  authRequired: false,
  exact: true,
  path: '/search-bands',
}

export default SearchBandRoute
