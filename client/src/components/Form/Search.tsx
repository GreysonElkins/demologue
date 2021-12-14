import { useEffect, useState, DetailedHTMLProps } from 'react'
import { UseQueryResult } from 'react-query'
import Loading from 'style/Icon/Loading'

import 'style/form/index.scss'
import './index.scss'

interface Props extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  queryFn: (query: string) => UseQueryResult<any[], unknown>
  children: (props: { results?: any[] }) => React.ReactNode
}

const Search: React.FC<Props> = ({ queryFn, children, ...props }) => {
  const [query, setQuery] = useState('')
  const { data, refetch, isFetching, isError } = queryFn(query)

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <div className="search-and-results">
      <input
        className="StyledField LineText SearchInput"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        {...props}
      />
      {isFetching && !data ? <Loading /> : <>{children({ results: data })}</>}
    </div>
  )
}

export default Search
