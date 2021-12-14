import { useEffect, useState, DetailedHTMLProps } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UseQueryResult } from 'react-query'
import Pagination from 'style/Pagination'
import Loading from 'style/Icon/Loading'
import { SearchParams } from 'scripts/api/demologue/query/band'

import 'style/form/index.scss'
import './index.scss'

interface Props
  extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  queryFn: (config: SearchParams) => UseQueryResult<{ results: any[]; totalCount: number }, unknown>
  children: (props: { results?: any[] }) => React.ReactNode
  perPage?: number
}

const Search: React.FC<Props> = ({ queryFn, children, perPage, ...props }) => {
  const [search, setSearch] = useSearchParams({ search: ''})
  const [query, setQuery] = useState(search.get('search') || '')
  const [page, setPage] = useState(0)
  const { data, refetch, isFetching } = queryFn({ query, page, perPage }) // needs error handling

  useEffect(() => {
    refetch()
    if (query.length > 0 && query.length % 4 === 0) setSearch({ search: query })
  }, [query, page])

  if (!data) return <Loading />

  const { results, totalCount } = data

  return (
    <div className="search-and-results">
      <input
        className="StyledField LineText SearchInput"
        value={query}
        onChange={event => setQuery(event.target.value)}
        {...props}
      />
      {isFetching && !results ? <Loading /> : <>{children({ results: results })}</>}
      {perPage && totalCount > perPage && (
        <Pagination pageCount={totalCount / perPage} onChange={(tab) => setPage(tab - 1)}/>
      )}
    </div>
  )
}

export default Search
