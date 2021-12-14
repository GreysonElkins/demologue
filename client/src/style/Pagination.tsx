import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Icon } from './Icon'

type Props = {
  startPage?: number
  pageCount: number
  onChange?: (page: number) => void
  runOnStartUp?: boolean
}

import './index.scss'

const Pagination: React.FC<Props> = ({
  startPage = 1,
  pageCount,
  onChange,
  runOnStartUp = false,
}) => {
  const [page, setPage] = useState<number>(startPage)
  const [startingUp, setStartingUp] = useState<boolean>(!runOnStartUp)
  let list: number[] = []
  let startTrunc = false
  let endTrunc = false

  useEffect(() => {
    if (startingUp) return setStartingUp(false)
    if (!onChange) return
    onChange(page)
  }, [page])

  if (!pageCount) return <></>

  const jumpPage = (pageNumber: number) => setPage(pageNumber)

  const nextPage = () => setPage((prev) => (prev < pageCount ? prev + 1 : prev))

  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev))

  if (pageCount >= 7) {
    //allow for truncated pagination
    // credit Albert De Guzman, @werevamp
    if (page <= 4) {
      list = _.range(1, 6)
      // range is 1 - 5
      // no initial truncation
      endTrunc = true
    } else if (page === 4 && pageCount === 7) {
      list = _.range(1, 8)
      // range is 1 - 7
      // no initial or end truncation
    } else {
      // add initial truncation
      startTrunc = true
      if (page + 3 === pageCount) {
        list = _.range(pageCount - 5, pageCount + 1)
      } else if (page + 3 > pageCount) {
        list = _.range(pageCount - 4, pageCount + 1)
      } else {
        list = _.range(page - 2, page + 3)
        endTrunc = true
      }
    }
  } else {
    list = _.range(1, pageCount + 1)
  }
  return (
    <div className="Pagination">
      <button onClick={prevPage} className="nav-pages">
        <Icon icon="angle-left" /> Prev
      </button>
      {startTrunc && (
        <>
          <button onClick={() => jumpPage(1)}>{/* currentPage={false} */}1</button>
          {/* TRUNCATION */}
          <div className="truncation">&hellip;</div>
        </>
      )}
      {list.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => jumpPage(pageNumber)}
          className={`number-page ${page === pageNumber ? 'current-page' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
      {endTrunc && (
        <>
          <div className="truncation">&hellip;</div>
          <button onClick={() => jumpPage(pageCount)}>
            {/* currentPage={false} */}
            {pageCount}
          </button>
        </>
      )}
      <button onClick={nextPage} className="nav-pages">
        Next <Icon icon="angle-right" />
      </button>
    </div>
  )
}

export default Pagination
